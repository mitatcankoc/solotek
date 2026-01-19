
import Link from "next/link"

export default function Service() {
    return (
        <>
            <div className="service-area section-padding2 position-relative bg2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading text-center">
                                <small data-aos="fade-up" data-aos-duration={400}>See Our Services</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>We offer wide range <span className="heilight-right heading-underline">of services</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={400}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service1.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Operation Monitoring</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service2.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Compliance</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service3.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Project Management</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service4.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Human Resources</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service5.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Quality Assurance</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration={1400}>
                            <div className="single-service">
                                <div className="service-icon">
                                    <img src="/assets/img/icons/service6.png" alt="" />
                                </div>
                                <div className="service-content">
                                    <h3>Process Development</h3>
                                    <p>When it comes to business, listen to Henry David Thoreau: things usually don’t happen
                                        overnight.</p>
                                </div>
                                <Link href="#" className="theme-btn-6">Check out more <i className="fa-solid fa-arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/assets/img/shapes/service1.png" alt="" className="service-shape1" />
            </div>

        </>
    )
}
