'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // LocalStorage'dan oturum kontrolü
        const authData = localStorage.getItem('adminAuth')
        if (authData) {
            try {
                const parsed = JSON.parse(authData)
                setIsAuthenticated(true)
                setUser(parsed)
            } catch (e) {
                localStorage.removeItem('adminAuth')
            }
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (data.success) {
                localStorage.setItem('adminAuth', JSON.stringify(data.user))
                setIsAuthenticated(true)
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.error }
            }
        } catch (error) {
            return { success: false, error: 'Bağlantı hatası' }
        }
    }

    const logout = () => {
        localStorage.removeItem('adminAuth')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
