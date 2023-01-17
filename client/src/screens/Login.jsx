import React, { useEffect } from 'react'
import { useState } from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../action/userAction';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {

  // navbar toggle
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [loading , setLoading]= useState(false)

  const dispatch = useDispatch();

 const userLogin = useSelector((state)=> state.userLogin)
console.log(userLogin)
 const {loading, error, userInfo} = userLogin;

 useEffect(() => {
  if (userInfo) {
    navigate("/mynotes");
  }
}, [navigate, userInfo]);

  const loginUser = async(event)=>{
    event.preventDefault()
    dispatch(login(email, password))
    // setLoading(true)
    // const res = await fetch("/login", {
      
    //   method: "POST",
    //   headers: {
    //     "content-Type": "application/json"

    //   },
      
    //   body: JSON.stringify({
    //      email,  password
    //   })
    
    
    // })
    
    // const fdata =  res.json();
    // setLoading(false)
    
    // if (res.status === 400 || !fdata) {
    //   window.alert('invalid login')
    //   console.log("invalid login")
     

    // } else {
    //   window.alert(' login success')
    
    // }
    
    

  }
 
  return (
    <>
      <section className="h-100 gradient-form" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{width: "185px"}}/>
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>

                <form method="post" onSubmit={loginUser}>
                  <p>Please login to your account</p>
                  

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control"
                      placeholder="Phone number or email address" value={email}  onChange={(e)=>
                        setEmail(e.target.value)
                      }/> 
                    <label className="form-label" for="form2Example11">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" value={password} onChange={(e)=>
                      setPassword(e.target.value)
                    }/> 
                    <label className="form-label" for="form2Example22">Password</label>
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" value='login' type="submit">Log
                      in</button>
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="submit" className="btn btn-outline-danger">Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

export default Login