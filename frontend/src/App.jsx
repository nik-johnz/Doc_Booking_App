import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Login from './pages/Login'
import Contacts from './pages/Contacts'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contacts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my_profile' element={<MyProfile />} />
        <Route path='/my_appointment' element={<MyAppointments />} />
        <Route path='/appointments/:docId' element={<Appointments />} />
      </Routes>
    </div>
  )
}

export default App
