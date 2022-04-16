import axios from 'axios'
// grab info in supplied token (npm install jwt-decode)
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthProvider'

// TODO: parse into .env
const baseURL = 'http://127.0.0.1:8000'

// where the token will be "saved as" in local storage
const tokenName = 'authToken'

// 'AUTH_HEADER_TYPES' specified in settings.py in Django
const headerName = 'Bearer'

// API: token endpoints
const refreshURL = "/api/token/refresh/"
const tokenLoginURL = "/api/token/"

const getLocalToken = () => {
    return localStorage.getItem(tokenName) ? JSON.parse(localStorage.getItem(tokenName)) : null
}

const getLoginToken = async (formData) => {
    try{
        const axiosInstance = axios.create({baseURL});
        const response = await axiosInstance.post(tokenLoginURL, formData)
        if (response.data){
            localStorage.setItem(tokenName, JSON.stringify(response.data))
        }
        return response.data
    }catch(err){
        console.log("login error", err)
        return null
    }
}

const clearToken = () => localStorage.removeItem(tokenName)


// custom hook
const useAxios = () => {
    const { token, setToken } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `${headerName} ${token?.access}` }
    });

    // Refresh token if it has expired before sending request
    axiosInstance.interceptors.request.use(async req => {

        // jwt_decode is a non-depreciated version of atob()
        const decodedJWT = jwt_decode(token.access)

        // dayjs has data comparison functionality based on "exp" supplied in token
        const isExpired = dayjs.unix(decodedJWT.exp).diff(dayjs()) < 1;

        if (!isExpired) return req

        const response = await axios.post(`${baseURL}${refreshURL}`, {
            refresh: token.refresh
        });

        localStorage.setItem(tokenName, JSON.stringify(response.data))

        setToken(response.data)

        req.headers.Authorization = `${headerName} ${response.data.access}`
        return req
    })

    return axiosInstance
}

export { useAxios, getLocalToken, getLoginToken, clearToken };