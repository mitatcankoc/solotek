

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
export default function Testimaonial() {
    return (
        <>
            <div className="home4-testimonial sp2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto text-center">
                            <div className="hadding5">
                                <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-up" data-aos-duration={800}>Testimonials</span>
                                <div className="space10" />
                                <h1 className="font-f-6 font-30 font-lg-42 weight-600 font-w line-height-38 line-height-lg-48 color4" data-aos="fade-up" data-aos-duration={1000}>
                                    Our biggest motivation is happy clients
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="space40" />
                    <div className="row" data-aos="fade-up" data-aos-duration={1200}>
                        <div className="col-md-12 m-auto">
                            <div className="_relative">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="trusted-slider-img">
                                            <img src="/assets/img/testimonial/home4-tes-1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <Swiper {...swiperOptions} className="trusred-slider-all owl-carousel">
                                            <SwiperSlide className="hadding trusted-hadding">
                                                <div className="hadding-span hadding-span2">
                                                    <img src="/assets/img/icons/home4-testimonial-icon.svg" alt="" />
                                                </div>
                                                <p className="font-20 weight-400 line-height-34 font-f-5 font-w" style={{ fontStyle: 'italic' }}>
                                                    “ Consultia's unique insurance offering gives us peace
                                                    of mind knowing that our operations are covered while
                                                    also allowing us to control our costs. Onboarding our
                                                    entire fleet was seamless and intuitive, and now we can
                                                    take a more proactive approach to risk management and
                                                    helping our drivers become safer.”
                                                </p>
                                                <div className="space10" />
                                                <div className="slider-bottom">
                                                    <h4 className="font-f-6 font-20 weight-600 line-height-20 font-w">
                                                        Jason Behrendorff
                                                    </h4>
                                                    <p className="fong-f-5 weight-400 font-14 line-height-14 pera-c-2">
                                                        CEO  Chief Operating Officer
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="hadding trusted-hadding">
                                                <div className="hadding-span hadding-span2">
                                                    <img src="/assets/img/icons/home4-testimonial-icon.svg" alt="" />
                                                </div>
                                                <p className="font-20 weight-400 line-height-34 font-f-5 font-w" style={{ fontStyle: 'italic' }}>
                                                    “ Consultia's unique insurance offering gives us peace
                                                    of mind knowing that our operations are covered while
                                                    also allowing us to control our costs. Onboarding our
                                                    entire fleet was seamless and intuitive, and now we can
                                                    take a more proactive approach to risk management and
                                                    helping our drivers become safer.”
                                                </p>
                                                <div className="space10" />
                                                <div className="slider-bottom">
                                                    <h4 className="font-f-6 font-20 weight-600 line-height-20 font-w">
                                                        Jason Behrendorff
                                                    </h4>
                                                    <p className="fong-f-5 weight-400 font-14 line-height-14 pera-c-2">
                                                        CEO  Chief Operating Officer
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="hadding trusted-hadding">
                                                <div className="hadding-span hadding-span2">
                                                    <img src="/assets/img/icons/home4-testimonial-icon.svg" alt="" />
                                                </div>
                                                <p className="font-20 weight-400 line-height-34 font-f-5 font-w" style={{ fontStyle: 'italic' }}>
                                                    “ Consultia's unique insurance offering gives us peace
                                                    of mind knowing that our operations are covered while
                                                    also allowing us to control our costs. Onboarding our
                                                    entire fleet was seamless and intuitive, and now we can
                                                    take a more proactive approach to risk management and
                                                    helping our drivers become safer.”
                                                </p>
                                                <div className="space10" />
                                                <div className="slider-bottom">
                                                    <h4 className="font-f-6 font-20 weight-600 line-height-20 font-w">
                                                        Jason Behrendorff
                                                    </h4>
                                                    <p className="fong-f-5 weight-400 font-14 line-height-14 pera-c-2">
                                                        CEO  Chief Operating Officer
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
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
