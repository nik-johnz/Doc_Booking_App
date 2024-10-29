import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const getUserAppointments = async () => {
    setLoading(true);  // Start loading
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('/')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        console.log(appointmentId);
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my_appointment')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentPaypal = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })

      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b text-lg'>My Appointments</p>

      {loading && <p>Loading appointments...</p>}

      <div>
        {
          appointments.length === 0 && !loading && <p className='mt-5 text-center'>No appointments available.</p>
        }
        {

          appointments.map((item) => (
            <div key={item._id} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b mt-10'>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image || ""} alt={item.docData.name || 'Doctor'} />
              </div>
              <div className='flex-1 text-sm text-zinc-600 '>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>
                  {slotDateFormat(item.slotDate)} || {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-4 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted &&
                  <button onClick={() => appointmentPaypal(item._id)} className='text-sm text-center sm:min-w-48 py-2 border border-blue-500 rounded-lg  bg-blue-500 text-white transition-all duration-500'>
                    Paid
                  </button>
                }
                {!item.cancelled && !item.payment && !item.isCompleted &&
                  <button onClick={() => appointmentPaypal(item._id)} className='text-sm text-center sm:min-w-48 py-2 border border-blue-500 rounded-lg  hover:bg-blue-500 hover:text-white text-blue-500 transition-all duration-500'>
                    Pay Online
                  </button>
                }
                {item.cancelled && !item.isCompleted &&
                  <button disabled className='text-sm text-center sm:min-w-48 py-2 border rounded-lg bg-red-500 text-white transition-all duration-500'>
                    Appointment Cancelled
                  </button>
                }
                {!item.cancelled && !item.isCompleted &&
                  <button onClick={() => cancelAppointment(item._id)} className='text-sm text-center sm:min-w-48 py-2 border border border-red-500 rounded-lg hover:bg-red-500 hover:text-white text-red-500 transition-all duration-500'>
                    Cancel Appointment
                  </button>
                }
                {item.isCompleted &&
                  <button className='text-sm text-center sm:min-w-48 py-2 border rounded-lg bg-green-500 text-white transition-all duration-500'>Completed</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments;
