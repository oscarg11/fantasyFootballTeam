import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ""
    })
    //error object to hold our messages
    const [errors, setErrors] = useState(null)

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
        .catch((err) =>{
            console.log("BAD INPUT !!",err.response.data.message)
            setErrors(err.response.data.message)
        })
}
return (
    <div className='col-5'>
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        {errors && <p className='text-danger'>{errors}</p>}
        <div className='form-group mb-3'>
          {/* Email */}
          {errors?.email && (
            <p className='text-danger'>{errors.email.message}</p>
          )}
          <label className='form-label'>Email:</label>
          <input
            type='text'
            name='email'
            className='form-control'
            value={userInfo.email}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group mb-3'>
          {/* Password */}
          {errors?.password && (
            <p className='text-danger'>{errors.password.message}</p>
          )}
          <label className='form-label'>Password:</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={userInfo.password}
            onChange={changeHandler}
          />
        </div>

        <div className='form-group mt-3'>
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
        }
export default Login;