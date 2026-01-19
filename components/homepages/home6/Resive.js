
import Link from "next/link"

export default function Resive() {
    return (
        <>
            <div className="resive6 sp2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="hadding6 tesive6-hadding">
                                <h1 className="font-f-3" data-aos="fade-right" data-aos-duration={700}>Receive all the <br />
                                    compensation your <br /> <span className="after6">hard work deserves.</span></h1>
                                <div className="space10" />
                                <p className="font-f-7" data-aos="fade-right" data-aos-duration={900}>Experienced, knowledgeable
                                    professionals in Property Tax Consulting. Our team of Property Tax Consultants is committed
                                    to saving you money by obtaining the lowest possible assessed value for your commercial or
                                    residential properties.</p>
                                <div className="space30" />
                                <div className="button6" data-aos="fade-right" data-aos-duration={700}>
                                    <Link href="#">Schedule your appointment <span><i className="fa-solid fa-arrow-right" /></span>
                                    </Link>
                                </div>
                                <div className="resive-button" data-aos="fade-right" data-aos-duration={800}>
                                    <Link href="#" className="font-f-7">More information about Tax Services <span><i className="fa-solid fa-arrow-right" /></span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about6-images">
                                <div className="about6-img1" data-aos="zoom-out" data-aos-duration={1100}>
                                    <img src="/assets/img/image/resive-img.png" alt="" />
                                </div>
                                <div className="about6-img2" data-aos="flip-right" data-aos-duration={900}>
                                    <img src="/assets/img/image/about6-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
