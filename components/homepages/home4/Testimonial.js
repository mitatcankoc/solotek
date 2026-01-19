
import TestimonialThumbSlider1 from "@/components/slider/TestimonialThumbSlider1"
import Link from "next/link"

export default function Testimonial() {
    return (
        <>
            <div className="testimonial-area position-relative bg4 section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading white-heading text-center">
                                <small data-aos="fade-left" data-aos-duration={400}>See Our Services</small>
                                <h2 data-aos="fade-left" data-aos-duration={600}>See what our customers	&nbsp;<span className="heilight-right heading-underline"> are saying</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                        <TestimonialThumbSlider1 />
                        </div>
                    </div>
                </div>
                <img src="/assets/img/shapes/arrow-small-left.png" alt="" className="shape-right-bottom" />
                <img src="/assets/img/shapes/corner-shape2.png" alt="" className="shape-right-top2" />
            </div>
        </>
    )
}
