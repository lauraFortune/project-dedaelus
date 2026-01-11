
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseUrl}/login`, { email, password })
    return response.data
}

export default { login }