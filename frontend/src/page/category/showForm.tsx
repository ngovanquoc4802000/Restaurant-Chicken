import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/content.scss'
import { Link, Outlet } from "react-router-dom";
interface Form {
  id: number | undefined
  url_id: number | undefined,
  name: string,
  handle: string | number,
  image: string
}
function Showform() {
  const [array, setArray] = useState<Form[]>([]);
  const [search, setSearch] = useState('');
  const onClickShow = () => {
    axios.get('http://localhost:7777/category'
    )
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
  const handleDelete =  async(id: number | undefined) => {
    try {
      axios.delete(`http://localhost:7777/category/${id}`)
      onClickShow();
    }catch(error) {
      console.log(error)
    }
  }
  const uniqueUrl = new Date().getTime();
  return (
    <div className="FormShow">
      <Link className="create" to="/category/create">
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
            <th>HANDLE</th>
            <th>IMAGE</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            array.filter((item) => {
              return search.toLowerCase() === "" ? item : item.name.includes(search);
            }).map((item, id) => (
              <tr key={id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.handle}</td>
                <td>
                <img width={100} height={100} src={`http://localhost:7777/${item.image}`} alt="image" />
                </td>
                <td>
                  <Link to={`/views/${item.id}`}>
                    <button className="viewShow ">view</button>
                  </Link>
                  <Link to={`/edit/${item.id}`}>
                    <button className="editShow">edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="delete">delete</button>
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