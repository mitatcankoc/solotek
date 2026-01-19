
import Link from "next/link"

export default function About() {
    return (
        <>

            <div className="about-area section-padding bg5-left">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-bg-21 mr50" data-aos="zoom-out" data-aos-duration={800}>
                                <div className="about-bg-main-img position-relative top-left-polygon-1">
                                    <img src="/assets/img/about/about21.png" alt="Solo Teknoloji Hakkımızda" />
                                    <div className="corner-right-bottom-shape2 position-absolute">
                                        <img src="/assets/img/shapes/shape-right-bottom2.png" alt="Dekoratif köşe elementi" />
                                    </div>
                                    <div className="corner-shape2-left position-absolute">
                                        <img src="/assets/img/shapes/tax-shape2.png" alt="Dekoratif şekil" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading2 no-margin-heading ml50">
                                <small data-aos="fade-left" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="El ele ikon" />Hakkımızda</small>
                                <h2 data-aos="fade-left" data-aos-duration={800}>SOLO TEKNOLOJİ SAN. TİC. LTD. ŞTİ.</h2>
                                <p data-aos="fade-left" data-aos-duration={1000}>Solo Teknoloji, 2020 yılında yazar kasa satışı ile başladığı iş hayatında, kısa zamanda bünyesine kattığı teknik destek hizmeti ile sektöre güçlü bir giriş yapmıştır.
                                </p>
                                <p data-aos="fade-left" data-aos-duration={1000}>Barkodlu sistem satış ve kurulumunun yanı sıra terazi ve yazılımlarla donattığı ürün yelpazesi ve hizmetleri ile sektörün tanınan ve bilinen kurumları arasına girerek çok sayıda ödül almıştır.</p>
                                <div className="space50" />
                                <div className="button-group" data-aos="fade-left" data-aos-duration={1200}>
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
