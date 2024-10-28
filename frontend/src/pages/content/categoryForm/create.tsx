import { useState } from 'react';
import '../../../styles/content.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number,
  name: string,
  email: string,
  handle: string,
  address: string,
}

let number: number = 1;
function CreateForm() {
  const navigation = useNavigate();
  const [value, setValue] = useState({ id: ++number, name: "", handle: "", email: "", address: "" })
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }
  const handleSave = () => {
    axios.post('http://localhost:7777/category', value)
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          console.log(res.data.message)
          navigation('/')
        }
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <form className='form' action="" onSubmit={handleSubmit}>
      <h2>Create Form </h2>
      <label htmlFor="">
        Name
        <input placeholder='Name' onChange={(e) => setValue({ ...value, name: e.target.value })} name='name' type="name" />
      </label>
      <br />
      <label htmlFor="">
        Email
        <input placeholder='Email' onChange={(e) => setValue({ ...value, email: e.target.value })} name='email' type="email" />
      </label>
      <br />
      Handle
      <label htmlFor="">
        <input placeholder='Handle' onChange={(e) => setValue({ ...value, handle: e.target.value })} name='handle' type="handle" />
      </label>
      <br />
      <label htmlFor="">
        Address
        <input placeholder='Address' onChange={(e) => setValue({ ...value, address: e.target.value })} name='address' type="address" />
      </label>
      <br />
      <button className="addNews" onClick={handleSave}>Add News</button>
    </form>
  );
}

export default CreateForm;