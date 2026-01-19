
import Link from "next/link"

export default function About() {
    return (
        <>
            <div className="about-area section-padding bg5-left">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-bg-21 ml50" data-aos="zoom-out" data-aos-duration={800}>
                                <div className="about-bg-main-img position-relative top-left-polygon-1">
                                    <img src="/assets/img/about/about21.png" alt="" />
                                    <div className="corner-right-bottom-shape2 position-absolute">
                                        <img src="/assets/img/shapes/shape-right-bottom2.png" alt="" />
                                    </div>
                                    <div className="corner-shape2-left position-absolute">
                                        <img src="/assets/img/shapes/tax-shape2.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading2 no-margin-heading mr50">
                                <small data-aos="fade-left" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />We Are Here For
                                    Your Tax Relief.</small>
                                <h2 data-aos="fade-left" data-aos-duration={800}>
                                    We Handle The Most Tedious Bookkeeping Tasks of Your Business
                                    Operations.
                                </h2>
                                <p data-aos="fade-left" data-aos-duration={1000}>
                                    Experienced, knowledgeable professionals in Property Tax
                                    Consulting. Our team of Property Tax Consultants is committed to
                                    saving you money by obtaining the lowest possible assessed value
                                    for your commercial or residential properties.
                                </p>
                                <p data-aos="fade-left" data-aos-duration={1000}>
                                    At Resolute we are experienced, knowledgeable professionals who
                                    always stay well-informed on the latest Tax Code changes in
                                    order to maintain our superior customer service.
                                </p>
                                <div className="space50" />
                                <div className="button-group" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link className="theme-btn-2" href="#"><span><i className="fa-solid fa-arrow-right" /></span> More
                                        About Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
