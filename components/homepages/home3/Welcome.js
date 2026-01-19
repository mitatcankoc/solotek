
import Link from "next/link"

export default function Welcome() {
    return (
        <>
            <div className="welcome-3 bg8" id="home">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="title3">
                                <h1 data-aos="fade-right" data-aos-duration={400}>As trusted advisors for your family and your
                                    business.
                                </h1>
                                <p data-aos="fade-right" data-aos-duration={600}>Making a mistake on your return can be costly.
                                    From missed
                                    deductions, or worse, the dreaded IRS
                                    audit.</p>
                                <div className="space30" />
                                <div className="button-group" data-aos="fade-right" data-aos-duration={800}>
                                    <Link className="theme-btn-10" href="#">Free Case Evaluation <span><i className="fa-solid fa-arrow-right" />
                                    </span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-2-image">
                                <img data-aos="zoom-out" data-aos-duration={1000} src="/assets/img/bg/main-3.png" alt="" />
                                <div className="hero-3-bg">
                                    <img data-aos="zoom-in" data-aos-duration={800} src="/assets/img/bg/hero-3-bg.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
