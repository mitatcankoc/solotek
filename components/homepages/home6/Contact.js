
import Link from "next/link"

export default function Contact() {
    return (
        <>
            <div className="contct6 sp2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact-all-hadding">
                                <div className="hadding6">
                                    <h2 className="font-f-7" data-aos="fade-right" data-aos-duration={700}> Do you need help with
                                        your taxes?</h2>
                                </div>
                                <div className="space20" />
                                <div className="contact6-list" data-aos="fade-right" data-aos-duration={900}>
                                    <ul>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>We offer a wide
                                            variety of services throughout the year.</li>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>All the services you
                                            need in one place.</li>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>We know how to
                                            identify what is most important.</li>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>The maximum possible
                                            deduction.</li>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>Accurately
                                            calculated.</li>
                                        <li className="font-f-7"><span><i className="fa-solid fa-check" /></span>Experience with tax
                                            declaration.</li>
                                    </ul>
                                </div>
                                <div className="space30" />
                                <div className="hadding6" data-aos="fade-right" data-aos-duration={1100}>
                                    <h2 className="font-f-7">Contact us directly:</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6" data-aos="fade-right" data-aos-duration={700}>
                                    <div className="contact6-icon-box">
                                        <div className="contact6-icon">
                                            <img src="/assets/img/icons/contact6-icon1.svg" alt="" />
                                        </div>
                                        <div className="contact6-hadding hadding6">
                                            <h4><Link href="#" className="font-f-7">Visit us</Link></h4>
                                            <Link href="#">34 Madison Street, <br />
                                                NY, USA 10005</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6" data-aos="fade-right" data-aos-duration={1000}>
                                    <div className="contact6-icon-box">
                                        <div className="contact6-icon">
                                            <img src="/assets/img/icons/contact6-icon2.svg" alt="" />
                                        </div>
                                        <div className="contact6-hadding hadding6">
                                            <h4><Link href="#" className="font-f-7">Call Us</Link></h4>
                                            <Link href="/tel:206330-8538">(206) 330-8538</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6" data-aos="fade-right" data-aos-duration={700}>
                                    <div className="contact6-icon-box">
                                        <div className="contact6-icon">
                                            <img src="/assets/img/icons/contact6-icon3.svg" alt="" />
                                        </div>
                                        <div className="contact6-hadding hadding6">
                                            <h4><Link href="#" className="font-f-7">Email Us</Link></h4>
                                            <Link href="/malto:echaleganas@gmail.com">echaleganas@gmail.com</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6" data-aos="fade-right" data-aos-duration={900}>
                                    <div className="contact6-icon-box">
                                        <div className="contact6-icon">
                                            <img src="/assets/img/icons/contact6-icon4.svg" alt="" />
                                        </div>
                                        <div className="contact6-hadding hadding6">
                                            <h4><Link href="#" className="font-f-7">Fax</Link></h4>
                                            <Link href="#">(206) 330-8538</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact3-form-all" data-aos="zoom-out" data-aos-duration={900}>
                                <div className="hadding6 text-center">
                                    <h1 className="font-30 font-f-7 font-lg-40 weight-500  line-height-lg-48 line-height-38">Contact
                                        Us</h1>
                                    <div className="space10" />
                                    <p>Schedule your appointment with us.</p>
                                </div>
                                <form action="#">
                                    <div className="form-input-all">
                                        <div className="form-input-box">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-single6">
                                                        <div >
                                                            <label >First Name</label>
                                                            <input type="text" placeholder="First Name" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-single6">
                                                        <div >
                                                            <label >Last Name</label>
                                                            <input type="text" placeholder="Last Name" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-input-box">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-single6">
                                                        <div >
                                                            <label >Phone Number</label>
                                                            <input type="number" placeholder="Phone" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-single6">
                                                        <div >
                                                            <label >Email Address</label>
                                                            <input type="email" placeholder="Email Address" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-input-box">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="input-single6">
                                                        <div >
                                                            <label >Subject</label>
                                                            <input type="text" placeholder="Subject" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="contact6-from-input">
                                            <label >Massage</label>
                                            <textarea cols={30} rows={3} placeholder="Additional Details" />
                                        </div>
                                        <div className="space20" />
                                        <div className="button6">
                                            <button>Schedule your appointment <span><i className="fa-solid fa-arrow-right" /></span> </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
