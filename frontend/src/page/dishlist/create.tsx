import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Create = {
  title: string,
  content: string,
  price: string,
}

function CreateDishList() {
  const [value, setValue] = useState<Create>({
    title: "",
    content: "",
    price: "",
  });
  const navigator = useNavigate()
  const handleCreate = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }
  const handleCreateDish = () => {
    axios.post('http://localhost:7777/dishlist', {
      title: value.title,
      content: value.content,
      price: value.price,
    })
      .then((res) => {
        console.log(res.data)
        setValue(res.data.data);
        navigator('/dishlist')
      })
      .catch(error => {
        console.log(error)
      })
  }
  const onChangInput = (e: { target: { name: any; value: any; }; }) => {
    setValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  return (
    <form className="createDish" onSubmit={handleCreate}>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Title</label>
        <input onChange={onChangInput} name="title" style={{ width: "80%" }} type="text" className="form-control" id="formGroupExampleInput" placeholder="title..." />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Content</label>
        <textarea onChange={onChangInput} name="content" style={{ width: "80%" }} className="form-control" id="formGroupExampleInput2" placeholder="content..." />
      </div>
      <form method="POST" encType="multipart/form-data">
         <input type="file" name="image"  />
      </form>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Price</label>
        <input onChange={onChangInput} name="price" style={{ width: "80%" }} type="text" className="form-control" id="formGroupExampleInput2" placeholder="0.00" />
      </div>
      <div className="buttonFooter">
        <Link to="/dishlist">
          <button onClick={handleCreateDish}>Submit</button>
          <button>Back to</button>
        </Link>
      </div>
    </form>
  );
}

export default CreateDishList;