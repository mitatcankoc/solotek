'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function AdminMarkalar() {
    const [markalar, setMarkalar] = useState([])
    const [kategoriler, setKategoriler] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingMarka, setEditingMarka] = useState(null)
    const [logoUploading, setLogoUploading] = useState(false)
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        logo: '',
        description: '',
        website: '',
        status: 'Aktif',
        sort_order: 0,
        kategoriler: []
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [markaRes, katRes] = await Promise.all([
                fetch('/api/markalar'),
                fetch('/api/kategoriler')
            ])
            if (markaRes.ok) setMarkalar(await markaRes.json())
            if (katRes.ok) setKategoriler(await katRes.json())
        } catch (error) {
            console.error('Hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        if (name === 'name' && !editingMarka) {
            const slug = value.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }

    const handleKategoriToggle = (kategoriId) => {
        setFormData(prev => ({
            ...prev,
            kategoriler: prev.kategoriler.includes(kategoriId)
                ? prev.kategoriler.filter(id => id !== kategoriId)
                : [...prev.kategoriler, kategoriId]
        }))
    }

    const handleLogoUpload = async (file) => {
        if (!file) return

        setLogoUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'marka')

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
            setLogoUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingMarka ? `/api/markalar/${editingMarka.id}` : '/api/markalar'
            const method = editingMarka ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert(editingMarka ? 'Marka güncellendi!' : 'Marka eklendi!')
                setShowModal(false)
                setEditingMarka(null)
                resetForm()
                fetchData()
            } else {
                const data = await res.json()
                alert(data.error || 'Bir hata oluştu')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        }
    }

    const resetForm = () => {
        setFormData({ name: '', slug: '', logo: '', description: '', website: '', status: 'Aktif', sort_order: 0, kategoriler: [] })
    }

    const handleEdit = async (marka) => {
        // Markanın kategorilerini getir
        try {
            const res = await fetch(`/api/markalar/${marka.id}`)
            if (res.ok) {
                const data = await res.json()
                setEditingMarka(marka)
                setFormData({
                    name: data.name,
                    slug: data.slug,
                    logo: data.logo || '',
                    description: data.description || '',
                    website: data.website || '',
                    status: data.status,
                    sort_order: data.sort_order,
                    kategoriler: data.kategoriler?.map(k => k.id) || []
                })
                setShowModal(true)
            }
        } catch (error) {
            console.error('Hata:', error)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu markayı silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/markalar/${id}`, { method: 'DELETE' })
                if (res.ok) {
                    fetchData()
                } else {
                    const data = await res.json()
                    alert(data.error || 'Silme işlemi başarısız')
                }
            } catch (error) {
                alert('Bir hata oluştu')
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
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '600', color: '#1A1A1A', marginBottom: '5px' }}>
                            Markalar
                        </h1>
                        <p style={{ color: '#666', marginBottom: 0 }}>
                            Toplam {markalar.length} marka bulunmaktadır
                        </p>
                    </div>
                    <button
                        onClick={() => { setShowModal(true); setEditingMarka(null); resetForm() }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)', borderRadius: '10px',
                            color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Marka
                    </button>
                </div>
            </div>

            {/* Marka Kartları */}
            <div className="marka-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {markalar.map((marka) => (
                    <div key={marka.id} style={{
                        background: '#fff', borderRadius: '16px', padding: '20px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', margin: '0 auto 15px',
                            background: '#f8f9fa', borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}>
                            {marka.logo ? (
                                <img src={marka.logo} alt={marka.name} style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'contain' }} />
                            ) : (
                                <i className="fa-solid fa-building" style={{ fontSize: '30px', color: '#ccc' }}></i>
                            )}
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '8px' }}>{marka.name}</h3>
                        <p style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>{marka.slug}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px' }}>
                            <span style={{
                                background: 'rgba(33, 187, 159, 0.1)', color: '#21BB9F',
                                padding: '4px 10px', borderRadius: '15px', fontSize: '11px', fontWeight: '500'
                            }}>
                                {marka.urun_sayisi || 0} ürün
                            </span>
                            <span style={{
                                background: marka.status === 'Aktif' ? 'rgba(33, 187, 159, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: marka.status === 'Aktif' ? '#21BB9F' : '#ef4444',
                                padding: '4px 10px', borderRadius: '15px', fontSize: '11px', fontWeight: '500'
                            }}>
                                {marka.status}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button onClick={() => handleEdit(marka)} style={{
                                flex: 1, padding: '8px', background: 'rgba(33, 187, 159, 0.1)', border: 'none',
                                borderRadius: '8px', color: '#21BB9F', cursor: 'pointer', fontSize: '12px'
                            }}>
                                <i className="fa-solid fa-pen"></i> Düzenle
                            </button>
                            <button onClick={() => handleDelete(marka.id)} style={{
                                padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: 'none',
                                borderRadius: '8px', color: '#ef4444', cursor: 'pointer'
                            }}>
                                <i className="fa-solid fa-trash" style={{ fontSize: '12px' }}></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '550px',
                        maxHeight: '90vh', overflowY: 'auto', margin: '20px'
                    }}>
                        <div style={{ padding: '20px 25px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#161540' }}>
                                {editingMarka ? 'Marka Düzenle' : 'Yeni Marka'}
                            </h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Marka Adı *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Örn: Zebra" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="zebra" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Logo</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={(e) => handleLogoUpload(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={logoUploading}
                                        style={{
                                            padding: '12px 20px',
                                            background: logoUploading ? '#ccc' : 'rgba(33, 187, 159, 0.1)',
                                            border: '1px dashed #21BB9F',
                                            borderRadius: '10px',
                                            color: '#21BB9F',
                                            cursor: logoUploading ? 'not-allowed' : 'pointer',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {logoUploading ? (
                                            <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                        ) : (
                                            <><i className="fa-solid fa-cloud-arrow-up"></i> Logo Yükle</>
                                        )}
                                    </button>
                                    {formData.logo && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src={formData.logo} alt="" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #e0e0e0', background: '#f8f9fa' }} />
                                            <span style={{ fontSize: '12px', color: '#21BB9F' }}><i className="fa-solid fa-check-circle"></i> Yüklendi</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Web Sitesi</label>
                                <input type="url" name="website" value={formData.website} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="https://www.zebra.com" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Açıklama</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                                    placeholder="Marka açıklaması..." />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Kategoriler</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {kategoriler.map(kat => (
                                        <button key={kat.id} type="button" onClick={() => handleKategoriToggle(kat.id)}
                                            style={{
                                                padding: '8px 15px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
                                                border: formData.kategoriler.includes(kat.id) ? '2px solid #21BB9F' : '1px solid #e0e0e0',
                                                background: formData.kategoriler.includes(kat.id) ? 'rgba(33, 187, 159, 0.1)' : '#fff',
                                                color: formData.kategoriler.includes(kat.id) ? '#21BB9F' : '#666'
                                            }}>
                                            <i className={`fa-solid ${kat.icon}`} style={{ marginRight: '6px' }}></i>
                                            {kat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Durum</label>
                                    <select name="status" value={formData.status} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                        <option value="Aktif">Aktif</option>
                                        <option value="Pasif">Pasif</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Sıra</label>
                                    <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
                                </div>
                            </div>
                            <button type="submit" style={{
                                width: '100%', padding: '14px', background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'
                            }}>
                                {editingMarka ? 'Güncelle' : 'Marka Ekle'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 1200px) {
                    .marka-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
                @media (max-width: 992px) {
                    .marka-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; }
                    .page-title { font-size: 22px !important; }
                    .marka-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}
