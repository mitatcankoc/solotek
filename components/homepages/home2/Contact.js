

export default function Contact() {
    return (
        <>
            <div className="contact-3 section-padding bg-24 position-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="contact-img-elements contact-img-3  position-relative" data-aos="zoom-out" data-aos-duration={800}>
                                <img src="/assets/img/contact/contact-3.jpg" alt="" className="contact-img" />
                                <div className="contact-3-shape-1 motion_grid__item ">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="contact-3-shape-2 motion_grid__item ">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="contact-3-shape-3 motion_grid__item">
                                    <img src="/assets/img/shapes/shape-3.png" alt="" />
                                </div>
                                <div className="contact-3-shape-4">
                                    <img src="/assets/img/shapes/shape-4.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="contact-form-2 ml50">
                                <div className="heading4">
                                    <small data-aos="fade-left" data-aos-duration={400} className="overline">Free
                                        Consultation</small>
                                    <h2 data-aos="fade-left" data-aos-duration={600}>Contact us now for a free consultation</h2>
                                    <p data-aos="fade-left" data-aos-duration={800}>Consultia can handle tech advisory help
                                        decide upon the
                                        project rationale. Leave your contacts
                                        below and we’ll get back to you within 24 hours.</p>
                                </div>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={400}>
                                            <input type="text" id="name" placeholder="Name" />
                                        </div>
                                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={600}>
                                            <input type="email" id="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-12" data-aos="fade-up" data-aos-duration={800}>
                                            <div className="niceSelect">
                                                <select className="wide">
                                                    <option data-display="Are you a new client?">Are you a new client?</option>
                                                    <option value={1}>Some option</option>
                                                    <option value={2}>Another option</option>
                                                    <option value={4}>Potato</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space20" />
                                        <div className="col-12" data-aos="fade-up" data-aos-duration={1000}>
                                            <textarea name="message" id="message" cols={30} rows={10} placeholder="How can we help you?" />
                                        </div>
                                    </div>
                                    <div className="button-group" data-aos="fade-up" data-aos-duration={1200}>
                                        <button type="submit" className="theme-btn-11">Make an Appointment <span><i className="fa-solid fa-arrow-right" /></span></button>
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
