import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/content.scss'
import { Link, Outlet, useNavigate } from "react-router-dom";
interface Form {
  category_id: number
  name: string,
  handle: string,
  email: string,
  address: string
}
function Showform() {
  const [array, setArray] = useState<Form[]>([]);
  const [search, setSearch] = useState('');
  const navigator = useNavigate()
  const onClickShow = () => {
    axios.get('http://localhost:7777/category')
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
  const handleDelete = (category_id: number) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (!confirm) {
      axios.delete("http://localhost:7777/category/" + category_id)
        .then(res => {
          location.reload();
          navigator('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  return (
    <div className="FormShow">
      <Link className="create" to="/create">
        Add Category
      </Link>
      <input onChange={(e) => setSearch(e.target.value)} style={{ width: "100%" }} type="text" placeholder="Hãy nhập vào đây" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            array.filter((item) => {
              return search.toLowerCase() === "" ? item : item.name.includes(search);
            }).map((item, id) => (
              <tr key={id}>
                <td>{item.category_id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  <Link to={`/views/${item.category_id}`}>
                    <button className="view">view</button>
                  </Link>
                  <Link to={`/edit/${item.category_id}`}>
                    <button className="edit">edit</button>
                  </Link>
                  <Link to={`/delete/${item.category_id}`}>
                    <button className="delete">delete</button>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Outlet />
    </div>);
}

export default Showform;