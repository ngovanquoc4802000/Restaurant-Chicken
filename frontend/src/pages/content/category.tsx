import axios from 'axios';
import { useEffect, useState } from "react";
import '../../styles/content.scss';
import { Outlet, useNavigate} from 'react-router-dom';
interface Post {
  id:number
  name: string,
  email: string,
  handle: string,
  address: string,
}
function Category() {
  const navigation = useNavigate()
  const [list, setList] = useState<Post[]>([])
  const [value, setValue] = useState({id: Math.random(),name: "", handle: "", email: "", address: "" })
  const fetchAPi = async () => {
    await axios.get('http://localhost:7777/category')
      .then(res => {
        setList(res.data.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchAPi()
  }, [])
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   

  }
  const handleSave =  () => {
    axios.post('http://localhost:7777/category',value)
    .then(res => {
      console.log(res.data)
      if(res.data.success) {
        console.log(res.data.message)
        navigation('/')
      }
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="category">
      <form className='form' action="" onSubmit={handleSubmit}>
        <h2>Create Form </h2>
        <label htmlFor="">
          Name
          <input placeholder='Name' onChange={(e) => setValue({...value, name: e.target.value})} name='name' type="name" />
        </label>
        <br />
        <label htmlFor="">
          Email
          <input placeholder='Email' onChange={(e) => setValue({...value, email: e.target.value})} name='email' type="email" />
        </label>
        <br />
        Handle
        <label htmlFor="">
          <input placeholder='Handle' onChange={(e) => setValue({...value, handle:e.target.value  })} name='handle' type="handle" />
        </label>
        <br />
        <label htmlFor="">
          Address
          <input placeholder='Address' onChange={(e) => setValue({...value, address: e.target.value})}  name='address' type="address" />
        </label>
        <br />
        <button onClick={handleSave} >Save</button>
      </form>
      <div className="showForm">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Handle</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((lists, id) => (
                <tr key={id}>
                  <th>{lists.name}</th>
                  <th>{lists.handle}</th>
                  <th>{lists.email}</th>
                  <th>{lists.address}</th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}

export default Category;