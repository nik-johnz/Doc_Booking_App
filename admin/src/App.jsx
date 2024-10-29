import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import Appointment from './pages/Admin/Appointment'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext'
import DocDashboard from './pages/Doctor/DocDashboard'
import DocAppointment from './pages/Doctor/DocAppointment'
import DocProfile from './pages/Doctor/DocProfile'


const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-stone-100'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<Appointment />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />

          {/* Doctor Routes */}
          <Route path='/doc-dashboard' element={<DocDashboard />} />
          <Route path='/doc-appointments' element={<DocAppointment />} />
          <Route path='/doc-profile' element={<DocProfile />} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
