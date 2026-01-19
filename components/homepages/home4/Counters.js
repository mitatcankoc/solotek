import CounterUp from "@/components/elements/CounterUp"


export default function Counters() {
    return (
        <>
            <div className="counters-area section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={400}>
                            <div className="single-counter">
                                <h3><CounterUp count={420} />+</h3>
                                <p>Satisaction Clients</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={600}>
                            <div className="single-counter">
                                <h3><CounterUp count={40} />+</h3>
                                <p>Completed Clients</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={800}>
                            <div className="single-counter">
                                <h3><CounterUp count={45} /></h3>
                                <p>Finance Experts</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6" data-aos="zoom-out" data-aos-duration={1000}>
                            <div className="single-counter">
                                <h3><CounterUp count={99} />%</h3>
                                <p>Success Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
