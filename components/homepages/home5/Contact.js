

export default function Contact() {
    return (
        <>
            <div className="home4-contact section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="choos-images">
                                <div className="choose-img-1" data-aos="fade-right" data-aos-duration={1000}>
                                    <img src="/assets/img/case-study/choose-img4.png" alt="" />
                                </div>
                                <div className="choose-img-3">
                                    <img src="/assets/img/shapes/home4-img-shap.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="contact-form-2 ml50">
                                <div className="hadding5">
                                    <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-down" data-aos-duration={800}>Why Choose Us</span>
                                    <div className="space10" />
                                    <h1 className="font-f-6 font-30 font-lg-42 weight-600 line-height-38 line-height-lg-48 color4" data-aos="fade-down" data-aos-duration={1000}>Why you should choose consultia, there are
                                        tons of reasons.</h1>
                                    <div className="space10" />
                                    <p className="font-f-5 font-20 line-height-32 weight-400 color-p-4" data-aos="fade-down" data-aos-duration={1200}>Our team of insurance professionals have the knowledge, skills,
                                        markets and desire necessary to provide you.
                                    </p>
                                </div>
                                <div className="space20" />
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
                                                <select className="wide form-select">
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
                                    <button type="submit" className="font-f-5 theme-btn-18">Make an Appointment <span><i className="fa-solid fa-arrow-right" /></span></button>
                                </form></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
