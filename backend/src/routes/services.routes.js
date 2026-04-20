import express from "express"
import { assignClientService, createService, getServices } from "../controller/service.controller.js"

const serviceRoutes = express.Router()

serviceRoutes.post("/create", createService)
serviceRoutes.get("/get-services", getServices)
serviceRoutes.post("/assign", assignClientService)


export default serviceRoutes