import axios from "axios"

const api = axios.create({
  baseURL: 'http://{ip_local}:{porta}/api'
  // baseURL: 'https://gsaudeapp.herokuapp.com/api'
})

export default api