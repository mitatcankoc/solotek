
import Link from "next/link"

export default function About() {
    return (
        <>
            <div>
                <div className="about-3 section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-3-image position-relative" data-aos="zoom-out" data-aos-duration={800}>
                                    <img src="/assets/img/about/about-3.png" alt="" />
                                    <div className="about-3-img-1">
                                        <img src="/assets/img/about/about-4.png" alt="" />
                                    </div>
                                    <div className="about-3-img-2">
                                        <img src="/assets/img/shapes/shape-2.png" alt="" />
                                    </div>
                                    <div className="about-3-img-3">
                                        <img src="/assets/img/shapes/shape-3.png" alt="" />
                                    </div>
                                    <div className="about-3-img-4">
                                        <img src="/assets/img/shapes/shape-5.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="heading3 no-margin-heading">
                                    <small data-aos="fade-left" data-aos-duration={600} className="overline">EST 1991</small>
                                    <h2 data-aos="fade-left" data-aos-duration={800}>Over 75 years of collective experience
                                        protecting the
                                        rights of people in Texas  across the United States.</h2>
                                    <p data-aos="fade-left" data-aos-duration={1000}>When we take on a new case, our experienced
                                        attorneys get
                                        to work right away. We gather all the necessary information and evidence to build a solid
                                        legal strategy.
                                        With open and honest
                                        communication, we take in all the details and draw
                                        from our experience to better understand your situation. Our Dallas-Fort Worth attorneys
                                        believe in the
                                        value of strong, long-term relationships with clients. </p>
                                </div>
                                <div className="space40" />
                                <div className="about-author-3" data-aos="fade-left" data-aos-duration={1200}>
                                    <div className="author-img">
                                        <img src="/assets/img/testimonial/author-6.jpg" alt="" />
                                    </div>
                                    <p>“I used Guest  Gray for a child custody case and they were great. I was really nervous about
                                        the case
                                        but they took care of everything and answered all my questions. I would recommend their
                                        services to
                                        anyone.”</p>
                                    <h5 className="author-desc"><Link href="#">Matt Henry</Link>, Clan Capital LLC</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space80" />
            </div>

        </>
    )
}
