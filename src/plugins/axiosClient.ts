import axios from "axios";

const axiosData = axios.create({
    baseURL: 'http://localhost:3002/api'
})

export default axiosData