'use client'
import { useState, useEffect } from 'react'

export default function AdminDemoTalepleri() {
    const [talepler, setTalepler] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTalep, setSelectedTalep] = useState(null)

    useEffect(() => {
        fetchTalepler()
    }, [])

    const fetchTalepler = async () => {
        try {
            const res = await fetch('/api/demo-talep')
            if (res.ok) {
                const data = await res.json()
                setTalepler(data)
            }
        } catch (err) {
            console.error('Talepler çekilemedi:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu talebi silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/demo-talep?id=${id}`, { method: 'DELETE' })
                if (res.ok) {
                    setTalepler(talepler.filter(t => t.id !== id))
                    if (selectedTalep?.id === id) setSelectedTalep(null)
                }
            } catch (err) {
                alert('Silme işlemi başarısız')
            }
        }
    }

    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch('/api/demo-talep', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            })
            if (res.ok) {
                setTalepler(talepler.map(t => t.id === id ? { ...t, status } : t))
                if (selectedTalep?.id === id) setSelectedTalep({ ...selectedTalep, status })
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
            case 'İletişime Geçildi': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
            case 'Demo Yapıldı': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }
            case 'Kapatıldı': return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
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
            <div style={{ marginBottom: '30px' }}>
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
                    <i className="fa-solid fa-calendar-check"></i>
                    Demo Talepleri
                </span>
                <h1 className="admin-page-title" style={{ fontSize: '28px', fontWeight: '700', color: '#161540', marginBottom: '8px', fontFamily: '"DM Serif Display", serif' }}>
                    <span style={{ color: '#21BB9F' }}>Demo</span> Talepleri
                </h1>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: 0 }}>
                    Toplam {talepler.length} talep • {talepler.filter(t => t.status === 'Yeni').length} yeni
                </p>
            </div>

            <div className="demo-grid" style={{ display: 'grid', gridTemplateColumns: selectedTalep ? '1fr 1fr' : '1fr', gap: '20px' }}>
                {/* Talep Listesi */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                    {talepler.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center' }}>
                            <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '50px', color: '#ddd', marginBottom: '15px' }}></i>
                            <p style={{ color: '#999' }}>Henüz demo talebi yok</p>
                        </div>
                    ) : (
                        talepler.map((talep) => {
                            const statusStyle = getStatusColor(talep.status)
                            return (
                                <div
                                    key={talep.id}
                                    onClick={() => {
                                        setSelectedTalep(talep)
                                        if (talep.status === 'Yeni') handleStatusChange(talep.id, 'İletişime Geçildi')
                                    }}
                                    style={{
                                        padding: '15px',
                                        borderBottom: '1px solid #f0f0f0',
                                        cursor: 'pointer',
                                        background: selectedTalep?.id === talep.id ? 'rgba(33, 187, 159, 0.05)' : '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                                        <div>
                                            <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#161540', margin: 0 }}>{talep.name}</h4>
                                            {talep.company && <p style={{ fontSize: '13px', color: '#21BB9F', margin: '4px 0 0 0' }}>{talep.company}</p>}
                                        </div>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                            background: statusStyle.bg,
                                            color: statusStyle.color
                                        }}>
                                            {talep.status}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px 0' }}>{talep.email}</p>
                                    <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>
                                        {talep.created_at ? formatDate(talep.created_at) : ''}
                                    </p>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Talep Detay */}
                {selectedTalep && (
                    <div className="talep-detail" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '10px' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#161540', marginBottom: '5px', wordBreak: 'break-word' }}>{selectedTalep.name}</h3>
                                {selectedTalep.company && <p style={{ fontSize: '13px', color: '#21BB9F', margin: '0 0 5px 0', fontWeight: '500' }}>{selectedTalep.company}</p>}
                                <p style={{ fontSize: '13px', color: '#666', margin: 0, wordBreak: 'break-all' }}>{selectedTalep.email}</p>
                                {selectedTalep.phone && <p style={{ fontSize: '13px', color: '#666', margin: '5px 0 0 0' }}>{selectedTalep.phone}</p>}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setSelectedTalep(null)}
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
                                    onClick={() => handleDelete(selectedTalep.id)}
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

                        {/* Ürün ve Demo Türü Bilgileri */}
                        <div className="product-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            {selectedTalep.product && (
                                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '12px' }}>
                                    <label style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>İlgilenilen Ürün</label>
                                    <p style={{ fontSize: '14px', color: '#161540', fontWeight: '500', margin: 0 }}>
                                        {selectedTalep.product === 'pos' && 'POS Sistemleri'}
                                        {selectedTalep.product === 'barkod' && 'Barkod Okuyucular'}
                                        {selectedTalep.product === 'terminal' && 'El Terminalleri'}
                                        {selectedTalep.product === 'terazi' && 'Terazi Sistemleri'}
                                        {selectedTalep.product === 'yazilim' && 'Yazılım Çözümleri'}
                                        {selectedTalep.product === 'entegrasyon' && 'Sistem Entegrasyonu'}
                                        {selectedTalep.product === 'diger' && 'Diğer'}
                                    </p>
                                </div>
                            )}
                            {selectedTalep.demo_type && (
                                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '12px' }}>
                                    <label style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>Demo Türü</label>
                                    <p style={{ fontSize: '14px', color: '#161540', fontWeight: '500', margin: 0 }}>
                                        {selectedTalep.demo_type === 'online' && 'Online Demo (Video Görüşme)'}
                                        {selectedTalep.demo_type === 'yerinde' && 'Yerinde Demo (İstanbul)'}
                                        {selectedTalep.demo_type === 'ofis' && 'Ofisimize Gelerek'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {selectedTalep.message && (
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '5px' }}>Not / Mesaj</label>
                                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', lineHeight: '1.7' }}>
                                    {selectedTalep.message}
                                </div>
                            </div>
                        )}

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '12px', color: '#999', display: 'block', marginBottom: '8px' }}>Durum</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['Yeni', 'İletişime Geçildi', 'Demo Yapıldı', 'Kapatıldı'].map(status => {
                                    const isActive = selectedTalep.status === status
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedTalep.id, status)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: isActive ? 'none' : '1px solid #ddd',
                                                background: isActive ? '#21BB9F' : '#fff',
                                                color: isActive ? '#fff' : '#666',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {status}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Hızlı İletişim Butonları */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <a
                                href={`mailto:${selectedTalep.email}`}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                    borderRadius: '10px',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>
                                E-posta Gönder
                            </a>
                            {selectedTalep.phone && (
                                <a
                                    href={`tel:${selectedTalep.phone}`}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#161540',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}
                                >
                                    <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i>
                                    Ara
                                </a>
                            )}
                        </div>

                        <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>
                            Talep Tarihi: {selectedTalep.created_at ? formatDate(selectedTalep.created_at) : ''}
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @media (max-width: 991px) {
                    .demo-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .talep-detail {
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
                    .product-info-grid {
                        grid-template-columns: 1fr !important;
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
