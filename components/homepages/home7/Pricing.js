
import Link from "next/link"

export default function Pricing() {
    return (
        <>
            <div className="pricing-area pricing2 section-padding2 bg5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="heading2 text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />We Are Here For
                                    Your Tax Relief.</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>
                                    <span className="heilight-left">We</span> offer best cost effective
                                    tax consultation solution.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="plan-toggle-wrap" data-aos="fade-up" data-aos-duration={1000}>
                                <div className="toggle-inner">
                                    <input id="ce-toggle" defaultChecked type="checkbox" />
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
                        <div id="monthly">
                            <div className="row">
                                <div className="col-lg-4" data-aos="fade-up" data-aos-duration={800}>
                                    <div className="single-price">
                                        <div className="price-heading">
                                            <p>Basic</p>
                                            <h5>
                                                Create interactive forms that connect to your workflow.
                                            </h5>
                                            <h3>$19/mo</h3>
                                            <h6>Billed Monthly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                            <h4>Everything you get with Basic</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="fade-up" data-aos-duration={1000}>
                                    <div className="single-price active">
                                        <div className="price-heading">
                                            <p>Plus</p>
                                            <h5>
                                                Make your forms more beautiful and on-brand  analyze.
                                            </h5>
                                            <h3>$49/mo</h3>
                                            <h6>Billed Monthly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn active">Get a Free Consultaion</Link>
                                            <h4>Everything in Basic, Plus</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="fade-up" data-aos-duration={1200}>
                                    <div className="single-price">
                                        <div className="price-heading">
                                            <p>Business</p>
                                            <h5>
                                                Make your forms more beautiful and on-brand  analyze.
                                            </h5>
                                            <h3>$99/mo</h3>
                                            <h6>Billed Monthly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                            <h4>Everything in Plus, Business</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="yearly" style={{ display: 'none' }}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="single-price active">
                                        <div className="price-heading">
                                            <p>Basic</p>
                                            <h5>
                                                Create interactive forms that connect to your workflow.
                                            </h5>
                                            <h3>$29/mo</h3>
                                            <h6>Billed Yearly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn active">Get a Free Consultaion</Link>
                                            <h4>Everything you get with Basic</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="single-price">
                                        <div className="price-heading">
                                            <p>Plus</p>
                                            <h5>
                                                Make your forms more beautiful and on-brand  analyze.
                                            </h5>
                                            <h3>$199/mo</h3>
                                            <h6>Billed Yearly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                            <h4>Everything in Basic, Plus</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="single-price">
                                        <div className="price-heading">
                                            <p>Business</p>
                                            <h5>
                                                Make your forms more beautiful and on-brand  analyze.
                                            </h5>
                                            <h3>$399/mo</h3>
                                            <h6>Billed Yearly</h6>
                                        </div>
                                        <div className="price-body">
                                            <Link href="#" className="price-btn">Get a Free Consultaion</Link>
                                            <h4>Everything in Plus, Business</h4>
                                            <ul>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Advanced
                                                    Segmentation
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Comparative Reporting
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Unlimited
                                                    Seats  Role Access
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Multivaritive Testing
                                                </li>
                                                <li>
                                                    <span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Dynamic
                                                    Content
                                                </li>
                                            </ul>
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
