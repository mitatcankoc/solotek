'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
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
            const res = await fetch('/api/iletisim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setSent(true)
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
            } else {
                throw new Error('Mesaj gönderilemedi')
            }
        } catch (err) {
            setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
        } finally {
            setSending(false)
        }
    }

    return (
        <>

            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="İletişim | Solo Teknoloji - Bize Ulaşın"
                metaDescription="Solo Teknoloji iletişim bilgileri. Adres: Kozyatağı, İstanbul. Telefon: +90 536 501 46 00. Barkod ve POS sistemleri için teklif alın, sorularınızı sorun."
                metaKeywords="solo teknoloji iletişim, telefon, adres, kozyatağı, istanbul, teklif al, destek"
                breadcrumbTitle="İLETİŞİM">
                <div>
                    <div className="contact-boxes">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="single-contact-box">
                                        <div className="contact-box-icon">
                                            <i className="fa-solid fa-phone" style={{ fontSize: '40px', color: '#21BB9F' }}></i>
                                        </div>
                                        <div className="contact-box-content">
                                            <p className="font-f-3">BİZİ ARAYIN</p>
                                            <Link className="font-f-3" href="tel:+905365014600">+90 536 501 46 00</Link>
                                            <Link className="font-f-3" href="tel:+905432599784">+90 543 259 97 84</Link>
                                            <Link className="font-f-3" href="tel:+905438624751">+90 543 862 47 51</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="single-contact-box">
                                        <div className="contact-box-icon">
                                            <i className="fa-solid fa-envelope" style={{ fontSize: '40px', color: '#21BB9F' }}></i>
                                        </div>
                                        <div className="contact-box-content">
                                            <p className="font-f-3">E-POSTA</p>
                                            <Link className="font-f-3" href="mailto:info@soloteknoloji.com.tr">info@soloteknoloji.com.tr</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="single-contact-box address-box">
                                        <div className="contact-box-icon">
                                            <i className="fa-solid fa-location-dot" style={{ fontSize: '40px', color: '#21BB9F' }}></i>
                                        </div>
                                        <div className="contact-box-content">
                                            <p className="font-f-3">ADRES</p>
                                            <span className="font-f-3">Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====Contact Boxes End=======*/}
                    {/*=====Contact Form Start=======*/}
                    <div className="main-contact-form section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="heading2 mr50">
                                        <small className="heading-top inner-heading-top"><i className="fa-solid fa-headset" style={{ marginRight: '8px', color: '#21BB9F' }}></i>İletişime Geçin</small>
                                        <h2>Birlikte Çalışalım</h2>
                                        <p>
                                            Projeleriniz için vizyonunuzu bizimle paylaşın. Sorularınız için buradayız, size yardımcı olmaktan mutluluk duyarız!
                                        </p>
                                        <div className="contact-info-side" style={{ marginTop: '30px' }}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <i className="fa-solid fa-clock" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                                <span>Pzt-Cuma: 08:00-18:30 | Cumartesi: 09:00-16:00</span>
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <i className="fa-brands fa-whatsapp" style={{ color: '#21BB9F', marginRight: '10px' }}></i>
                                                <Link href="https://wa.me/905438624751" target="_blank">WhatsApp ile İletişim</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="main-form">
                                        {sent ? (
                                            <div style={{
                                                background: 'rgba(33, 187, 159, 0.1)',
                                                border: '1px solid rgba(33, 187, 159, 0.3)',
                                                borderRadius: '16px',
                                                padding: '40px',
                                                textAlign: 'center'
                                            }}>
                                                <i className="fa-solid fa-check-circle" style={{ fontSize: '60px', color: '#21BB9F', marginBottom: '20px' }}></i>
                                                <h3 style={{ color: '#161540', marginBottom: '10px' }}>Mesajınız Alındı!</h3>
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
                                                    Yeni Mesaj Gönder
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
                                                            placeholder="Adınız Soyadınız"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="E-posta Adresiniz"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            placeholder="Telefon Numaranız"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input
                                                            type="text"
                                                            name="subject"
                                                            placeholder="Konu"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <textarea
                                                            name="message"
                                                            cols={30}
                                                            rows={5}
                                                            placeholder="Mesajınız"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <button
                                                            type="submit"
                                                            className="full-btn theme-btn-11"
                                                            disabled={sending}
                                                            style={{ opacity: sending ? 0.7 : 1 }}
                                                        >
                                                            {sending ? (
                                                                <>
                                                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                                                                    Gönderiliyor...
                                                                </>
                                                            ) : 'Gönder'}
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
                    {/*=====Contact Form End=======*/}
                    {/*=====Map Start=======*/}
                    <div className="map-area">
                        <div className="container-fluid p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6022.743941865362!2d29.04366!3d40.995231!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7f3732c39c3%3A0xcb6117780ec6559f!2zU09MTyBURUtOT0xPSsSwIFNBTi4gVMSwQy4gTFRELiDFnlTEsC4!5e0!3m2!1str!2str!4v1768440838645!5m2!1str!2str"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                    {/*=====Map End=======*/}
                    {/*=====FAQ Start=======*/}
                    <div className="faq2 section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center">
                                        <small className="heading-top inner-heading-top"><i className="fa-solid fa-circle-question" style={{ marginRight: '8px', color: '#21BB9F' }}></i>SSS</small>
                                        <h2>Sıkça Sorulan Sorular</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="single-faq2">
                                        <h3>Hangi markaların ürünlerini satıyorsunuz?</h3>
                                        <p>
                                            Zebra, Honeywell, Datalogic gibi dünya çapında tanınmış markaların el terminalleri, barkod okuyucular ve yazıcılarını satıyoruz. Tüm ürünlerimiz orijinal ve garantilidir.
                                        </p>
                                    </div>
                                    <div className="single-faq2">
                                        <h3>Teknik servis hizmeti veriyor musunuz?</h3>
                                        <p>
                                            Evet, satışını yaptığımız tüm ürünler için teknik servis ve bakım hizmeti sunuyoruz. Arıza durumunda hızlı müdahale ile işletmenizin kesintisiz çalışmasını sağlıyoruz.
                                        </p>
                                    </div>
                                    <div className="single-faq2">
                                        <h3>Yazılım entegrasyonu yapıyor musunuz?</h3>
                                        <p>
                                            Evet, barkod sistemleri ve teraziler için mevcut yazılımlarınıza entegrasyon hizmeti sunuyoruz. Ayrıca ihtiyaçlarınıza özel yazılım çözümleri de geliştiriyoruz.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="single-faq2">
                                        <h3>Kurulum hizmeti dahil mi?</h3>
                                        <p>
                                            Evet, satın aldığınız sistemlerin kurulumu ve eğitimi hizmetlerimize dahildir. Uzman ekibimiz yerinde kurulum ve kullanım eğitimi vermektedir.
                                        </p>
                                    </div>
                                    <div className="single-faq2">
                                        <h3>Garanti süresi ne kadar?</h3>
                                        <p>
                                            Ürünlerimiz marka ve modele göre 1-3 yıl arası garanti kapsamındadır. Garanti süresince ücretsiz teknik destek ve onarım hizmeti sunuyoruz.
                                        </p>
                                    </div>
                                    <div className="single-faq2">
                                        <h3>Türkiye genelinde hizmet veriyor musunuz?</h3>
                                        <p>
                                            Evet, Türkiye'nin her yerine ürün gönderimi ve uzaktan teknik destek hizmeti sunuyoruz. İstanbul ve çevresinde yerinde servis hizmeti de vermekteyiz.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space30" />
                            <div className="price-notice">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="heading4 inner-heading no-margin-heading">
                                            <h4 className="font-f-3 weight-700">Daha fazla sorunuz mu var?</h4>
                                            <p>
                                                İşletmenize özel çözümler için bizimle iletişime geçin. Size en uygun sistemi birlikte belirleyelim.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-md-right">
                                        <Link href="https://wa.me/905438624751" target="_blank" className="theme-btn-11">WhatsApp ile Yazın</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====FAQ End=======*/}

                    {/*=====Demo CTA Start=======*/}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Sistemlerimizi Ücretsiz Deneyin</h2>
                                        <p>
                                            Satın almadan önce POS sistemleri, barkod okuyucular ve yazılımlarımızı ücretsiz olarak deneyebilirsiniz.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/demo-talep" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                        Demo Talep Et
                                        <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====Demo CTA End=======*/}
                </div>

            </Layout>
        </>
    )
}
