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
    //error object to hold our messages
    const [errors, setErrors] = useState(null)


    const changeHandler = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register',userInfo, {withCredentials: true})
            .then(res => {
                console.log(res, "Registration succesful!")
                navigate('/dashboard')
            })
            .catch((err) =>{
                console.log("BAD INPUT !!",err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }
  return (
    <div className='col-5 offset-1'>
       <form  onSubmit={submitHandler}>
            <h3 className='text-center'>Register</h3>
            <div className='form-group mb-3'>
                {/* First Name */}
                {
                    errors?.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ""
                }
                <label className='form-label'>First Name:</label>
                <input type="text" name='firstName' className='form-control' value={userInfo.firstName} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                {/* Last Name */}
                {
                    errors?.lastName ? <p className="text-danger">{errors.lastName.message}</p> : ""
                }
                <label className='form-label'>Last Name:</label>
                <input type="text" name='lastName' className='form-control' value={userInfo.lastName} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                {/* Email */}
                {
                    errors?.email ? <p className="text-danger">{errors.email.message}</p> : ""
                }
                <label className='form-label'>Email:</label>
                <input type="text"  name='email' className='form-control' value={userInfo.email} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                {/* Password */}
                {
                    errors?.password ? <p className="text-danger">{errors.password.message}</p> : ""
                }
                <label className='form-label'>Password:</label>
                <input type="password"  name='password' className='form-control' value={userInfo.password} onChange={changeHandler}/>
            </div>
            <div className='form-group mb-3'>
                {/* Password */}
                {
                    errors?.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : ""
                }
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