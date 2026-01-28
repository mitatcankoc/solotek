'use client'
import { useState, useEffect } from 'react'

export default function AdminAyarlar() {
    const [formData, setFormData] = useState({
        whatsapp: '',
        whatsapp_message: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchSettings()
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
        </div>
    )
}
