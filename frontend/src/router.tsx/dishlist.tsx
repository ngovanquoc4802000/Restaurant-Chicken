import { useEffect, useState } from 'react';
import '../styles/content.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ReactPaginate from 'react-paginate';
import { faDeleteLeft, faList } from '@fortawesome/free-solid-svg-icons';

type Dish = {
  id?: number | undefined
  title: string,
  price: string,
  content: string
  image: string
  data: Dish[];
  success: boolean,
  message: string;
  dataPage: Dish[];
  pagination:
  {
    page: number, limit:
    number, totalPage:
    number
  } ,
}

function DishList() {
  const [array, setArray] = useState<Dish[]>([]);
  const [isActive, setIsActive] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(4);
  const [totalPages, setTotalPages] = useState<number>(0);
  const getApiDish = () => {
    axios.get<Dish>('http://localhost:7777/dishlist')
      .then(res => {
        setArray(res.data.data);
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getApiDish();
  }, [])
  const handleDelete = async (id: number | undefined) => {
    let Error = "bạn đã thất bại khi xoá"
    try {
      axios.delete<Dish>(`http://localhost:7777/dishlist/${id}`)
      getApiDish();
    } catch (error) {
      console.log("Error" + Error)
    }
  }

  const paginationDish = () => {
    axios.get<Dish>(`http://localhost:7777/dishlist/api/v1/product?page=${currentPage}&limit=${currentLimit}`)
      .then((res) => {
        setArray(res.data.data)
        setTotalPages(res.data.pagination.totalPage)
      })
      .catch(error => console.log("Lỗi phân trang Client DishList" + error))
  }

  useEffect(() => {
    paginationDish();
  }, [currentPage])
  const handlePageClick = (event: { selected: number; }) => {
    setCurrentPage(event.selected + 1)
  }
  const handleIconList = () => {
    setIsActive(!isActive);
  }
  return (
    <>
      <div className="card">
        <h1 className='title'>Dish List</h1>
        {
          array.map((item, id) => (
            <div key={id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <img src={`http://localhost:7777/${item.image}`} style={{ borderTopRightRadius: "0px", borderTopLeftRadius: "0px" }} className="card-img-top" alt="..." />
                <div className="card-content">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.content}</p>
                  <p style={{ fontWeight: "700px", color: "black" }} className="card-text">{item.price} VND</p>
                  {
                    isActive ? (
                      <div className='card-service' >
                        <Link className='card-link-edit' to={`/dishlist/edit/${item.id}`}>
                          <p className='card-item-edit' >
                            Chỉnh sửa <FontAwesomeIcon icon={faEdit} />
                          </p>
                        </Link>
                        <p className='card-item-delete' onClick={() => handleDelete(item.id)}>
                          Xoá <FontAwesomeIcon icon={faDeleteLeft} />
                        </p>
                      </div>
                    ) : (
                      ""
                    )
                  }
                  <div className='card-icon-list'>
                    <strong onClick={handleIconList}>
                      <FontAwesomeIcon icon={faList} />
                    </strong>
                  </div>
                  <Link className='ReadViews' style={{ textDecoration: "none", color: "black" }} to={`/dishlist/views/${item.id}`}>
                    <button type="button" className="btn btn-outline-primary" style={{ width: "100%" }}>Views</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        totalPages > 0 &&
        <div style={{ position: "absolute", bottom: "1%", left: "45%" }}>
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

      <Link to="/dishlist/create">
        <button className='Add'>Add News</button>
      </Link>
    </>
  )
}

export default DishList;