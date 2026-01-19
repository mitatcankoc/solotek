'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const result = await login(email, password)

        if (result.success) {
            router.push('/admin')
        } else {
            setError(result.error || 'Giriş başarısız!')
        }
        setLoading(false)
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration - Hidden on mobile */}
            <div className="bg-decoration" style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '70%',
                height: '150%',
                background: 'radial-gradient(circle, rgba(33, 187, 159, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }}></div>
            <div className="bg-decoration" style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '50%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(33, 187, 159, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
            }}></div>

            {/* Left Side - Branding */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px',
                position: 'relative'
            }} className="login-brand-section">
                <div style={{ maxWidth: '480px', textAlign: 'center' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: '#fff',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 40px',
                        boxShadow: '0 20px 60px rgba(33, 187, 159, 0.3)'
                    }}>
                        <img
                            src="/assets/img/site_logo-Photoroom.png"
                            alt="Solo Teknoloji"
                            style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                        />
                    </div>
                    <h1 style={{
                        color: '#fff',
                        fontSize: '42px',
                        fontWeight: '800',
                        marginBottom: '16px',
                        letterSpacing: '-1px'
                    }}>
                        Solo Teknoloji
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '18px',
                        lineHeight: '1.6'
                    }}>
                        Yönetim Paneli
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div style={{
                width: '520px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px'
            }} className="login-form-section">
                <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
                    {/* Mobile Logo - Only visible on mobile */}
                    <div className="mobile-logo" style={{
                        display: 'none',
                        textAlign: 'center',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            background: '#fff',
                            borderRadius: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: '0 10px 40px rgba(33, 187, 159, 0.3)'
                        }}>
                            <img
                                src="/assets/img/site_logo-Photoroom.png"
                                alt="Solo Teknoloji"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>
                            Solo Teknoloji
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>
                            Yönetim Paneli
                        </p>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{
                            color: '#fff',
                            fontSize: '28px',
                            fontWeight: '700',
                            marginBottom: '12px'
                        }}>
                            Hoş Geldiniz 👋
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                            Yönetim paneline erişmek için giriş yapın
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ef4444', fontSize: '14px' }}></i>
                                </div>
                                <span style={{ color: '#ef4444', fontSize: '14px' }}>{error}</span>
                            </div>
                        )}

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px',
                                marginBottom: '10px',
                                fontWeight: '500'
                            }}>
                                E-posta Adresi
                            </label>
                            <div style={{ position: 'relative' }}>
                                <i className="fa-solid fa-envelope" style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.3)',
                                    fontSize: '15px'
                                }}></i>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@soloteknoloji.com.tr"
                                    style={{
                                        width: '100%',
                                        padding: '18px 18px 18px 52px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '14px',
                                        color: '#fff',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(33, 187, 159, 0.5)'
                                        e.target.style.background = 'rgba(33, 187, 159, 0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                                        e.target.style.background = 'rgba(255,255,255,0.03)'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '13px',
                                marginBottom: '10px',
                                fontWeight: '500'
                            }}>
                                Şifre
                            </label>
                            <div style={{ position: 'relative' }}>
                                <i className="fa-solid fa-lock" style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.3)',
                                    fontSize: '15px'
                                }}></i>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '18px 52px 18px 52px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '14px',
                                        color: '#fff',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(33, 187, 159, 0.5)'
                                        e.target.style.background = 'rgba(33, 187, 159, 0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                                        e.target.style.background = 'rgba(255,255,255,0.03)'
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '18px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                        fontSize: '15px'
                                    }}
                                >
                                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '18px',
                                background: loading ? '#444' : 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                border: 'none',
                                borderRadius: '14px',
                                color: '#fff',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: loading ? 'none' : '0 8px 30px rgba(33, 187, 159, 0.35)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                                    Giriş Yapılıyor...
                                </>
                            ) : (
                                <>
                                    Giriş Yap
                                    <i className="fa-solid fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div style={{ marginTop: '50px', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
                            © 2026 Solo Teknoloji • Tüm hakları saklıdır
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Responsive Styles */}
            <style jsx>{`
                @media (max-width: 1024px) {
                    .login-brand-section {
                        display: none !important;
                    }
                    .login-form-section {
                        width: 100% !important;
                        border-left: none !important;
                        padding: 30px 20px !important;
                        min-height: 100vh !important;
                    }
                    .mobile-logo {
                        display: block !important;
                    }
                    .bg-decoration {
                        display: none !important;
                    }
                }
                @media (max-width: 480px) {
                    .login-form-section {
                        padding: 20px 16px !important;
                    }
                }
            `}</style>
        </div>
    )
}
