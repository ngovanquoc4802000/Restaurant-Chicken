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
  const handleDelete = (category_id: Form) => {
    axios.delete('http://localhost:7777/category/' + category_id)
      .then(res => {
        if (location.reload() === null) {
          return setArray(array.filter((item) => {
            item.category_id !== res.data.category_id
          }))
        }
      })
  }
  return (
    <div className="FormShow">
      <Link className="create" to="/create">
        Add Category
      </Link>
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input onChange={(e) => setSearch(e.target.value)} type="search" id="form1" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
          <i className="fas fa-search"></i>
        </button>
      </div>
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
                  <button onClick={() => handleDelete(item.category_id)} className="delete">delete</button>
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