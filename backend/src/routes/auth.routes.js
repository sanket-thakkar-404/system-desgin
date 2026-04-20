import express from 'express'
import { getMeController, loginController, signupController } from "../controller/auth.controller.js"
import { validate } from '../middleware/validate.js'
import { loginSchema, signupSchema } from '../validator/auth.validator.js'

const authRoutes = express.Router()

// auth
authRoutes.post("/signup", validate(signupSchema), signupController)
authRoutes.post("/login", validate(loginSchema), loginController)
authRoutes.get("/get-me", getMeController)


export default authRoutes
