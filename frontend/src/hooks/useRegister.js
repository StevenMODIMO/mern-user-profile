import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const { dispatch } = useAuth()

    const register = async(firstname, lastname, email, password) => {
        setLoading(null)
        setError(null)

        const response = await fetch('http://localhost:3001/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstname, lastname, email, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setLoading(false)
        }

        if(response.ok) {

            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json})

            setLoading(false)
        }
    }

    return { register, loading, error}
}