import axios from "axios";
import { useEffect, useState } from "react";

interface ListFace {
  id?: number | undefined
  Email: string,
  name: string,
  password: string,
  address: string
}

function ListLogin() {
  const [array, setArray] = useState<ListFace[]>([])
  const getListApi = () => {
    axios.get('http://localhost:7777/user')
      .then(res => {
        setArray(res.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getListApi()
  }, []);
  const handleDelete = (id: number | undefined) => {
    axios.delete(`http://localhost:7777/user/${id}`)
    getListApi();
  }
  return (
    <div className="row">
      <div className="card">
        {
          array.map((item, id) => (
            <div className="card-bodyLogin">
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div key={id} className="ms-3">
                  <p className="fw-bold mb-1">{item.name}</p>
                  <p className="text-muted mb-0">{item.Email}</p>
                  <p className="text-muted mb-0">{item.address}</p>
                </div>
                <div className="handleButton">
                  <span style={{ cursor: "pointer", fontSize: "18px", marginLeft: "1rem" }} onClick={() => handleDelete(item.id)}>X</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>);
}

export default ListLogin;