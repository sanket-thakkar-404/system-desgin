import app from "./src/app.js";
import http from "http"



const server = http.createServer(app)
const PORT = 4000




server.listen(PORT, () => {
  console.log("server is running in server port" , PORT)
})