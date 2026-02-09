'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function UrunEkle() {
    const router = useRouter()
    const fileInputRef = useRef(null)
    const docInputRef = useRef(null)
    const accInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
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
        featuresText: '',
        documents: [],
        accessories: [],
        status: 'Aktif',
        featured: false
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (formData.kategori_id) {
            fetchKategoriMarkalar(formData.kategori_id)
        } else {
            setFilteredMarkalar(markalar)
        }
    }, [formData.kategori_id])

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
        } catch (error) {
            console.error('Hata:', error)
        }
    }

    const fetchKategoriMarkalar = async (kategoriId) => {
        try {
            const res = await fetch(`/api/markalar?kategori=${kategoriId}`)
            if (res.ok) {
                const data = await res.json()
                setFilteredMarkalar(data)
                if (formData.marka_id && !data.find(m => m.id == formData.marka_id)) {
                    setFormData(prev => ({ ...prev, marka_id: '' }))
                }
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

        if (name === 'name') {
            const slug = value.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
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
            if (formData.slug) {
                uploadFormData.append('slug', formData.slug)
            }

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
                if (formData.slug) {
                    uploadFormData.append('slug', formData.slug)
                }

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

        // Uploading durumunu güncelle
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
                // Dosya adını otomatik doldur (eğer boşsa)
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

        if (!formData.kategori_id) {
            alert('Lütfen kategori seçin')
            return
        }

        setLoading(true)
        try {
            // featuresText'i features dizisine dönüştür
            const features = formData.featuresText ? formData.featuresText.split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    const colonIndex = line.indexOf(':');
                    if (colonIndex > 0) {
                        return { label: line.substring(0, colonIndex).trim(), value: line.substring(colonIndex + 1).trim() };
                    }
                    return { label: '', value: line.trim() };
                }) : [];

            const submitData = {
                ...formData,
                features,
                documents: formData.documents.filter(d => d.name.trim() !== ''),
                accessories: formData.accessories.filter(a => a.name.trim() !== '')
            }

            const res = await fetch('/api/urunler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            })

            if (res.ok) {
                alert('Ürün başarıyla eklendi!')
                router.push('/admin/urunler')
            } else {
                const data = await res.json()
                alert(data.error || 'Bir hata oluştu')
            }
        } catch (error) {
            alert('Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '600', color: '#1A1A1A', marginBottom: '5px' }}>
                            Yeni Ürün Ekle
                        </h1>
                        <p style={{ color: '#666', marginBottom: 0 }}>Yeni bir ürün oluşturun</p>
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
                            <textarea
                                name="featuresText"
                                value={formData.featuresText || ''}
                                onChange={handleChange}
                                rows={8}
                                style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical', lineHeight: '1.6' }}
                                placeholder="Her satıra bir özellik yazın, örnek:&#10;Ekran: 6.0 inch FHD&#10;İşlemci: Qualcomm 4490&#10;Batarya: 4500 mAh&#10;Koruma: IP65 + IP68"
                            />
                            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                                <i className="fa-solid fa-info-circle" style={{ marginRight: '5px' }}></i>
                                Her satıra bir özellik yazın. "Özellik: Değer" formatında veya sadece metin olarak.
                            </p>
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
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>Marka</label>
                                <select name="marka_id" value={formData.marka_id} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                                    <option value="">Marka Seçin (İsteğe Bağlı)</option>
                                    {filteredMarkalar.map(marka => (
                                        <option key={marka.id} value={marka.id}>{marka.name}</option>
                                    ))}
                                </select>
                                {formData.kategori_id && filteredMarkalar.length === 0 && (
                                    <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>
                                        <i className="fa-solid fa-info-circle" style={{ marginRight: '5px' }}></i>
                                        Bu kategoride tanımlı marka yok.
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
                        <button type="submit" disabled={loading || uploading}
                            style={{
                                width: '100%', padding: '16px', background: (loading || uploading) ? '#ccc' : 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                                cursor: (loading || uploading) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                            {loading ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...</>
                            ) : (
                                <><i className="fa-solid fa-check"></i> Ürünü Kaydet</>
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
