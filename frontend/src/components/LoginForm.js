import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login , error, loading } = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <div>
            <h2 className="login-h2">Login</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className="email">
            <label htmlFor="email">User Email:</label>
            <input
              type="text"
              id="email"
              placeholder="johndoe@example.com"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={loading} className="register">
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}