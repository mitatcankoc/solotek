
'use client'
import Link from "next/link"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true
}

export default function Testimonial() {
    return (
        <>
            <div className="testimonial-4 section-padding bg-25">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading4 text-center">
                                <small data-aos="fade-up" data-aos-duration={400} className="overline">Our testimonial</small>
                                <h2 data-aos="fade-up" data-aos-duration={600}>We love our clients, and they love us.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-auto">
                            <Swiper {...swiperOptions}  className="testimonials-4 owl-carousel" data-aos="fade-in" data-aos-duration={400}>
                                <SwiperSlide className="single-testimonial">
                                    <div className="testimonial-image">
                                        <img src="/assets/img/testimonial/author6.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-contents">
                                        <div className="testimonial-icon">
                                            <img src="/assets/img/icons/quote-2.png" alt="" />
                                        </div>
                                        <p>Consultia financial Advisor firm is wonderful. I have had the chance to work with
                                            three of the
                                            lawyers and they all have been wonderful. They will tell you when you need a lawyer
                                            and when you
                                            don't. They actually try to save you
                                            money. They respond very fast to questions and try to help you understand what is
                                            going on.</p>
                                        <div className="testimonial-author">
                                            <Link href="#">Jason Behrendorff</Link>
                                            <p>CEO  Chief Operating Officer</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="single-testimonial">
                                    <div className="testimonial-image">
                                        <img src="/assets/img/testimonial/author6.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-contents">
                                        <div className="testimonial-icon">
                                            <img src="/assets/img/icons/quote-2.png" alt="" />
                                        </div>
                                        <p>Consultia financial Advisor firm is wonderful. I have had the chance to work with
                                            three of the
                                            lawyers and they all have been wonderful. They will tell you when you need a lawyer
                                            and when you
                                            don't. They actually try to save you
                                            money. They respond very fast to questions and try to help you understand what is
                                            going on.</p>
                                        <div className="testimonial-author">
                                            <Link href="#">Jason Behrendorff</Link>
                                            <p>CEO  Chief Operating Officer</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="single-testimonial">
                                    <div className="testimonial-image">
                                        <img src="/assets/img/testimonial/author6.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-contents">
                                        <div className="testimonial-icon">
                                            <img src="/assets/img/icons/quote-2.png" alt="" />
                                        </div>
                                        <p>Consultia financial Advisor firm is wonderful. I have had the chance to work with
                                            three of the
                                            lawyers and they all have been wonderful. They will tell you when you need a lawyer
                                            and when you
                                            don't. They actually try to save you
                                            money. They respond very fast to questions and try to help you understand what is
                                            going on.</p>
                                        <div className="testimonial-author">
                                            <Link href="#">Jason Behrendorff</Link>
                                            <p>CEO  Chief Operating Officer</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
