

'use client'
import { useState } from 'react'
export default function Faqs() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <div className="faqs-area section-padding">
                <div className="container ">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="contact-img-elements position-relative xmp100" data-aos="zoom-out" data-aos-duration={400}>
                                <img src="/assets/img/faq/faq.jpg" alt="" className="contact-img" />
                                <img src="/assets/img/shapes/arrow-small-right.png" alt="" className="contact-shape1" />
                                <div className="hit-rate-left position-absolute updown">
                                    <img src="/assets/img/shapes/hit-rate.png" alt="" />
                                </div>
                                <div className="corner-shape position-absolute">
                                    <img src="/assets/img/shapes/corner-shapes.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ml50">
                                <div className="heading no-margin-heading">
                                    <small data-aos="fade-left" data-aos-duration={400}>Benefits</small>
                                    <h2 data-aos="fade-left" data-aos-duration={600}>Make the wise decision <span className="heading-underline">
                                        for your</span> business. </h2>
                                    <div className="space20" />
                                    <p data-aos="fade-left" data-aos-duration={800}>When it comes to business, listen to Henry
                                        David Thoreau:
                                        things usually don’t happen overnight.
                                    </p>
                                </div>
                                <div className="space20" />
                                <div className="faqs">
                                    <div id="faqs">
                                        <div className="single-faq" data-aos="fade-left" data-aos-duration={1000}>
                                            <h2 className={isActive.key == 1 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(1)}>
                                                Track Customers
                                            </h2>
                                            <div id="collapse1" className={isActive.key == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                <p>When it comes to business, listen to Henry David Thoreau: things usually
                                                    don’t happen overnight –
                                                    instead, to find success takes a lot of time, effort, and courage.</p>
                                            </div>
                                        </div>
                                        <div className="single-faq" data-aos="fade-left" data-aos-duration={1200}>
                                            <h2 className={isActive.key == 2 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(2)}>
                                                Manage Customer
                                            </h2>
                                            <div id="collapse2" className={isActive.key == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                <p>When it comes to business, listen to Henry David Thoreau: things usually
                                                    don’t happen overnight –
                                                    instead, to find success takes a lot of time, effort, and courage.</p>
                                            </div>
                                        </div>
                                        <div className="single-faq" data-aos="fade-left" data-aos-duration={1400}>
                                            <h2 className={isActive.key == 3 ? "faq-heading" : "faq-heading collapsed"} onClick={() => handleClick(3)}>
                                                Proof Results
                                            </h2>
                                            <div id="collapse3" className={isActive.key == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                <p>When it comes to business, listen to Henry David Thoreau: things usually
                                                    don’t happen overnight –
                                                    instead, to find success takes a lot of time, effort, and courage.</p>
                                            </div>
                                        </div>
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
