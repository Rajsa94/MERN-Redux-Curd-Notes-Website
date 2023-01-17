import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../action/userAction';



const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()
  const userRegister = useSelector((state)=> state.userRegister)
  const {loading, error, userInfo} = userRegister;
  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);


  const PostData = async (event) => {
    event.preventDefault()
    dispatch(register(name,email,password))
    // const { name, email,  password,  } = data;
    
    // const res = await fetch("/register", {
    //   method: "POST",
    //   headers: {
    //     "content-Type": "application/json"

    //   },
    //   body: JSON.stringify({
    //     name, email,  password, 
    //   })
      

    // })
    // const fdata =  res.json();
    // console.log(fdata)
    
    // if (res.status === 422 || !fdata) {
    //   window.alert('invalid registration')
    //   console.log("invalid registration")
     

    // } else {
    //   window.alert(' registration success')
    //   console.log(" registration success")
      
        
    //     navigate("/login")
      
    // }

    }
    return (
      <>
        <section className="h-100 bg-dark">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                        alt="Sample photo" className="img-fluid"
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                      {loading && <Loading />}
                        <h3 className="mb-5 text-uppercase">Student registration form</h3>
                        <form onSubmit={PostData} className="register-form" method='POST'>

                          <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                <input type="text" id="form3Example1m" className="form-control form-control-lg" name='name' value={name} onChange={(e)=>
                        setName(e.target.value)
                      } />
                                <label className="form-label" for="form3Example1m"> name</label>
                              </div>
                            </div>

                          </div>







                          <div className="form-outline mb-4">
                            <input type="text" id="form3Example97" className="form-control form-control-lg" name='email' value={email} onChange={(e)=>
                        setEmail(e.target.value)
                      } />
                            <label className="form-label" for="form3Example97">Email ID</label>
                          </div>


                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4c" className="form-control" name='password' value={password} onChange={(e)=>
                        setPassword(e.target.value)
                      } />
                              <label className="form-label" for="form3Example4c">Password</label>
                            </div>
                          </div>


                          <div className="d-flex justify-content-end pt-3">
                            <button type="button" className="btn btn-light btn-lg">Reset all</button>
                            <button type="submit" name='signup' value="register" className="btn btn-warning btn-lg ms-2" >Submit form</button>

                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  export default Registration