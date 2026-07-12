import axios from "axios";

const isProduction = window.location.hostname !== 'localhost';
const api = axios.create({
    baseURL: isProduction 
        ? "https://employee-portal-backend-fvjo.onrender.com/api" 
        : "http://localhost:4000/api",
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default api;