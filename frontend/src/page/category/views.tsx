import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/content.scss'
interface Form {
  id: number
  image?: string
  name: string
  handle: string
}

function Views() {
  const [get, setGet] = useState<Form>();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:7777/category/` + id)
      .then(res => {
        setGet(res.data.data)
      }).catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="views" style={{ position: "absolute", width: "500px", left: "40%", marginLeft: "-50px" }}>
      <h1 style={{ textAlign: "center" }}>List Category View Id</h1>
      <table className="table">
        <thead>
          <tr style={{ color: "blue" }}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Handle</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr style={{ color: "blue"}}>
              <td scope="col">{get?.id}</td>
              <td scope="col">{get?.name}</td>
              <td scope="col">{get?.handle}</td>
              <img width={100} height={100} src={`http://localhost:7777/${get?.image}`} alt="image" />
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Views;