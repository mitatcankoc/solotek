'use client'
import { useState, useEffect } from 'react'

export default function AdminMesajlar() {
    const [mesajlar, setMesajlar] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedMesaj, setSelectedMesaj] = useState(null)

    useEffect(() => {
        fetchMesajlar()
    }, [])

    const fetchMesajlar = async () => {
        try {
            const res = await fetch('/api/iletisim')
            if (res.ok) {
                const data = await res.json()
                setMesajlar(data)
            }
        } catch (err) {
            console.error('Mesajlar çekilemedi:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/iletisim?id=${id}`, { method: 'DELETE' })
                if (res.ok) {
                    setMesajlar(mesajlar.filter(m => m.id !== id))
                    if (selectedMesaj?.id === id) setSelectedMesaj(null)
                }
            } catch (err) {
                alert('Silme işlemi başarısız')
            }
        }
    }

    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch('/api/iletisim', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            })
            if (res.ok) {
                setMesajlar(mesajlar.map(m => m.id === id ? { ...m, status } : m))
                if (selectedMesaj?.id === id) setSelectedMesaj({ ...selectedMesaj, status })
            }
        } catch (err) {
            alert('Durum güncellenemedi')
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Yeni': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }
            case 'Okundu': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
            case 'Yanıtlandı': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }
            default: return { bg: '#f0f0f0', color: '#666' }
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                    <p style={{ color: '#666' }}>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '13px',
                    fontWeight: '500',
                    marginBottom: '15px'
                }}>
                    <i className="fa-solid fa-envelope"></i>
                    İletişim
                </span>
                <h1 className="admin-page-title" style={{ fontSize: '28px', fontWeight: '700', color: '#161540', marginBottom: '8px', fontFamily: '"DM Serif Display", serif' }}>
                    <span style={{ color: '#21BB9F' }}>İletişim</span> Mesajları
                </h1>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: 0 }}>
                    Toplam {mesajlar.length} mesaj • {mesajlar.filter(m => m.status === 'Yeni').length} yeni
                </p>
            </div>

            <div className="messages-grid" style={{ display: 'grid', gridTemplateColumns: selectedMesaj ? '1fr 1fr' : '1fr', gap: '20px' }}>
                {/* Mesaj Listesi */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                    {mesajlar.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center' }}>
                            <i className="fa-solid fa-inbox" style={{ fontSize: '50px', color: '#ddd', marginBottom: '15px' }}></i>
                            <p style={{ color: '#999' }}>Henüz mesaj yok</p>
                        </div>
                    ) : (
                        mesajlar.map((mesaj) => {
                            const statusStyle = getStatusColor(mesaj.status)
                            return (
                                <div
                                    key={mesaj.id}
                                    onClick={() => {
                                        setSelectedMesaj(mesaj)
                                        if (mesaj.status === 'Yeni') handleStatusChange(mesaj.id, 'Okundu')
                                    }}
                                    style={{
                                        padding: '15px',
                                        borderBottom: '1px solid #f0f0f0',
                                        cursor: 'pointer',
                                        background: selectedMesaj?.id === mesaj.id ? 'rgba(33, 187, 159, 0.05)' : '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#161540', margin: 0 }}>{mesaj.name}</h4>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '10px',
                                            fontWeight: '500',
                                            background: statusStyle.bg,
                                            color: statusStyle.color
                                        }}>
                                            {mesaj.status}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0', wordBreak: 'break-all' }}>{mesaj.email}</p>
                                    <p className="message-preview" style={{ fontSize: '12px', color: '#999', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {mesaj.message?.substring(0, 60)}...
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#bbb', margin: '8px 0 0 0' }}>
                                        {mesaj.created_at ? formatDate(mesaj.created_at) : ''}
                                    </p>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Mesaj Detay */}
                {selectedMesaj && (
                    <div className="message-detail" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#161540', marginBottom: '5px', wordBreak: 'break-word' }}>{selectedMesaj.name}</h3>
                                <p style={{ fontSize: '13px', color: '#666', margin: 0, wordBreak: 'break-all' }}>{selectedMesaj.email}</p>
                                {selectedMesaj.phone && <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 0' }}>{selectedMesaj.phone}</p>}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setSelectedMesaj(null)}
                                    className="mobile-close-detail"
                                    style={{
                                        padding: '10px 15px',
                                        background: 'rgba(0,0,0,0.05)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#666',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedMesaj.id)}
                                    style={{
                                        padding: '10px 15px',
                                        background: 'rgba(231, 76, 60, 0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#e74c3c',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {selectedMesaj.subject && (
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '5px' }}>Konu</label>
                                <p style={{ fontSize: '14px', color: '#333', margin: 0, fontWeight: '500' }}>{selectedMesaj.subject}</p>
                            </div>
                        )}

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '5px' }}>Mesaj</label>
                            <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '12px', lineHeight: '1.6', fontSize: '14px', wordBreak: 'break-word' }}>
                                {selectedMesaj.message}
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '8px' }}>Durum</label>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {['Yeni', 'Okundu', 'Yanıtlandı'].map(status => {
                                    const isActive = selectedMesaj.status === status
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedMesaj.id, status)}
                                            style={{
                                                padding: '8px 14px',
                                                borderRadius: '8px',
                                                border: isActive ? 'none' : '1px solid #ddd',
                                                background: isActive ? '#21BB9F' : '#fff',
                                                color: isActive ? '#fff' : '#666',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {status}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>
                            Gönderilme: {selectedMesaj.created_at ? formatDate(selectedMesaj.created_at) : ''}
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @media (max-width: 991px) {
                    .messages-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .message-detail {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 1000;
                        border-radius: 0 !important;
                        overflow-y: auto;
                    }
                    .mobile-close-detail {
                        display: flex !important;
                    }
                }
                @media (min-width: 992px) {
                    .mobile-close-detail {
                        display: none !important;
                    }
                }
                @media (max-width: 576px) {
                    .admin-page-title {
                        font-size: 22px !important;
                    }
                }
            `}</style>
        </div>
    )
}
