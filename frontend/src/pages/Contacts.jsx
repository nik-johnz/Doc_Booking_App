import React from 'react'
import { assets } from '../assets/assets'

const Contacts = () => {
  return (
    <div>
      <div className='text-center text-2xl text-gray-500 pt-10'>
        <p>CONTACT <span className='font-medium text-gray-700'>US</span></p>
      </div>
      <div className='flex flex-col justify-center items-center md:flex-row gap-16 my-10 mb-28'>
        <img className='w-full md:w-[360px] rounded' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-6 justify-center items-center text-gray-500 text-sm'>
          <p className='font-semibold text-black text-lg'>OUR OFFICE</p>
          <p className='text-center'>19845 Rovak Station <br />Bullsei 569, Chovasiya, Ulkaraj</p>
          <p className='text-center'>Tel: <span>(658) 235-5633</span><br />Email: <a href="">prescripto@gmail.com</a></p>
          <p className='font-bold text-black text-lg'>CAREERS AT PRESCRIPTO</p>
          <p className='text-center'>Learn more about our teams and job openings.</p>
          <button className='py-4 px-4 border border-black text-black font-medium rounded hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contacts
