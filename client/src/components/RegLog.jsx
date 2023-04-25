import React from 'react'
import RegisterForm from './RegisterForm'
import Login from './Login'


const RegLog = ({currentUser, setCurrentUser}) => {
  return (
    <div>
        <div className='row'>
            <RegisterForm currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
            <Login currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>
        </div>
    </div>
  )
}

export default RegLog