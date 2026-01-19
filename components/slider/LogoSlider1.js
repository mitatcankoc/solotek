'use client'
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }
}

export default function LogoSlider1() {
    return (
        <>
            <Swiper {...swiperOptions} className="logos owl-carousel" data-aos="zoom-in" data-aos-anchor-placement="top-bottom" data-aos-offset={50} data-aos-duration={600}>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-1.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-2.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-3.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-4.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-5.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-1.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-2.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-3.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-4.png" alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-logo">
                    <img src="/assets/img/logo/c-logo-5.png" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}
