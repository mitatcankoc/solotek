'use client'
import { useState, useEffect } from 'react'

export default function AdminAyarlar() {
    const [formData, setFormData] = useState({
        whatsapp: '',
        whatsapp_message: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Cache state
    const [cacheStats, setCacheStats] = useState(null)
    const [cacheLoading, setCacheLoading] = useState(false)
    const [cacheAction, setCacheAction] = useState(null)

    useEffect(() => {
        fetchSettings()
        fetchCacheStats()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/ayarlar')
            if (res.ok) {
                const data = await res.json()
                const settings = {}
                data.forEach(item => {
                    settings[item.anahtar] = item.deger
                })
                setFormData({
                    whatsapp: settings.whatsapp || '',
                    whatsapp_message: settings.whatsapp_message || ''
                })
            }
        } catch (error) {
            console.error('Hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch('/api/ayarlar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert('Ayarlar başarıyla güncellendi!')
            } else {
                alert('Bir hata oluştu')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        } finally {
            setSaving(false)
        }
    }

    // Cache fonksiyonları
    const fetchCacheStats = async () => {
        try {
            setCacheLoading(true)
            const res = await fetch('/api/admin/cache')
            if (res.ok) {
                const data = await res.json()
                setCacheStats(data.cache)
            }
        } catch (error) {
            console.error('Cache stats hatası:', error)
        } finally {
            setCacheLoading(false)
        }
    }

    const handleCacheAction = async (action, namespace = null) => {
        setCacheAction(action)
        try {
            const body = { action }
            if (namespace) body.namespace = namespace

            const res = await fetch('/api/admin/cache', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            if (res.ok) {
                const data = await res.json()
                alert(data.message)
                fetchCacheStats()
            } else {
                alert('İşlem başarısız')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        } finally {
            setCacheAction(null)
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '30px', color: '#21BB9F' }}></i>
            </div>
        )
    }

    return (
        <div>
            <div className="page-header" style={{ marginBottom: '30px' }}>
                <h1 className="page-title" style={{ fontSize: '24px', fontWeight: '600', color: '#1A1A1A' }}>
                    <i className="fa-solid fa-gear" style={{ marginRight: '12px', color: '#21BB9F' }}></i>
                    Site Ayarları
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', maxWidth: '600px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '25px',
                        color: '#25D366',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <i className="fa-brands fa-whatsapp"></i>
                        WhatsApp Ayarları
                    </h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                            WhatsApp Numarası
                        </label>
                        <input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="+90 543 259 97 84"
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                            }}
                        />
                        <small style={{ color: '#888', fontSize: '12px', marginTop: '6px', display: 'block' }}>
                            Örnek: +90 543 259 97 84 veya 905432599784
                        </small>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                            Varsayılan Mesaj
                        </label>
                        <textarea
                            name="whatsapp_message"
                            value={formData.whatsapp_message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Merhaba, ürünleriniz hakkında bilgi almak istiyorum."
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none',
                                resize: 'vertical'
                            }}
                        />
                        <small style={{ color: '#888', fontSize: '12px', marginTop: '6px', display: 'block' }}>
                            Kullanıcı WhatsApp butonuna tıkladığında otomatik yazılacak mesaj
                        </small>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '14px 30px',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            opacity: saving ? 0.7 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {saving ? (
                            <>
                                <i className="fa-solid fa-spinner fa-spin"></i>
                                Kaydediliyor...
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-check"></i>
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Cache Yönetimi */}
            <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', maxWidth: '800px', marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#6366f1',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        margin: 0
                    }}>
                        <i className="fa-solid fa-bolt"></i>
                        Cache Yönetimi
                    </h3>
                    <button
                        onClick={fetchCacheStats}
                        disabled={cacheLoading}
                        style={{
                            background: 'none',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <i className={`fa-solid fa-refresh ${cacheLoading ? 'fa-spin' : ''}`}></i>
                        Yenile
                    </button>
                </div>

                {cacheStats && (
                    <>
                        {/* İstatistik Kartları */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                            <div style={{ background: '#f0fdf4', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a' }}>{cacheStats.hitRate}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Hit Oranı</div>
                            </div>
                            <div style={{ background: '#eff6ff', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{cacheStats.totalKeys}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Aktif Key</div>
                            </div>
                            <div style={{ background: '#fefce8', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#ca8a04' }}>{cacheStats.hits}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Cache Hit</div>
                            </div>
                            <div style={{ background: '#fef2f2', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{cacheStats.misses}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Cache Miss</div>
                            </div>
                            <div style={{ background: '#f5f3ff', padding: '18px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed' }}>{cacheStats.uptimeFormatted}</div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Uptime</div>
                            </div>
                        </div>

                        {/* Namespace Bazlı Dağılım */}
                        {Object.keys(cacheStats.keysByNamespace).length > 0 && (
                            <div style={{ marginBottom: '25px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '12px' }}>
                                    Namespace Dağılımı
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {Object.entries(cacheStats.keysByNamespace).map(([ns, count]) => (
                                        <div key={ns} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: '#f8f9fa',
                                            padding: '8px 14px',
                                            borderRadius: '8px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: '500', color: '#333' }}>{ns}</span>
                                            <span style={{
                                                background: '#6366f1',
                                                color: '#fff',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                fontSize: '11px',
                                                fontWeight: '600'
                                            }}>{count}</span>
                                            <button
                                                onClick={() => handleCacheAction('flush_namespace', ns)}
                                                disabled={cacheAction}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#dc2626',
                                                    fontSize: '12px',
                                                    padding: '2px 4px'
                                                }}
                                                title={`${ns} cache'ini temizle`}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TTL Yapılandırması */}
                        <div style={{ marginBottom: '25px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '12px' }}>
                                TTL Yapılandırması
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
                                {Object.entries(cacheStats.ttlConfig).map(([key, ttl]) => (
                                    <div key={key} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: '#f8f9fa',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ color: '#555' }}>{key}</span>
                                        <span style={{ fontWeight: '600', color: '#333' }}>
                                            {ttl >= 3600 ? `${ttl / 3600}s` : `${ttl / 60}dk`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Aksiyon Butonları */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleCacheAction('flush_all')}
                        disabled={cacheAction}
                        style={{
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: cacheAction ? 'not-allowed' : 'pointer',
                            opacity: cacheAction ? 0.7 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        {cacheAction === 'flush_all' ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Temizleniyor...</>
                        ) : (
                            <><i className="fa-solid fa-trash"></i> Tüm Cache Temizle</>
                        )}
                    </button>

                    <button
                        onClick={() => handleCacheAction('reset_stats')}
                        disabled={cacheAction}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: cacheAction ? 'not-allowed' : 'pointer',
                            opacity: cacheAction ? 0.7 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <i className="fa-solid fa-rotate"></i> İstatistikleri Sıfırla
                    </button>
                </div>

                <p style={{ color: '#888', fontSize: '12px', marginTop: '15px', lineHeight: '1.6' }}>
                    <i className="fa-solid fa-info-circle" style={{ marginRight: '4px' }}></i>
                    Cache sistemi veritabanı sorgularını azaltarak site performansını artırır. 
                    Admin panelden yapılan değişiklikler cache'i otomatik olarak temizler. 
                    Manuel temizleme sadece gerektiğinde kullanın.
                </p>
            </div>
        </div>
    )
}
