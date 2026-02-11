'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function BrandProductsPage() {
    const params = useParams()
    const { kategori, marka } = params

    const [kategoriData, setKategoriData] = useState(null)
    const [markaData, setMarkaData] = useState(null)
    const [allKategoriler, setAllKategoriler] = useState([])
    const [kategoriMarkalar, setKategoriMarkalar] = useState([])
    const [urunler, setUrunler] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [kategori, marka])

    const fetchData = async () => {
        try {
            // Tüm kategorileri getir
            const katRes = await fetch('/api/kategoriler')
            if (katRes.ok) {
                const kategoriler = await katRes.json()
                setAllKategoriler(kategoriler)

                // Mevcut kategoriyi bul
                const currentKat = kategoriler.find(k => k.slug === kategori)
                if (currentKat) {
                    setKategoriData(currentKat)

                    // Bu kategorideki tüm markaları getir
                    const katMarkaRes = await fetch(`/api/markalar?kategori=${currentKat.id}`)
                    if (katMarkaRes.ok) {
                        setKategoriMarkalar(await katMarkaRes.json())
                    }
                }
            }

            // Markayı getir
            const markaRes = await fetch(`/api/markalar/${marka}`)
            if (markaRes.ok) {
                const markaInfo = await markaRes.json()
                setMarkaData(markaInfo)
            }

            // Bu kategori ve markadaki ürünleri getir
            const urunRes = await fetch(`/api/urunler?kategori_slug=${kategori}&marka_slug=${marka}`)
            if (urunRes.ok) {
                setUrunler(await urunRes.json())
            }
        } catch (error) {
            console.error('Hata:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Yükleniyor..." breadcrumbTitle="Yükleniyor...">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!kategoriData || !markaData) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Bulunamadı" breadcrumbTitle="Hata">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-exclamation-triangle" style={{ fontSize: '50px', color: '#f59e0b', marginBottom: '20px' }}></i>
                        <h2 style={{ color: '#333', marginBottom: '15px' }}>Sayfa Bulunamadı</h2>
                        <Link href="/urunler" style={{ color: '#21BB9F' }}>← Ürünlere Dön</Link>
                    </div>
                </div>
            </Layout>
        )
    }

    const pageTitle = `${markaData.name} ${kategoriData.name}`

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} headTitle={`${pageTitle} | Solo Teknoloji`} breadcrumbTitle={pageTitle}>
                <div>
                    <div className="section-padding2 products">
                        <div className="container">
                            <div className="row">
                                {/* Sol Sidebar */}
                                <div className="col-md-3 order-2 order-md-1">
                                    <div className="widgets lg-mr-15">
                                        {/* Arama */}
                                        <div className="single-widget padding-less-widget">
                                            <h3>Ürün Ara</h3>
                                            <div className="search-form-widget">
                                                <form action="#">
                                                    <input type="search" placeholder="Ürün adı yazın..." />
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
                                                {allKategoriler.filter(k => k.status === 'Aktif').map((kat) => (
                                                    <li key={kat.id} className={kat.slug === kategori ? 'active' : ''}>
                                                        <Link href={`/urunler/${kat.slug}`} style={kat.slug === kategori ? { color: '#21bb9f', fontWeight: '600' } : {}}>
                                                            <i className={`fa-solid ${kat.icon || 'fa-box'}`} style={{ marginRight: '10px', width: '20px' }} />
                                                            {kat.name}
                                                            <span><i className="fa-solid fa-angle-right" /></span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Bu kategorideki diğer markalar */}
                                        <div className="single-widget categories">
                                            <h3>{kategoriData.name} Markaları</h3>
                                            <ul className="category-list">
                                                {kategoriMarkalar.map((m) => (
                                                    <li key={m.id} className={m.slug === marka ? 'active' : ''}>
                                                        <Link href={`/urunler/${kategori}/${m.slug}`} style={m.slug === marka ? { color: '#21bb9f', fontWeight: '600' } : {}}>
                                                            {m.name}
                                                            <span><i className="fa-solid fa-angle-right" /></span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* İletişim CTA */}
                                        <div className="single-widget cta-widget" style={{
                                            background: 'linear-gradient(135deg, #21bb9f 0%, #1aa88d 100%)',
                                            padding: '25px',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 30px rgba(33, 187, 159, 0.3)',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ marginBottom: '12px' }}>
                                                <i className="fa-solid fa-phone-volume" style={{ fontSize: '32px', color: '#fff', opacity: '0.9' }}></i>
                                            </div>
                                            <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '18px', textTransform: 'none' }}>Teklif Alın</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '15px', fontSize: '13px', lineHeight: '1.5' }}>
                                                Hemen bizimle iletişime geçin.
                                            </p>
                                            <Link href="/iletisim" style={{
                                                background: '#fff',
                                                color: '#21bb9f',
                                                display: 'inline-block',
                                                padding: '12px 25px',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                fontSize: '14px'
                                            }}>
                                                İletişime Geç
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Ürünler Grid */}
                                <div className="col-md-9 order-1 order-md-2">
                                    <div className="products-wrap">
                                        {/* Breadcrumb ve Başlık */}
                                        <div style={{ marginBottom: '30px' }}>
                                            <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
                                                <Link href="/urunler" style={{ color: '#21bb9f' }}>Ürünler</Link>
                                                <span style={{ margin: '0 8px' }}>/</span>
                                                <Link href={`/urunler/${kategori}`} style={{ color: '#21bb9f' }}>{kategoriData.name}</Link>
                                                <span style={{ margin: '0 8px' }}>/</span>
                                                <span>{markaData.name}</span>
                                            </div>
                                            <h2 style={{ fontSize: '28px', color: '#161540', marginBottom: '10px' }}>{markaData.name} {kategoriData.name}</h2>
                                            <p style={{ color: '#666' }}>{urunler.length} ürün bulundu</p>
                                        </div>

                                        {urunler.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '12px' }}>
                                                <i className="fa-solid fa-box-open" style={{ fontSize: '50px', color: '#ddd', marginBottom: '20px' }}></i>
                                                <h3 style={{ color: '#666', marginBottom: '10px' }}>Bu kategoride ürün bulunamadı</h3>
                                                <p style={{ color: '#999' }}>Yakında yeni ürünler eklenecek.</p>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {urunler.map((product) => (
                                                    <div className="col-md-4 col-sm-6 col-6" key={product.id}>
                                                        <div className="single-product" style={{ marginBottom: '30px' }}>
                                                            <Link href={`/urunler/${kategori}/${marka}/${product.slug}`}>
                                                                <div className="product-image" style={{
                                                                    background: '#fff',
                                                                    border: '1px solid #eee',
                                                                    borderRadius: '8px',
                                                                    padding: '15px',
                                                                    height: '200px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    <img
                                                                        src={product.image || 'https://www.janusbarkod.com.tr/upload/38/mobile.jpg'}
                                                                        alt={product.name}
                                                                        style={{
                                                                            maxWidth: '100%',
                                                                            maxHeight: '170px',
                                                                            objectFit: 'contain'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="product-content" style={{ padding: '15px 10px' }}>
                                                                    <h6 style={{
                                                                        fontSize: '15px',
                                                                        fontWeight: '600',
                                                                        color: '#161540',
                                                                        marginBottom: '8px',
                                                                        lineHeight: '1.4'
                                                                    }}>
                                                                        {product.name}
                                                                    </h6>
                                                                    <p style={{
                                                                        fontSize: '13px',
                                                                        color: '#666',
                                                                        marginBottom: '12px',
                                                                        lineHeight: '1.5',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        {product.short_description}
                                                                    </p>
                                                                    <span style={{
                                                                        color: '#21bb9f',
                                                                        fontSize: '14px',
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
                                        )}
                                    </div>
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
                                        <h2>{markaData.name} Ürünleri Hakkında Bilgi Alın</h2>
                                        <p>
                                            Aradığınız ürünü bulamadınız mı? Uzman ekibimiz size yardımcı olmak için hazır.
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
