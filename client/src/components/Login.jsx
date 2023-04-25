import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ""
    })

const changeHandler = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
}

const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/users/login', userInfo, {withCredentials: true})
        .then (res => {
            console.log(res)
            setCurrentUser(res.data.user)
            navigate('/dashboard')
        })
        .catch(err => console.log(err))
}
  return (
    <div className='col-5'>
        <form onSubmit={submitHandler}>
            <h2>Login</h2>
            <div className='form-group mb-3'>
                <label className='form-label'>Email:</label>
                <input type="text"  name='email' className='form-control' value={userInfo.email} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Password:</label>
                <input type="password"  name='password' className='form-control' value={userInfo.password} onChange={changeHandler}/>
            </div>

            <div className='form-group mt-3'>
                <button type='submit' className='btn btn-primary'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login