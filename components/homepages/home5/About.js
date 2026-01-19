
import Link from "next/link"

export default function About() {
    return (
        <>
            <div className="home4-about section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="home4-about-all-images">
                                <div className="home4-about-img-1" data-aos="fade-down" data-aos-duration={800}>
                                    <img src="/assets/img/about/home4-about-1.png" alt="" />
                                </div>
                                <div className="home4-about-img-2" data-aos="fade-right" data-aos-duration={1000}>
                                    <img src="/assets/img/about/home4-about-2.png" alt="" />
                                </div>
                                <div className="home4-about-img-3" data-aos="zoom-out" data-aos-duration={1000}>
                                    <img src="/assets/img/about/home4-about-3.png" alt="" />
                                </div>
                                <div className="home4-about-img-4">
                                    <img src="/assets/img/shapes/home4-img-shap.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="hadding5 ml50">
                                <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-left" data-aos-duration={700}>About Us</span>
                                <div className="space10" />
                                <h1 className="font-f-6 font-30 font-lg-42 weight-500 line-height-38 line-height-lg-48 color4" data-aos="fade-left" data-aos-duration={900}>We specialize in customized insurance programs
                                    for people and
                                    businesses.</h1>
                                <div className="space10" />
                                <p className="font-f-5 font-20 line-height-lg-32 weight-400 color-p-4" data-aos="fade-left" data-aos-duration={1100}>Since 1948, Seltzer Group Partners has been a trusted insurance
                                    agency that helps
                                    individuals and businesses protect their future.
                                    With an extensive network of independent agencies and industry partners, we provide
                                    customized coverage
                                    that meets your specific needs today and minimizes your future risk.
                                </p>
                                <div className="space10" />
                                <p className="font-f-5 font-20 line-height-lg-32 weight-400 color-p-4" data-aos="fade-left" data-aos-duration={800}> We don’t just sell insurance; we build relationships with our
                                    clients to help
                                    them make informed decisions. Our team of insurance professionals have the knowledge,
                                    skills, markets and
                                    desire necessary to provide you with the most pleasant insurance experience possible.</p>
                                <div className="space20" />
                                <Link href="#" className="font-f-5 theme-btn-18" data-aos="fade-left" data-aos-duration={1000}>All
                                    Categories <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
