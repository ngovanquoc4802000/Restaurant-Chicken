import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/content.scss';
interface Form {
  name: string,
  handle: string,
  email: string,
  address: string
}

function CreateForm() {
  const [value, setValue] = useState<Form>({ name: "", handle: "", email: "", address: "" })
  const navigator = useNavigate()

  const handlefiels = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

  }
  const onChangeInput = (e: { target: { name: string; value: string; }; }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handleCreate = () => {
    axios.post('http://localhost:7777/category', {
      name: value.name,
      handle: value.handle,
      email: value.email,
      address: value.address
    })
      .then((res) => {
        setValue(res.data.data)
        navigator('/success');
        console.log("success")
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="category">
      <form className="FormFields" onSubmit={handlefiels} action="">
        <label htmlFor="">
          Name
          <input value={value.name} onChange={onChangeInput} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle
          <input value={value.handle} onChange={onChangeInput} name="handle" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Email
          <input value={value.email} onChange={onChangeInput} name="email" type="email" />
        </label>
        <br />
        <label htmlFor="">
          Address
          <input value={value.address} onChange={onChangeInput} name="address" type="address" />
        </label>
        <br />
        <button className="createPost" onClick={handleCreate} >
          Create Post
        </button>
      </form>;
    </div>
  )
}

export default CreateForm;