import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import {toast } from 'react-toastify'
import {register, reset} from '../features/auth/authSlics'
import Spinner from '../Components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2:''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const {name, email, password, password2} = formData

    useEffect(() => {
      if(isError){
        toast.error(message)
      }

      if(isSuccess || user){
        navigate("/")
      }

      dispatch(reset())
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    if(isLoading){
      return <Spinner />
    }

    const onChange = (e) => {
        setFormData((a) => ({
            ...a,
            [e.target.name] : e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(password != password2){
          toast.error('Passwords did not match')
        }else {
          const userData = {
            name, email, password
          }
          // UserData which is being dispatched here with be passed to the register function in authSlice [createAsyncThunk] global state  
          dispatch(register(userData))
        }
    }

    return (
        <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
    )
}

export default Register
