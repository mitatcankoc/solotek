
import Link from "next/link"

export default function Welcome() {
    return (
        <>
            <div className="welcome-area welcome-1 bg1" id="home">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="title">
                                <h1 data-aos="fade-right" data-aos-duration={700}><span className="title-heilight">Build brand
                                    and</span> grow
                                    your business with Consultia.</h1>
                                <p data-aos="fade-right" data-aos-duration={1200}>When it comes to business, listen to Henry
                                    David Thoreau:
                                    things usually don’t happen overnight –
                                    instead, to find success takes a lot of time, effort, and courage. </p>
                                <div className="space50" />
                                <div className="button-group" data-aos="fade-right" data-aos-duration={1300}>
                                    <Link href="#" className="theme-btn-1">Get a Free Consultaion</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-img-elements">
                                <div className="hero-main-img  postion-relative" data-aos="fade-up" data-aos-duration={500}>
                                    <img src="/assets/img/bg/main1.jpg" alt="" />
                                    <div className="corner-shape position-absolute" data-aos="zoom-in" data-aos-duration={1200}>
                                        <img src="/assets/img/shapes/corner-shapes.png" alt="" />
                                    </div>
                                    <div className="arrow-long position-absolute updown" data-aos="zoom-in" data-aos-duration={1500}>
                                        <img src="/assets/img/shapes/arrow-small.png" alt="" />
                                    </div>
                                    <div className="hit-rate position-absolute updown" data-aos="zoom-in" data-aos-duration={2000}>
                                        <img src="/assets/img/shapes/hit-rate.png" alt="" />
                                    </div>
                                    <div className="growth position-absolute updown2" data-aos="zoom-in" data-aos-duration={2500}>
                                        <img src="/assets/img/shapes/growth.png" alt="" />
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
