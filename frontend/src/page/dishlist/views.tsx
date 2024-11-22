import { faEdit, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../styles/content.scss';
import {  faList } from "@fortawesome/free-solid-svg-icons";

interface ViewDish {
  id?: number;
  title: string
  content: string,
  price: string,
}

function ViewsDishList() {
  /* const tiente = new Intl.NumberFormat() */
  const [valueRead, setValueRead] = useState<ViewDish>({
    title: "",
    content: "",
    price: "",
  })
  const [isActive, setIsActive] = useState(false);
  const [arrayViews, setArrayViews] = useState<ViewDish[]>([]);
  const [search, setSearch] = useState('');
  const { id } = useParams();
  const getViewsId = () => {
    axios.get('http://localhost:7777/dishlist/' + id)
      .then(res => {
        setValueRead(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getViewsId();
  }, []);
  useEffect(() => {
    axios.get('http://localhost:7777/dishlist')
      .then(res => {
        setArrayViews(res.data.data);
      })
  }, [])
  const handleInformation = () => {
    setIsActive(!isActive)
  }
  return (
    <div className="read">
      <div className="cardRead">
        <h1>Read Dish List</h1>
        <div className="headerRead">
          <div className="headerTitle">
            <p className="headerFirst">{valueRead.title}</p>
            <p className="headerSecond" >{valueRead.content}</p>
          </div>
          <div className="favorite">
            <FontAwesomeIcon icon={faHeart} />
            <span>Yeu Thich</span>
          </div>
        </div>
        <span onClick={handleInformation} className="information">Thông tin quán</span>
        {/* modal show */}
        {
          !isActive ?
            <></>
            :
            <div className="card-bodyViews">
              <h5 className="card-titleViews ">Thông tin quán</h5>
              <p className="card-textViews">{valueRead.title}</p>
              <p>Địa chỉ</p>
              <div className="hours">
                <h6>Hour</h6>
                <span>
                  Sunday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Saturday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Friday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Thursday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Wednesday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Tuesday: 10:00 - 23:59
                </span>
                <br />
                <span>
                  Monday: 10:00 - 23:59
                </span>
                <br />
              </div>
            </div>
        }
      </div>
      {/* search */}
      <div className="form-outline" data-mdb-input-init>
        <input type="search" onChange={(e) => setSearch(e.target.value)} id="form1" className="form-control" placeholder="Tìm kiếm" aria-label="Search" />
      </div>
      <div className="card">
        {
          arrayViews.filter((item) => {
            return search.toLowerCase() === "" ? item : item.title.includes(search)
          }).map((item, id) => (
            <div key={id}>
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
                       {/*  <p className='card-item-delete' onClick={() => handleDelete(item.id)}>
                          Xoá <FontAwesomeIcon icon={faDeleteLeft} />
                        </p> */}
                      </div>
                    ) : (
                      ""
                    )
                  }
                </div>
                <div className='card-icon-list'>
                    <strong onClick={handleInformation}>
                      <FontAwesomeIcon icon={faList} />
                    </strong>
                  </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ViewsDishList;