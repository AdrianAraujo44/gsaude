import axios from "axios"

const api = axios.create({
  baseURL: 'https://gsaudeapp.herokuapp.com/api'
})

export default api