import { useEffect, useState } from 'react';
import '../styles/content.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ReactPaginate from 'react-paginate';


type Dish = {
  id?: number | undefined
  title: string,
  price: string,
  content: string
  image: string
  data: Dish[];
}

function DishList() {
  const [array, setArray] = useState<Dish[]>([]);
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
     } catch(error) {
       console.log("Error" + Error)
     }
      
  }
  const handlePageClick = () => {

  }
  return (
    <>
      <div className="card">
        <h1 className='title'>Dish List</h1>
        {
          array.map((item, id) => (
            <div key={id}>
              <div className="card-body">
                <button className='DeleteX' onClick={() => handleDelete(item.id)}>X</button>
                <Link to={`/dishlist/edit/${item.id}`}>
                  <strong className="EditIcons">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </strong>
                </Link>
                <img className="imageDish" width={100} height={100} src={`http://localhost:7777/${item.image}`} alt="" />
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content}</p>
                <div className="incre" >
                  {/* <p>-</p> */}
                  <span>{item.price}</span>
                  <p>+</p>
                </div>
                <div className="buttonAddAndRead">
                  <Link to="" className='AddDish'>
                    Đặt mua
                  </Link>
                  <Link className='ReadViews' style={{ textDecoration: "none", color: "black" }} to={`/dishlist/views/${item.id}`}>
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))
        }

      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={70}
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
      <Link to="/dishlist/create">
        <button className='Add'>Add News</button>
      </Link>
    </>
  )
}

export default DishList;