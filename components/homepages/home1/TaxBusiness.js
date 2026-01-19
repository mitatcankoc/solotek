
import Link from "next/link"

export default function TaxBusiness() {
    return (
        <>
            <div className="tax-business section-padding2 bg6" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="heading2 white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />Hizmetlerimiz</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}><span className="heilight-left">Solo Teknoloji</span> güvenilir ve kaliteli hizmetler sunmaktadır.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <i className="fa-solid fa-mobile-screen-button"></i>
                                </div>
                                <h3>El Terminalleri</h3>
                                <p>Zebra ve Honeywell el terminalleri. Depo, lojistik ve saha operasyonları için güçlü ve dayanıklı çözümler.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <i className="fa-solid fa-print"></i>
                                </div>
                                <h3>Barkod Yazıcılar</h3>
                                <p>Etiket yazıcı, kart yazıcı, RFID yazıcı ve mobil yazıcı çözümleri. Termal transfer ve direkt termal baskı teknolojileri.</p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <i className="fa-solid fa-desktop"></i>
                                </div>
                                <h3>Endüstriyel Panel PC</h3>
                                <p>Endüstriyel ortamlar için tasarlanmış dayanıklı panel PC çözümleri. Üretim, depo ve lojistik alanlarında güvenilir performans.</p>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <i className="fa-solid fa-qrcode"></i>
                                </div>
                                <h3>Barkod Okuyucular</h3>
                                <p>El tipi ve sabit barkod okuyucular. 1D/2D barkod, QR kod okuma. Datalogic, Zebra, Honeywell ürünleri.</p>
                            </div>
                        </div>
                        <div className="space20" />
                        <div className="col-12 text-center" data-aos="fade-up" data-aos-duration={1400}>
                            <Link className="theme-btn-2" href="/hizmetlerimiz">Tüm Hizmetleri İnceleyin <span><i className="fa-solid fa-arrow-right" /></span></Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
