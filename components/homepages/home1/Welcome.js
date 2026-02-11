
import LogoSlider2 from "@/components/slider/LogoSlider2"
import Link from "next/link"

export default function Welcome() {
    return (
        <>
            <div className="welcome-area welcome-2 bg5 position-relative" id="home">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="title title2 ">
                                <small data-aos="fade-right" data-aos-duration={600} className="heading-top2">⭐ Uzman Ekip & Deneyimli Kadro</small>
                                <h1 data-aos="fade-right" data-aos-duration={800} className="hero-title">El Terminali, Barkod Yazıcı ve Otomasyon Çözümleri</h1>
                                <p data-aos="fade-right" data-aos-duration={1000}>El terminalleri, barkod yazıcılar, barkod okuyucular, otomasyon sistemleri ve endüstriyel panel PC çözümleri. Satış, kurulum ve teknik servis desteğinde öncü kuruluş.</p>
                                <div className="space30" />
                                <div className="btn-group" data-aos="fade-right" data-aos-duration={1200}>
                                    <Link className="theme-btn-2" href="/iletisim">Teklif Alın <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                    <Link className="theme-btn-3" href="/iletisim">Bize Yazın <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                </div>
                                <div className="space80" />
                                <div className="logo-area2" data-aos="fade-right" data-aos-duration={1400}>
                                    <p>Referanslarımız ve Güvenilen Markalar</p>
                                    <LogoSlider2 />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="hero-img-elements" data-aos="zoom-out" data-aos-duration={800}>
                                <div className="hero-main-img position-relative top-right-polygon-1">
                                    <img className="border-radius" src="/assets/img/hero.png" alt="Solo Teknoloji" />
                                    <div className="corner-shape2 position-absolute">
                                        <img src="/assets/img/shapes/tax-shape1.png" alt="Dekoratif şekil" loading="lazy" />
                                    </div>
                                    <div className="corner-right-bottom-shape2 position-absolute">
                                        <img src="/assets/img/shapes/shape-right-bottom2.png" alt="Dekoratif köşe elementi" loading="lazy" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="down-arrow2" data-aos="fade-down" data-aos-duration={400}>
                    <Link href="/#about"><img src="/assets/img/icons/down-arrow-black.svg" alt="Aşağı kaydır" /></Link>
                </div>
            </div>

        </>
    )
}
