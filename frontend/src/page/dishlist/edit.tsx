import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type EditFace = {
  id?: number
  title: string,
  content: string,
  price: string,
  currency: string,
  image?: string
}

function EditDishList() {
  const [values, setValues] = useState<EditFace>({
    title: "",
    content: "",
    currency: "",
    price: "",
  });
  const [image, setImage] = useState<string>("");
  const [previews, setPreViews] = useState<string>("");
  const { id } = useParams();
  const navigator = useNavigate();

  const EditDish = () => {
    axios.get(`http://localhost:7777/dishlist/${id}`)
      .then(res => {
        setValues(res.data.data)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    EditDish();
  }, [])
  const handleCreate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("price", values.price);
    formData.append("file", image);
    const result = await axios.put<EditFace>(
      `http://localhost:7777/dishlist/${id}`, formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    navigator('/dishlist');
    console.log(result)
  };
  const onChangInput = (e: { target: { name: string; value: string; }; }) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  };
  const onChangInputFile = (e: { target: { files: any; }; }) => {
    const image = e.target.files[0];
    setImage(image);
    setPreViews(URL.createObjectURL(image))
  };
  return (
    <form className="createDish" onSubmit={handleCreate}>
      <div className="form-group">
        <label>Title</label>
        <input
          value={values.title}
          onChange={onChangInput}
          name="title"
          style={{ width: "80%" }} 
          type="text" className="form-control"
           placeholder="title..." />
      </div>
      <div className="form-group">
        <label >Content</label>
        <textarea
          value={values.content}
          onChange={onChangInput}
          name="content"
          style={{ width: "80%" }}
          className="form-control" placeholder="content..." />
      </div>
      <div className="form-group">
        <label >Price</label>
        <input
          value={values.price}
          onChange={onChangInput} name="price"
          style={{ width: "80%" }}
          type="number" className="form-control" placeholder="0.00" />
      </div>
      <div className="form-group">
        <label >File</label>
        <input onChange={onChangInputFile} name="file" style={{ width: "80%" }} type="file" className="form-control" />
      </div>
      {
        previews ? (
          <figure>
            <img src={previews} width={100} height={100} alt="" />
          </figure>
        ) : (
          ""
        )
      }
      <div className="buttonFooter">
        <button type="submit">Submit</button>
        <Link to="/dishlist">
          <button>Back to</button>
        </Link>
      </div>
    </form>
  );
}

export default EditDishList;