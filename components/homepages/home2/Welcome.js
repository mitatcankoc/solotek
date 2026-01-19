
import Link from "next/link"

export default function Welcome() {
    return (
        <>
            <div className="welcome-4 bg-13 position-relative pt-90" id="home">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="title-4 mr50">
                                <h1 data-aos="fade-right" data-aos-duration={500}>Our financial advisors are here to help.</h1>
                                <p data-aos="fade-right" data-aos-duration={700}>Making a mistake on your return can be costly.
                                    From missed
                                    deductions, or worse, the dreaded IRS
                                    audit.</p>
                                <div className="space30" />
                                <div className="btn-group" data-aos="fade-right" data-aos-duration={900}>
                                    <Link className="theme-btn-11" href="#">Make an Appointment <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                    <Link href="/tel:7363534" className="theme-btn-15">
                                        <span className="btn-icon"><img src="/assets/img/icons/phone-icon-4.svg" alt="" /></span>
                                        <span className="btn-content">
                                            <span className="btn-title">Hotline 24/7</span>
                                            <span className="btn-text">+49 30 9233255</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="zoom-out" data-aos-duration={1000}>
                            <div className="hero-4-image">
                                <div className="single-card">
                                    <img src="/assets/img/bg/card-1.png" alt="" />
                                    <img src="/assets/img/bg/card-2.png" alt="" />
                                    <img src="/assets/img/bg/card-3.png" alt="" />
                                    <img className="card-shape-left" src="/assets/img/shapes/shape31.png" alt="" />
                                    <img className="card-shape-right" src="/assets/img/shapes/shape31.png" alt="" />
                                    <img className="card-shape-bottom" src="/assets/img/shapes/shape31.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="welcome-4-bg" data-aos="zoom-in" data-aos-duration={1000}>
                    <img src="/assets/img/bg/bg9.png" alt="" />
                </div>
            </div>

        </>
    )
}
