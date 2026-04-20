import express from "express"
import { createClient, getClient, updateClient } from "../controller/client.controller.js"

const clientRoutes = express.Router()

clientRoutes.post("/create", createClient)
clientRoutes.get("/get-clients", getClient)
clientRoutes.patch("/update/:ID", updateClient)






export default clientRoutes