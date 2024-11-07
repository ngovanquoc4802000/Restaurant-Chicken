import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../styles/content.scss';

interface ViewDish {
  id?: number;
  title: string
  content: string,
  price: string,
  address: string
}

function ViewsDishList() {
  const [valueRead, setValueRead] = useState<ViewDish>({
    title: "",
    content: "",
    price: "",
    address: ""
  })
  const [isActive, setIsActive] = useState(false);
  const [arrayViews, setArrayViews] = useState<ViewDish[]>([]);
  const [search,setSearch] = useState('');
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
            <p className="headerThree" >{valueRead.address}</p>
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
              <p>{valueRead.address}</p>
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
              <strong className='DeleteX' >X</strong>
              <Link to={`/dishlist/edit/${item.id}`}>
                <strong className="EditIcons">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </strong>
              </Link>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.content}</p>
              <p className="card-address">{item.address}</p>
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
    </div>
  );
}

export default ViewsDishList;