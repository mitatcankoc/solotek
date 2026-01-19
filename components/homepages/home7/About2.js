
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
                                    <small data-aos="fade-right" data-aos-duration={600} className="heading-top">We Are Here For
                                        Your Tax Relief.
                                        <img src="/assets/img/icons/hands.svg" alt="" /></small>
                                    <h2 data-aos="fade-right" data-aos-duration={800}>
                                        We Handle The Most Tedious Bookkeeping Tasks of Your Business
                                        Operations.
                                    </h2>
                                    <p data-aos="fade-right" data-aos-duration={1000}>
                                        Experienced, knowledgeable professionals in Property Tax
                                        Consulting. Our team of Property Tax Consultants is committed
                                        to saving you money by obtaining the lowest possible assessed
                                        value for your commercial or residential properties.
                                    </p>
                                    <div className="space50" />
                                    <div className="button-group" data-aos="fade-right" data-aos-duration={1200}>
                                        <Link className="theme-btn-2" href="#"><span><i className="fa-solid fa-arrow-right" /></span>
                                            More
                                            About Us
                                        </Link>
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
                                                <img src="/assets/img/icons/counter21.png" alt="" />
                                            </div>
                                            <h2>+<CounterUp count={645} /></h2>
                                            <p>Meetings So For</p>
                                        </div>
                                        <div className="single-counter" data-aos="zoom-out" data-aos-duration={800}>
                                            <div className="conter-icon">
                                                <img src="/assets/img/icons/counter22.png" alt="" />
                                            </div>
                                            <h2>+<CounterUp count={34} /></h2>
                                            <p>Clients</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-counter mt-5" data-aos="zoom-out" data-aos-duration={1000}>
                                            <div className="conter-icon">
                                                <img src="/assets/img/icons/counter23.png" alt="" />
                                            </div>
                                            <h2>+<CounterUp count={562} /></h2>
                                            <p>Companies</p>
                                        </div>
                                        <div className="single-counter" data-aos="zoom-out" data-aos-duration={1200}>
                                            <div className="conter-icon">
                                                <img src="/assets/img/icons/counter24.png" alt="" />
                                            </div>
                                            <h2>%<CounterUp count={90} /></h2>
                                            <p>Meetings So For</p>
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
                                    <small data-aos="fade-right" data-aos-duration={600} className="heading-top">We Are Here For
                                        Your Tax Relief.
                                        <img src="/assets/img/icons/hands.svg" alt="" /></small>
                                    <h2>
                                        We Handle The Most Tedious Bookkeeping Tasks of Your Business
                                        Operations.
                                    </h2>
                                    <p>
                                        Experienced, knowledgeable professionals in Property Tax
                                        Consulting. Our team of Property Tax Consultants is committed
                                        to saving you money by obtaining the lowest possible assessed
                                        value for your commercial or residential properties.
                                    </p>
                                    <div className="space50" />
                                    <Link className="theme-btn-2" href="#">More About Us
                                        <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
