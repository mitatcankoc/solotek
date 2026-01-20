'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function UrunDuzenle() {
    const router = useRouter()
    const params = useParams()
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [kategoriler, setKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [filteredMarkalar, setFilteredMarkalar] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        kategori_id: '',
        marka_id: '',
        short_description: '',
        description: '',
        image: '',
        gallery: [],
        features: [],
        documents: [],
        accessories: [],
        status: 'Aktif',
        featured: false
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (formData.kategori_id && kategoriler.length > 0) {
            fetchKategoriMarkalar(formData.kategori_id)
        }
    }, [formData.kategori_id, kategoriler])

    const fetchData = async () => {
        try {
            const [katRes, markaRes] = await Promise.all([
                fetch('/api/kategoriler'),
                fetch('/api/markalar')
            ])
            if (katRes.ok) setKategoriler(await katRes.json())
            if (markaRes.ok) {
                const data = await markaRes.json()
                setMarkalar(data)
                setFilteredMarkalar(data)
            }
            await fetchUrun()
        } catch (error) {
            console.error('Hata:', error)
        }
    }

    const fetchUrun = async () => {
        try {
            const res = await fetch(`/api/urunler/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setFormData({
                    name: data.name || '',
                    slug: data.slug || '',
                    kategori_id: data.kategori_id || '',
                    marka_id: data.marka_id || '',
                    short_description: data.short_description || '',
                    description: data.description || '',
                    image: data.image || '',
                    gallery: data.gallery || [],
                    features: data.features || [],
                    documents: data.documents || [],
                    accessories: data.accessories || [],
                    status: data.status || 'Aktif',
                    featured: data.featured || false
                })
                if (data.image) setImagePreview(data.image)
            } else {
                alert('Ürün bulunamadı')
                router.push('/admin/urunler')
            }
        } catch (error) {
            console.error('Hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchKategoriMarkalar = async (kategoriId) => {
        try {
            const res = await fetch(`/api/markalar?kategori=${kategoriId}`)
            if (res.ok) {
                const data = await res.json()
                setFilteredMarkalar(data)
            }
        } catch (error) {
            setFilteredMarkalar(markalar)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => setImagePreview(e.target.result)
        reader.readAsDataURL(file)

        setUploading(true)
        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'urun')

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

    // Galeri görsel yükleme
    const [galleryUploading, setGalleryUploading] = useState(false)
    const galleryInputRef = useRef(null)

    const handleGalleryUpload = async (files) => {
        if (!files || files.length === 0) return

        setGalleryUploading(true)
        const newImages = []

        for (const file of files) {
            try {
                const uploadFormData = new FormData()
                uploadFormData.append('file', file)
                uploadFormData.append('type', 'urun')

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                })

                if (res.ok) {
                    const data = await res.json()
                    newImages.push(data.url)
                }
            } catch (err) {
                console.error('Galeri yükleme hatası:', err)
            }
        }

        setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, ...newImages]
        }))
        setGalleryUploading(false)
    }

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }))
    }

    const setAsMainImage = (galleryIndex) => {
        const galleryImage = formData.gallery[galleryIndex]
        const oldMainImage = formData.image

        setFormData(prev => ({
            ...prev,
            image: galleryImage,
            gallery: prev.gallery.map((img, i) => i === galleryIndex ? oldMainImage : img).filter(Boolean)
        }))
        setImagePreview(galleryImage)
    }

    // Özellik ekleme
    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, { label: '', value: '' }]
        }))
    }

    const updateFeature = (index, field, value) => {
        const newFeatures = [...formData.features]
        newFeatures[index][field] = value
        setFormData(prev => ({ ...prev, features: newFeatures }))
    }

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }))
    }

    // Döküman ekleme
    const addDocument = () => {
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, { name: '', url: '', uploading: false }]
        }))
    }

    const updateDocument = (index, field, value) => {
        const newDocs = [...formData.documents]
        newDocs[index][field] = value
        setFormData(prev => ({ ...prev, documents: newDocs }))
    }

    const removeDocument = (index) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index)
        }))
    }

    const handleDocumentUpload = async (index, file) => {
        if (!file) return

        const newDocs = [...formData.documents]
        newDocs[index].uploading = true
        setFormData(prev => ({ ...prev, documents: newDocs }))

        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'dokuman')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            if (res.ok) {
                const data = await res.json()
                const updatedDocs = [...formData.documents]
                updatedDocs[index].url = data.url
                updatedDocs[index].uploading = false
                if (!updatedDocs[index].name) {
                    updatedDocs[index].name = file.name.replace(/\.[^/.]+$/, '')
                }
                setFormData(prev => ({ ...prev, documents: updatedDocs }))
            } else {
                alert('Dosya yüklenirken hata oluştu!')
                newDocs[index].uploading = false
                setFormData(prev => ({ ...prev, documents: newDocs }))
            }
        } catch (err) {
            alert('Dosya yüklenirken hata oluştu!')
            newDocs[index].uploading = false
            setFormData(prev => ({ ...prev, documents: newDocs }))
        }
    }

    // Aksesuar ekleme
    const addAccessory = () => {
        setFormData(prev => ({
            ...prev,
            accessories: [...prev.accessories, { name: '', image: '', uploading: false }]
        }))
    }

    const updateAccessory = (index, field, value) => {
        const newAcc = [...formData.accessories]
        newAcc[index][field] = value
        setFormData(prev => ({ ...prev, accessories: newAcc }))
    }

    const removeAccessory = (index) => {
        setFormData(prev => ({
            ...prev,
            accessories: prev.accessories.filter((_, i) => i !== index)
        }))
    }

    const handleAccessoryUpload = async (index, file) => {
        if (!file) return

        const newAcc = [...formData.accessories]
        newAcc[index].uploading = true
        setFormData(prev => ({ ...prev, accessories: newAcc }))

        try {
            const uploadFormData = new FormData()
            uploadFormData.append('file', file)
            uploadFormData.append('type', 'aksesuar')

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            })

            if (res.ok) {
                const data = await res.json()
                const updatedAcc = [...formData.accessories]
                updatedAcc[index].image = data.url
                updatedAcc[index].uploading = false
                setFormData(prev => ({ ...prev, accessories: updatedAcc }))
            } else {
                alert('Görsel yüklenirken hata oluştu!')
                newAcc[index].uploading = false
                setFormData(prev => ({ ...prev, accessories: newAcc }))
            }
        } catch (err) {
            alert('Görsel yüklenirken hata oluştu!')
            newAcc[index].uploading = false
            setFormData(prev => ({ ...prev, accessories: newAcc }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.kategori_id || !formData.marka_id) {
            alert('Lütfen kategori ve marka seçin')
            return
        }

        setSaving(true)
        try {
            const submitData = {
                ...formData,
                features: formData.features.filter(f => f.label.trim() !== '' || f.value.trim() !== ''),
                documents: formData.documents.filter(d => d.name.trim() !== ''),
                accessories: formData.accessories.filter(a => a.name.trim() !== '')
            }

            const res = await fetch(`/api/urunler/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            })

            if (res.ok) {
                alert('Ürün başarıyla güncellendi!')
                router.push('/admin/urunler')
            } else {
                const data = await res.json()
                alert(data.error || 'Bir hata oluştu')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        } finally {
            setSaving(false)
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
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '600', color: '#1A1A1A', marginBottom: '5px' }}>
                            Ürün Düzenle
                        </h1>
                        <p style={{ color: '#666', marginBottom: 0 }}>{formData.name}</p>
                    </div>
                    <Link href="/admin/urunler" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        background: '#f0f0f0', borderRadius: '10px', color: '#666', textDecoration: 'none', fontSize: '14px'
                    }}>
                        <i className="fa-solid fa-arrow-left"></i> Geri Dön
                    </Link>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
                    {/* Sol Kolon */}
                    <div>
                        {/* Temel Bilgiler */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-info-circle" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                Temel Bilgiler
                            </h3>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Ürün Adı *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Örn: Zebra TC21 El Terminali" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="zebra-tc21-el-terminali" />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Kısa Açıklama *</label>
                                <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                    placeholder="Kompakt tasarımlı, dayanıklı el terminali" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Ürün Profili (Detaylı Açıklama)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={6}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                                    placeholder="Ürün hakkında detaylı bilgi... (HTML desteklenir)" />
                            </div>
                        </div>

                        {/* Özellikler */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-list-check" style={{ color: '#10b981', marginRight: '10px' }}></i>
                                Teknik Özellikler
                            </h3>
                            {formData.features.map((feature, index) => (
                                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input type="text" value={feature.label} onChange={(e) => updateFeature(index, 'label', e.target.value)}
                                        style={{ flex: '1 1 150px', padding: '10px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        placeholder="Özellik adı (Örn: Ekran)" />
                                    <input type="text" value={feature.value} onChange={(e) => updateFeature(index, 'value', e.target.value)}
                                        style={{ flex: '2 1 250px', padding: '10px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        placeholder="Değer (Örn: 6.0 inch FHD)" />
                                    <button type="button" onClick={() => removeFeature(index)}
                                        style={{ padding: '10px 15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}>
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addFeature}
                                style={{ padding: '10px 20px', background: 'rgba(16, 185, 129, 0.1)', border: 'none', borderRadius: '10px', color: '#10b981', cursor: 'pointer', fontSize: '13px' }}>
                                <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i> Özellik Ekle
                            </button>
                        </div>

                        {/* Dökümanlar */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-file-pdf" style={{ color: '#dc2626', marginRight: '10px' }}></i>
                                Dökümanlar
                            </h3>
                            {formData.documents.map((doc, index) => (
                                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input type="text" value={doc.name} onChange={(e) => updateDocument(index, 'name', e.target.value)}
                                        style={{ flex: '1 1 200px', padding: '10px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        placeholder="Döküman adı (Örn: Spec Sheet)" />

                                    <div style={{ flex: '1 1 250px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={(e) => handleDocumentUpload(index, e.target.files[0])}
                                            style={{ display: 'none' }}
                                            id={`doc-upload-${index}`}
                                        />
                                        <label htmlFor={`doc-upload-${index}`}
                                            style={{
                                                padding: '10px 15px',
                                                background: doc.uploading ? '#ccc' : 'rgba(33, 187, 159, 0.1)',
                                                border: 'none',
                                                borderRadius: '10px',
                                                color: '#21BB9F',
                                                cursor: doc.uploading ? 'not-allowed' : 'pointer',
                                                fontSize: '13px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                            {doc.uploading ? (
                                                <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                            ) : (
                                                <><i className="fa-solid fa-upload"></i> Dosya Seç</>
                                            )}
                                        </label>
                                        {doc.url && (
                                            <span style={{ fontSize: '12px', color: '#21BB9F', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <i className="fa-solid fa-check-circle"></i>
                                                Yüklendi
                                            </span>
                                        )}
                                    </div>

                                    <button type="button" onClick={() => removeDocument(index)}
                                        style={{ padding: '10px 15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}>
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addDocument}
                                style={{ padding: '10px 20px', background: 'rgba(220, 38, 38, 0.1)', border: 'none', borderRadius: '10px', color: '#dc2626', cursor: 'pointer', fontSize: '13px' }}>
                                <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i> Döküman Ekle
                            </button>
                        </div>

                        {/* Aksesuarlar */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-puzzle-piece" style={{ color: '#8b5cf6', marginRight: '10px' }}></i>
                                Aksesuarlar
                            </h3>
                            {formData.accessories.map((acc, index) => (
                                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <input type="text" value={acc.name} onChange={(e) => updateAccessory(index, 'name', e.target.value)}
                                        style={{ flex: '1 1 200px', padding: '10px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
                                        placeholder="Aksesuar adı (Örn: Şarj Ünitesi)" />

                                    <div style={{ flex: '1 1 250px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleAccessoryUpload(index, e.target.files[0])}
                                            style={{ display: 'none' }}
                                            id={`acc-upload-${index}`}
                                        />
                                        <label htmlFor={`acc-upload-${index}`}
                                            style={{
                                                padding: '10px 15px',
                                                background: acc.uploading ? '#ccc' : 'rgba(139, 92, 246, 0.1)',
                                                border: 'none',
                                                borderRadius: '10px',
                                                color: '#8b5cf6',
                                                cursor: acc.uploading ? 'not-allowed' : 'pointer',
                                                fontSize: '13px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                            {acc.uploading ? (
                                                <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                            ) : (
                                                <><i className="fa-solid fa-image"></i> Görsel Seç</>
                                            )}
                                        </label>
                                        {acc.image && (
                                            <img src={acc.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e0e0e0' }} />
                                        )}
                                    </div>

                                    <button type="button" onClick={() => removeAccessory(index)}
                                        style={{ padding: '10px 15px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}>
                                        <i className="fa-solid fa-times"></i>
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addAccessory}
                                style={{ padding: '10px 20px', background: 'rgba(139, 92, 246, 0.1)', border: 'none', borderRadius: '10px', color: '#8b5cf6', cursor: 'pointer', fontSize: '13px' }}>
                                <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i> Aksesuar Ekle
                            </button>
                        </div>
                    </div>

                    {/* Sağ Kolon */}
                    <div>
                        {/* Kategori & Marka */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-tags" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                Kategori & Marka
                            </h3>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Kategori *</label>
                                <select name="kategori_id" value={formData.kategori_id} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                    <option value="">Kategori Seçin</option>
                                    {kategoriler.map(kat => (
                                        <option key={kat.id} value={kat.id}>{kat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Marka *</label>
                                <select name="marka_id" value={formData.marka_id} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                    <option value="">Marka Seçin</option>
                                    {filteredMarkalar.map(marka => (
                                        <option key={marka.id} value={marka.id}>{marka.name}</option>
                                    ))}
                                </select>
                                {formData.kategori_id && filteredMarkalar.length === 0 && (
                                    <p style={{ color: '#f59e0b', fontSize: '12px', marginTop: '8px' }}>
                                        <i className="fa-solid fa-exclamation-triangle" style={{ marginRight: '5px' }}></i>
                                        Bu kategoride tanımlı marka yok. Önce marka ekleyin.
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Görseller */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-images" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                Ürün Görselleri
                            </h3>

                            {/* Ana Görsel */}
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#666' }}>Ana Görsel</label>
                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" style={{ display: 'none' }} />

                            {imagePreview ? (
                                <div style={{ position: 'relative', marginBottom: '15px' }}>
                                    <img src={imagePreview} alt="Önizleme" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                                    {uploading && (
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-spinner fa-spin" style={{ color: '#fff', fontSize: '20px' }}></i>
                                        </div>
                                    )}
                                    <button type="button" onClick={() => fileInputRef.current?.click()}
                                        style={{ position: 'absolute', bottom: '8px', right: '8px', padding: '5px 10px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '11px' }}>
                                        <i className="fa-solid fa-pen" style={{ marginRight: '4px' }}></i> Değiştir
                                    </button>
                                </div>
                            ) : (
                                <div onClick={() => fileInputRef.current?.click()}
                                    style={{ border: '2px dashed #e0e0e0', borderRadius: '10px', padding: '25px', textAlign: 'center', cursor: 'pointer', marginBottom: '15px' }}>
                                    <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '24px', color: '#21BB9F', marginBottom: '8px' }}></i>
                                    <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>Ana Görsel Yükle</p>
                                </div>
                            )}

                            {/* Galeri Görselleri */}
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', color: '#666' }}>
                                Galeri Görselleri
                                <span style={{ color: '#999', fontWeight: '400' }}> (Opsiyonel)</span>
                            </label>
                            <input
                                type="file"
                                ref={galleryInputRef}
                                onChange={(e) => handleGalleryUpload(e.target.files)}
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                            />

                            {formData.gallery.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                                    {formData.gallery.map((img, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={img} alt="" style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                style={{
                                                    position: 'absolute', top: '3px', right: '3px',
                                                    width: '18px', height: '18px',
                                                    background: 'rgba(239, 68, 68, 0.9)',
                                                    border: 'none', borderRadius: '50%',
                                                    color: '#fff', fontSize: '10px',
                                                    cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                            >
                                                <i className="fa-solid fa-times"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setAsMainImage(index)}
                                                title="Ana görsel yap"
                                                style={{
                                                    position: 'absolute', bottom: '3px', left: '3px',
                                                    padding: '2px 5px',
                                                    background: 'rgba(33, 187, 159, 0.9)',
                                                    border: 'none', borderRadius: '4px',
                                                    color: '#fff', fontSize: '9px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <i className="fa-solid fa-star"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                disabled={galleryUploading}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: galleryUploading ? '#ccc' : 'rgba(33, 187, 159, 0.1)',
                                    border: '1px dashed #21BB9F',
                                    borderRadius: '8px',
                                    color: '#21BB9F',
                                    cursor: galleryUploading ? 'not-allowed' : 'pointer',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                {galleryUploading ? (
                                    <><i className="fa-solid fa-spinner fa-spin"></i> Yükleniyor...</>
                                ) : (
                                    <><i className="fa-solid fa-plus"></i> Galeri Görseli Ekle</>
                                )}
                            </button>
                        </div>

                        {/* Durum */}
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#161540', marginBottom: '20px' }}>
                                <i className="fa-solid fa-cog" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                Ayarlar
                            </h3>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Durum</label>
                                <select name="status" value={formData.status} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Pasif">Pasif</option>
                                    <option value="Tükendi">Tükendi</option>
                                </select>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
                                    style={{ width: '18px', height: '18px', accentColor: '#21BB9F' }} />
                                <span style={{ fontSize: '14px', color: '#333' }}>Öne çıkan ürün olarak işaretle</span>
                            </label>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={saving || uploading}
                            style={{
                                width: '100%', padding: '16px', background: (saving || uploading) ? '#ccc' : 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                                cursor: (saving || uploading) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                            {saving ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...</>
                            ) : (
                                <><i className="fa-solid fa-check"></i> Değişiklikleri Kaydet</>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            <style jsx>{`
                @media (max-width: 992px) {
                    .form-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; }
                    .page-title { font-size: 22px !important; }
                }
            `}</style>
        </div>
    )
}
