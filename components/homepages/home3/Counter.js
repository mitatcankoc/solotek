import CounterUp from "@/components/elements/CounterUp"


export default function Counter() {
    return (
        <>
            <div className="counter-3 section-padding" style={{ background: 'url(assets/img/bg/bg-11.png) no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading3 white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="overline">Facts</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>Why Consultia law is the best?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row counters-3">
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={400}>
                            <div className="single-couter-3">
                                <h3><CounterUp count={653} />+</h3>
                                <p>Number of Families</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={600}>
                            <div className="single-couter-3">
                                <h3>$<CounterUp count={95} />B</h3>
                                <p>Assets Managed</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={800}>
                            <div className="single-couter-3">
                                <h3><CounterUp count={5} /></h3>
                                <p>Full Time Advisors</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={1000}>
                            <div className="single-couter-3">
                                <h3><CounterUp count={2500} />+</h3>
                                <p>Employess</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
