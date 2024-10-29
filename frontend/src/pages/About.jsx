import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='mb-10'>
      <div className='text-center text-2xl text-gray-500 pt-10'>
        <p>ABOUT <span className='font-medium text-gray-700'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 my-10 items-center justify-center'>
        <img className='w-full md:max-w-[360px] rounded' src={assets.about_image} alt="" />
        <div className='flex flex-col gap-6 justify text-justify md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p className='text-gray-800 font-bold'>Our Vision</p>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-4 text-center py-12'>
        <p className='text-gray-500'>WHY<span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb:20 gap-8'>
        <div className='border border-gray-300 text-center px-10 py-5 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-200 duration-300 transition-all text-gray-600 rounded-xl shadow-xl cursor-pointer'>
          <b>EFFICIENCY</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-gray-300 text-center px-10 py-5 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-200 duration-300 transition-all text-gray-600 rounded-xl shadow-xl cursor-pointer'>
          <b>CONVENIENCE</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-gray-300 text-center px-10 py-5 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-200 duration-300 transition-all text-gray-600 rounded-xl shadow-xl cursor-pointer'>
          <b>PERSONALIZATION</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
