import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const NavBar = () => {
    const navigate = useNavigate();
    //logout functionality
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/')})
            .catch(err => console.log(err))
    }
  return (
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
            <h1>Fantasy Soccer Team</h1>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="btn btn-primary m-2" aria-current="page" to="/dashboard">Dashboard</Link>
            </li>
            <li>
            <button className='btn btn-danger m-2' onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar