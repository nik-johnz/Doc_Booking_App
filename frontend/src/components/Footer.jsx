import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className='md:mx-10 border-t'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-10 my-10 text-sm'>
        {/* Left Side */}
        <div>
          <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6 text-xs text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* Middle */}
        <div>
          <h1 className='font-medium text-xl mb-5'>COMPANY</h1>
          <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
            <li onClick={() => { navigate(`/`); scrollTo(0, 0); }}>Home</li>
            <li onClick={() => { navigate(`/about`); scrollTo(0, 0); }}>About Us</li>
            <li onClick={() => { navigate(`/contact`); scrollTo(0, 0); }}>Contact Us</li>
            <li onClick={() => { navigate(`/privacy`); scrollTo(0, 0); }}>Privacy Policy</li>
          </ul>
        </div>
        {/* Right Side */}
        <div>
          <h1 className='font-medium text-xl mb-5'>GET IN TOUCH</h1>
          <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
            <li>+968 423641362</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div>
        <hr />
        <p className='text-center py-5 text-sm'>Copyright 2024 @ Nikhil John - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
