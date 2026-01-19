import CounterUp from "@/components/elements/CounterUp"


export default function Counter() {
    return (
        <>
            <div className="home4-counters" data-aos="zoom-in-up" data-aos-duration={900}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="home4-counters-all">
                                <div className="text-center">
                                    <h6 className="color4 font-f-5 weight-700 font-18 color4 line-height-18">You can count on us
                                    </h6>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="home4-single-counter">
                                            <div className="home4-single-img">
                                                <img src="/assets/img/icons/home4-counter1.svg" alt="" />
                                            </div>
                                            <div className="home4-counter-hadding hadding5">
                                                <h1 className="font-f-6 font-32 line-height-32 weight-600 color4"><CounterUp count={30} />+
                                                </h1>
                                                <p className="font-f-5 font-16 line-height-16 color-p-4 weight-400">Locations
                                                    Available</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="home4-single-counter">
                                            <div className="home4-single-img">
                                                <img src="/assets/img/icons/home4-counter2.svg" alt="" />
                                            </div>
                                            <div className="home4-counter-hadding hadding5">
                                                <h1 className="font-f-6 font-32 line-height-32 weight-600 color4"><CounterUp count={30} />+
                                                </h1>
                                                <p className="font-f-5 font-16 line-height-16 color-p-4 weight-400">Locations
                                                    Available</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="home4-single-counter">
                                            <div className="home4-single-img">
                                                <img src="/assets/img/icons/home4-counter1.svg" alt="" />
                                            </div>
                                            <div className="home4-counter-hadding hadding5">
                                                <h1 className="font-f-6 font-32 line-height-32 weight-600 color4"><CounterUp count={60} />K+
                                                </h1>
                                                <p className="font-f-5 font-16 line-height-16 color-p-4 weight-400">Locations
                                                    Available</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="home4-single-counter">
                                            <div className="home4-single-img">
                                                <img src="/assets/img/icons/home4-counter1.svg" alt="" />
                                            </div>
                                            <div className="home4-counter-hadding hadding5">
                                                <h1 className="font-f-6 font-32 line-height-32 weight-600 color4"><CounterUp count={12} />K+
                                                </h1>
                                                <p className="font-f-5 font-16 line-height-16 color-p-4 weight-400">Locations
                                                    Available</p>
                                            </div>
                                        </div>
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
