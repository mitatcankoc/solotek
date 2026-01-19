
import Link from "next/link"

export default function Experience() {
    return (
        <>
            <div className="experience6 sp2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about6-images">
                                <div className="about6-img1" data-aos="zoom-out" data-aos-duration={1100}>
                                    <img src="/assets/img/image/experience-img.png" alt="" />
                                </div>
                                <div className="about6-img2" data-aos="flip-right" data-aos-duration={900}>
                                    <img src="/assets/img/image/about6-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className=" experience-hadding">
                                <div className="hadding6">
                                    <h1 className="font-f-7" data-aos="fade-left" data-aos-duration={900}>Consultia has a decade of
                                        experience helping the community.</h1>
                                    <div className="space20" />
                                    <h4><Link href="#" className="font-f-7" data-aos="fade-left" data-aos-duration={1000}>Years of
                                        experience</Link></h4>
                                    <p className="font-f-7" data-aos="fade-left" data-aos-duration={800}>Community building is a
                                        field of practices directed toward the creation or enhancement of community among
                                        individuals.</p>
                                    <div className="space10" />
                                    <h4><Link href="#" className="font-f-7" data-aos="fade-left" data-aos-duration={900}>Trusted by
                                        Business</Link></h4>
                                    <p className="font-f-7" data-aos="fade-left" data-aos-duration={1100}>Many of the entrepreneurs
                                        trust Servicios Arellano to help their businesses.</p>
                                    <div className="space10" />
                                    <h4><Link href="#" className="font-f-7" data-aos="fade-left" data-aos-duration={1100}>Satisfied
                                        customers</Link></h4>
                                    <p className="font-f-7" data-aos="fade-left" data-aos-duration={900}>Our clients are highly
                                        satisfied with our services</p>
                                </div>
                                <div className="space40" />
                                <div className="button6" data-aos="fade-left" data-aos-duration={1000}>
                                    <Link href="#">Schedule your appointment <span><i className="fa-solid fa-arrow-right" /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
