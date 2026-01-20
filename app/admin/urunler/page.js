'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminUrunler() {
    const [urunler, setUrunler] = useState([])
    const [kategoriler, setKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedKategori, setSelectedKategori] = useState('')
    const [selectedMarka, setSelectedMarka] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchUrunler()
    }, [selectedKategori, selectedMarka])

    const fetchData = async () => {
        try {
            const [katRes, markaRes] = await Promise.all([
                fetch('/api/kategoriler'),
                fetch('/api/markalar')
            ])
            if (katRes.ok) {
                const katData = await katRes.json()
                setKategoriler(Array.isArray(katData) ? katData : [])
            }
            if (markaRes.ok) {
                const markaData = await markaRes.json()
                setMarkalar(Array.isArray(markaData) ? markaData : [])
            }
            await fetchUrunler()
        } catch (error) {
            console.error('Hata:', error)
            setKategoriler([])
            setMarkalar([])
        }
    }

    const fetchUrunler = async () => {
        setLoading(true)
        try {
            let url = '/api/urunler?'
            if (selectedKategori) url += `kategori=${selectedKategori}&`
            if (selectedMarka) url += `marka=${selectedMarka}&`

            const res = await fetch(url)
            if (res.ok) {
                const data = await res.json()
                setUrunler(Array.isArray(data) ? data : [])
            } else {
                setUrunler([])
            }
        } catch (error) {
            console.error('Hata:', error)
            setUrunler([])
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/urunler/${id}`, { method: 'DELETE' })
                if (res.ok) {
                    fetchUrunler()
                } else {
                    alert('Silme işlemi başarısız')
                }
            } catch (error) {
                alert('Bir hata oluştu')
            }
        }
    }

    if (loading && urunler.length === 0) {
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
                            <i className="fa-solid fa-box"></i>
                            Ürün Yönetimi
                        </span>
                        <h1 className="page-title" style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#161540',
                            marginBottom: '8px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            <span style={{ color: '#21BB9F' }}>Tüm</span> Ürünler
                        </h1>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: 0 }}>
                            Toplam {urunler.length} ürün bulunmaktadır
                        </p>
                    </div>
                    <Link
                        href="/admin/urunler/ekle"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 28px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            borderRadius: '12px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Ürün Ekle
                    </Link>
                </div>
            </div>

            {/* Filtreler */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '20px 25px',
                marginBottom: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-filter" style={{ color: '#21BB9F' }}></i>
                    <span style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>Filtrele:</span>
                </div>
                <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    style={{
                        padding: '10px 15px',
                        border: '2px solid #f0f0f0',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff',
                        minWidth: '180px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease'
                    }}
                >
                    <option value="">Tüm Kategoriler</option>
                    {kategoriler.map(kat => (
                        <option key={kat.id} value={kat.id}>{kat.name}</option>
                    ))}
                </select>
                <select
                    value={selectedMarka}
                    onChange={(e) => setSelectedMarka(e.target.value)}
                    style={{
                        padding: '10px 15px',
                        border: '2px solid #f0f0f0',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#fff',
                        minWidth: '180px',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">Tüm Markalar</option>
                    {markalar.map(marka => (
                        <option key={marka.id} value={marka.id}>{marka.name}</option>
                    ))}
                </select>
                {(selectedKategori || selectedMarka) && (
                    <button
                        onClick={() => { setSelectedKategori(''); setSelectedMarka('') }}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            color: '#ef4444',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <i className="fa-solid fa-times"></i>
                        Temizle
                    </button>
                )}
            </div>

            {/* Ürün Listesi */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F' }}></i>
                </div>
            ) : urunler.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(33, 187, 159, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: '35px', color: '#21BB9F' }}></i>
                    </div>
                    <h3 style={{ color: '#161540', marginBottom: '10px', fontSize: '20px', fontWeight: '600' }}>Ürün bulunamadı</h3>
                    <p style={{ color: '#999', marginBottom: '25px' }}>Henüz ürün eklenmemiş veya filtrelere uygun ürün yok.</p>
                    <Link href="/admin/urunler/ekle" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)'
                    }}>
                        <i className="fa-solid fa-plus"></i> İlk Ürünü Ekle
                    </Link>
                </div>
            ) : (
                <div className="urun-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {urunler.map((urun) => (
                        <div key={urun.id} style={{
                            background: '#fff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                            className="urun-card"
                        >
                            <div style={{ position: 'relative', height: '180px', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                                {urun.image ? (
                                    <img src={urun.image} alt={urun.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <i className="fa-solid fa-image" style={{ fontSize: '40px', color: '#ddd' }}></i>
                                    </div>
                                )}
                                {Boolean(urun.featured) && (
                                    <span style={{
                                        position: 'absolute', top: '10px', left: '10px',
                                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                        color: '#fff',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                                    }}>
                                        <i className="fa-solid fa-star" style={{ marginRight: '4px' }}></i> Öne Çıkan
                                    </span>
                                )}
                                <span style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    background: urun.status === 'Aktif' ? 'rgba(33, 187, 159, 0.95)' : 'rgba(239, 68, 68, 0.95)',
                                    color: '#fff',
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {urun.status}
                                </span>
                            </div>
                            <div style={{ padding: '18px' }}>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    <span style={{
                                        background: 'rgba(33, 187, 159, 0.1)',
                                        color: '#21BB9F',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '500'
                                    }}>
                                        {urun.kategori_adi}
                                    </span>
                                    <span style={{
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        color: '#8b5cf6',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '11px',
                                        fontWeight: '500'
                                    }}>
                                        {urun.marka_adi}
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#161540',
                                    marginBottom: '8px',
                                    lineHeight: '1.4',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {urun.name}
                                </h3>
                                <p style={{
                                    fontSize: '13px',
                                    color: '#888',
                                    marginBottom: '15px',
                                    lineHeight: '1.5',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {urun.short_description}
                                </p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link href={`/admin/urunler/duzenle/${urun.id}`} style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: 'rgba(33, 187, 159, 0.1)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#21BB9F',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        textAlign: 'center',
                                        fontWeight: '500',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <i className="fa-solid fa-pen" style={{ marginRight: '6px' }}></i> Düzenle
                                    </Link>
                                    <button onClick={() => handleDelete(urun.id)} style={{
                                        padding: '10px 14px',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <i className="fa-solid fa-trash" style={{ fontSize: '13px' }}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .urun-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                }
                @media (max-width: 1200px) {
                    .urun-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
                @media (max-width: 992px) {
                    .urun-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 768px) {
                    .page-header { flex-direction: column !important; align-items: stretch !important; }
                    .page-title { font-size: 22px !important; }
                    .urun-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    )
}
