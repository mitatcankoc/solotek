'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 6,
    spaceBetween: 10,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        575: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        767: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        991: {
            slidesPerView: 5,
            spaceBetween: 10,
        },
        1199: {
            slidesPerView: 6,
            spaceBetween: 10,
        },
        1350: {
            slidesPerView: 6,
            spaceBetween: 10,
        },
    }
}

export default function Service() {
    return (
        <>
            <div className="home4-service section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="hadding5">
                                <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-right" data-aos-duration={700}>Coverages</span>
                                <div className="space10" />
                                <h1 className="font-f-6 font-30 font-lg-42 weight-500 line-height-38 line-height-lg-48 color4" data-aos="fade-right" data-aos-duration={900}>Get the coverage
                                    you need for your business, family, and assets.</h1>
                                <div className="space10" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="service4-btn mt-sm-50" data-aos="fade-left" data-aos-duration={900}>
                                <Link href="#" className="font-f-5 theme-btn-18">All Categories <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="space30" />
                    <div className="row">
                        <Swiper {...swiperOptions} className="home4-slider-all owl-carousel" data-aos="fade-up" data-aos-duration={900}>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon1.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Education
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon2.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Health
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon3.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Vehicle
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon4.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Life
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon5.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Pet
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon6.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Home
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon1.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Education
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon2.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Health
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon3.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Vehicle
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon4.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Life
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon5.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Pet
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon6.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Home
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon1.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Education
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon2.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Health
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon3.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Vehicle
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon4.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Life
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon5.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Pet
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="home4-single-slider">
                                <div className="slider-img">
                                    <img src="/assets/img/icons/service4-icon6.svg" alt="" />
                                </div>
                                <div className="space40" />
                                <div className="hadding5">
                                    <h6 className="font-f-5 font-20 line-height-24 weight-400 color4">Home
                                        Insurance</h6>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>

        </>
    )
}
