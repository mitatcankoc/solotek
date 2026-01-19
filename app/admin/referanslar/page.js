'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminReferanslar() {
    const [referanslar, setReferanslar] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Verileri API'den çek
    useEffect(() => {
        fetchReferanslar()
    }, [])

    const fetchReferanslar = async () => {
        try {
            const res = await fetch('/api/referanslar')
            if (!res.ok) throw new Error('Veri çekilemedi')
            const data = await res.json()
            setReferanslar(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu referansı silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/referanslar?id=${id}`, {
                    method: 'DELETE'
                })
                if (res.ok) {
                    setReferanslar(referanslar.filter(ref => ref.id !== id))
                }
            } catch (err) {
                alert('Silme işlemi başarısız')
            }
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
            {/* Header - Ana site heading2 stiline benzer */}
            <div style={{ marginBottom: '40px' }}>
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
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
                            <i className="fa-solid fa-handshake"></i>
                            Referans Yönetimi
                        </span>
                        <h1 className="page-title" style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#161540',
                            marginBottom: '8px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            <span style={{ color: '#21BB9F' }}>İş</span> Ortaklarımız
                        </h1>
                        <p style={{ color: '#666', fontSize: '15px', marginBottom: 0 }}>
                            Toplam {referanslar.length} referans bulunmaktadır
                        </p>
                    </div>
                    <Link
                        href="/admin/referanslar/ekle"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 28px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            borderRadius: '50px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Referans Ekle
                    </Link>
                </div>
            </div>

            {error && (
                <div style={{
                    background: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    color: '#c00'
                }}>
                    <i className="fa-solid fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
                    {error}
                </div>
            )}

            {/* Referans Grid */}
            <div className="referans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
                {referanslar.map((ref) => (
                    <div
                        key={ref.id}
                        style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '30px 25px',
                            border: '1px solid #eee',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'
                            e.currentTarget.style.transform = 'translateY(-5px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {/* Logo Area */}
                        <div style={{
                            height: '90px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '25px',
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                            borderRadius: '12px',
                            border: '1px solid #f0f0f0',
                            padding: '20px'
                        }}>
                            <img
                                src={ref.logo}
                                alt={ref.name}
                                style={{
                                    maxHeight: '55px',
                                    maxWidth: '140px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {/* Info */}
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#161540',
                            marginBottom: '10px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            {ref.name}
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '20px',
                            lineHeight: '1.6'
                        }}>
                            {ref.description}
                        </p>

                        {/* Bottom Row */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                background: ref.status === 'Aktif' ? 'rgba(33, 187, 159, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '20px',
                                fontSize: '12px',
                                color: ref.status === 'Aktif' ? '#21BB9F' : '#ef4444',
                                fontWeight: '500'
                            }}>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: ref.status === 'Aktif' ? '#21BB9F' : '#ef4444'
                                }}></div>
                                {ref.status || 'Aktif'}
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link
                                    href={`/admin/referanslar/duzenle/${ref.id}`}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        background: 'rgba(33, 187, 159, 0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#21BB9F',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none'
                                    }}
                                    title="Düzenle"
                                >
                                    <i className="fa-solid fa-pen" style={{ fontSize: '12px' }}></i>
                                </Link>
                                <button
                                    onClick={() => handleDelete(ref.id)}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        background: 'rgba(231, 76, 60, 0.1)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#e74c3c',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title="Sil"
                                >
                                    <i className="fa-solid fa-trash" style={{ fontSize: '12px' }}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <Link
                    href="/admin/referanslar/ekle"
                    style={{
                        background: 'linear-gradient(135deg, rgba(33, 187, 159, 0.05) 0%, rgba(33, 187, 159, 0.02) 100%)',
                        borderRadius: '16px',
                        padding: '30px 25px',
                        border: '2px dashed rgba(33, 187, 159, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '280px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '15px'
                    }}>
                        <i className="fa-solid fa-plus" style={{ color: '#fff', fontSize: '24px' }}></i>
                    </div>
                    <p style={{ color: '#21BB9F', fontSize: '16px', fontWeight: '500', margin: 0 }}>
                        Yeni Referans Ekle
                    </p>
                </Link>
            </div>
            <style jsx>{`
                @media (max-width: 1200px) {
                    .referans-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 768px) {
                    .page-header {
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }
                    .page-title {
                        font-size: 24px !important;
                    }
                    .referans-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}
