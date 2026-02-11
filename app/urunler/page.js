'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function ProductsContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const aramaQuery = searchParams.get('arama') || ''

    const [kategoriler, setKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [urunler, setUrunler] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState(aramaQuery)
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (aramaQuery) {
            setSearchQuery(aramaQuery)
            searchProducts(aramaQuery)
        } else {
            setShowResults(false)
        }
    }, [aramaQuery])

    const fetchData = async () => {
        try {
            const [katRes, markaRes] = await Promise.all([
                fetch('/api/kategoriler'),
                fetch('/api/markalar')
            ])
            if (katRes.ok) {
                const katData = await katRes.json()
                // Öncelikli sıralama: belirli kategoriler en başta olsun
                const priorityOrder = ['terminaller', 'el-terminalleri', 'barkod-okuyucular', 'barkod-yazicilar', 'tablet', 'tabletler']
                const sorted = (Array.isArray(katData) ? katData : []).sort((a, b) => {
                    const aIdx = priorityOrder.indexOf(a.slug)
                    const bIdx = priorityOrder.indexOf(b.slug)
                    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
                    if (aIdx !== -1) return -1
                    if (bIdx !== -1) return 1
                    return 0
                })
                setKategoriler(sorted)
            }
            if (markaRes.ok) {
                const markaData = await markaRes.json()
                setMarkalar(Array.isArray(markaData) ? markaData : [])
            }
        } catch (error) {
            console.error('Hata:', error)
            setKategoriler([])
            setMarkalar([])
        } finally {
            setLoading(false)
        }
    }

    const searchProducts = async (query) => {
        try {
            setLoading(true)
            const res = await fetch(`/api/urunler?search=${encodeURIComponent(query)}`)
            if (res.ok) {
                const data = await res.json()
                setUrunler(Array.isArray(data) ? data : [])
                setShowResults(true)
            } else {
                setUrunler([])
                setShowResults(true)
            }
        } catch (error) {
            console.error('Arama hatası:', error)
            setUrunler([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/urunler?arama=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const clearSearch = () => {
        setSearchQuery('')
        setShowResults(false)
        router.push('/urunler')
    }

    if (loading) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Ürünlerimiz | Solo Teknoloji" breadcrumbTitle="Ürünlerimiz">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout
            headerStyle={1}
            footerStyle={1}
            headTitle="Ürünlerimiz | Barkod Sistemleri ve POS Çözümleri | Solo Teknoloji"
            metaDescription="Solo Teknoloji ürün kataloğu - El terminalleri, barkod yazıcılar, barkod okuyucular, RFID sistemleri ve mobil yazıcılar."
            metaKeywords="el terminali, barkod yazıcı, barkod okuyucu, pos cihazı, rfid okuyucu, mobil yazıcı"
            breadcrumbTitle="Ürünlerimiz">
            <div>
                <div className="section-padding2 products">
                    <div className="container">
                        {/* Mobil Arama - sadece mobilde görünür */}
                        <div className="d-md-none" style={{ marginBottom: '20px' }}>
                            <div className="single-widget padding-less-widget">
                                <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Ürün Ara</h2>
                                <div className="search-form-widget">
                                    <form onSubmit={handleSearch}>
                                        <input
                                            type="search"
                                            placeholder="Ürün adı yazın..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button type="submit" className="search-icon">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* Sol Sidebar */}
                            <div className="col-md-4 order-2 order-md-1">
                                <div className="widgets lg-mr-15">
                                    {/* Arama - masaüstünde görünür */}
                                    <div className="single-widget padding-less-widget d-none d-md-block">
                                        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Ürün Ara</h2>
                                        <div className="search-form-widget">
                                            <form onSubmit={handleSearch}>
                                                <input
                                                    type="search"
                                                    placeholder="Ürün adı yazın..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <button type="submit" className="search-icon">
                                                    <i className="fa-solid fa-magnifying-glass" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Kategoriler */}
                                    <div className="single-widget categories">
                                        <h3>Ürün Kategorileri</h3>
                                        <ul className="category-list">
                                            {kategoriler.filter(k => k.status === 'Aktif').map((kat) => (
                                                <li key={kat.id}>
                                                    <Link href={`/urunler/${kat.slug}`}>
                                                        <i className={`fa-solid ${kat.icon || 'fa-box'}`} style={{ marginRight: '10px', width: '20px' }} />
                                                        {kat.name}
                                                        <span><i className="fa-solid fa-angle-right" /></span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Markalar */}
                                    <div className="single-widget categories">
                                        <h3>Markalar</h3>
                                        <ul className="category-list">
                                            {markalar.filter(m => m.status === 'Aktif').map((marka) => (
                                                <li key={marka.id}>
                                                    <Link href={`/urunler?marka=${marka.slug}`}>
                                                        {marka.name}
                                                        <span><i className="fa-solid fa-angle-right" /></span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* İletişim CTA */}
                                    <div className="single-widget cta-widget" style={{
                                        background: 'linear-gradient(135deg, #21bb9f 0%, #1aa88d 100%)',
                                        padding: '30px',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 30px rgba(33, 187, 159, 0.3)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ marginBottom: '15px' }}>
                                            <i className="fa-solid fa-phone-volume" style={{ fontSize: '40px', color: '#fff', opacity: '0.9' }}></i>
                                        </div>
                                        <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '20px', textTransform: 'none' }}>Teklif Alın</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                                            İhtiyacınıza uygun ürünler için hemen bizimle iletişime geçin.
                                        </p>
                                        <Link href="/iletisim" style={{
                                            background: '#fff',
                                            color: '#21bb9f',
                                            display: 'inline-block',
                                            padding: '14px 30px',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                        }}>
                                            İletişime Geç <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Sağ İçerik */}
                            <div className="col-md-8 order-1 order-md-2">
                                {showResults ? (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                                            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#161540', margin: 0 }}>
                                                "{aramaQuery}" için {urunler.length} sonuç
                                            </h1>
                                            <button
                                                onClick={clearSearch}
                                                style={{
                                                    background: '#f5f5f5',
                                                    border: 'none',
                                                    padding: '10px 20px',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    color: '#666'
                                                }}
                                            >
                                                <i className="fa-solid fa-times" style={{ marginRight: '8px' }}></i>
                                                Aramayı Temizle
                                            </button>
                                        </div>
                                        <div className="products-wrap lg-ml-15">
                                            <div className="row">
                                                {urunler.length > 0 ? urunler.map((urun) => (
                                                    <div className="col-md-6 col-lg-4" key={urun.id}>
                                                        <div className="single-product">
                                                            <div className="product-image">
                                                                <div className="product-img img-zoom">
                                                                    <img
                                                                        src={urun.image || 'https://www.janusbarkod.com.tr/upload/38/mobile.jpg'}
                                                                        alt={urun.name}
                                                                        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <div className="cart-btn">
                                                                    <Link className="full-btn theme-btn-11" href={`/urunler/${urun.kategori_slug}/${urun.marka_slug}/${urun.slug}`}>Ürünü Gör</Link>
                                                                </div>
                                                            </div>
                                                            <div className="product-content" style={{ textAlign: 'center', padding: '20px 15px' }}>
                                                                <Link href={`/urunler/${urun.kategori_slug}/${urun.marka_slug}/${urun.slug}`} style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#161540' }}>
                                                                    {urun.name}
                                                                </Link>
                                                                <p style={{ fontSize: '12px', color: '#21BB9F', marginTop: '5px' }}>{urun.marka_adi}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="col-12">
                                                        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9f9f9', borderRadius: '12px' }}>
                                                            <i className="fa-solid fa-search" style={{ fontSize: '50px', color: '#ddd', marginBottom: '20px' }}></i>
                                                            <h3 style={{ color: '#666', marginBottom: '10px' }}>Ürün Bulunamadı</h3>
                                                            <p style={{ color: '#999' }}>Farklı anahtar kelimeler deneyebilirsiniz.</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '25px', color: '#161540' }}>
                                            Profesyonel Barkod Sistemleri ve POS Çözümleri
                                        </h1>
                                        <div className="products-wrap lg-ml-15">
                                            <div className="row">
                                                {kategoriler.filter(k => k.status === 'Aktif').map((kategori) => (
                                                    <div className="col-md-6 col-lg-4" key={kategori.id}>
                                                        <div className="single-product">
                                                            <div className="product-image">
                                                                <div className="product-img img-zoom">
                                                                    <img
                                                                        src={kategori.image || kategori.resim || '/assets/img/products/default-category.jpg'}
                                                                        alt={`${kategori.name} - Solo Teknoloji Ürün Kategorisi`}
                                                                        title={kategori.name}
                                                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = '/assets/img/products/default-category.jpg';
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="cart-btn">
                                                                    <Link className="full-btn theme-btn-11" href={`/urunler/${kategori.slug}`}>Ürünleri Gör</Link>
                                                                </div>
                                                                <div className="cart-icons">
                                                                    <ul>
                                                                        <li>
                                                                            <Link href={`/urunler/${kategori.slug}`}><i className="fa-light fa-eye" /></Link>
                                                                        </li>
                                                                        <li>
                                                                            <Link href="/iletisim"><i className="fa-solid fa-phone" /></Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="product-content" style={{ textAlign: 'center', padding: '20px 15px' }}>
                                                                <Link className="font-f-3" href={`/urunler/${kategori.slug}`} style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#161540' }}>
                                                                    {kategori.name}
                                                                </Link>
                                                                <p className="font-f-3" style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>{kategori.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
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
                                    <h2>Ürünlerimiz Hakkında Bilgi Alın</h2>
                                    <p>
                                        Aradığınız ürünü bulamadınız mı? Uzman ekibimiz size yardımcı olmak için hazır.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <Link href="/iletisim" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                    Demo Talep Et
                                    <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default function Page() {
    return (
        <Suspense fallback={
            <Layout headerStyle={1} footerStyle={1} headTitle="Ürünlerimiz | Solo Teknoloji">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                    </div>
                </div>
            </Layout>
        }>
            <ProductsContent />
        </Suspense>
    )
}
