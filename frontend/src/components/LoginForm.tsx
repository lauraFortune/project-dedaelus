
import { useState } from "react"
import userService from '../services/users'

type LoginFormProps = {
    setUser: (user: {token: string, email: string, userId: string}) => void
}

const LoginForm = ({setUser}: LoginFormProps) => {
    // create state for email and password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // create handlesubmit function
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()  // prevents page refresh on form submit
        console.log('Login attempted: ', { email, password })

        try {
            const userData = await userService.login(email, password)
            setUser(userData)   // Updates parent state
            console.log('Login successful!', userData)
            // TODO: Store token and update app state 
        } catch (error) {
            console.error('Login failed:', error)
        }

    }
    // return jsx with form, two inputs, and submit button
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm

