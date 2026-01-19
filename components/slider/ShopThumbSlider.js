'use client'
import { useEffect, useState } from "react"
import Slider from "react-slick"

const ThumbSlider = () => {
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
        fade: true,
    }

    const settingsThumbs = {
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: "0px",
        arrows: false
    }

    return (
        <>
            {/* <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
            >

                <div>A</div>
                <div>B</div>
                <div>C</div>
                <div>D</div>
            </Slider>

            <Slider
                {...settingsThumbs}
                asNavFor={nav1}
                ref={(slider) => setSlider2(slider)}
            >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </Slider> */}


            <div className="product-slider lg-mr-15">
                <Slider
                    {...settingsMain}
                    asNavFor={nav2}
                    ref={(slider) => setSlider1(slider)}
                    className="product-slider-single">
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-1.jpg" alt="" />
                    </div>
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-2.jpg" alt="" />
                    </div>
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-3.jpg" alt="" />
                    </div>
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-1.jpg" alt="" />
                    </div>
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-4.jpg" alt="" />
                    </div>
                    <div className="single-product-slider-single">
                        <img src="/assets/img/products/product-5.jpg" alt="" />
                    </div>
                </Slider>
                <div className="space20" />
                <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={(slider) => setSlider2(slider)}
                    className="product-slider-nav">
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-1.jpg" alt="" />
                    </div>
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-2.jpg" alt="" />
                    </div>
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-3.jpg" alt="" />
                    </div>
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-4.jpg" alt="" />
                    </div>
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-5.jpg" alt="" />
                    </div>
                    <div className="single-products-slider-nav">
                        <img src="/assets/img/products/product-3.jpg" alt="" />
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default ThumbSlider