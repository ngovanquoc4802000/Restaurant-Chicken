import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type RegisterFace = {
  Email: string
  name: string
  password: string
  address: string
}
function Register() {
  const [value, setValue] = useState<RegisterFace>({
    Email: "",
    name: "",
    password: "",
    address: ""
  });
  const navigator = useNavigate()
  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

  }
  const handlePostRegister = () => {
    axios.post('http://localhost:7777/user', {
      Email: value.Email,
      name: value.name,
      password: value.password,
      address: value.address
    })
    .then(res => {
      setValue(res.data.data);
      navigator('/login')
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <section onSubmit={handleRegister} className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div style={{ display: "block" }} className="card rounded-3">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                className="w-100" style={{ borderTopLeftRadius: "3rem", borderTopRightRadius: "3rem" }}
                alt="Sample photo" />
              <div className="card-bodyUser p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2" style={{ textAlign: "center" }}>Registration</h3>
                <form className="px-md-2">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1q">Email</label>
                    <input onChange={(e) => setValue({...value, Email: e.target.value})} name="email" type="Email" id="form3Example1q" className="form-control" />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1q">Name</label>
                    <input onChange={(e) => setValue({...value, name: e.target.value})} name="name" type="text" id="form3Example1q" className="form-control" />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1q">Address</label>
                    <input onChange={(e) => setValue({...value, address: e.target.value  })} name="address" type="text" id="form3Example1q" className="form-control" />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1q">Password</label>
                    <input onChange={(e) => setValue({...value, password: e.target.value})}  name="password" type="password" id="form3Example1q" className="form-control" />
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1q">Repeat your Password</label>
                    <input onChange={(e) => setValue({...value, password: e.target.value})} name="password" type="password" id="form3Example1q" className="form-control" />
                  </div>
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label className="form-check-label" htmlFor="form2Example3g">
                      I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                    </label>
                  </div>
                 {/*  <Link to='/login'> */}
                    <div className="d-flex justify-content-center">
                      <button onClick={handlePostRegister} style={{ width: "100%" }} type="button" data-mdb-button-init
                        data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>
                  {/* </Link> */}
                  <p className="text-center text-muted mt-5 mb-0">Have already an account?
                    <Link className="fw-bold text-body" to="/login">
                      <u>Login here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

export default Register;