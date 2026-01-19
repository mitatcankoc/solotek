
import Link from "next/link"

export default function Works() {
    return (
        <>
            <div className="work-1 section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="heading4 no-margin-heading">
                                <div className="mr50">
                                    <small data-aos="fade-right" data-aos-duration={200} className="overline">How it works</small>
                                    <h2 data-aos="fade-right" data-aos-duration={400}>Wealth Management for all Life Stages.
                                    </h2>
                                    <p data-aos="fade-right" data-aos-duration={600}>Consultia Management’s financial advisors
                                        are backed by
                                        extensive training: Using in-depth
                                        financial advisory skills, we’re ready to help you achieve your unique wealth management
                                        goals. Each
                                        financial advisor can help you build your
                                    </p>
                                    <p data-aos="fade-right" data-aos-duration={600}>portfolio from the ground up, aiming to
                                        maximizing its
                                        potential for each new investment
                                        approach. Our team monitors each strategy based upon your needs, helping make your every
                                        step as
                                        comfortable and effective as possible.</p>
                                    <div className="space30" />
                                    <div className="button-group" data-aos="fade-right" data-aos-duration={800}>
                                        <Link className="theme-btn-11" href="#">View Our Works<span><i className="fa-solid fa-arrow-right" /></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="work-wrap position-relative ml50" data-aos="zoom-out" data-aos-anchor-placement="top-bottom" data-aos-offset={100} data-aos-duration={400}>
                                <div className="work-steps">
                                    <div className="single-work-step">
                                        <div className="work-number">
                                            <h3>01</h3>
                                        </div>
                                        <h2>Cultivate your wealth, create your future.</h2>
                                        <p>Growing your wealth today may lay the foundation for the future you want tomorrow. We
                                            offer financial
                                            planning designed to help you build wealth at every stage.</p>
                                    </div>
                                    <div className="single-work-step">
                                        <div className="work-number">
                                            <h3>02</h3>
                                        </div>
                                        <h2>Cultivate your wealth, create your future.</h2>
                                        <p>Growing your wealth today may lay the foundation for the future you want tomorrow. We
                                            offer financial
                                            planning designed to help you build wealth at every stage.</p>
                                    </div>
                                    <div className="single-work-step">
                                        <div className="work-number">
                                            <h3>03</h3>
                                        </div>
                                        <h2>Cultivate your wealth, create your future.</h2>
                                        <p>Growing your wealth today may lay the foundation for the future you want tomorrow. We
                                            offer financial
                                            planning designed to help you build wealth at every stage.</p>
                                    </div>
                                    <div className="single-work-step">
                                        <div className="work-number">
                                            <h3>04</h3>
                                        </div>
                                        <h2>Cultivate your wealth, create your future.</h2>
                                        <p>Growing your wealth today may lay the foundation for the future you want tomorrow. We
                                            offer financial
                                            planning designed to help you build wealth at every stage.</p>
                                    </div>
                                </div>
                                <div className="work-1-bg-1">
                                    <img src="/assets/img/shapes/shape-7.png" alt="" />
                                </div>
                                <div className="work-1-bg-2">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="work-1-bg-3">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="work-1-bg-4">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
