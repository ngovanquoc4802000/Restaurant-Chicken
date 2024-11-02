import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/content.scss'
interface Form {
  category_id: number
  name: string
  handle: string
  email: string
  address: string
}

function Views() {
  const params = useParams();
  const { category_id } = params;
  console.log(category_id)
  const [get, setGet] = useState<Form[]>([]);
  useEffect(() => {
    axios.get(`http://localhost:7777/category/` + category_id)
      .then(res => {
        setGet(res.data.data);
      }).catch(err => {
        console.log(err)
      })
      return () => {
        console.log("delete views")
      }
  }, []);
  return (
    <div className="views" style={{position: "absolute",width: "500px" , left: "40%", marginLeft: "-50px"}}>
     <h1 style={{textAlign: "center"}}>List Category View Id</h1>
      <table className="table">
        <thead>
          <tr style={{color:"blue"}}>
            <th  scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Handle</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {
            get.map((item, id) => (
              <tr>
                <th scope="row" key={id}>{item.category_id}</th>
                <td>{item.name}</td>
                <td>{item.handle}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Views;