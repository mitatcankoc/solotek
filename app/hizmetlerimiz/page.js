import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Page() {
    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Hizmetlerimiz | Barkod Satış, Kurulum ve Teknik Servis | Solo Teknoloji"
                metaDescription="Solo Teknoloji hizmetleri - Barkod sistemi satış ve kurulum, teknik servis, yazılım entegrasyonu, otomasyon çözümleri ve 7/24 destek hizmetleri."
                metaKeywords="barkod sistemi kurulum, pos teknik servis, yazılım entegrasyonu, otomasyon hizmeti, 7/24 destek, bakım sözleşmesi"
                breadcrumbTitle="Hizmetlerimiz">
                <div>
                    <div className="section-padding bg-28">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-mobile-screen-button"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">El Terminalleri</h3>
                                            <p className="font-f-3">Zebra ve Honeywell el terminalleri. Depo, lojistik ve saha operasyonları için güçlü ve dayanıklı çözümler.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-print"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Barkod Yazıcılar</h3>
                                            <p className="font-f-3">Etiket yazıcı, kart yazıcı, RFID yazıcı ve mobil yazıcı çözümleri. Termal transfer ve direkt termal baskı teknolojileri.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-qrcode"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Barkod Okuyucular</h3>
                                            <p className="font-f-3">El tipi ve sabit barkod okuyucular. 1D/2D barkod, QR kod okuma. Datalogic, Zebra, Honeywell ürünleri.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-desktop"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Endüstriyel Panel PC</h3>
                                            <p className="font-f-3">Endüstriyel ortamlar için tasarlanmış dayanıklı panel PC çözümleri. Üretim, depo ve lojistik alanlarında güvenilir performans.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-gears"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Otomasyon Sistemleri</h3>
                                            <p className="font-f-3">Depo, lojistik ve üretim otomasyon çözümleri. Stok yönetimi, izlenebilirlik ve raporlama sistemleri.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-inner-service single-inner-service-2 trans-1">
                                        <div className="service-icon bg-24 service-icon-solo">
                                            <i className="fa-solid fa-headset"></i>
                                        </div>
                                        <div className="service-content">
                                            <h3 className="font-f-3">Danışmanlık Hizmetleri</h3>
                                            <p className="font-f-3">Teknolojik ihtiyaçlarınız için analiz, planlama ve uygulama süreçlerinde danışmanlık hizmetleri sunarak iş süreçlerinizi daha etkin hale getiriyoruz.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====Service end=======*/}
                    {/*=====CTA start=======*/}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Hizmetlerimiz Hakkında Bilgi Alın</h2>
                                        <p>İşletmenize özel çözümler için bizimle iletişime geçin. Size en uygun sistemi birlikte belirleyelim.</p>
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
