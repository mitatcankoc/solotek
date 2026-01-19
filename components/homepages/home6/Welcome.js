
import Link from "next/link"

export default function Welcome() {
    return (
        <>
            <div className="home6-full-header bg-cover" style={{ backgroundImage: 'url(assets/img/bg/hero6-bg.png)' }}>
                <div className="welcome-4 home4-bg position-relative" id="home">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="titel6-main">
                                    <h1 className="font-f-3" data-aos="fade-right" data-aos-duration={800}>Tax preparation to
                                        business services  <span className="after6">legal documents.</span></h1>
                                    <div className="space10" />
                                    <p className="font-f-7" data-aos="fade-right" data-aos-duration={1100}>Servicios Arellano works
                                        with businesses of all sizes to get the most deduction possible on their tax returns.
                                    </p>
                                    <div className="space30" />
                                    <div className="home6-header-buttons" data-aos="fade-right" data-aos-duration={1500}>
                                        <div className="button6">
                                            <Link href="#">Schedule your appointment <span><i className="fa-solid fa-arrow-right" /></span> </Link>
                                        </div>
                                        <div className="header6-button">
                                            <Link href="#">Schdule A Call <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="home6-header-images">
                                    <div className="home6-header-img1 aniamtion-key-5">
                                        <img src="/assets/img/shapes/header6-main-shpe.svg" alt="" />
                                    </div>
                                    <div className="home6-header-img2" data-aos="zoom-out" data-aos-duration={800}>
                                        <img src="/assets/img/image/home6-main-header.png" alt="" />
                                    </div>
                                    <div className="home6-header-img3 aniamtion-key-1" data-aos="zoom-out" data-aos-duration={1200}>
                                        <img src="/assets/img/shapes/header6-shape1.svg" alt="" />
                                    </div>
                                    <div className="home6-header-img4 aniamtion-key-1" data-aos="zoom-out" data-aos-duration={1200}>
                                        <img src="/assets/img/shapes/header6-shape2.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
