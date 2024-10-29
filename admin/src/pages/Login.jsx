import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)


    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                    toast.success("Login Successfull")
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token);
                    console.log(data.token);
                    toast.success("Login Successfull")
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                error: error.message
            })
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-4 items-center m-auto items-start p-8 min-w-[340px] sm-min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'><span className='text-primary me-2'>{state === 'Admin' ? 'Admin' : 'Doctor'}</span>{state === 'Admin' ? 'Login' : 'Login'}</p>
                {
                    state === 'Doctor'
                        ? <div className='flex flex-col gap-4 w-full'>
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
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login <span className='text-primary cursor-pointer ms-1' onClick={() => setState('Doctor')}> Click here</span></p>
                        : <p>Admin Login <span className='text-primary cursor-pointer ms-1' onClick={() => setState('Admin')}> Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
