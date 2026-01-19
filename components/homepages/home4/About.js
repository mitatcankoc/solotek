
import Link from "next/link"

export default function About() {
    return (
        <>
            <div className="about-area section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="about-img-elements" data-aos="zoom-out" data-aos-duration={600}>
                                <img className="about-main-img" src="/assets/img/about/about1.jpg" alt="" />
                                <div className="circle-elements">
                                    <div className="circle-elements-wrap">
                                        <img src="/assets/img/shapes/circle.png" alt="" className="circle-text" />
                                        <img src="/assets/img/icons/circle-arrow.png" alt="" className="circle-arrow" />
                                    </div>
                                </div>
                                <div className="about-rates updown">
                                    <img src="/assets/img/shapes/about-shape1.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading no-margin-heading">
                                <small data-aos="fade-left" data-aos-duration={600}>EST 1991</small>
                                <h3 data-aos="fade-left" data-aos-duration={800}>Business opportunities <span className="heilight-right">are
                                </span> <br /> like buses, there's always
                                    <span className="heading-underline">another one</span> coming.
                                </h3>
                                <p data-aos="fade-left" data-aos-duration={1000}>When it comes to business, listen to Henry
                                    David Thoreau:
                                    things usually don’t happen overnight –
                                    instead, to find
                                    success takes a lot of time, effort, and courage. Opus includes everything you need to build
                                    a beautiful
                                    website for
                                    your business. Built to perform and look good doing so.</p>
                                <div className="space30" />
                                <div className="button-group" data-aos="fade-left" data-aos-duration={1200}>
                                    <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-lg-none">
                            <div className="about-img-elements">
                                <img className="about-main-img" src="/assets/img/about/about1.jpg" alt="" />
                                <div className="circle-elements">
                                    <div className="circle-elements-wrap">
                                        <img src="/assets/img/shapes/circle.png" alt="" className="circle-text" />
                                        <img src="/assets/img/icons/circle-arrow.png" alt="" className="circle-arrow" />
                                    </div>
                                </div>
                                <div className="about-rates updown">
                                    <img src="/assets/img/shapes/about-shape1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
