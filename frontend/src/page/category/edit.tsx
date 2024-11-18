import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import '../../styles/content.scss';
interface Form {
  name: string,
  handle: string,
  image?: string
  fileImage?: string
  data?: {};
  preview?: string | undefined;
}

function Edit() {
  const [value, setValue] = useState<Form>({
    name: "",
    handle: "",
  })
  const { id } = useParams();
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const fetchEditId = () => {
    axios.get<Form>("http://localhost:7777/category/" + id)
      .then(res => {
        setValue(res.data)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchEditId();
  }, [])
  const navigator = useNavigate();
  const handlefiels = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", value.name);
    formData.append("handle", value.handle);
    const result = await axios.put<Form>(
      `http://localhost:7777/category/${id}`, formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
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
  const onChangeFile = (e: { target: { files: any, } }) => {
    const image = e.target.files[0];
    setImage(image);
    let NameUrl = URL.createObjectURL(image);
    setPreview(NameUrl);
  }
  return (
    <div className="category">
      <form className="FormFields" onSubmit={handlefiels} action="">
        <h2 style={{ marginRight: "4rem" }}>Edit Category</h2>
        <label htmlFor="">
          Name:
          <input
            value={value.name}
            onChange={onChangeInput} name="name" type="text" />
        </label>
        <br />
        <label htmlFor="">
          Handle:
          <input
            value={value.handle}
            onChange={onChangeInput} name="handle" type="text" />
        </label>
        <br />
        <input onChange={onChangeFile} type="file" name="file" accept="image/*" multiple={false} />
        <button type="submit" className="createPost" >
          Submit
        </button>
        <Link to="/category">
          <button className="createBack">
            Back  
          </button>
        </Link>
        {preview ? (
          <figure>
            <img width={100} height={100} src={preview} alt="Preview Image" />
          </figure>
        ) :
        ""
        }
      </form>
    </div>
  )
}

export default Edit;