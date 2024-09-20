import axios from 'axios'

// import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

export default service
