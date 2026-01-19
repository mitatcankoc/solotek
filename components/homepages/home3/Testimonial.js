import TestimonialSlider3 from "@/components/slider/TestimonialSlider3"


export default function Testimonial() {
    return (
        <>
            <div className="testimonial-3 bg-19 section-padding2 _relative">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="heading3 text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="overline">Our testimonial</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>We love our clients, and they love us.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" data-aos="zoom-out" data-aos-duration={600}>
                            <TestimonialSlider3 />
                        </div>
                    </div>
                </div>
                <div className="shape-007">
                    <img src="/assets/img/shapes/shape007.svg" alt="" />
                </div>
            </div>

        </>
    )
}
