'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import LoginForm from '@/components/admin/LoginForm'

function AdminContent({ children }) {
    const pathname = usePathname()
    const router = useRouter()
    const { isAuthenticated, user, loading, logout } = useAuth()
    const [hoveredItem, setHoveredItem] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [notificationCount, setNotificationCount] = useState(0)

    // Bildirimleri çek
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications()
            // Her 30 saniyede bir güncelle
            const interval = setInterval(fetchNotifications, 30000)
            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    const fetchNotifications = async () => {
        try {
            // Yeni mesajları çek
            const mesajRes = await fetch('/api/iletisim')
            const mesajlar = mesajRes.ok ? await mesajRes.json() : []
            const yeniMesajlar = mesajlar.filter(m => m.status === 'Yeni').slice(0, 5)

            // Yeni demo taleplerini çek
            const demoRes = await fetch('/api/demo-talep')
            const demolar = demoRes.ok ? await demoRes.json() : []
            const yeniDemolar = demolar.filter(d => d.status === 'Yeni').slice(0, 5)

            // Bildirimleri birleştir
            const allNotifications = [
                ...yeniMesajlar.map(m => ({
                    id: `mesaj-${m.id}`,
                    type: 'mesaj',
                    title: m.name,
                    message: m.subject || m.message?.substring(0, 50) + '...',
                    time: m.created_at,
                    href: '/admin/mesajlar'
                })),
                ...yeniDemolar.map(d => ({
                    id: `demo-${d.id}`,
                    type: 'demo',
                    title: d.name || `${d.fname} ${d.lname}`,
                    message: d.company || 'Demo Talebi',
                    time: d.created_at,
                    href: '/admin/demo-talepleri'
                }))
            ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10)

            setNotifications(allNotifications)
            setNotificationCount(yeniMesajlar.length + yeniDemolar.length)
        } catch (error) {
            console.error('Bildirimler yüklenirken hata:', error)
        }
    }

    const formatTime = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        const now = new Date()
        const diff = now - date
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Az önce'
        if (minutes < 60) return `${minutes} dk önce`
        if (hours < 24) return `${hours} saat önce`
        return `${days} gün önce`
    }

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: 'fa-gauge-high', exact: true },
        {
            href: '/admin/urunler', label: 'Ürün Yönetimi', icon: 'fa-box', subItems: [
                { href: '/admin/urunler/kategoriler', label: 'Kategoriler' },
                { href: '/admin/urunler/markalar', label: 'Markalar' },
                { href: '/admin/urunler', label: 'Tüm Ürünler' },
                { href: '/admin/urunler/ekle', label: 'Yeni Ürün Ekle' }
            ]
        },
        { href: '/admin/suruculer', label: 'Sürücüler', icon: 'fa-download' },
        {
            href: '/admin/blog', label: 'Blog Yönetimi', icon: 'fa-pen-to-square', subItems: [
                { href: '/admin/blog', label: 'Tüm Yazılar' },
                { href: '/admin/blog/ekle', label: 'Yeni Yazı Ekle' }
            ]
        },
        {
            href: '/admin/referanslar', label: 'Referanslar', icon: 'fa-handshake', subItems: [
                { href: '/admin/referanslar', label: 'Tüm Referanslar' },
                { href: '/admin/referanslar/ekle', label: 'Yeni Referans Ekle' }
            ]
        },
        { href: '/admin/mesajlar', label: 'İletişim Mesajları', icon: 'fa-envelope' },
        { href: '/admin/demo-talepleri', label: 'Demo Talepleri', icon: 'fa-calendar-check' },
    ]

    const isActive = (href, exact) => {
        if (exact) return pathname === href
        return pathname.startsWith(href)
    }

    const handleLogout = () => {
        logout()
        router.push('/admin')
    }

    // Loading durumu
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0f0f0f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F' }}></i>
                    <p style={{ color: '#888', marginTop: '15px' }}>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    // Giriş yapılmamışsa login formunu göster
    if (!isAuthenticated) {
        return <LoginForm />
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 998
                    }}
                />
            )}

            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: '#0f0f0f',
                position: 'fixed',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
                zIndex: 999,
                transition: 'transform 0.3s ease',
                transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}
                className="admin-sidebar"
            >
                {/* Logo Area */}
                <div style={{
                    padding: '24px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(180deg, rgba(33, 187, 159, 0.08) 0%, transparent 100%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#fff',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)',
                            overflow: 'hidden'
                        }}>
                            <img
                                src="/assets/img/site_logo-Photoroom.png"
                                alt="Solo Teknoloji"
                                style={{ width: '36px', height: '36px', objectFit: 'contain' }}
                            />
                        </div>
                        <div>
                            <h2 style={{
                                color: '#fff',
                                fontSize: '20px',
                                fontWeight: '800',
                                margin: 0,
                                letterSpacing: '-0.5px',
                                background: 'linear-gradient(90deg, #fff 0%, #21BB9F 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Solo Teknoloji
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <span style={{
                                    width: '6px',
                                    height: '6px',
                                    background: '#21BB9F',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s infinite'
                                }}></span>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '500' }}>
                                    Admin Panel
                                </span>
                            </div>
                        </div>
                    </Link>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="mobile-close-btn"
                        style={{
                            display: 'none',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '20px',
                            cursor: 'pointer',
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* User Info - Minimal Design */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                    }}>
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                border: '2px solid #21BB9F',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px',
                                color: '#21BB9F',
                                fontWeight: '700'
                            }}>
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                width: '10px',
                                height: '10px',
                                background: '#22c55e',
                                borderRadius: '50%',
                                border: '2px solid #0f0f23'
                            }}></div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: '600',
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>{user?.name || 'Admin'}</p>
                            <p style={{
                                color: 'rgba(255,255,255,0.4)',
                                fontSize: '12px',
                                margin: '3px 0 0 0'
                            }}>{user?.email || 'Sistem Yöneticisi'}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                padding: '8px 10px',
                                cursor: 'pointer',
                                color: 'rgba(255,255,255,0.5)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px'
                            }}
                            title="Çıkış Yap"
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'
                                e.currentTarget.style.borderColor = 'rgba(231, 76, 60, 0.3)'
                                e.currentTarget.style.color = '#e74c3c'
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                            }}
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '12px' }}></i>
                        </button>
                    </div>
                </div>

                {/* Menu */}
                <nav style={{ padding: '20px 16px', flex: 1, overflowY: 'auto' }}>
                    <p style={{
                        color: '#555',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        padding: '0 8px',
                        marginBottom: '12px'
                    }}>
                        Ana Menü
                    </p>

                    {menuItems.map((item, index) => {
                        const active = isActive(item.href, item.exact)
                        const isHovered = hoveredItem === index
                        const hasSubItems = item.subItems && item.subItems.length > 0
                        const isSubActive = hasSubItems && item.subItems.some(sub => pathname === sub.href || pathname.startsWith(sub.href))

                        return (
                            <div key={item.href} style={{ marginBottom: '4px' }}>
                                <Link
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        color: (active || isSubActive) ? '#21BB9F' : (isHovered ? '#fff' : '#888'),
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: (active || isSubActive) ? '500' : '400',
                                        borderRadius: '10px',
                                        background: (active || isSubActive) ? 'rgba(33, 187, 159, 0.1)' : (isHovered ? 'rgba(255,255,255,0.05)' : 'transparent'),
                                        transition: 'all 0.2s ease',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: (active || isSubActive) ? 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)' : 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '12px',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <i className={`fa-solid ${item.icon}`} style={{
                                            fontSize: '14px',
                                            color: (active || isSubActive) ? '#fff' : '#666'
                                        }}></i>
                                    </div>
                                    {item.label}
                                    {hasSubItems && (
                                        <i className={`fa-solid ${isSubActive ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{
                                            marginLeft: 'auto',
                                            fontSize: '10px',
                                            opacity: 0.5
                                        }}></i>
                                    )}
                                </Link>

                                {/* Alt Menüler */}
                                {hasSubItems && isSubActive && (
                                    <div style={{ marginLeft: '48px', marginTop: '4px' }}>
                                        {item.subItems.map(sub => {
                                            const subActive = pathname === sub.href
                                            return (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={() => setSidebarOpen(false)}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 16px',
                                                        color: subActive ? '#21BB9F' : '#777',
                                                        fontSize: '13px',
                                                        textDecoration: 'none',
                                                        borderLeft: `2px solid ${subActive ? '#21BB9F' : 'rgba(255,255,255,0.1)'}`,
                                                        marginBottom: '2px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    {sub.label}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>

                {/* Bottom Section */}
                <div style={{
                    flexShrink: 0,
                    padding: '20px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: '#0a0a0a'
                }}>
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '14px',
                            background: 'linear-gradient(135deg, rgba(33, 187, 159, 0.1) 0%, rgba(33, 187, 159, 0.05) 100%)',
                            border: '1px solid rgba(33, 187, 159, 0.2)',
                            borderRadius: '10px',
                            color: '#21BB9F',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '12px' }}></i>
                        Siteyi Görüntüle
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main" style={{
                marginLeft: '0',
                flex: 1,
                padding: '20px',
                minHeight: '100vh'
            }}>
                {/* Top Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    gap: '15px'
                }}>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mobile-menu-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                        }}
                    >
                        <i className="fa-solid fa-bars" style={{ color: '#333', fontSize: '18px' }}></i>
                    </button>

                    <div style={{ flex: 1 }}></div>

                    <div style={{
                        padding: '10px 16px',
                        background: '#fff',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}
                        className="search-box"
                    >
                        <i className="fa-solid fa-search" style={{ color: '#999', fontSize: '14px' }}></i>
                        <input
                            type="text"
                            placeholder="Ara..."
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                width: '200px',
                                color: '#333'
                            }}
                        />
                    </div>
                    <div
                        onClick={() => setNotificationOpen(!notificationOpen)}
                        style={{
                            width: '42px',
                            height: '42px',
                            background: '#fff',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                            position: 'relative'
                        }}
                    >
                        <i className="fa-solid fa-bell" style={{ color: '#666', fontSize: '16px' }}></i>
                        {notificationCount > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                minWidth: '18px',
                                height: '18px',
                                background: '#ef4444',
                                borderRadius: '9px',
                                border: '2px solid #fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: '600',
                                color: '#fff',
                                padding: '0 4px'
                            }}>
                                {notificationCount > 99 ? '99+' : notificationCount}
                            </div>
                        )}

                        {/* Notification Dropdown */}
                        {notificationOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                right: '0',
                                width: '360px',
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                zIndex: 1000,
                                overflow: 'hidden'
                            }}>
                                {/* Header */}
                                <div style={{
                                    padding: '18px 20px',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#161540' }}>
                                        Bildirimler
                                    </h4>
                                    {notificationCount > 0 && (
                                        <span style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            padding: '4px 10px',
                                            borderRadius: '20px'
                                        }}>
                                            {notificationCount} yeni
                                        </span>
                                    )}
                                </div>

                                {/* Notification List */}
                                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                    {notifications.length === 0 ? (
                                        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                            <i className="fa-solid fa-bell-slash" style={{ fontSize: '32px', color: '#ddd', marginBottom: '10px' }}></i>
                                            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>Yeni bildirim yok</p>
                                        </div>
                                    ) : (
                                        notifications.map((notif) => (
                                            <Link
                                                key={notif.id}
                                                href={notif.href}
                                                onClick={() => setNotificationOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    padding: '14px 20px',
                                                    textDecoration: 'none',
                                                    borderBottom: '1px solid #f5f5f5',
                                                    transition: 'background 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                    background: notif.type === 'mesaj'
                                                        ? 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)'
                                                        : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <i className={`fa-solid ${notif.type === 'mesaj' ? 'fa-envelope' : 'fa-calendar-check'}`}
                                                        style={{ color: '#fff', fontSize: '14px' }}></i>
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                        <p style={{
                                                            margin: 0,
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#161540',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '180px'
                                                        }}>
                                                            {notif.title}
                                                        </p>
                                                        <span style={{ fontSize: '11px', color: '#999', flexShrink: 0 }}>
                                                            {formatTime(notif.time)}
                                                        </span>
                                                    </div>
                                                    <p style={{
                                                        margin: 0,
                                                        fontSize: '13px',
                                                        color: '#666',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>
                                                        {notif.message}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                {notifications.length > 0 && (
                                    <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                                        <Link
                                            href="/admin/mesajlar"
                                            onClick={() => setNotificationOpen(false)}
                                            style={{
                                                color: '#21BB9F',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Tüm bildirimleri gör <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px', marginLeft: '5px' }}></i>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {children}
            </main>

            {/* Responsive Styles */}
            <style jsx global>{`
                /* Custom Scrollbar Styles */
                .admin-sidebar::-webkit-scrollbar,
                .admin-sidebar nav::-webkit-scrollbar {
                    width: 4px;
                }
                .admin-sidebar::-webkit-scrollbar-track,
                .admin-sidebar nav::-webkit-scrollbar-track {
                    background: transparent;
                }
                .admin-sidebar::-webkit-scrollbar-thumb,
                .admin-sidebar nav::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .admin-sidebar::-webkit-scrollbar-thumb:hover,
                .admin-sidebar nav::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                /* Firefox */
                .admin-sidebar,
                .admin-sidebar nav {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
                }
                
                @media (min-width: 992px) {
                    .admin-sidebar {
                        transform: translateX(0) !important;
                    }
                    .admin-main {
                        margin-left: 280px !important;
                        padding: 30px 40px !important;
                    }
                    .mobile-menu-btn {
                        display: none !important;
                    }
                    .mobile-close-btn {
                        display: none !important;
                    }
                }
                @media (max-width: 991px) {
                    .mobile-close-btn {
                        display: block !important;
                    }
                    .search-box {
                        display: none !important;
                    }
                }
                @media (max-width: 768px) {
                    .admin-main {
                        padding: 15px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default function AdminLayout({ children }) {
    return (
        <AuthProvider>
            <AdminContent>{children}</AdminContent>
        </AuthProvider>
    )
}
