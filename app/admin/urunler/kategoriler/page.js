'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function AdminKategoriler() {
    const [kategoriler, setKategoriler] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingKategori, setEditingKategori] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        icon: 'fa-box',
        image: '',
        description: '',
        status: 'Aktif',
        sort_order: 0
    })

    useEffect(() => {
        fetchKategoriler()
    }, [])

    const fetchKategoriler = async () => {
        try {
            const res = await fetch('/api/kategoriler')
            if (res.ok) {
                const data = await res.json()
                setKategoriler(data)
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

        // İsim değiştiğinde otomatik slug oluştur
        if (name === 'name' && !editingKategori) {
            const slug = value.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }

    const handleImageUpload = async (file) => {
        if (!file) return

        setImageUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'kategori')

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
            setImageUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingKategori ? `/api/kategoriler/${editingKategori.id}` : '/api/kategoriler'
            const method = editingKategori ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert(editingKategori ? 'Kategori güncellendi!' : 'Kategori eklendi!')
                setShowModal(false)
                setEditingKategori(null)
                setFormData({ name: '', slug: '', icon: 'fa-box', image: '', description: '', status: 'Aktif', sort_order: 0 })
                fetchKategoriler()
            } else {
                const data = await res.json()
                alert(data.error || 'Bir hata oluştu')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        }
    }

    const handleEdit = (kategori) => {
        setEditingKategori(kategori)
        setFormData({
            name: kategori.name,
            slug: kategori.slug,
            icon: kategori.icon,
            image: kategori.image || '',
            description: kategori.description || '',
            status: kategori.status,
            sort_order: kategori.sort_order
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/kategoriler/${id}`, { method: 'DELETE' })
                if (res.ok) {
                    fetchKategoriler()
                } else {
                    const data = await res.json()
                    alert(data.error || 'Silme işlemi başarısız')
                }
            } catch (error) {
                alert('Bir hata oluştu')
            }
        }
    }

    const iconOptions = [
        'fa-box', 'fa-mobile-screen-button', 'fa-print', 'fa-qrcode', 'fa-desktop',
        'fa-wifi', 'fa-gears', 'fa-tags', 'fa-barcode', 'fa-laptop', 'fa-tablet',
        'fa-server', 'fa-database', 'fa-microchip', 'fa-robot'
    ]

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
                            Ürün Kategorileri
                        </h1>
                        <p style={{ color: '#666', marginBottom: 0 }}>
                            Toplam {kategoriler.length} kategori bulunmaktadır
                        </p>
                    </div>
                    <button
                        onClick={() => { setShowModal(true); setEditingKategori(null); setFormData({ name: '', slug: '', icon: 'fa-box', image: '', description: '', status: 'Aktif', sort_order: 0 }) }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            borderRadius: '10px',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Kategori
                    </button>
                </div>
            </div>

            {/* Kategori Listesi */}
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>İkon</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Kategori Adı</th>
                            <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Slug</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>Marka</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>Ürün</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>Durum</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kategoriler.map((kat) => (
                            <tr key={kat.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <i className={`fa-solid ${kat.icon}`} style={{ color: '#fff', fontSize: '16px' }}></i>
                                    </div>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <p style={{ fontWeight: '600', color: '#161540', marginBottom: '3px' }}>{kat.name}</p>
                                    <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{kat.description?.substring(0, 50)}...</p>
                                </td>
                                <td style={{ padding: '15px 20px', fontSize: '13px', color: '#666' }}>{kat.slug}</td>
                                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                    <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                                        {kat.marka_sayisi || 0}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                    <span style={{ background: '#fff3e0', color: '#f57c00', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                                        {kat.urun_sayisi || 0}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                    <span style={{
                                        background: kat.status === 'Aktif' ? 'rgba(33, 187, 159, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: kat.status === 'Aktif' ? '#21BB9F' : '#ef4444',
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500'
                                    }}>
                                        {kat.status}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button onClick={() => handleEdit(kat)} style={{
                                            width: '32px', height: '32px', background: 'rgba(33, 187, 159, 0.1)', border: 'none',
                                            borderRadius: '8px', color: '#21BB9F', cursor: 'pointer'
                                        }}>
                                            <i className="fa-solid fa-pen" style={{ fontSize: '12px' }}></i>
                                        </button>
                                        <button onClick={() => handleDelete(kat.id)} style={{
                                            width: '32px', height: '32px', background: 'rgba(239, 68, 68, 0.1)', border: 'none',
                                            borderRadius: '8px', color: '#ef4444', cursor: 'pointer'
                                        }}>
                                            <i className="fa-solid fa-trash" style={{ fontSize: '12px' }}></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px',
                        maxHeight: '90vh', overflowY: 'auto', margin: '20px'
                    }}>
                        <div style={{ padding: '20px 25px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#161540' }}>
                                {editingKategori ? 'Kategori Düzenle' : 'Yeni Kategori'}
                            </h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Kategori Adı *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Örn: El Terminalleri" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="el-terminalleri" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>İkon</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {iconOptions.map(icon => (
                                        <button key={icon} type="button" onClick={() => setFormData(prev => ({ ...prev, icon }))}
                                            style={{
                                                width: '40px', height: '40px', borderRadius: '8px', border: formData.icon === icon ? '2px solid #21BB9F' : '1px solid #e0e0e0',
                                                background: formData.icon === icon ? 'rgba(33, 187, 159, 0.1)' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                            <i className={`fa-solid ${icon}`} style={{ color: formData.icon === icon ? '#21BB9F' : '#666' }}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Görsel</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={imageUploading}
                                        style={{
                                            padding: '12px 20px',
                                            background: imageUploading ? '#ccc' : 'rgba(33, 187, 159, 0.1)',
                                            border: '1px dashed #21BB9F',
                                            borderRadius: '10px',
                                            color: '#21BB9F',
                                            cursor: imageUploading ? 'not-allowed' : 'pointer',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {imageUploading ? (
                                            <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                        ) : (
                                            <><i className="fa-solid fa-cloud-arrow-up"></i> Görsel Yükle</>
                                        )}
                                    </button>
                                    {formData.image && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src={formData.image} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e0e0e0' }} />
                                            <span style={{ fontSize: '12px', color: '#21BB9F' }}><i className="fa-solid fa-check-circle"></i> Yüklendi</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Açıklama</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                                    placeholder="Kategori açıklaması..." />
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
                                {editingKategori ? 'Güncelle' : 'Kategori Ekle'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; }
                    .page-title { font-size: 22px !important; }
                    table { display: block; overflow-x: auto; }
                }
            `}</style>
        </div>
    )
}
