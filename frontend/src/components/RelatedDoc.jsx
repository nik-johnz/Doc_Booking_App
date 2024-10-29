import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoc = ({ speciality, docId }) => {

  const { doctors, dotSymbol } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id != docId)
      setRelDoc(doctorsData)
    }
  }, [docId, speciality, doctors])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm font-medium'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-10 gap-y-6 px-3 sm:px-0'>
        {
          relDoc.slice(0, 5).map((item, index) => (
            <div key={index} onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0); }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4 text-center'>
                <p className='text-green-500 text-sm font-medium'>{dotSymbol}Available</p>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
      <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-blue-100 font-medium text-gray-600 px-12 rounded-full mt-10 py-3'>More</button>
    </div>
  )
}

export default RelatedDoc
