import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/content.scss';
interface Form {
  name: string,
  handle: string,
}

function CreateForm() {
  const [value, setValue] = useState<Form>({ name: "", handle: ""})
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
    })
      .then((res) => {
        setValue(res.data.data)
        navigator('/category');
        console.log("success")
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="category">
      <form className="FormFields" onSubmit={handlefiels} action="">
      <h2 style={{marginRight: "4rem"}}>Post Category</h2>
        <label htmlFor="">
          Name:
          <input  onChange={onChangeInput} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle:
          <input  onChange={onChangeInput} name="handle" type="text" />
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