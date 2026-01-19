
import Link from "next/link"

export default function About() {
    return (
        <>
            <div className="about-4 section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-4-image position-relative" data-aos="zoom-out" data-aos-duration={700}>
                                <img src="/assets/img/about/about-5.jpg" alt="" />
                                <div className="about-4-img-2 ">
                                    <img src="/assets/img/shapes/shape-6.png" alt="" />
                                </div>
                                <div className="about-3-img-3 ">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="about-3-img-5 ">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="about-3-img-6 ">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="about-4-image-content " data-aos="fade-right" data-aos-duration={900}>
                                    <p>Largest Financial Advsior Agency in all over the United States of America.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading4 no-margin-heading">
                                <small data-aos="fade-left" data-aos-duration={400} className="overline">About us</small>
                                <h2 data-aos="fade-left" data-aos-duration={600}>Feel confident in your financial future with
                                    consultia.
                                </h2>
                                <p data-aos="fade-left" data-aos-duration={800}>We focus on people – from our first meeting with
                                    you to the
                                    ongoing relationship we build with your
                                    spouse (if applicable), your family and your extended financial team that may include
                                    accountants,
                                    attorneys, and other trusted
                                    advisors.
                                </p>
                                <p data-aos="fade-left" data-aos-duration={800}> Behind every insight into your finances is an
                                    impressive
                                    team of knowledgeable professionals, all
                                    ready to help you live your best life. And we’d love nothing more than to put our expertise
                                    to work for
                                    you.</p>
                                <div className="space30" />
                                <div className="button-group" data-aos="fade-left" data-aos-duration={900}>
                                    <Link className="theme-btn-11" href="#">View Our Works <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                </div>
                            </div>
                            <div className="space40" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
