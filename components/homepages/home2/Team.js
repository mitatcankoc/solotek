
import Link from "next/link"

export default function Team() {
    return (
        <>
            <div className="team-2 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading4 text-center">
                                <small data-aos="fade-up" data-aos-duration={400} className="overline">Meet Our Advsior</small>
                                <h2 data-aos="fade-up" data-aos-duration={600}>Our team of financial professionals is helping
                                    you achieve
                                    goals.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={400}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team9.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-18">
                                        <Link href="#">Kathryn Murphy</Link>
                                        <p>Senior Consultant</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side">
                                    <div className="team-content bg-18">
                                        <Link href="#">Kathryn Murphy</Link>
                                        <p>Senior Consultant</p>
                                        <div className="space10" />
                                        <div className="team-socials">
                                            <ul>
                                                <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team10.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-18">
                                        <Link href="#">Aston Turner</Link>
                                        <p>Group manager</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side">
                                    <div className="team-content bg-18">
                                        <Link href="#">Alyssa Healy</Link>
                                        <p>Group manager</p>
                                        <div className="space10" />
                                        <div className="team-socials">
                                            <ul>
                                                <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team11.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-18">
                                        <Link href="#">Jhye Richardson</Link>
                                        <p>Associate Consultant</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side">
                                    <div className="team-content bg-18">
                                        <Link href="#">Jhye Richardson</Link>
                                        <p>Associate Consultant
                                        </p>
                                        <div className="space10" />
                                        <div className="team-socials">
                                            <ul>
                                                <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team12.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-18">
                                        <Link href="#">Peter Handscomb</Link>
                                        <p>Consultant  Analytics</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side">
                                    <div className="team-content bg-18">
                                        <Link href="#">Peter Handscomb</Link>
                                        <p>Consultant  Analytics</p>
                                        <div className="space10" />
                                        <div className="team-socials">
                                            <ul>
                                                <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link></li>
                                                <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                            </ul>
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
