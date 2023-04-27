import React from 'react'
import RegisterForm from './RegisterForm'
import Login from './Login'


const RegLog = ({currentUser, setCurrentUser}) => {
  return (
    
    <div>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark mb-3">
      <div className="container">
            <h1 className='text-white'>Fantasy Soccer Team</h1>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
        <div className='row'>
            <RegisterForm currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
            <Login currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
        </div>
    </div>
  )
}

export default RegLog