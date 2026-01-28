'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminAyarlar() {
    const [settings, setSettings] = useState([])
    const [formData, setFormData] = useState({})
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
                setSettings(data)

                // Form datayı hazırla { key: value }
                const initialData = {}
                data.forEach(item => {
                    initialData[item.anahtar] = item.deger
                })
                setFormData(initialData)
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

    if (loading) return <div>Yükleniyor...</div>

    // Gruplara ayır
    const groups = {
        'iletisim': 'İletişim Ayarları',
        'sosyal': 'Sosyal Medya',
        'genel': 'Genel Ayarlar'
    }

    const groupSettings = (groupKey) => {
        return settings.filter(s => s.grup === groupKey)
    }

    return (
        <div>
            <div className="page-header" style={{ marginBottom: '30px' }}>
                <h1 className="page-title" style={{ fontSize: '24px', fontWeight: '600', color: '#1A1A1A' }}>
                    Site Ayarları
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '30px' }}>

                    {/* İletişim Ayarları */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#21BB9F', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <i className="fa-solid fa-address-book" style={{ marginRight: '10px' }}></i>
                            İletişim & WhatsApp
                        </h3>
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {groupSettings('iletisim').map(setting => (
                                <div key={setting.id}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                        {setting.aciklama || setting.anahtar}
                                        {setting.anahtar === 'whatsapp' && <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>(Örn: +905xxxxxxxxx)</span>}
                                    </label>

                                    {setting.tur === 'textarea' ? (
                                        <textarea
                                            name={setting.anahtar}
                                            value={formData[setting.anahtar] || ''}
                                            onChange={handleChange}
                                            rows={4}
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={setting.anahtar}
                                            value={formData[setting.anahtar] || ''}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sosyal Medya */}
                    <div style={{ background: '#fff', padding: '25px', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#21BB9F', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <i className="fa-solid fa-share-nodes" style={{ marginRight: '10px' }}></i>
                            Sosyal Medya
                        </h3>
                        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            {groupSettings('sosyal').map(setting => (
                                <div key={setting.id}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                                        {setting.aciklama || setting.anahtar}
                                    </label>
                                    <input
                                        type="text"
                                        name={setting.anahtar}
                                        value={formData[setting.anahtar] || ''}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            position: 'sticky', bottom: '20px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '10px',
                            fontSize: '16px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)',
                            opacity: saving ? 0.7 : 1,
                            marginLeft: 'auto'
                        }}
                    >
                        {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                    </button>

                </div>
            </form>
        </div>
    )
}
