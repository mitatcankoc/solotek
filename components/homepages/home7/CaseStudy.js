
import Link from "next/link"

export default function CaseStudy() {
    return (
        <>
            <div className="case-study-1 section-padding bg6">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="heading2 white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />We Are Here For
                                    Your Tax Relief.</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>
                                    <span className="heilight-left">Consultia</span> tax is built for
                                    small business.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="case-studes-rtl owl-carousel" data-aos="fade-up" data-aos-duration={1200}>
                                <div className="single-case-study">
                                    <div className="case-study-img">
                                        <img src="/assets/img/case-study/casestudy1.jpg" alt="" />
                                    </div>
                                    <div className="case-study-content">
                                        <h4>Operational Excellence</h4>
                                        <p>
                                            Making a mistake on your return can be costly. From missed
                                            deductions.
                                        </p>
                                        <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span>
                                            Check
                                            out Check Study
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-case-study">
                                    <div className="case-study-img">
                                        <img src="/assets/img/case-study/casestudy2.jpg" alt="" />
                                    </div>
                                    <div className="case-study-content">
                                        <h4>Analytics Consulting</h4>
                                        <p>
                                            Making a mistake on your return can be costly. From missed
                                            deductions.
                                        </p>
                                        <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span>
                                            Check
                                            out Check Study
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-case-study">
                                    <div className="case-study-img">
                                        <img src="/assets/img/case-study/casestudy3.jpg" alt="" />
                                    </div>
                                    <div className="case-study-content">
                                        <h4>Analytics Strategy</h4>
                                        <p>
                                            Making a mistake on your return can be costly. From missed
                                            deductions.
                                        </p>
                                        <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span>
                                            Check
                                            out Check Study
                                        </Link>
                                    </div>
                                </div>
                                <div className="single-case-study">
                                    <div className="case-study-img">
                                        <img src="/assets/img/case-study/casestudy3.jpg" alt="" />
                                    </div>
                                    <div className="case-study-content">
                                        <h4>Analytics Strategy</h4>
                                        <p>
                                            Making a mistake on your return can be costly. From missed
                                            deductions.
                                        </p>
                                        <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span>
                                            Check
                                            out Check Study
                                        </Link>
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
