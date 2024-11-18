import axios from "axios";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import '../../styles/content.scss';
interface Form {
  name: string,
  handle: string,
  image?: string
}

function CreateForm() {
  const [value, setValue] = useState<Form>({
    name: "",
    handle: "",
  })
  const [image1, setImage1] = useState<string>("");
  const navigator = useNavigate();
  const handlefiels = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image1);
    formData.append("name", value.name);
    formData.append("handle", value.handle);
    const result = await axios.post<Form>(
      "http://localhost:7777/api/image",formData, 
      {
          headers: {"Content-Type": "multipart/form-data"},
      }
      )
      navigator('/category');
      console.log(result)
  }
  const onChangeInput = (e: { target: { name: string; value: string; }; }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const onChangeFile = (e : { target: {  files: any } }) => {
      setImage1(e.target.files[0]);
  }
  return (
    <div className="category">
      <form className="FormFields" onSubmit={handlefiels} action="">
        <h2 style={{ marginRight: "4rem" }}>Post Category</h2>
        <label htmlFor="">
          Name:
          <input onChange={onChangeInput} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle:
          <input onChange={onChangeInput} name="handle" type="text" />
        </label>
        <br />
          <input onChange={onChangeFile} type="file" name="file" accept="image/*" multiple={false} />
          <button type="submit" className="createPost" >
            Create Post
          </button>
      </form>;
    </div>
  )
}

export default CreateForm;