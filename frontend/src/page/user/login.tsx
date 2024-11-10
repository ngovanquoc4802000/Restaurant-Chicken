import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Loginface {
  Email: string,
  name: string,
  password: string,
  address?: string
}

function Login() {
  const [value, setValue] = useState<Loginface>({
    Email: "",
    name: "",
    password: "",
    address:""
  });
  const navigator = useNavigate();
  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setValue({
      Email: "",
      name: "",
      password: "",
      address:""
    })
  }
  const handleClick = () => {
    axios.post('http://localhost:7777/user', {
      Email: value.Email,
      name: value.name,
      password: value.password,
      address: value.address
    })
      .then(res => {
        setValue(res.data.data)
        navigator('/listLogin')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <section onSubmit={handleLogin} className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-bodyLogin p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i style={{marginTop:"2rem"}} className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">Email</label>
                          <input onChange={(e) => setValue({...value, Email: e.target.value})} type="email" id="form3Example1c" className="form-control" name="Email" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i style={{marginTop:"2rem"}} className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Name</label>
                          <input onChange={(e) => setValue({...value,name: e.target.value})} type="name" id="form3Example3c" className="form-control" name="name" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i style={{marginTop:"2rem"}} className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Password</label>
                          <input onChange={(e) => setValue({...value, password: e.target.value})} type="password" id="form3Example3c" className="form-control" name="password" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i style={{marginTop:"2rem"}} className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Address</label>
                          <input onChange={(e) => setValue({...value, address: e.target.value})} type="address" id="form3Example3c" className="form-control" name="address" />
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={handleClick} style={{ width: "100%", textDecoration: "none" }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Sign Up</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

export default Login;