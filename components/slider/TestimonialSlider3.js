'use client'
import Link from "next/link"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 3,
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
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider3() {
    return (
        <>
            <Swiper {...swiperOptions} className="testimonials-3 owl-carousel">
                <SwiperSlide className="single-testimonial">
                    <div className="testimonial-icon">
                        <img src="/assets/img/icons/quote-1.png" alt="" />
                    </div>
                    <p>
                        “Consultia law firm is wonderful. I have had the chance to
                        work with three of the lawyers and they all have been
                        wonderful. They will tell you when you need a lawyer and when
                        you don't. They actually try to save you money. They respond
                        very fast to questions and try to help you understand what is
                        going on.”
                    </p>
                    <div className="author-reviews">
                        <div className="author">
                            <Link href="#">Jason Behrendorff</Link>
                        </div>
                        <div className="review-1">
                            <div className="review">
                                <ul>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star-half" /></li>
                                </ul>
                            </div>
                            <div className="review-rate">
                                <p>(4.5)</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="single-testimonial">
                    <div className="testimonial-icon">
                        <img src="/assets/img/icons/quote-1.png" alt="" />
                    </div>
                    <p>
                        “Consultia law firm is wonderful. I have had the chance to
                        work with three of the lawyers and they all have been
                        wonderful. They will tell you when you need a lawyer and when
                        you don't. They actually try to save you money. They respond
                        very fast to questions and try to help you understand what is
                        going on.”
                    </p>
                    <div className="author-reviews">
                        <div className="author">
                            <Link href="#">Jason Behrendorff</Link>
                        </div>
                        <div className="review-1">
                            <div className="review">
                                <ul>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star-half" /></li>
                                </ul>
                            </div>
                            <div className="review-rate">
                                <p>(4.5)</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="single-testimonial">
                    <div className="testimonial-icon">
                        <img src="/assets/img/icons/quote-1.png" alt="" />
                    </div>
                    <p>
                        “Consultia law firm is wonderful. I have had the chance to
                        work with three of the lawyers and they all have been
                        wonderful. They will tell you when you need a lawyer and when
                        you don't. They actually try to save you money. They respond
                        very fast to questions and try to help you understand what is
                        going on.”
                    </p>
                    <div className="author-reviews">
                        <div className="author">
                            <Link href="#">Jason Behrendorff</Link>
                        </div>
                        <div className="review-1">
                            <div className="review">
                                <ul>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star-half" /></li>
                                </ul>
                            </div>
                            <div className="review-rate">
                                <p>(4.5)</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="single-testimonial">
                    <div className="testimonial-icon">
                        <img src="/assets/img/icons/quote-1.png" alt="" />
                    </div>
                    <p>
                        “Consultia law firm is wonderful. I have had the chance to
                        work with three of the lawyers and they all have been
                        wonderful. They will tell you when you need a lawyer and when
                        you don't. They actually try to save you money. They respond
                        very fast to questions and try to help you understand what is
                        going on.”
                    </p>
                    <div className="author-reviews">
                        <div className="author">
                            <Link href="#">Jason Behrendorff</Link>
                        </div>
                        <div className="review-1">
                            <div className="review">
                                <ul>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star" /></li>
                                    <li><i className="fa-solid fa-star-half" /></li>
                                </ul>
                            </div>
                            <div className="review-rate">
                                <p>(4.5)</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
