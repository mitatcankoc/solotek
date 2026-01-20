'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
    const params = useParams()
    const { kategori, marka, urun } = params

    const [urunData, setUrunData] = useState(null)
    const [kategoriData, setKategoriData] = useState(null)
    const [markaData, setMarkaData] = useState(null)
    const [allKategoriler, setAllKategoriler] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

    useEffect(() => {
        fetchData()
    }, [urun])

    const fetchData = async () => {
        try {
            // Tüm kategorileri getir
            const katRes = await fetch('/api/kategoriler')
            if (katRes.ok) {
                const kategoriler = await katRes.json()
                const katArray = Array.isArray(kategoriler) ? kategoriler : []
                setAllKategoriler(katArray)

                const currentKat = katArray.find(k => k.slug === kategori)
                if (currentKat) {
                    setKategoriData(currentKat)
                }
            }

            // Ürünü getir
            const urunRes = await fetch(`/api/urunler/${urun}`)
            if (urunRes.ok) {
                const data = await urunRes.json()
                if (data && !data.error) {
                    setUrunData(data)
                    setKategoriData({ id: data.kategori_id, name: data.kategori_adi, slug: data.kategori_slug })
                    setMarkaData({ id: data.marka_id, name: data.marka_adi, slug: data.marka_slug })

                    // Benzer ürünleri getir
                    const relatedRes = await fetch(`/api/urunler?kategori=${data.kategori_id}&limit=4`)
                    if (relatedRes.ok) {
                        const related = await relatedRes.json()
                        const relatedArray = Array.isArray(related) ? related : []
                        setRelatedProducts(relatedArray.filter(p => p.id !== data.id).slice(0, 4))
                    }
                }
            }
        } catch (error) {
            console.error('Hata:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Yükleniyor...">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!urunData) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Ürün Bulunamadı">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: '50px', color: '#ddd', marginBottom: '20px' }}></i>
                        <h2 style={{ color: '#333', marginBottom: '15px' }}>Ürün Bulunamadı</h2>
                        <Link href="/urunler" style={{ color: '#21BB9F' }}>← Ürünlere Dön</Link>
                    </div>
                </div>
            </Layout>
        )
    }

    // Galeri resimleri
    const allImages = [urunData.image, ...(urunData.gallery || [])].filter(Boolean)

    // Dökümanlar ve aksesuarlar
    const documents = urunData.documents || []
    const accessories = urunData.accessories || []

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} headTitle={`${urunData.name} | Solo Teknoloji`} breadcrumbTitle={urunData.name}>
                <div>
                    {/* Ürün Detay */}
                    <div className="section-padding product-details">
                        <div className="container">
                            <div className="row">
                                {/* Sol - Sidebar (Mobilde altta göster) */}
                                <div className="col-lg-3 col-md-4 order-lg-1 order-2" style={{ marginTop: '30px' }}>
                                    <aside style={{ marginBottom: '30px' }}>
                                        {/* Arama */}
                                        <div className="single-widget padding-less-widget" style={{ marginBottom: '25px' }}>
                                            <h3 style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                marginBottom: '15px',
                                                paddingLeft: '15px',
                                                borderLeft: '3px solid #21bb9f'
                                            }}>Ürün Ara</h3>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const searchValue = e.target.querySelector('input').value;
                                                    if (searchValue.trim()) {
                                                        window.location.href = `/urunler?q=${encodeURIComponent(searchValue)}`;
                                                    }
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    background: '#fff'
                                                }}
                                            >
                                                <input
                                                    type="search"
                                                    placeholder="Ürün adı yazın..."
                                                    style={{
                                                        flex: 1,
                                                        border: 'none',
                                                        padding: '12px 15px',
                                                        outline: 'none',
                                                        fontSize: '14px',
                                                        minWidth: '0'
                                                    }}
                                                />
                                                <button type="submit" style={{
                                                    background: 'linear-gradient(135deg, #21bb9f 0%, #1a9980 100%)',
                                                    border: 'none',
                                                    padding: '12px 18px',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                    flexShrink: 0,
                                                    transition: 'all 0.3s'
                                                }}>
                                                    <i className="fa-solid fa-magnifying-glass" />
                                                </button>
                                            </form>
                                        </div>

                                        {/* Kategoriler */}
                                        <div className="single-widget categories" style={{
                                            marginBottom: '25px',
                                            background: '#fff',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                            borderRadius: '8px',
                                            padding: '20px'
                                        }}>
                                            <h3 style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                marginBottom: '15px',
                                                paddingLeft: '15px',
                                                borderLeft: '3px solid #21bb9f'
                                            }}>Ürünler</h3>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {allKategoriler.filter(k => k.status === 'Aktif').map((cat) => (
                                                    <li key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                                                        <Link
                                                            href={`/urunler/${cat.slug}`}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                padding: '12px 0',
                                                                color: cat.slug === kategori ? '#21bb9f' : '#333',
                                                                fontWeight: cat.slug === kategori ? '600' : '400',
                                                                fontSize: '14px'
                                                            }}
                                                        >
                                                            <span>
                                                                <i className={`fa-solid ${cat.icon || 'fa-box'}`} style={{ marginRight: '10px', width: '18px' }} />
                                                                {cat.name}
                                                            </span>
                                                            <i className="fa-solid fa-angle-right" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Son Eklenenler */}
                                        {relatedProducts.length > 0 && (
                                            <div className="single-widget" style={{
                                                background: '#fff',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                                borderRadius: '8px',
                                                padding: '20px'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    marginBottom: '15px',
                                                    paddingLeft: '15px',
                                                    borderLeft: '3px solid #21bb9f'
                                                }}>Son Eklenenler</h3>
                                                {relatedProducts.slice(0, 3).map((item, index) => (
                                                    <Link href={`/urunler/${kategori}/${marka}/${item.slug}`} key={item.id}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '15px',
                                                            paddingBottom: '15px',
                                                            borderBottom: index < 2 ? '1px solid #eee' : 'none'
                                                        }}>
                                                            <img
                                                                src={item.image || 'https://www.janusbarkod.com.tr/upload/38/mobile.jpg'}
                                                                alt={item.name}
                                                                style={{
                                                                    width: '60px',
                                                                    height: '60px',
                                                                    objectFit: 'contain',
                                                                    marginRight: '12px'
                                                                }}
                                                            />
                                                            <div>
                                                                <h6 style={{
                                                                    fontSize: '13px',
                                                                    fontWeight: '600',
                                                                    marginBottom: '5px',
                                                                    color: '#161540'
                                                                }}>{item.name}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </aside>
                                </div>

                                {/* Sağ - Ana İçerik (Mobilde önce göster) */}
                                <div className="col-lg-9 col-md-8 order-lg-2 order-1">
                                    <div className="single-product-area mb-80">
                                        <div className="row">
                                            {/* Ürün Görseli */}
                                            <div className="col-md-5 col-sm-5 col-xs-12">
                                                <div className="imgs-zoom-area">
                                                    <div
                                                        style={{
                                                            border: '1px solid #eee',
                                                            borderRadius: '8px',
                                                            marginBottom: '15px',
                                                            background: '#fff',
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                                                        }}
                                                        onMouseEnter={() => setIsZoomed(true)}
                                                        onMouseLeave={() => {
                                                            setIsZoomed(false)
                                                            setZoomPosition({ x: 50, y: 50 })
                                                        }}
                                                        onMouseMove={(e) => {
                                                            if (!isZoomed) return
                                                            const rect = e.currentTarget.getBoundingClientRect()
                                                            const x = ((e.clientX - rect.left) / rect.width) * 100
                                                            const y = ((e.clientY - rect.top) / rect.height) * 100
                                                            setZoomPosition({ x, y })
                                                        }}
                                                    >
                                                        <div style={{
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            transition: 'transform 0.1s ease-out',
                                                            transform: isZoomed ? 'scale(2)' : 'scale(1)',
                                                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                                                        }}>
                                                            <img
                                                                src={allImages[selectedImage] || 'https://www.janusbarkod.com.tr/upload/38/mobile.jpg'}
                                                                alt={urunData.name}
                                                                style={{
                                                                    maxWidth: '100%',
                                                                    maxHeight: '350px',
                                                                    objectFit: 'contain',
                                                                    pointerEvents: 'none'
                                                                }}
                                                            />
                                                        </div>
                                                        {/* Zoom İkonu */}
                                                        {!isZoomed && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '10px',
                                                                right: '10px',
                                                                background: 'rgba(33, 187, 159, 0.9)',
                                                                color: '#fff',
                                                                padding: '6px 10px',
                                                                borderRadius: '6px',
                                                                fontSize: '12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '5px'
                                                            }}>
                                                                <i className="fa-solid fa-search-plus"></i>
                                                                Yakınlaştır
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Thumbnail Galerisi */}
                                                    {allImages.length > 1 && (
                                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                            {allImages.map((img, index) => (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => setSelectedImage(index)}
                                                                    style={{
                                                                        width: '60px',
                                                                        height: '60px',
                                                                        border: selectedImage === index ? '2px solid #21bb9f' : '1px solid #eee',
                                                                        borderRadius: '4px',
                                                                        padding: '5px',
                                                                        cursor: 'pointer',
                                                                        background: '#fff'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={img}
                                                                        alt=""
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'contain'
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Ürün Bilgileri */}
                                            <div className="col-md-7 col-sm-7 col-xs-12">
                                                <div className="single-product-info">
                                                    <h3 style={{
                                                        fontSize: '26px',
                                                        fontWeight: '700',
                                                        color: '#161540',
                                                        marginBottom: '15px'
                                                    }}>{urunData.name}</h3>

                                                    <p style={{
                                                        color: '#666',
                                                        lineHeight: '1.7',
                                                        marginBottom: '20px',
                                                        fontSize: '15px'
                                                    }}>
                                                        {urunData.short_description}
                                                    </p>

                                                    <hr style={{ margin: '20px 0' }} />

                                                    {/* Tab Menüsü - ORİJİNAL YAPISINDA */}
                                                    <div className="single-product-tab">
                                                        <ul style={{
                                                            display: 'flex',
                                                            gap: '5px',
                                                            marginBottom: '20px',
                                                            listStyle: 'none',
                                                            padding: 0,
                                                            borderBottom: '2px solid #eee'
                                                        }}>
                                                            <li>
                                                                <button
                                                                    onClick={() => setActiveTab(1)}
                                                                    style={{
                                                                        padding: '12px 20px',
                                                                        border: 'none',
                                                                        background: activeTab === 1 ? '#21bb9f' : 'transparent',
                                                                        color: activeTab === 1 ? '#fff' : '#666',
                                                                        cursor: 'pointer',
                                                                        fontWeight: '600',
                                                                        fontSize: '14px',
                                                                        borderRadius: '4px 4px 0 0'
                                                                    }}
                                                                >
                                                                    Ürün Profili
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    onClick={() => setActiveTab(2)}
                                                                    style={{
                                                                        padding: '12px 20px',
                                                                        border: 'none',
                                                                        background: activeTab === 2 ? '#21bb9f' : 'transparent',
                                                                        color: activeTab === 2 ? '#fff' : '#666',
                                                                        cursor: 'pointer',
                                                                        fontWeight: '600',
                                                                        fontSize: '14px',
                                                                        borderRadius: '4px 4px 0 0'
                                                                    }}
                                                                >
                                                                    Dökümanlar
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    onClick={() => setActiveTab(3)}
                                                                    style={{
                                                                        padding: '12px 20px',
                                                                        border: 'none',
                                                                        background: activeTab === 3 ? '#21bb9f' : 'transparent',
                                                                        color: activeTab === 3 ? '#fff' : '#666',
                                                                        cursor: 'pointer',
                                                                        fontWeight: '600',
                                                                        fontSize: '14px',
                                                                        borderRadius: '4px 4px 0 0'
                                                                    }}
                                                                >
                                                                    Aksesuarlar
                                                                </button>
                                                            </li>
                                                        </ul>

                                                        {/* Tab İçerikleri */}
                                                        <div style={{
                                                            maxHeight: '300px',
                                                            overflowY: 'auto',
                                                            padding: '15px',
                                                            background: '#f9f9f9',
                                                            borderRadius: '0 0 8px 8px'
                                                        }}>
                                                            {/* Ürün Profili Tab */}
                                                            {activeTab === 1 && (
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: urunData.description || urunData.short_description }}
                                                                    style={{ lineHeight: '1.8', color: '#555', fontSize: '14px' }}
                                                                />
                                                            )}

                                                            {/* Dökümanlar Tab */}
                                                            {activeTab === 2 && (
                                                                <div>
                                                                    {documents.length > 0 ? (
                                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                                            {documents.map((doc, index) => (
                                                                                <li key={index} style={{
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '12px',
                                                                                    padding: '12px 0',
                                                                                    borderBottom: index < documents.length - 1 ? '1px solid #eee' : 'none'
                                                                                }}>
                                                                                    <i className="fa-solid fa-file-pdf" style={{ fontSize: '24px', color: '#dc2626' }}></i>
                                                                                    <div style={{ flex: 1 }}>
                                                                                        <h6 style={{ margin: 0, fontSize: '14px', color: '#333' }}>{doc.name}</h6>
                                                                                    </div>
                                                                                    <a
                                                                                        href={doc.url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        style={{
                                                                                            background: '#21bb9f',
                                                                                            color: '#fff',
                                                                                            padding: '6px 12px',
                                                                                            borderRadius: '4px',
                                                                                            fontSize: '12px'
                                                                                        }}
                                                                                    >
                                                                                        <i className="fa-solid fa-download" style={{ marginRight: '5px' }}></i>
                                                                                        İndir
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    ) : (
                                                                        <div style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                                                                            <i className="fa-solid fa-file-circle-xmark" style={{ fontSize: '40px', marginBottom: '15px', opacity: 0.5 }}></i>
                                                                            <p style={{ margin: 0 }}>Bu ürün için döküman bulunmamaktadır.</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Aksesuarlar Tab */}
                                                            {activeTab === 3 && (
                                                                <div>
                                                                    {accessories.length > 0 ? (
                                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                                                            {accessories.map((acc, index) => (
                                                                                <div key={index} style={{
                                                                                    background: '#fff',
                                                                                    border: '1px solid #eee',
                                                                                    borderRadius: '6px',
                                                                                    padding: '8px 10px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px'
                                                                                }}>
                                                                                    {acc.image ? (
                                                                                        <img
                                                                                            src={acc.image}
                                                                                            alt={acc.name}
                                                                                            style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }}
                                                                                        />
                                                                                    ) : (
                                                                                        <div style={{ width: '36px', height: '36px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                                                            <i className="fa-solid fa-puzzle-piece" style={{ fontSize: '14px', color: '#ccc' }}></i>
                                                                                        </div>
                                                                                    )}
                                                                                    <span style={{ fontSize: '11px', color: '#333', lineHeight: '1.3', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{acc.name}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                                                            <i className="fa-solid fa-puzzle-piece" style={{ fontSize: '30px', marginBottom: '10px', opacity: 0.5 }}></i>
                                                                            <p style={{ margin: 0, fontSize: '13px' }}>Bu ürün için aksesuar bulunmamaktadır.</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <hr style={{ margin: '20px 0' }} />

                                                    {/* Teklif İste Butonu */}
                                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                        <Link
                                                            href="/iletisim"
                                                            style={{
                                                                background: '#21bb9f',
                                                                color: '#fff',
                                                                padding: '14px 30px',
                                                                borderRadius: '6px',
                                                                fontWeight: '600',
                                                                display: 'inline-block',
                                                                fontSize: '15px'
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }} />
                                                            Teklif İste
                                                        </Link>
                                                        <Link
                                                            href={`/urunler/${kategori}/${marka}`}
                                                            style={{
                                                                background: '#f0f0f0',
                                                                color: '#333',
                                                                padding: '14px 25px',
                                                                borderRadius: '6px',
                                                                fontWeight: '500',
                                                                display: 'inline-block',
                                                                fontSize: '14px'
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }} />
                                                            Geri Dön
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benzer Ürünler */}
                                    {relatedProducts.length > 0 && (
                                        <div className="related-product-area" style={{ marginTop: '40px' }}>
                                            <div style={{ marginBottom: '25px' }}>
                                                <h2 style={{
                                                    fontSize: '20px',
                                                    fontWeight: '600',
                                                    color: '#161540',
                                                    marginBottom: '5px'
                                                }}>Benzer Ürünler</h2>
                                                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                                    İlginizi çekebilecek diğer ürünler
                                                </p>
                                            </div>
                                            <div className="row">
                                                {relatedProducts.slice(0, 4).map((item) => (
                                                    <div key={item.id} className="col-md-3 col-sm-6 col-6">
                                                        <div className="single-product" style={{ marginBottom: '20px' }}>
                                                            <Link href={`/urunler/${kategori}/${marka}/${item.slug}`}>
                                                                <div className="product-image" style={{
                                                                    background: '#fff',
                                                                    border: '1px solid #eee',
                                                                    borderRadius: '8px',
                                                                    padding: '15px',
                                                                    height: '160px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <img
                                                                        src={item.image || 'https://www.janusbarkod.com.tr/upload/38/mobile.jpg'}
                                                                        alt={item.name}
                                                                        style={{
                                                                            maxWidth: '100%',
                                                                            maxHeight: '130px',
                                                                            objectFit: 'contain'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="product-content" style={{ padding: '12px 5px' }}>
                                                                    <h6 style={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '600',
                                                                        color: '#161540',
                                                                        marginBottom: '8px',
                                                                        lineHeight: '1.4'
                                                                    }}>
                                                                        {item.name}
                                                                    </h6>
                                                                    <span style={{
                                                                        color: '#21bb9f',
                                                                        fontSize: '13px',
                                                                        fontWeight: '500'
                                                                    }}>
                                                                        Ürünü İncele <i className="fa-solid fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Bu Ürün Hakkında Bilgi Alın</h2>
                                        <p>
                                            Fiyat teklifi ve detaylı bilgi için uzman ekibimizle iletişime geçin.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/iletisim" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                        Teklif Al
                                        <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
