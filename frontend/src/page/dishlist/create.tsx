import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Create = {
  title: string,
  content: string,
  price: string,
  currency?: string,
  image?: string
}

function CreateDishList() {
  const [value, setValue] = useState<Create>({
    title: "",
    content: "",
    price: "",
  });
  const [image, setImage] = useState<string>("");
  const [previews,setPreViews] = useState<string>("");
  const navigator = useNavigate()
  const handleCreate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",image);
    formData.append("title",value.title);
    formData.append("content",value.content);
    formData.append("price",value.price);
    const result = await axios.post<Create>(
      "http://localhost:7777/dishlist/image",formData, 
      {
          headers: {"Content-Type": "multipart/form-data"},
      }
      )
      navigator('/dishlist');
      console.log(result)
  };
  const onChangInput = (e: { target: { name: string; value: string; }; }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  };
  const onChangInputFile = (e: { target: { files: any; }; }) => {
    const image = e.target.files[0];
     setImage(image);
     setPreViews(URL.createObjectURL(image))
  };
  const handlePageClick = () => {

  }
  return (
    <form className="createDish" onSubmit={handleCreate}>
      <div className="image">
        <img src="" alt="" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Title</label>
        <input onChange={onChangInput} name="title" style={{ width: "80%" }} type="text" className="form-control" id="formGroupExampleInput" placeholder="title..." />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Content</label>
        <textarea onChange={onChangInput} name="content" style={{ width: "80%" }} className="form-control" id="formGroupExampleInput2" placeholder="content..." />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Price</label>
        <input onChange={onChangInput} name="price" style={{ width: "80%" }} type="number" className="form-control" id="formGroupExampleInput2" placeholder="0.00" />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">File</label>
        <input onChange={onChangInputFile} name="file" style={{ width: "80%" }} type="file" className="form-control" id="formGroupExampleInput2"  />
      </div>
      {
        previews ? (
          <figure>
            <img src={previews} width={100} height={100} alt="" />
          </figure>
        ):
         ""
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

export default CreateDishList;