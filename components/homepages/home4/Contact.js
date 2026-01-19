

export default function Contact() {
    return (
        <>
            <div className="contact-area section-padding bg3 position-relative">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600}>Contact Us</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>Got questions? <span className="heilight-right heading-underline">Contact Us</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="contact-img-elements position-relative" data-aos="zoom-out" data-aos-duration={800}>
                                <img src="/assets/img/contact/contact.jpg" alt="" className="contact-img" />
                                <img src="/assets/img/shapes/arrow-small-right.png" alt="" className="contact-shape1" />
                                <div className="corner-shape position-absolute">
                                    <img src="/assets/img/shapes/corner-shapes.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-form" data-aos="fade-left" data-aos-duration={1000}>
                                <p>Tell us how we can help, and we’ll get in touch shortly.</p>
                                <form action="#">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" placeholder="Name" />
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" placeholder="Email Address" />
                                    <label htmlFor="subject">Subject (Optional)</label>
                                    <input type="text" id="subject" placeholder="Subject (Optional)" />
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" cols={30} rows={5} placeholder="Your message" />
                                    <button type="submit" className="theme-btn-1 full-btn">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/assets/img/shapes/corner-shape2.png" alt="" className="shape-right-top2" />
                <img src="/assets/img/shapes/circle-arrow2.png" alt="" className="shape-top-right" />
                <img src="/assets/img/shapes/squire-shape.png" alt="" className="shape-bottom-right" />
            </div>

        </>
    )
}
