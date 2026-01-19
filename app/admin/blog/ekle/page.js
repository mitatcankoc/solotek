'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogEkle() {
    const router = useRouter()
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        image: '',
        status: 'Taslak'
    })

    const categories = ['Teknoloji', 'Barkod', 'Yazılım', 'POS', 'Terazi', 'Haberler']

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
            uploadFormData.append('type', 'blog')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            if (res.ok) {
                const data = await res.json()
                setFormData(prev => ({ ...prev, image: data.url }))
            } else {
                alert('Görsel yüklenirken hata oluştu!')
            }
        } catch (err) {
            alert('Görsel yüklenirken hata oluştu!')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert('Blog yazısı başarıyla eklendi!')
                router.push('/admin/blog')
            } else {
                throw new Error('Hata oluştu')
            }
        } catch (err) {
            alert('Blog eklenirken hata oluştu!')
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
                            Yeni Blog Yazısı
                        </span>
                        <h1 className="page-title" style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#161540',
                            marginBottom: '8px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            <span style={{ color: '#21BB9F' }}>Blog</span> Yazısı Ekle
                        </h1>
                        <p style={{ color: '#666', fontSize: '15px', marginBottom: 0 }}>
                            Yeni bir blog yazısı oluşturun
                        </p>
                    </div>
                    <Link
                        href="/admin/blog"
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
                                Başlık *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Blog başlığını girin..."
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
                                İçerik *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Blog içeriğini yazın..."
                                rows={15}
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    resize: 'vertical',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    lineHeight: '1.6'
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Sağ Kolon */}
                    <div>
                        {/* Yayın Ayarları */}
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
                                <i className="fa-solid fa-cog" style={{ color: '#21BB9F' }}></i>
                                Yayın Ayarları
                            </h3>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>
                                    Kategori *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        background: '#fff'
                                    }}
                                    required
                                >
                                    <option value="">Kategori Seçin</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#666'
                                }}>
                                    Durum
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        background: '#fff'
                                    }}
                                >
                                    <option value="Taslak">Taslak</option>
                                    <option value="Yayında">Yayında</option>
                                </select>
                            </div>
                        </div>

                        {/* Kapak Görseli */}
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
                                Kapak Görseli
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
                                    <img
                                        src={imagePreview}
                                        alt="Önizleme"
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                    />
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
                                            setFormData(prev => ({ ...prev, image: '' }))
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
                                        Görsel Yükle
                                    </p>
                                    <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>
                                        PNG, JPG veya WEBP
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
                                    Blog Yazısını Kaydet
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
