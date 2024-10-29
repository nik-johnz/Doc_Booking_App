import express from "express";
import { appointmentCancel, appointmentComplete, appointmentsDoctor, docDashboard, docProfile, doctorList, loginDoctor, updateDocProfile } from "../controllers/docController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, docDashboard)
doctorRouter.get('/profile', authDoctor, docProfile)
doctorRouter.post('/update-profile', authDoctor, updateDocProfile)

export default doctorRouter