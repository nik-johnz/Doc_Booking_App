import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DocAppointment = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { currencySymbol, calcAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      {
        appointments.length === 0 ? <p className='mt-5 text-center'>No appointments available.</p> :
          <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
            <div className='hidden sm:grid grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_2fr] grid-flow-col py-4 px-6 border-b bg-gray-500 text-white' >
              <p className='text-center'>#</p>
              <p className='text-center'>Patient</p>
              <p className='text-center'>Age</p>
              <p className='text-center'>Date & Time</p>
              <p className='text-center'>Fees</p>
              <p className='text-center'>Payment</p>
              <p className='text-center'>Actions</p>
            </div>
            {
              appointments.reverse().map((item, index) => (
                <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_2fr] items-center text-gray-500 py-4 px-6 border border-b hover:bg-gray-50 cursor-pointer '>
                  <p className='max-sm:hidden text-center text-xs'>{index + 1}</p>
                  <div className='flex items-center gap-2 justify-center'>
                    {/* <img className='w-8 rounded-full' src={item.userData.image} alt="" /> */}
                    <p className='text-xs'>{item.userData.name}</p>
                  </div>
                  <p className='max-sm:hidden text-center text-xs'>{calcAge(item.userData.dob)}</p>
                  <p className='text-center text-xs'>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
                  <p className='max-sm:hidden text-center text-xs'>{currencySymbol}{item.amount}</p>
                  <div>
                    {
                      item.payment ?
                        <p className='text-center text-xs text-blue-400 px-2 border border-gray-400 rounded-full py-2'>Online</p>
                        :
                        <p className='text-center text-xs text-blue-700 px-2 border border-gray-400 rounded-full py-2'>Cash</p>
                    }
                  </div>
                  {
                    item.cancelled ?
                      <p className='text-center text-red-400'>Cancelled</p>
                      : item.isCompleted ?
                        <p className='text-center text-green-400'>Completed</p>
                        :
                        <div className='flex gap-2 items-center justify-center'>
                          <img className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                          <img className='w-10 cursor-pointer' onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="" />
                        </div>
                  }
                </div>
              ))
            }
          </div>
      }
    </div>
  )
}

export default DocAppointment
