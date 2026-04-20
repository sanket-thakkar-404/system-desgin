import app from "./src/app.js";
import http from "http"
import config from "./src/config/dotenv.config.js";



const server = http.createServer(app)



server.listen(config.PORT, () => {
  console.log("server is running in server port" , config.PORT)
})