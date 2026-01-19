'use client'
import Link from "next/link"
import { useState } from "react"

export default function Pricing() {
    const [isToggled, setToggled] = useState(false)
    const handleToggle = () => setToggled(!isToggled)
    return (
        <>
            <div className="pricing-area section-padding2 bg2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading text-center">
                                <small data-aos="fade-up" data-aos-duration={400}>Pricing Plan</small>
                                <h2 data-aos="fade-up" data-aos-duration={600}>Choose the plan that <span className="heilight-right heading-underline">works for you</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="plan-toggle-wrap" data-aos="fade-in" data-aos-duration={600}>
                                <div className="toggle-inner">
                                    <input id="ce-toggle" onClick={handleToggle} type="checkbox" />
                                    <span className="custom-toggle" />
                                    <div className="t-month">
                                        <h4>Monthly</h4>
                                    </div>
                                    <div className="t-year">
                                        <h4>Yearly <span>(20% Save)</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space50" />
                    <div className="tab-content">
                        {isToggled ?
                            <>
                                <div id="yearly">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Basic</p>
                                                    <h5>Create interactive forms that connect to your workflow.</h5>
                                                    <h3>$29/mo</h3>
                                                    <h6>Billed Yearly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything you get with Basic</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Plus</p>
                                                    <h5>Make your forms more beautiful and on-brand  analyze.</h5>
                                                    <h3>$199/mo</h3>
                                                    <h6>Billed Yearly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything in Basic, Plus</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Business</p>
                                                    <h5>Make your forms more beautiful and on-brand  analyze.</h5>
                                                    <h3>$399/mo</h3>
                                                    <h6>Billed Yearly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything in Plus, Business</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <>
                                <div id="monthly">
                                    <div className="row">
                                        <div className="col-lg-4" data-aos="fade-right" data-aos-duration={600}>
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Basic</p>
                                                    <h5>Create interactive forms that connect to your workflow.</h5>
                                                    <h3>$19/mo</h3>
                                                    <h6>Billed Monthly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything you get with Basic</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4" data-aos="fade-right" data-aos-duration={800}>
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Plus</p>
                                                    <h5>Make your forms more beautiful and on-brand  analyze.</h5>
                                                    <h3>$49/mo</h3>
                                                    <h6>Billed Monthly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything in Basic, Plus</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4" data-aos="fade-right" data-aos-duration={1000}>
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Business</p>
                                                    <h5>Make your forms more beautiful and on-brand  analyze.</h5>
                                                    <h3>$99/mo</h3>
                                                    <h6>Billed Monthly</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                                    <h4>Everything in Plus, Business</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Advanced
                                                            Segmentation</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Comparative Reporting</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Unlimited Seats  Role Access</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Multivaritive Testing</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check-green.png" alt="" /></span>Dynamic
                                                            Content</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
                <img src="/assets/img/shapes/corner-shape2.png" alt="" className="shape-right-top2 left-to-right-scroll" />
                <img src="/assets/img/shapes/circle-arrow2.png" alt="" className="shape-top-right left-to-right-scroll" />
                <img src="/assets/img/shapes/service1.png" alt="" className="shape-bottom-right left-to-right-scroll" />
            </div>

        </>
    )
}
