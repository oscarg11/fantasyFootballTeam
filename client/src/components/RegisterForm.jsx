import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

const changeHandler = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
}

const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/users/register',userInfo, {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch(err => console.log(err))
}
  return (
    <div className='col-5 offset-1'>
       <form  onSubmit={submitHandler}>
            <h3 className='text-center'>Register</h3>
            <div className='form-group mb-3'>
                <label className='form-label'>First Name:</label>
                <input type="text" name='firstName' className='form-control' value={userInfo.firstName} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Last Name:</label>
                <input type="text" name='lastName' className='form-control' value={userInfo.lastName} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Email:</label>
                <input type="text"  name='email' className='form-control' value={userInfo.email} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Password:</label>
                <input type="password"  name='password' className='form-control' value={userInfo.password} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Confirm Password:</label>
                <input type="password" name='confirmPassword' className='form-control' value={userInfo.confirmPassword} onChange={changeHandler}/>
            </div>

            <div className='form-group mt-3'>
                <button type='submit' className='btn btn-primary'>Register</button>
            </div>

       </form>
    </div>
  )
}

export default RegisterForm