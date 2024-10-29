import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <a href={'/'}><img className='w-44 cursor-pointer' src={assets.logo} alt='' /></a>
            <ul className='hidden md:flex items-start font-medium gap-4'>
                <NavLink to={'/'}>
                    <li className='py-1 nav-link hover:text-primary'>HOME</li>
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className='py-1 nav-link hover:text-primary'>DOCTORS</li>
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1 nav-link hover:text-primary'>ABOUT</li>
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1 nav-link hover:text-primary'>CONTACT</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData ?
                        <div className='flex group relative gap-2 items-center cursor-pointer border rounded-full bg-gray-100 '>
                            <img className='w-9 rounded-full' src={userData.image} alt='' />
                            {/* <img className='w-3 me-2 rounded-full' src={assets.dropdown_icon} alt='' /> */}
                            <div className='absolute top-0 right-0 pt-14 text-base text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-gray-100 rounded flex flex-col'>
                                    <p onClick={() => navigate('/my_profile')} className='hover:bg-indigo-100 rounded hover:text-black p-1'>My Profile</p><hr />
                                    <p onClick={() => navigate('/my_appointment')} className='hover:bg-indigo-100 rounded hover:text-black p-1'>My Appointment</p><hr />
                                    <p onClick={logout} className='hover:bg-indigo-100 rounded hover:text-black p-1'>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={() => navigate('/login')} className='bg-primary text-white px-4 py-2 rounded-xl font-dark hidden md:block'>Create Account</button>
                }


                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col gap-2 mt-3 px-2 font-medium'>
                        <NavLink className='px-4 py-2 rounded text-sm inline-block hover:text-blue-300' onClick={() => setShowMenu(false)} to={'/'}>HOME</NavLink>
                        <NavLink className='px-4 py-2 rounded text-sm inline-block hover:text-blue-300' onClick={() => setShowMenu(false)} to={'/doctors'}>DOCTORS</NavLink>
                        <NavLink className='px-4 py-2 rounded text-sm inline-block hover:text-blue-300' onClick={() => setShowMenu(false)} to={'/about'}>ABOUT</NavLink>
                        <NavLink className='px-4 py-2 rounded text-sm inline-block hover:text-blue-300' onClick={() => setShowMenu(false)} to={'/contact'}>CONTACT</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
