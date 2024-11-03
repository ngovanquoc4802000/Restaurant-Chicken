import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Form {
  name: string,
  handle: string
  email: string,
  address: string
}

function Edit() {
  const [values, setValues] = useState({
    name: "",
    handle: "",
    email: "",
    address: ""
  })
  const {category_id} = useParams();
  useEffect(() => {
    axios.get('http://localhost:7777/category/' + category_id)
      .then(res => {
        console.log(res.data)
        setValues({
          ...values,
          name: res.data,
          handle: res.data.data,
          email: res.data.data,
          address: res.data.data,

        })
      })
      .catch(error => console.log(error))
  }, []);
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post('http://localhost:7777/category/' + category_id, {
      name: values.name,
      handle: values.handle,
      email: values.email,
      address: values.address
    })
      .then(res => {
        setValues({
          ...values
          , name: res.data.name, handle: res.data.handle, email: res.data.email, address: res.data.address
        })
      })
      .catch(error => console.log(error))
  }
  return (
    <div className="d-flex w-100 vh-50 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit} >
          <div className="">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Handle</label>
            <input onChange={(e) => setValues({ ...values, handle: e.target.value })} value={values.handle} type="text" name="handle" className="form-control" placeholder="Enter Handle" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input onChange={(e) => setValues({ ...values, email: e.target.value })} value={values.email} type="text" name="email" className="form-control" placeholder="Enter Handle" />
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input onChange={(e) => setValues({ ...values, address: e.target.value })} value={values.address} type="text" name="address" className="form-control" placeholder="Enter Handle" />
          </div>
          <Link to="/create">
            <button>Submit</button>
          </Link>
          <button>Back</button>
        </form>
      </div>

    </div>
  );
}

export default Edit;