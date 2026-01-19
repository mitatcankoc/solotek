
import Link from "next/link"

export default function TaxBusiness() {
    return (
        <>
            <div className="tax-business section-padding2 bg6" id="about">
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
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <img src="/assets/img/icons/tax-business1.png" alt="" />
                                </div>
                                <h3>IRS Tax Problems</h3>
                                <p>
                                    Making a mistake on your return can be costly. From missed
                                    deductions, or worse, the dreaded IRS audit.
                                </p>
                                <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span> Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <img src="/assets/img/icons/tax-business2.png" alt="" />
                                </div>
                                <h3>Tax Preparation and Planning</h3>
                                <p>
                                    Getting the most our of your income and finances is what sets us
                                    apart. Whether you need tax preparation services.
                                </p>
                                <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span> Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <img src="/assets/img/icons/tax-business3.png" alt="" />
                                </div>
                                <h3>Payroll Services</h3>
                                <p>
                                    Managing payroll may not seem like a critical task untill
                                    something goes wrong. We have experts and technology to help
                                    you.
                                </p>
                                <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span> Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="single-business trans-1">
                                <div className="business-icon">
                                    <img src="/assets/img/icons/tax-business4.png" alt="" />
                                </div>
                                <h3>Bookkeeping and Virtual CFO</h3>
                                <p>
                                    We know that competent, consistent bookkeeping is the key to a
                                    business success. Sucess starts when you take charge of books.
                                </p>
                                <Link href="#" className="theme-btn-7"><span><i className="fa-solid fa-arrow-right" /></span> Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="space20" />
                        <div className="col-12 text-center" data-aos="fade-up" data-aos-duration={1400}>
                            <Link className="theme-btn-3" href="#"><span><i className="fa-solid fa-arrow-right" /></span>Explore More
                                Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
