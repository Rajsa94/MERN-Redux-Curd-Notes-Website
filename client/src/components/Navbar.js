import React, { useEffect } from 'react'
import '../App.css';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../action/userAction';

const Navbar = ({setSearch}) => {


    const navigate = useNavigate()
    



    

 
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout())
        navigate("/")
        
      };

 
    
  
    useEffect(() => {
        
        
    }, [userInfo,navigate]);



    return <>
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to= '/mynotes'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page"  to= '/login'>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page"  to= '/'>Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page"  to= '/createnotes'>Create Notes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" onClick={logoutHandler}>Logout</NavLink>
                        </li>
                        
                        
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={(e)=> setSearch(e.target.value)} />
                        <button className="btn btn-outline-success" type="click">Search</button>
                    </form>
                </div>
            </div>
        </nav>

       
    </>

}

export default Navbar