'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ReferansEkle() {
    const router = useRouter()
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo: '',
        website: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Önizleme göster
        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target.result)
        reader.readAsDataURL(file)

        // Dosyayı yükle
        setUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'referans')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            if (res.ok) {
                const data = await res.json()
                setFormData(prev => ({ ...prev, logo: data.url }))
            } else {
                alert('Logo yüklenirken hata oluştu!')
            }
        } catch (err) {
            alert('Logo yüklenirken hata oluştu!')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/referanslar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert('Referans başarıyla eklendi!')
                router.push('/admin/referanslar')
            } else {
                throw new Error('Hata oluştu')
            }
        } catch (err) {
            alert('Referans eklenirken hata oluştu!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Header */}
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
                            <i className="fa-solid fa-plus"></i>
                            Yeni Referans
                        </span>
                        <h1 className="page-title" style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#161540',
                            marginBottom: '8px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            <span style={{ color: '#21BB9F' }}>Referans</span> Ekle
                        </h1>
                        <p style={{ color: '#666', fontSize: '15px', marginBottom: 0 }}>
                            Yeni bir iş ortağı/referans ekleyin
                        </p>
                    </div>
                    <Link
                        href="/admin/referanslar"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 28px',
                            background: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '50px',
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Geri Dön
                    </Link>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    {/* Sol Kolon */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '30px',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#161540'
                            }}>
                                Firma Adı *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Örn: Koç Holding"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#161540'
                            }}>
                                Açıklama *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Firma hakkında kısa açıklama..."
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    resize: 'vertical',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                                required
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#161540'
                            }}>
                                Web Sitesi (Opsiyonel)
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://..."
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {/* Sağ Kolon */}
                    <div>
                        {/* Firma Logosu */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '25px',
                            border: '1px solid #eee',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                color: '#161540',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <i className="fa-solid fa-image" style={{ color: '#21BB9F' }}></i>
                                Firma Logosu
                            </h3>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />

                            {imagePreview ? (
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                                        borderRadius: '12px',
                                        padding: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <img
                                            src={imagePreview}
                                            alt="Önizleme"
                                            style={{
                                                maxHeight: '80px',
                                                maxWidth: '150px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                    {uploading && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'rgba(0,0,0,0.5)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}>
                                            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '24px' }}></i>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null)
                                            setFormData(prev => ({ ...prev, logo: '' }))
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '30px',
                                            height: '30px',
                                            background: '#e74c3c',
                                            border: 'none',
                                            borderRadius: '50%',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                        border: '2px dashed rgba(33, 187, 159, 0.3)',
                                        borderRadius: '12px',
                                        padding: '40px 30px',
                                        textAlign: 'center',
                                        background: 'rgba(33, 187, 159, 0.02)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'rgba(33, 187, 159, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 15px'
                                    }}>
                                        <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '20px', color: '#21BB9F' }}></i>
                                    </div>
                                    <p style={{ color: '#21BB9F', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>
                                        Logo Yükle
                                    </p>
                                    <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>
                                        PNG, JPG, SVG veya WEBP
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: (loading || uploading) ? '#ccc' : 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: (loading || uploading) ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: (loading || uploading) ? 'none' : '0 4px 15px rgba(33, 187, 159, 0.3)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-check"></i>
                                    Referansı Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
            <style jsx>{`
                @media (max-width: 992px) {
                    .form-grid {
                        grid-template-columns: 1fr !important;
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
                }
            `}</style>
        </div>
    )
}
