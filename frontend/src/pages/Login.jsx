import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()


  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)

        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col gap-4 items-center m-auto items-start p-8 min-w-[340px] sm-min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {
          state === 'Sign Up'
            ? <div className='flex flex-col gap-4 w-full'>
              <div>
                <label htmlFor="name">Name :</label>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1' id='name' type="text"
                  onChange={(e) => setName(e.target.value)} value={name}
                  placeholder='Enter your name' required />
              </div>
              <div>
                <label htmlFor="mail">Email :</label>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1' id='mail' type="email"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                  placeholder='Enter your e-mail' required />
              </div>
              <div>
                <label htmlFor="pass">Password :</label>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1' id='pass' type="password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  placeholder='Enter your password' required />
              </div>
            </div>

            : <div className='flex flex-col gap-4 w-full'>
              <div>
                <label htmlFor="mail">Email :</label>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1' id='mail' type="email"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                  placeholder='Enter your e-mail' required />
              </div>
              <div>
                <label htmlFor="pass">Password :</label>
                <input
                  className='border border-zinc-300 rounded w-full p-2 mt-1' id='pass' type="password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  placeholder='Enter your password' required />
              </div>
            </div>
        }
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Register' : 'Login'}</button>
        {
          state === 'Sign Up'
            ? <p>Already have an account <span className='text-primary cursor-pointer' onClick={() => setState('Log In')}>Click here</span></p>
            : <p>Create an account <span className='text-primary cursor-pointer' onClick={() => setState('Sign Up')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
