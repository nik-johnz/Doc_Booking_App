import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets.js'

const Appointment = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { currencySymbol, calcAge, slotDateFormat } = useContext(AppContext)


  useEffect(() => {
    getAllAppointments()
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      {
        appointments.length === 0 ? <p className='mt-5 text-center'>No appointments available.</p> :
          <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
            <div className='hidden sm:grid grid grid-cols-[0.5fr_3fr_0.5fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b bg-gray-500 text-white' >
              <p className='text-center'>#</p>
              <p className='text-center'>Patient</p>
              <p className='text-center'>Age</p>
              <p className='text-center'>Date & Time</p>
              <p className='text-center'>Doctor</p>
              <p className='text-center'>Fees</p>
              <p className='text-center'>Actions</p>
            </div>
            {
              appointments.map((item, index) => (
                <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_0.5fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-4 px-6 border-b hover:bg-gray-100 cursor-pointer '>
                  <p className='max-sm:hidden text-center text-xs'>{index + 1}</p>
                  <div className='flex items-center gap-2 justify-center'>
                    {/* <img className='w-8 rounded-full' src={item.userData.image} alt="" /> */}
                    <p className='text-xs'>{item.userData.name}</p>
                  </div>
                  <p className='max-sm:hidden text-center text-xs'>{calcAge(item.userData.dob)}</p>
                  <p className='text-center text-xs'>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
                  <div className='flex items-center gap-2 justify-center'>
                    {/* <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> */}
                    <p className='text-xs'>{item.docData.name}</p>
                  </div>
                  <p className='text-center text-xs'>{currencySymbol}{item.docData.fees}</p>
                  {
                    item.cancelled ?
                      <button className='text-center= font-medium text-xs rounded text-red-500 py-1 p-1 px-2'>Cancelled</button>
                      : item.isCompleted ?
                        <button className='text-center= font-medium text-xs rounded text-green-500 py-1 p-1 px-2'>Completed</button>
                        : <button onClick={() => cancelAppointment(item._id)} className='text-center font-medium bg-red-500 text-xs rounded text-white py-1 p-1 px-2'>Cancel</button>
                  }
                </div>
              ))
            }
          </div>
      }
    </div>
  )
}

export default Appointment
