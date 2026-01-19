
import Link from "next/link"

export default function HowItWork() {
    return (
        <>
            <div className="home4-work section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 m-auto text-center">
                            <div className="hadding5">
                                <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-up" data-aos-duration={800}>How it works</span>
                                <div className="space10" />
                                <h1 className="font-f-6 font-30 font-lg-42 weight-500 line-height-38 line-height-lg-48 color4" data-aos="fade-up" data-aos-duration={1000}>We give you access to the best and most
                                    competitive insurance products</h1>
                                <div className="space10" />
                            </div>
                        </div>
                    </div>
                    <div className="space30" />
                    <div className="row">
                        <div className="col-md-4 text-center" data-aos="fade-up" data-aos-duration={800}>
                            <div className="home4-work-items-all">
                                <div className="home4-work-items">
                                    <div className="work-item-img-1">
                                        <img src="/assets/img/image/work4-1.png" alt="" />
                                    </div>
                                    <div className="work-item-img-2">
                                        <img src="/assets/img/image/work4-number-1.png" alt="" />
                                    </div>
                                </div>
                                <div className="space70" />
                                <div className="home5-work-hadding">
                                    <div className="hadding5">
                                        <h1 className="font-f-6 font-22 line-height-22 color4 weight-500"><Link href="#" className="color4">Talk to an advisor</Link></h1>
                                        <div className="space10" />
                                        <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">Yes, a real human who
                                            can translate industry jargon into plain English for you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="home4-work-items-all">
                                <div className="home4-work-items">
                                    <div className="work-item-img-1">
                                        <img src="/assets/img/image/work4-2.png" alt="" />
                                    </div>
                                    <div className="work-item-img-2">
                                        <img src="/assets/img/image/work4-number-2.png" alt="" />
                                    </div>
                                </div>
                                <div className="space70" />
                                <div className="hadding5 home5-work-hadding">
                                    <h1 className="font-f-6 font-22 line-height-22 color4 weight-500"><Link href="#" className="color4">Get
                                        a quote</Link></h1>
                                    <div className="space10" />
                                    <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">Yes, a real human who can
                                        translate industry jargon into plain English for you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="home4-work-items-all">
                                <div className="home4-work-items">
                                    <div className="work-item-img-1">
                                        <img src="/assets/img/image/work4-3.png" alt="" />
                                    </div>
                                    <div className="work-item-img-2">
                                        <img src="/assets/img/image/work4-number-3.png" alt="" />
                                    </div>
                                </div>
                                <div className="space70" />
                                <div className="hadding5 home5-work-hadding">
                                    <h1 className="font-f-6 font-22 line-height-22 color4 weight-500"><Link href="#" className="color4">Relax and sleep easy</Link></h1>
                                    <div className="space10" />
                                    <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">Yes, a real human who can
                                        translate industry jargon into plain English for you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
