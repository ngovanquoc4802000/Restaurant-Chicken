import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/content.scss'
import { Link, Outlet } from "react-router-dom";
import ReactPaginate from "react-paginate";
interface Form {
  [x: string]: any;
  id: number
  name: string,
  handle: string | number,
  image: string
  data: Form[] ;
  success?: boolean,
  message?: string;
  dataPage?: Form[];
  pagination?: { page?: number,  limit?: number , totalPage?: number | undefined} | number,
}


function Showform() {
  const [array, setArray] = useState<Form[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(0);
  const onClickShow = () => {
    axios.get<Form>('http://localhost:7777/category'
    )
      .then((res) => {
        setArray(res.data.data);
        console.log('getCategory All success')
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    onClickShow();
    return () => {
      console.log("Xoa du thua OnClickShow")
    }
  }, []);

 const pagination = () => {
   axios.get<Form>(`http://localhost:7777/category/api/v1/product?page=${currentPage}&limit=${currentLimit}`)
   .then(res => {
    setArray(res.data.data)
    setTotalPages(res.data.pagination?.totalPage)
  })
  .catch(error => console.log("lỗi phân trang Client Category"+ error))
 }
 useEffect(() => {
   pagination();
 },[currentPage])

  const handleDelete = async (id: number | undefined) => {
    try {
      axios.delete<Form>(`http://localhost:7777/category/${id}`)
      onClickShow();
    } catch (error) {
      console.log(error)
    }
  }
  const handlePageClick = (event: { selected: number; }) => {
    setCurrentPage(event.selected + 1)
    
  }
  const uniqueUrl = new Date().getTime();
  return (
    <div className="FormShow">
      <Link className="create" to="/category/create">
        Add Category
      </Link>
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input onChange={(e) => setSearch(e.target.value)} type="search" id="form1" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>HANDLE</th>
            <th>IMAGE</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            array.filter((item) => {
              return search.toLowerCase() === "" ? item : item.name.includes(search);
            }).map((item, id) => (
              <tr key={id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.handle}</td>
                <td>
                  <img width={100} height={100} src={`http://localhost:7777/${item.image}`} alt="image" />
                </td>
                <td>
                  <Link to={`/views/${item.id}/${item.handle}/${uniqueUrl}`}>
                    <button className="viewShow ">view</button>
                  </Link>
                  <Link to={`/edit/${item.id}/${item.handle}/${uniqueUrl}`}>
                    <button className="editShow">edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="delete">delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
        {
          totalPages > 0  &&
          <div style={{display: "flex" , justifyContent: "center" , marginTop: "2rem"}}>
            <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
          </div>
        }
      <Outlet />
    </div>);
}

export default Showform;