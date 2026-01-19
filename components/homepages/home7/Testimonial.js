
import Link from "next/link"

export default function Testimonial() {
    return (
        <>
            <div className="testimonial-area testimonial-2 position-relative bg6 section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 m-auto">
                            <div className="heading2 white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />We Are Here For
                                    Your Tax Relief.</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>
                                    <span className="heilight-left">We</span> have reduced the property
                                    taxes on more than 40,000 properties across 10+ counties.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 m-auto" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="testimonial-sliders">
                                <div className="testimonial-nav-rtl">
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author1.jpg" alt="" />
                                    </div>
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author2.jpg" alt="" />
                                    </div>
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author3.jpg" alt="" />
                                    </div>
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author4.jpg" alt="" />
                                    </div>
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author5.jpg" alt="" />
                                    </div>
                                    <div className="single-testimonial-nav">
                                        <img src="/assets/img/testimonial/author3.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="slider-testimonial-rtl">
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                    <div className="single-testimonial">
                                        <h5>
                                            “If your appetite is whetted, check out which tour might
                                            take your fancy, fill out the contact form or send an email
                                            so we can make an appointment. Tours are privately organised
                                            and tailor-made to suit most tastes.”
                                        </h5>
                                        <div className="author">
                                            <Link href="#">Leslie Alexander</Link>
                                            <p>CEO, Business Administ</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-arrows">
                                    <div className="testimonial-prev-arrow">
                                        <button>
                                            <img src="/assets/img/icons/testi-prev.svg" alt="" />
                                        </button>
                                    </div>
                                    <div className="testimonial-next-arrow">
                                        <button>
                                            <img src="/assets/img/icons/testi-next.svg" alt="" />
                                        </button>
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
