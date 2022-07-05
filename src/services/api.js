import axios from "axios"

const api = axios.create({
  baseURL: 'http://192.168.100.166/api'
  // baseURL: 'https://gsaudeapp.herokuapp.com/api'
})

export default api