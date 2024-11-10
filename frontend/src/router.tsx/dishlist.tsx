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
}

function DishList() {
  const [array, setArray] = useState<Dish[]>([])
  useEffect(() => {
    axios.get('http://localhost:7777/dishlist')
      .then(res => {
        setArray(res.data.data);
      })
      .catch(error => console.log(error))
  }, [])
  const handleClickDish = (id: number | undefined) => {
    axios.delete('http://localhost:7777/dishlist/' + id)
      .then(res => {
        if (location.reload() === null) {
          return setArray(array.filter((item) => item.id !== res.data.id))
        }
      })
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
                <strong className='DeleteX' onClick={() => handleClickDish(item.id)}>X</strong>
                <Link to={`/dishlist/edit/${item.id}`}>
                  <strong className="EditIcons">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </strong>
                </Link>
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