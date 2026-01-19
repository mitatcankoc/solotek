'use client'
import CounterUp from "@/components/elements/CounterUp"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from 'react'

export default function Referanslar() {
    const [referanslar, setReferanslar] = useState([])
    const [loading, setLoading] = useState(true)

    // Statik fallback veriler (veritabanı bağlantısı başarısız olursa)
    const fallbackReferanslar = [
        {
            name: "Koç Holding",
            logo: "/assets/img/kocholding.png",
            description: "Türkiye'nin en büyük sanayi ve hizmetler grubu"
        },
        {
            name: "Avansas",
            logo: "/assets/img/avansas.png",
            description: "Türkiye'nin lider ofis malzemeleri tedarikçisi"
        },
        {
            name: "Honeywell",
            logo: "/assets/img/re/HON logo_200x37 2.png",
            description: "Küresel teknoloji ve üretim şirketi"
        },
        {
            name: "Datalogic",
            logo: "/assets/img/re/logo.png",
            description: "Otomatik veri toplama ve endüstriyel otomasyon çözümleri"
        },
        {
            name: "Zebra",
            logo: "/assets/img/re/zebra-logo-horizontal.svg",
            description: "Kurumsal varlık izleme ve veri yakalama çözümleri"
        }
    ]

    useEffect(() => {
        fetchReferanslar()
    }, [])

    const fetchReferanslar = async () => {
        try {
            const res = await fetch('/api/referanslar')
            if (res.ok) {
                const data = await res.json()
                // Sadece aktif referansları göster
                const aktifReferanslar = data.filter(r => r.status === 'Aktif')
                if (aktifReferanslar.length > 0) {
                    setReferanslar(aktifReferanslar)
                } else {
                    setReferanslar(fallbackReferanslar)
                }
            } else {
                setReferanslar(fallbackReferanslar)
            }
        } catch (err) {
            console.error('Referanslar çekilemedi:', err)
            setReferanslar(fallbackReferanslar)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Referanslarımız | Güvenilir İş Ortaklarımız | Solo Teknoloji"
                metaDescription="Solo Teknoloji referansları. Koç Holding, Avansas, Honeywell, Zebra gibi Türkiye ve dünyanın önde gelen şirketleriyle başarılı iş birlikleri."
                metaKeywords="solo teknoloji referanslar, müşteriler, iş ortakları, koç holding, avansas, zebra, honeywell, başarı hikayeleri"
                breadcrumbTitle="Referanslarımız">
                <div>
                    {/* Referanslar Ana Bölüm */}
                    <div className="about-inner" style={{ padding: '40px 0', background: '#fff' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center no-margin-heading">
                                        <small className="heading-top inner-heading-top">
                                            <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Referanslarımız
                                        </small>
                                        <h2><span className="heilight-left">Güvenilir</span> İş Ortaklarımız</h2>
                                        <p>
                                            Türkiye'nin ve dünyanın önde gelen şirketleri ile çalışmaktan gurur duyuyoruz.
                                            Yıllardır sürdürdüğümüz iş birliklerimiz, kaliteli hizmet anlayışımızın kanıtıdır.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Referanslar Grid - bg-28 ile shape */}
                    <div className="section-padding bg-28">
                        <div className="container">
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {referanslar.map((ref, index) => (
                                        <div key={ref.id || index} className="col-md-6 col-lg-4 mb-4">
                                            <div style={{
                                                background: '#f8f9fa',
                                                borderRadius: '16px',
                                                padding: '25px 20px',
                                                textAlign: 'center',
                                                border: '1px solid #eee',
                                                height: '100%',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <div style={{
                                                    height: '70px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: '15px'
                                                }}>
                                                    <img
                                                        src={ref.logo}
                                                        alt={ref.name}
                                                        style={{
                                                            maxHeight: '70px',
                                                            maxWidth: '160px',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>
                                                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#161540', marginBottom: '10px' }}>{ref.name}</h3>
                                                <p style={{ fontSize: '14px', color: '#666', marginBottom: 0 }}>{ref.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sayılarla Biz */}
                    <div className="counter-4 inner-counter-4 inner-font-1 section-padding" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 white-heading text-center">
                                        <small className="heading-top inner-heading-top">
                                            <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Sayılarla Biz
                                        </small>
                                        <h2>Neden Solo Teknoloji?</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row counters-3">
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={20} />+</h3>
                                        <p>Yıllık Deneyim</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={500} />+</h3>
                                        <p>Mutlu Müşteri</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={1000} />+</h3>
                                        <p>Tamamlanan Proje</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={98} />%</h3>
                                        <p>Müşteri Memnuniyeti</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* İletişim CTA */}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Siz de Referanslarımız Arasına Katılın</h2>
                                        <p>
                                            Profesyonel barkod ve otomasyon çözümlerimiz hakkında bilgi almak için bizimle iletişime geçin.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/iletisim" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                        İletişime Geç
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
