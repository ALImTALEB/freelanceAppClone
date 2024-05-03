import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://freelance-app-clone.vercel.app/api/",
    withCredentials: true
})

export default newRequest