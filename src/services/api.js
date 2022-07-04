import axios from "axios"

const api = axios.create({
  // baseURL: 'https://gsaudeapp.herokuapp.com/api'
  baseURL: 'http://192.168.40.105:5000/api'
})

export default api