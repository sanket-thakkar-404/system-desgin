import axios from "axios";



const api = axios.create({
  baseURL: "https://system-desgin-q41f.onrender.com/api",
  withCredentials: true
})



export default api