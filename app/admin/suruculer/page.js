'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function AdminSuruculer() {
    const [suruculer, setSuruculer] = useState([])
    const [kategoriler, setKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)

    const [formData, setFormData] = useState({
        urun_adi: '',
        surucu_adi: '',
        dosya_url: '',
        dosya_boyutu: '',
        versiyon: '',
        isletim_sistemi: 'Windows 10/11',
        aciklama: '',
        status: 'Aktif',
        kategori_id: '',
        marka_id: ''
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [suruculerRes, kategorilerRes, markalarRes] = await Promise.all([
                fetch('/api/suruculer'),
                fetch('/api/kategoriler'),
                fetch('/api/markalar')
            ])
            if (suruculerRes.ok) setSuruculer(await suruculerRes.json())
            if (kategorilerRes.ok) setKategoriler(await kategorilerRes.json())
            if (markalarRes.ok) setMarkalar(await markalarRes.json())
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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'surucu')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            if (res.ok) {
                const data = await res.json()
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                setFormData(prev => ({
                    ...prev,
                    dosya_url: data.url,
                    dosya_boyutu: fileSizeMB,
                    surucu_adi: prev.surucu_adi || file.name.replace(/\.[^/.]+$/, '')
                }))
            } else {
                alert('Dosya yüklenirken hata oluştu!')
            }
        } catch (err) {
            alert('Dosya yüklenirken hata oluştu!')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.urun_adi || !formData.surucu_adi || !formData.dosya_url) {
            alert('Lütfen zorunlu alanları doldurun')
            return
        }

        try {
            const url = editingId ? `/api/suruculer/${editingId}` : '/api/suruculer'
            const method = editingId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                fetchData()
                closeModal()
            } else {
                alert('İşlem başarısız')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        }
    }

    const handleEdit = (surucu) => {
        setEditingId(surucu.id)
        setFormData({
            urun_adi: surucu.urun_adi,
            surucu_adi: surucu.surucu_adi,
            dosya_url: surucu.dosya_url,
            dosya_boyutu: surucu.dosya_boyutu || '',
            versiyon: surucu.versiyon || '',
            isletim_sistemi: surucu.isletim_sistemi || 'Windows 10/11',
            aciklama: surucu.aciklama || '',
            status: surucu.status,
            kategori_id: surucu.kategori_id || '',
            marka_id: surucu.marka_id || ''
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Bu sürücüyü silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/suruculer/${id}`, { method: 'DELETE' })
                if (res.ok) fetchData()
            } catch (error) {
                alert('Silme işlemi başarısız')
            }
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingId(null)
        setFormData({
            urun_adi: '',
            surucu_adi: '',
            dosya_url: '',
            dosya_boyutu: '',
            versiyon: '',
            isletim_sistemi: 'Windows 10/11',
            aciklama: '',
            status: 'Aktif',
            kategori_id: '',
            marka_id: ''
        })
    }

    // Ürün adlarına göre grupla
    const groupedSuruculer = suruculer.reduce((acc, surucu) => {
        if (!acc[surucu.urun_adi]) {
            acc[surucu.urun_adi] = []
        }
        acc[surucu.urun_adi].push(surucu)
        return acc
    }, {})

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
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)',
                            color: '#fff', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '500', marginBottom: '15px'
                        }}>
                            <i className="fa-solid fa-download"></i>
                            Sürücü Yönetimi
                        </span>
                        <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '700', color: '#161540', marginBottom: '8px', fontFamily: '"DM Serif Display", serif' }}>
                            <span style={{ color: '#21BB9F' }}>Ürün</span> Sürücüleri
                        </h1>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: 0 }}>
                            Toplam {suruculer.length} sürücü, {Object.keys(groupedSuruculer).length} ürün için
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)', borderRadius: '12px',
                            color: '#fff', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Sürücü Ekle
                    </button>
                </div>
            </div>

            {/* Sürücü Listesi */}
            {suruculer.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(33, 187, 159, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <i className="fa-solid fa-download" style={{ fontSize: '35px', color: '#21BB9F' }}></i>
                    </div>
                    <h3 style={{ color: '#161540', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>Sürücü bulunamadı</h3>
                    <p style={{ color: '#999', marginBottom: '25px' }}>Henüz sürücü eklenmemiş.</p>
                    <button onClick={() => setShowModal(true)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px',
                        background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)', color: '#fff',
                        border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer'
                    }}>
                        <i className="fa-solid fa-plus"></i> İlk Sürücüyü Ekle
                    </button>
                </div>
            ) : (
                <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa' }}>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Ürün Adı</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Sürücü Adı</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Versiyon</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>İşletim Sistemi</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Boyut</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>İndirme</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>Durum</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suruculer.map((surucu, index) => (
                                <tr key={surucu.id} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{ fontWeight: '600', color: '#161540' }}>{surucu.urun_adi}</span>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <i className="fa-solid fa-file-zipper" style={{ color: '#21BB9F', fontSize: '18px' }}></i>
                                            <span style={{ color: '#333' }}>{surucu.surucu_adi}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 20px', color: '#666' }}>{surucu.versiyon || '-'}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                                            {surucu.isletim_sistemi || 'Windows'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', color: '#666' }}>{surucu.dosya_boyutu || '-'}</td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                        <span style={{ background: 'rgba(33, 187, 159, 0.1)', color: '#21BB9F', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                                            {surucu.indirme_sayisi || 0}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                        <span style={{
                                            background: surucu.status === 'Aktif' ? 'rgba(33, 187, 159, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: surucu.status === 'Aktif' ? '#21BB9F' : '#ef4444',
                                            padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500'
                                        }}>
                                            {surucu.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button onClick={() => handleEdit(surucu)} style={{
                                                padding: '8px 12px', background: 'rgba(33, 187, 159, 0.1)', border: 'none',
                                                borderRadius: '8px', color: '#21BB9F', cursor: 'pointer', fontSize: '12px'
                                            }}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button onClick={() => handleDelete(surucu.id)} style={{
                                                padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: 'none',
                                                borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px'
                                            }}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#161540', margin: 0 }}>
                                {editingId ? 'Sürücü Düzenle' : 'Yeni Sürücü Ekle'}
                            </h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Ürün Adı *</label>
                                <input type="text" name="urun_adi" value={formData.urun_adi} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Örn: Zebra TC21" />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Sürücü Dosyası *</label>
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".zip,.rar,.exe,.msi,.inf,.cat" style={{ display: 'none' }} />
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                                        style={{
                                            padding: '12px 20px', background: uploading ? '#ccc' : 'rgba(33, 187, 159, 0.1)',
                                            border: 'none', borderRadius: '10px', color: '#21BB9F', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '13px'
                                        }}>
                                        {uploading ? (
                                            <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                        ) : (
                                            <><i className="fa-solid fa-upload"></i> Dosya Seç</>
                                        )}
                                    </button>
                                    {formData.dosya_url && (
                                        <span style={{ color: '#21BB9F', fontSize: '13px' }}>
                                            <i className="fa-solid fa-check-circle"></i> Dosya yüklendi
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Sürücü Adı *</label>
                                <input type="text" name="surucu_adi" value={formData.surucu_adi} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Örn: USB Driver" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Kategori</label>
                                    <select name="kategori_id" value={formData.kategori_id} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                        <option value="">Seçiniz</option>
                                        {kategoriler.map(kat => (
                                            <option key={kat.id} value={kat.id}>{kat.name || kat.ad}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Marka</label>
                                    <select name="marka_id" value={formData.marka_id} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                        <option value="">Seçiniz</option>
                                        {markalar.map(marka => (
                                            <option key={marka.id} value={marka.id}>{marka.name || marka.ad}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Versiyon</label>
                                    <input type="text" name="versiyon" value={formData.versiyon} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        placeholder="Örn: v2.1.0" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>İşletim Sistemi</label>
                                    <select name="isletim_sistemi" value={formData.isletim_sistemi} onChange={handleChange}
                                        style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                        <option value="Windows 10/11">Windows 10/11</option>
                                        <option value="Windows 7/8">Windows 7/8</option>
                                        <option value="macOS">macOS</option>
                                        <option value="Linux">Linux</option>
                                        <option value="Tümü">Tümü</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Açıklama</label>
                                <textarea name="aciklama" value={formData.aciklama} onChange={handleChange} rows={3}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                                    placeholder="Sürücü hakkında açıklama..." />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Durum</label>
                                <select name="status" value={formData.status} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Pasif">Pasif</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={closeModal}
                                    style={{ flex: 1, padding: '14px', background: '#f0f0f0', border: 'none', borderRadius: '10px', color: '#666', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                                    İptal
                                </button>
                                <button type="submit"
                                    style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                                    {editingId ? 'Güncelle' : 'Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 992px) {
                    table { display: block; overflow-x: auto; }
                }
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; }
                    .page-title { font-size: 22px !important; }
                }
            `}</style>
        </div>
    )
}
