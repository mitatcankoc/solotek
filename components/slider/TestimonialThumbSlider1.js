'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Slider from "react-slick"

const TestimonialThumbSlider1 = () => {
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    const [slider1, setSlider1] = useState(null)
    const [slider2, setSlider2] = useState(null)

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [slider2, slider1])

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: (".testimonial-prev-arrow"),
        // nextArrow: (".testimonial-next-arrow"),
        fade: true,
        loop: true,
    }

    const settingsThumbs = {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        loop: true,
        centerMode: true,
        focusOnSelect: true,
        arrows: false,
    }

    return (
        <>

            <div className="testimonial-sliders">
                <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={(slider) => setSlider2(slider)}
                    className="testimonial-nav ">
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
                </Slider>
                <Slider
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={(slider) => setSlider1(slider)}
                    className="slider-testimonial">
                    <div className="single-testimonial">
                        <h5>“If your appetite is whetted, check out which tour might take your fancy, fill out
                            the contact form
                            or send an email so we can make an appointment. Tours are privately organised and
                            tailor-made to suit
                            most tastes.”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense. ”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“Lorem ipsum contains the typefaces more in use, an aspect that allows you to have an overview of the rendering of the text in terms of font choice and font size . ”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“When referring to Lorem ipsum, different expressions are used, namely fill text , fictitious text , blind text or placeholder text : in short, its meaning can also be zero”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“Filling text generation tool, in addition to customizing the text with HTML elements, you have the possibility to create a new one starting directly from your text! ”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“The Lorem ipum filling text is used by graphic designers, programmers and printers with the aim of occupying the spaces of a website, an advertising product or an editorial production whose final text is not yet ready. ”</h5>
                        <div className="author">
                            <Link href="#">Leslie Alexander</Link>
                            <p>CEO, Business Administ</p>
                        </div>
                    </div>
                </Slider>
            </div>

        </>
    )
}

export default TestimonialThumbSlider1