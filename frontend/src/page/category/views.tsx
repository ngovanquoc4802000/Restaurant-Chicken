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
  const [get, setGet] = useState<Form>();
  const params = useParams();
  const { category_id } = params;
  console.log(category_id)
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
              <tr>
                <th scope="row" >{get?.category_id}</th>
                <td>{get?.name}</td>
                <td>{get?.handle}</td>
                <td>{get?.email}</td>
                <td>{get?.address}</td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Views;