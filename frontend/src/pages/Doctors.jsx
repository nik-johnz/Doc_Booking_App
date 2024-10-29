import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext';

const Doctors = () => {

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const { speciality } = useParams();
  const { doctors, specialityData, dotSymbol } = useContext(AppContext);


  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) =>
        doc.speciality === speciality
      ))
    }
    else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
    console.log(speciality);
  }, [doctors, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 mb-10'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        {/* Left Side */}
        <div className={`flex flex-col text-sm text-gray-600 gap-3 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {
            specialityData.map((item, index) => (
              <p key={index}
                onClick={() => speciality === `${item.speciality}` ? navigate('/doctors') : navigate(`/doctors/${item.speciality}`)}
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:bg-indigo-100 cursor-pointer ${speciality === `${item.speciality}` ? "bg-indigo-100 text-black font-semibold" : " "}`}>
                {item.speciality}
              </p>
            ))
          }
        </div>
        {/* Right Side */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div key={index} onClick={() => navigate(`/appointments/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4 text-center'>
                  <p className={`${item.available ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>{dotSymbol} {item.available ? 'Available' : 'Not Available'}</p>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
