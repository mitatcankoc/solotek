
import CounterUp from "@/components/elements/CounterUp"
import Link from "next/link"

export default function About2() {
    return (
        <>
            <div className="about-area section-padding bg5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="mr50">
                                <div className="heading2 no-margin-heading">
                                    <small data-aos="fade-right" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />Neden Solo Teknoloji?</small>
                                    <h2 data-aos="fade-right" data-aos-duration={800}>20 Yıllık Deneyim ve Uzmanlık</h2>
                                    <p data-aos="fade-right" data-aos-duration={1000}>Otomasyon sistemleri ile uyumlu yeni nesil yazar kasa, barkodlu barkodsuz ürünler, terazi ve diğer aksesuarın satış, kurulum ve desteğinde öncü kuruluşlar arasında yer alan Solo Teknoloji güvenilir ve kaliteli hizmetler sunmaktadır.
                                    </p>
                                    <div className="space50" />
                                    <div className="button-group" data-aos="fade-right" data-aos-duration={1200}>
                                        <Link className="theme-btn-2" href="/hakkimizda">Detaylar <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="counter2 ml50 position-relative">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="single-counter" data-aos="zoom-out" data-aos-duration={600}>
                                            <div className="conter-icon">
                                                <i className="fa-solid fa-calendar-check"></i>
                                            </div>
                                            <h2><CounterUp count={20}/>+</h2>
                                            <p>Yıllık Deneyim</p>
                                        </div>
                                        <div className="single-counter" data-aos="zoom-out" data-aos-duration={800}>
                                            <div className="conter-icon">
                                                <i className="fa-solid fa-users"></i>
                                            </div>
                                            <h2><CounterUp count={500}/>+</h2>
                                            <p>Mutlu Müşteri</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-counter mt-5" data-aos="zoom-out" data-aos-duration={1000}>
                                            <div className="conter-icon">
                                                <i className="fa-solid fa-clipboard-check"></i>
                                            </div>
                                            <h2><CounterUp count={1000}/>+</h2>
                                            <p>Tamamlanan Proje</p>
                                        </div>
                                        <div className="single-counter" data-aos="zoom-out" data-aos-duration={1200}>
                                            <div className="conter-icon">
                                                <i className="fa-solid fa-face-smile"></i>
                                            </div>
                                            <h2><CounterUp count={98}/>%</h2>
                                            <p>Müşteri Memnuniyeti</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="corner-right-bottom-shape2 position-absolute">
                                    <img src="/assets/img/shapes/shape-right-bottom2.png" alt="" />
                                </div>
                                <div className="corner-shape2-left position-absolute">
                                    <img src="/assets/img/shapes/tax-shape2.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-lg-none">
                            <div className="mr50">
                                <div className="heading2 no-margin-heading">
                                    <small className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />Neden Solo Teknoloji?</small>
                                    <h2>20 Yıllık Deneyim ve Uzmanlık</h2>
                                    <p>Otomasyon sistemleri ile uyumlu yeni nesil yazar kasa, barkodlu barkodsuz ürünler, terazi ve diğer aksesuarın satış, kurulum ve desteğinde öncü kuruluşlar arasında yer alan Solo Teknoloji güvenilir ve kaliteli hizmetler sunmaktadır.
                                    </p>
                                    <div className="space50" />
                                    <Link className="theme-btn-2" href="/hakkimizda">Detaylar <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
