'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSending(true)
        setError(null)

        try {
            const res = await fetch('/api/demo-talep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setSent(true)
                setFormData({ name: '', email: '', phone: '', company: '', message: '' })
            } else {
                throw new Error('Talep gönderilemedi')
            }
        } catch (err) {
            setError('Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
        } finally {
            setSending(false)
        }
    }
    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Demo Talep Et | Ücretsiz Barkod Sistemi Demosu | Solo Teknoloji"
                metaDescription="Solo Teknoloji POS ve barkod sistemleri için ücretsiz demo talep edin. El terminali, barkod yazıcı ve otomasyon çözümlerini ücretsiz deneyin."
                metaKeywords="ücretsiz demo, barkod sistemi demo, pos demo, el terminali deneme, yazılım demo, solo teknoloji demo"
                breadcrumbTitle="DEMO TALEP ET">
                <div>
                    {/*=====Demo Hero Start=======*/}
                    <div className="demo-hero section-padding" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #243D31 100%)' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="heading2 white-heading">
                                        <small style={{
                                            background: '#21BB9F',
                                            color: '#fff',
                                            padding: '8px 20px',
                                            borderRadius: '50px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            marginBottom: '20px'
                                        }}>
                                            🖥️ Ücretsiz Demo
                                        </small>
                                        <h2>Sistemlerimizi Ücretsiz Deneyin</h2>
                                        <p style={{ color: '#ccc' }}>
                                            POS sistemleri, barkod çözümleri ve yazılımlarımızı yerinde veya online olarak
                                            ücretsiz deneme fırsatı sunuyoruz. Satın almadan önce sistemin işletmenize
                                            uygunluğunu test edin.
                                        </p>
                                        <div className="demo-features" style={{ marginTop: '30px' }}>
                                            <div className="demo-feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <i className="fa-solid fa-check-circle" style={{ color: '#21BB9F', marginRight: '12px', fontSize: '20px' }}></i>
                                                <span style={{ color: '#fff' }}>Tamamen ücretsiz demo</span>
                                            </div>
                                            <div className="demo-feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <i className="fa-solid fa-check-circle" style={{ color: '#21BB9F', marginRight: '12px', fontSize: '20px' }}></i>
                                                <span style={{ color: '#fff' }}>Uzman ekip eşliğinde sunum</span>
                                            </div>
                                            <div className="demo-feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <i className="fa-solid fa-check-circle" style={{ color: '#21BB9F', marginRight: '12px', fontSize: '20px' }}></i>
                                                <span style={{ color: '#fff' }}>İşletmenize özel çözüm önerileri</span>
                                            </div>
                                            <div className="demo-feature-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                                <i className="fa-solid fa-check-circle" style={{ color: '#21BB9F', marginRight: '12px', fontSize: '20px' }}></i>
                                                <span style={{ color: '#fff' }}>Online veya yerinde demo seçeneği</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="demo-form-box" style={{
                                        background: '#fff',
                                        borderRadius: '20px',
                                        padding: '40px',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                                    }}>
                                        <h3 style={{ marginBottom: '10px', color: '#1A1A1A' }}>Demo Talebinde Bulunun</h3>
                                        <p style={{ color: '#666', marginBottom: '30px' }}>
                                            Formu doldurun, size en kısa sürede dönüş yapalım.
                                        </p>
                                        {sent ? (
                                            <div style={{
                                                background: 'rgba(33, 187, 159, 0.1)',
                                                border: '1px solid rgba(33, 187, 159, 0.3)',
                                                borderRadius: '16px',
                                                padding: '40px',
                                                textAlign: 'center'
                                            }}>
                                                <i className="fa-solid fa-check-circle" style={{ fontSize: '60px', color: '#21BB9F', marginBottom: '20px' }}></i>
                                                <h4 style={{ color: '#161540', marginBottom: '10px' }}>Demo Talebiniz Alındı!</h4>
                                                <p style={{ color: '#666', marginBottom: '20px' }}>En kısa sürede sizinle iletişime geçeceğiz.</p>
                                                <button
                                                    onClick={() => setSent(false)}
                                                    style={{
                                                        background: '#21BB9F',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '12px 30px',
                                                        borderRadius: '50px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    Yeni Talep Gönder
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                                {error && (
                                                    <div style={{
                                                        background: '#fee',
                                                        border: '1px solid #fcc',
                                                        borderRadius: '8px',
                                                        padding: '15px',
                                                        marginBottom: '20px',
                                                        color: '#c00'
                                                    }}>
                                                        {error}
                                                    </div>
                                                )}
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Adınız *"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px'
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="text"
                                                            name="lname"
                                                            placeholder="Soyadınız *"
                                                            onChange={(e) => setFormData(prev => ({ ...prev, name: prev.name.split(' ')[0] + ' ' + e.target.value }))}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px'
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <input
                                                            type="text"
                                                            name="company"
                                                            placeholder="Firma Adı *"
                                                            value={formData.company}
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px'
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="E-posta *"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px'
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            placeholder="Telefon *"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px'
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <select
                                                            name="product"
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px',
                                                                color: '#666',
                                                                background: '#fff'
                                                            }}
                                                            required
                                                        >
                                                            <option value="">Demo İstediğiniz Ürün/Hizmet *</option>
                                                            <option value="pos">POS Sistemleri</option>
                                                            <option value="barkod">Barkod Okuyucular</option>
                                                            <option value="terminal">El Terminalleri</option>
                                                            <option value="terazi">Terazi Sistemleri</option>
                                                            <option value="yazilim">Yazılım Çözümleri</option>
                                                            <option value="entegrasyon">Sistem Entegrasyonu</option>
                                                            <option value="diger">Diğer</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-12">
                                                        <select
                                                            name="demo_type"
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '15px',
                                                                fontSize: '14px',
                                                                color: '#666',
                                                                background: '#fff'
                                                            }}
                                                            required
                                                        >
                                                            <option value="">Demo Türü *</option>
                                                            <option value="online">Online Demo (Video Görüşme)</option>
                                                            <option value="yerinde">Yerinde Demo (İstanbul)</option>
                                                            <option value="ofis">Ofisimize Gelerek</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-12">
                                                        <textarea
                                                            name="message"
                                                            placeholder="Ek Notlarınız (İsteğe bağlı)"
                                                            rows={3}
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '15px',
                                                                border: '1px solid #e0e0e0',
                                                                borderRadius: '8px',
                                                                marginBottom: '20px',
                                                                fontSize: '14px',
                                                                resize: 'none'
                                                            }}
                                                        ></textarea>
                                                    </div>
                                                    <div className="col-12">
                                                        <button
                                                            type="submit"
                                                            disabled={sending}
                                                            style={{
                                                                width: '100%',
                                                                padding: '18px',
                                                                background: sending ? '#ccc' : 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                                                color: '#fff',
                                                                border: 'none',
                                                                borderRadius: '8px',
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                cursor: sending ? 'not-allowed' : 'pointer',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            {sending ? (
                                                                <>
                                                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                                                                    Gönderiliyor...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fa-solid fa-paper-plane" style={{ marginRight: '10px' }}></i>
                                                                    Demo Talep Et
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====Demo Hero End=======*/}

                    {/*=====Demo Products Start=======*/}
                    <div className="demo-products section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center">
                                        <small className="heading-top inner-heading-top">
                                            📦 Demo Ürünlerimiz
                                        </small>
                                        <h2>Hangi Ürünleri Deneyebilirsiniz?</h2>
                                        <p>İşletmenizin ihtiyacına göre aşağıdaki ürünlerimizi ücretsiz olarak deneyebilirsiniz.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space30"></div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="demo-product-card" style={{
                                        background: '#fff',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
                                        marginBottom: '30px',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <div className="demo-product-icon" style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '20px'
                                        }}>
                                            <i className="fa-solid fa-mobile-screen-button" style={{ fontSize: '28px', color: '#fff' }}></i>
                                        </div>
                                        <h4 style={{ marginBottom: '15px' }}>El Terminalleri</h4>
                                        <p style={{ color: '#666', marginBottom: '20px' }}>
                                            Zebra, Honeywell marka profesyonel el terminalleri.
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Android ve Windows işletim sistemi
                                            </li>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Entegre barkod okuyucu
                                            </li>
                                            <li style={{ color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                WiFi ve 4G LTE bağlantı
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="demo-product-card" style={{
                                        background: '#fff',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
                                        marginBottom: '30px',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <div className="demo-product-icon" style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '20px'
                                        }}>
                                            <i className="fa-solid fa-print" style={{ fontSize: '28px', color: '#fff' }}></i>
                                        </div>
                                        <h4 style={{ marginBottom: '15px' }}>Barkod Yazıcılar</h4>
                                        <p style={{ color: '#666', marginBottom: '20px' }}>
                                            Etiket ve barkod yazıcı çözümleri.
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Masaüstü ve endüstriyel modeller
                                            </li>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Termal ve termal transfer
                                            </li>
                                            <li style={{ color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Mobil yazıcı seçenekleri
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="demo-product-card" style={{
                                        background: '#fff',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        boxShadow: '0 5px 30px rgba(0,0,0,0.08)',
                                        marginBottom: '30px',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <div className="demo-product-icon" style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '20px'
                                        }}>
                                            <i className="fa-solid fa-barcode" style={{ fontSize: '28px', color: '#fff' }}></i>
                                        </div>
                                        <h4 style={{ marginBottom: '15px' }}>Barkod Okuyucular</h4>
                                        <p style={{ color: '#666', marginBottom: '20px' }}>
                                            Kablolu ve kablosuz barkod okuyucular.
                                        </p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                1D ve 2D barkod desteği
                                            </li>
                                            <li style={{ marginBottom: '8px', color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                USB ve Bluetooth bağlantı
                                            </li>
                                            <li style={{ color: '#666' }}>
                                                <i className="fa-solid fa-check" style={{ color: '#21BB9F', marginRight: '8px' }}></i>
                                                Datalogic, Zebra, Honeywell
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====Demo Products End=======*/}

                    {/*=====CTA Start=======*/}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Hemen Demo Randevusu Alın</h2>
                                        <p>Telefon veya WhatsApp ile hızlıca demo randevusu oluşturabilirsiniz.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="https://wa.me/905365014600?text=Merhaba,%20demo%20randevusu%20almak%20istiyorum." target="_blank" className="theme-btn-2" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '20px', whiteSpace: 'nowrap', gap: '10px' }}>
                                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '20px' }}></i>
                                        WhatsApp ile Randevu
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====CTA End=======*/}
                </div>
            </Layout>
        </>
    )
}
