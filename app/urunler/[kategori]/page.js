'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'

export default function CategoryPage() {
    const params = useParams()
    const kategori = params.kategori

    const [kategoriData, setKategoriData] = useState(null)
    const [allKategoriler, setAllKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [urunler, setUrunler] = useState([]) // Markasız ürünler için
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [kategori])

    const fetchData = async () => {
        try {
            // Tüm kategorileri getir (sidebar için)
            const katRes = await fetch('/api/kategoriler')
            if (katRes.ok) {
                const kategoriler = await katRes.json()
                setAllKategoriler(kategoriler)

                // Mevcut kategoriyi bul
                const current = kategoriler.find(k => k.slug === kategori)
                if (current) {
                    setKategoriData(current)

                    // Bu kategorideki markaları getir
                    const markaRes = await fetch(`/api/markalar?kategori=${current.id}`)
                    if (markaRes.ok) {
                        const markaData = await markaRes.json()
                        setMarkalar(markaData)

                        // Eğer marka yoksa, doğrudan ürünleri getir
                        if (markaData.length === 0) {
                            const urunRes = await fetch(`/api/urunler?kategori_slug=${kategori}`)
                            if (urunRes.ok) {
                                setUrunler(await urunRes.json())
                            }
                        }
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

    if (!kategoriData) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Kategori Bulunamadı" breadcrumbTitle="Hata">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-exclamation-triangle" style={{ fontSize: '50px', color: '#f59e0b', marginBottom: '20px' }}></i>
                        <h2 style={{ color: '#333', marginBottom: '15px' }}>Kategori Bulunamadı</h2>
                        <Link href="/urunler" style={{ color: '#21BB9F' }}>← Ürünlere Dön</Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} headTitle={`${kategoriData.name} | Solo Teknoloji`} breadcrumbTitle={kategoriData.name}>
                <div>
                    <div className="section-padding2 products">
                        <div className="container">
                            <div className="row">
                                {/* Sol Sidebar */}
                                <div className="col-md-3">
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

                                {/* Sağ İçerik */}
                                <div className="col-md-9">
                                    <div className="products-wrap">
                                        {/* Başlık */}
                                        <div style={{ marginBottom: '30px' }}>
                                            <h2 style={{ fontSize: '28px', color: '#161540', marginBottom: '10px' }}>{kategoriData.name}</h2>
                                            <p style={{ color: '#666' }}>{kategoriData.description}</p>
                                        </div>

                                        {/* Marka varsa markaları göster */}
                                        {markalar.length > 0 ? (
                                            <div className="row">
                                                {markalar.map((brand) => (
                                                    <div className="col-md-3 col-sm-4 col-6" key={brand.id}>
                                                        <div className="single-product" style={{ marginBottom: '30px' }}>
                                                            <Link href={`/urunler/${kategori}/${brand.slug}`}>
                                                                <div className="product-image" style={{
                                                                    background: '#fff',
                                                                    border: '1px solid #eee',
                                                                    borderRadius: '8px',
                                                                    padding: '20px',
                                                                    height: '150px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s'
                                                                }}>
                                                                    {brand.logo ? (
                                                                        <img
                                                                            src={brand.logo}
                                                                            alt={brand.name}
                                                                            style={{
                                                                                maxWidth: '100%',
                                                                                maxHeight: '100px',
                                                                                objectFit: 'contain'
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div style={{ textAlign: 'center' }}>
                                                                            <i className="fa-solid fa-building" style={{ fontSize: '40px', color: '#ddd' }}></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="product-content" style={{ textAlign: 'center', padding: '15px 10px' }}>
                                                                    <h6 style={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '600',
                                                                        color: '#161540',
                                                                        margin: 0
                                                                    }}>
                                                                        {brand.name}
                                                                    </h6>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : urunler.length > 0 ? (
                                            /* Marka yoksa ürünleri doğrudan göster */
                                            <div className="row">
                                                {urunler.map((urun) => (
                                                    <div className="col-md-4 col-sm-6 col-6" key={urun.id}>
                                                        <div className="single-product" style={{ marginBottom: '30px' }}>
                                                            <Link href={`/urun/${urun.slug}`}>
                                                                <div className="product-image" style={{
                                                                    background: '#fff',
                                                                    border: '1px solid #eee',
                                                                    borderRadius: '8px',
                                                                    padding: '15px',
                                                                    height: '200px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.3s'
                                                                }}>
                                                                    {urun.image || urun.resim ? (
                                                                        <img
                                                                            src={urun.image || urun.resim}
                                                                            alt={urun.name || urun.ad}
                                                                            style={{
                                                                                maxWidth: '100%',
                                                                                maxHeight: '170px',
                                                                                objectFit: 'contain'
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div style={{ textAlign: 'center' }}>
                                                                            <i className="fa-solid fa-box" style={{ fontSize: '50px', color: '#ddd' }}></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="product-content" style={{ padding: '15px 10px' }}>
                                                                    <h6 style={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '600',
                                                                        color: '#161540',
                                                                        marginBottom: '5px',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        {urun.name || urun.ad}
                                                                    </h6>
                                                                    {(urun.short_description || urun.kisa_aciklama) && (
                                                                        <p style={{
                                                                            fontSize: '12px',
                                                                            color: '#888',
                                                                            margin: 0,
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: 'vertical',
                                                                            overflow: 'hidden'
                                                                        }}>
                                                                            {urun.short_description || urun.kisa_aciklama}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa', borderRadius: '12px' }}>
                                                <i className="fa-solid fa-box-open" style={{ fontSize: '50px', color: '#ddd', marginBottom: '20px' }}></i>
                                                <h3 style={{ color: '#666', marginBottom: '10px' }}>Bu kategoride henüz ürün eklenmemiş</h3>
                                                <p style={{ color: '#999' }}>Yakında yeni ürünler eklenecek.</p>
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
                                        <h2>{kategoriData.name} Hakkında Bilgi Alın</h2>
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
