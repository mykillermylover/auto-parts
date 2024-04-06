import axios from "axios";

const HttpClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        userlogin: '',
        userpsw: ''
    }
});

export default HttpClient;
