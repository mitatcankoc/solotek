'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function SuruculerPage() {
    const [suruculer, setSuruculer] = useState([])
    const [kategoriler, setKategoriler] = useState([])
    const [markalar, setMarkalar] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredSuruculer, setFilteredSuruculer] = useState({})
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [selectedMarka, setSelectedMarka] = useState(null)
    const [filteredMarkalar, setFilteredMarkalar] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterSuruculer()
    }, [searchTerm, suruculer, selectedKategori, selectedMarka])

    // Kategori seçildiğinde, sadece o kategoride sürücü olan markaları filtrele
    useEffect(() => {
        if (selectedKategori) {
            // Bu kategoride sürücü olan markaları bul
            const markaIdsInCategory = [...new Set(
                suruculer
                    .filter(s => s.kategori_id == selectedKategori.id)
                    .map(s => s.marka_id)
                    .filter(id => id)
            )]
            const filtered = markalar.filter(m => markaIdsInCategory.includes(m.id))
            setFilteredMarkalar(filtered)
        } else {
            setFilteredMarkalar([])
        }
    }, [selectedKategori, suruculer, markalar])

    const fetchData = async () => {
        try {
            const [suruculerRes, kategorilerRes, markalarRes] = await Promise.all([
                fetch('/api/suruculer?status=Aktif'),
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

    const filterSuruculer = () => {
        let filtered = [...suruculer]

        // Arama filtresi
        if (searchTerm) {
            filtered = filtered.filter(s =>
                (s.urun_adi || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (s.surucu_adi || '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Kategori filtresi
        if (selectedKategori) {
            filtered = filtered.filter(s => s.kategori_id == selectedKategori.id)
        }

        // Marka filtresi
        if (selectedMarka) {
            filtered = filtered.filter(s => s.marka_id == selectedMarka.id)
        }

        // Ürün adına göre grupla
        const grouped = filtered.reduce((acc, surucu) => {
            const key = surucu.urun_adi || 'Diğer'
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(surucu)
            return acc
        }, {})

        setFilteredSuruculer(grouped)
    }

    const handleDownload = async (surucu) => {
        try {
            await fetch(`/api/suruculer/${surucu.id}`, { method: 'PATCH' })
        } catch (err) {
            console.error('Sayaç güncelenemedi')
        }
        window.open(surucu.dosya_url, '_blank')
    }

    // Kategori seçimi
    const handleKategoriSelect = (kategori) => {
        if (selectedKategori?.id === kategori?.id) {
            setSelectedKategori(null)
            setSelectedMarka(null)
        } else {
            setSelectedKategori(kategori)
            setSelectedMarka(null)
        }
    }

    // Marka seçimi
    const handleMarkaSelect = (marka) => {
        if (selectedMarka?.id === marka?.id) {
            setSelectedMarka(null)
        } else {
            setSelectedMarka(marka)
        }
    }

    // İşletim sistemine göre ikon döndür
    const getOsIcon = (os) => {
        if (!os) return 'fa-solid fa-desktop'
        const osLower = os.toLowerCase()
        if (osLower.includes('windows')) return 'fa-brands fa-windows'
        if (osLower.includes('mac') || osLower.includes('apple')) return 'fa-brands fa-apple'
        if (osLower.includes('linux') || osLower.includes('ubuntu')) return 'fa-brands fa-linux'
        if (osLower.includes('android')) return 'fa-brands fa-android'
        if (osLower.includes('tüm') || osLower.includes('all')) return 'fa-solid fa-globe'
        return 'fa-solid fa-desktop'
    }

    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Sürücü İndirme Merkezi | El Terminali ve Barkod Cihaz Sürücüleri | Solo Teknoloji"
                metaDescription="Zebra, Honeywell, Datalogic el terminali ve barkod cihazları için güncel sürücüler. Windows, macOS, Linux uyumlu driver dosyaları. Ücretsiz indirme."
                metaKeywords="el terminali sürücü, barkod yazıcı driver, zebra sürücü indir, honeywell driver, datalogic sürücü, pos cihaz sürücüsü, usb driver"
                breadcrumbTitle="Sürücüler">
                <div>
                    {/* Heading Section */}
                    <div className="about-inner" style={{ padding: '40px 0', background: '#fff' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center no-margin-heading">
                                        <small className="heading-top inner-heading-top">
                                            <img src="/assets/img/icons/hands.svg" alt="Sürücü indirme ikonu" />Sürücü İndirme
                                        </small>
                                        <h2><span className="heilight-left">Ürün</span> Sürücüleri</h2>
                                        <p>
                                            Cihazlarınız için gerekli sürücü ve yazılımları buradan indirebilirsiniz.
                                            Aradığınız ürünü bulup ilgili sürücüyü kolayca indirebilirsiniz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arama ve Filtreler */}
                    <div className="section-padding bg-28">
                        <div className="container">
                            {/* Arama Kutusu */}
                            <div className="row" style={{ marginBottom: '30px' }}>
                                <div className="col-lg-6 m-auto">
                                    <div style={{
                                        background: '#fff',
                                        borderRadius: '50px',
                                        padding: '8px',
                                        display: 'flex',
                                        gap: '10px',
                                        boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
                                    }}>
                                        <div style={{ flex: 1, position: 'relative' }}>
                                            <i className="fa-solid fa-search" style={{
                                                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                                                color: '#999', fontSize: '16px'
                                            }}></i>
                                            <input
                                                type="text"
                                                placeholder="Ürün adı veya sürücü ara..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 15px 14px 50px',
                                                    border: 'none',
                                                    borderRadius: '50px',
                                                    fontSize: '15px',
                                                    outline: 'none',
                                                    background: 'transparent'
                                                }}
                                            />
                                        </div>
                                        <button className="theme-btn" style={{
                                            borderRadius: '50px',
                                            padding: '12px 30px'
                                        }}>
                                            Ara
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hizmet Verdiğimiz Ürünler - Kategori Filtreleri */}
                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-12">
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap'
                                    }} className="kategori-buttons">
                                        {/* Tümü Butonu */}
                                        <button
                                            onClick={() => { setSelectedKategori(null); setSelectedMarka(null); }}
                                            style={{
                                                padding: '12px 28px',
                                                borderRadius: '50px',
                                                border: 'none',
                                                background: !selectedKategori ? 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)' : '#fff',
                                                color: !selectedKategori ? '#fff' : '#333',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                boxShadow: !selectedKategori ? '0 4px 15px rgba(33, 187, 159, 0.3)' : '0 2px 10px rgba(0,0,0,0.08)',
                                                transition: 'all 0.3s ease',
                                                whiteSpace: 'nowrap',
                                                flexShrink: 0
                                            }}
                                        >
                                            Tümü
                                        </button>

                                        {/* Kategori Butonları */}
                                        {kategoriler.filter(k => k.aktif).map(kategori => (
                                            <button
                                                key={kategori.id}
                                                onClick={() => handleKategoriSelect(kategori)}
                                                style={{
                                                    padding: '12px 24px',
                                                    borderRadius: '50px',
                                                    border: 'none',
                                                    background: selectedKategori?.id === kategori.id ? 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)' : '#fff',
                                                    color: selectedKategori?.id === kategori.id ? '#fff' : '#333',
                                                    fontWeight: '500',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    boxShadow: selectedKategori?.id === kategori.id ? '0 4px 15px rgba(33, 187, 159, 0.3)' : '0 2px 10px rgba(0,0,0,0.08)',
                                                    transition: 'all 0.3s ease',
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {kategori.ad}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Marka Filtreleri - Sadece kategori seçiliyse göster */}
                            {selectedKategori && (
                                <div className="row" style={{ marginBottom: '30px' }}>
                                    <div className="col-12">
                                        <div style={{
                                            display: 'flex',
                                            gap: '10px',
                                            alignItems: 'center',
                                            padding: '15px 20px',
                                            background: '#fff',
                                            borderRadius: '16px',
                                            boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                                            overflowX: 'auto',
                                            WebkitOverflowScrolling: 'touch',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none'
                                        }} className="hide-scrollbar">
                                            <span style={{ color: '#666', fontSize: '14px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                                <i className="fa-solid fa-filter" style={{ marginRight: '6px' }}></i>
                                                Marka:
                                            </span>
                                            {filteredMarkalar.length > 0 ? filteredMarkalar.map(marka => (
                                                <button
                                                    key={marka.id}
                                                    onClick={() => handleMarkaSelect(marka)}
                                                    style={{
                                                        padding: '8px 20px',
                                                        borderRadius: '20px',
                                                        border: selectedMarka?.id === marka.id ? '2px solid #21BB9F' : '2px solid #e5e7eb',
                                                        background: selectedMarka?.id === marka.id ? '#ecfdf5' : '#fff',
                                                        color: selectedMarka?.id === marka.id ? '#21BB9F' : '#666',
                                                        fontWeight: '500',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        whiteSpace: 'nowrap',
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    {marka.ad || marka.name}
                                                </button>
                                            )) : (
                                                <span style={{ color: '#999', fontSize: '13px' }}>Bu kategoride marka bulunamadı</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sürücü Listesi */}
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                                    </div>
                                </div>
                            ) : Object.keys(filteredSuruculer).length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <i className="fa-solid fa-folder-open" style={{ fontSize: '60px', color: '#ddd', marginBottom: '20px', display: 'block' }}></i>
                                    <h3 style={{ color: '#666' }}>
                                        {searchTerm ? 'Sonuç Bulunamadı' : 'Henüz sürücü eklenmemiş'}
                                    </h3>
                                    <p style={{ color: '#999' }}>
                                        {searchTerm ? `"${searchTerm}" aramasına uygun sürücü bulunamadı.` : 'Yakında sürücüler eklenecek!'}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center' }}>
                                        <strong>{Object.keys(filteredSuruculer).length}</strong> ürün için <strong>{Object.values(filteredSuruculer).flat().length}</strong> sürücü bulundu
                                    </p>

                                    <div className="row">
                                        {Object.entries(filteredSuruculer).map(([urunAdi, drivers]) => (
                                            <div key={urunAdi} className="col-lg-6 mb-4">
                                                {/* Ürün Kartı */}
                                                <div style={{
                                                    background: '#fff',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                                    overflow: 'hidden'
                                                }}>
                                                    {/* Ürün Başlığı */}
                                                    <div style={{
                                                        padding: '24px 28px',
                                                        borderBottom: '1px solid #eef0f2',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px'
                                                    }}>
                                                        <div style={{
                                                            width: '56px',
                                                            height: '56px',
                                                            background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)',
                                                            borderRadius: '12px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0
                                                        }}>
                                                            <i className="fa-solid fa-hard-drive" style={{ color: '#fff', fontSize: '24px' }}></i>
                                                        </div>
                                                        <div>
                                                            <h3 style={{
                                                                margin: 0,
                                                                fontSize: '20px',
                                                                fontWeight: '700',
                                                                color: '#161540',
                                                                lineHeight: '1.3'
                                                            }}>{urunAdi}</h3>
                                                            <span style={{
                                                                color: '#21BB9F',
                                                                fontSize: '14px',
                                                                fontWeight: '500'
                                                            }}>
                                                                {drivers.length} sürücü
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Sürücü Listesi */}
                                                    {drivers.map((surucu, index) => (
                                                        <div key={surucu.id} className="driver-item" style={{
                                                            padding: '16px 20px',
                                                            borderBottom: index < drivers.length - 1 ? '1px solid #eef0f2' : 'none',
                                                            background: index % 2 === 1 ? '#fafbfc' : '#fff'
                                                        }}>
                                                            {/* Dosya Bilgisi */}
                                                            <div style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px',
                                                                marginBottom: '12px'
                                                            }}>
                                                                <div style={{
                                                                    width: '36px',
                                                                    height: '36px',
                                                                    background: '#f0f4f8',
                                                                    borderRadius: '8px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <i className="fa-solid fa-file-zipper" style={{ color: '#6366f1', fontSize: '16px' }}></i>
                                                                </div>
                                                                <h4 style={{
                                                                    margin: 0,
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    color: '#1e293b',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    {surucu.surucu_adi}
                                                                </h4>
                                                            </div>

                                                            {/* Etiketler */}
                                                            <div style={{
                                                                display: 'flex',
                                                                gap: '6px',
                                                                flexWrap: 'wrap',
                                                                marginBottom: '12px'
                                                            }}>
                                                                {surucu.versiyon && (
                                                                    <span style={{
                                                                        background: '#ecfdf5',
                                                                        color: '#059669',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '4px',
                                                                        fontSize: '11px',
                                                                        fontWeight: '600'
                                                                    }}>
                                                                        {surucu.versiyon}
                                                                    </span>
                                                                )}
                                                                {surucu.isletim_sistemi && (
                                                                    <span style={{
                                                                        background: '#eff6ff',
                                                                        color: '#2563eb',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '4px',
                                                                        fontSize: '11px',
                                                                        fontWeight: '500'
                                                                    }}>
                                                                        <i className={getOsIcon(surucu.isletim_sistemi)} style={{ marginRight: '4px' }}></i>
                                                                        {surucu.isletim_sistemi}
                                                                    </span>
                                                                )}
                                                                {surucu.dosya_boyutu && (
                                                                    <span style={{
                                                                        background: '#f1f5f9',
                                                                        color: '#64748b',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '4px',
                                                                        fontSize: '11px'
                                                                    }}>
                                                                        {surucu.dosya_boyutu}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* İndir Butonu */}
                                                            <button
                                                                onClick={() => handleDownload(surucu)}
                                                                className="download-btn"
                                                                style={{
                                                                    padding: '10px 20px',
                                                                    background: 'linear-gradient(135deg, #21BB9F 0%, #1aa38a 100%)',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontWeight: '600',
                                                                    fontSize: '13px',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '6px',
                                                                    transition: 'all 0.3s ease',
                                                                    boxShadow: '0 2px 8px rgba(33, 187, 159, 0.25)'
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-download"></i>
                                                                İndir
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Özellikler */}
                    <div className="section-padding" style={{ background: '#fff' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-shield-halved"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Güvenli İndirme</h3>
                                            <p className="font-f-3">Tüm sürücüler virüs taramasından geçirilmiş ve güvenlidir. Orijinal üretici kaynaklarından alınmıştır.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-arrows-rotate"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Güncel Versiyonlar</h3>
                                            <p className="font-f-3">Sürücüler düzenli olarak güncellenmekte ve en son versiyonlar sunulmaktadır.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-headset"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Teknik Destek</h3>
                                            <p className="font-f-3">Kurulum sorularınız için teknik destek ekibimize 7/24 ulaşabilirsiniz.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-file-lines"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Detaylı Dokümantasyon</h3>
                                            <p className="font-f-3">Her sürücü için kurulum kılavuzları ve teknik dökümanlar mevcuttur.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Aradığınız Sürücüyü Bulamadınız mı?</h2>
                                        <p>
                                            Teknik destek ekibimizle iletişime geçin, size yardımcı olalım.
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

                <style jsx>{`
                    @media (max-width: 768px) {
                        .kategori-buttons {
                            flex-wrap: nowrap !important;
                            justify-content: flex-start !important;
                            overflow-x: auto !important;
                            padding-bottom: 10px !important;
                            -webkit-overflow-scrolling: touch;
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                        }
                        .kategori-buttons::-webkit-scrollbar {
                            display: none;
                        }
                    }
                `}</style>
            </Layout >
        </>
    )
}
