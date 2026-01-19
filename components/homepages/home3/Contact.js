

export default function Contact() {
    return (
        <>
            <div className="contact-2 section-padding bg-19 position-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5" data-aos="zoom-out" data-aos-duration={800}>
                            <div className="contact-img-elements contact-img-2 position-relative">
                                <img src="/assets/img/contact/contact-2.jpg" alt="" className="contact-img " />
                                <div className="contact-2-shape-1">
                                    <img src="/assets/img/shapes/shape-1.png" alt="" />
                                </div>
                                <div className="contact-2-shape-2 motion_grid__item">
                                    <img src="/assets/img/shapes/shape-2.png" alt="" />
                                </div>
                                <div className="contact-2-shape-3 motion_grid__item ">
                                    <img src="/assets/img/shapes/shape-3.png " alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7" data-aos="fade-left" data-aos-duration={600}>
                            <div className="contact-form-2 ml50">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" id="name" placeholder="Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="email" id="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-12">
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
                                        <div className="col-12">
                                            <textarea name="message" id="message" cols={30} rows={10} placeholder="How can we help you?" />
                                        </div>
                                    </div>
                                    <button type="submit" className="theme-btn-10">Free Case Evaluation<span><i className="fa-solid fa-arrow-right" />
                                    </span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
