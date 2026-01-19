
import Link from "next/link"

export default function Team() {
    return (
        <>
            <div className="team-2 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="heading3 text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="overline">Meet Our Attorneys</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>Our high-powered team is ready to fight for your
                                    rights</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team5.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-15">
                                        <Link href="#">Jacob Jones</Link>
                                        <p>Associate Consultant</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side bg-15">
                                    <div className="team-content">
                                        <Link href="#">Jacob Jones</Link>
                                        <p>Associate Consultant</p>
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
                                        <img src="/assets/img/team/team6.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-16">
                                        <Link href="#">Kathryn Murphy</Link>
                                        <p>Senior Consultant</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side bg-16">
                                    <div className="team-content">
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
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team7.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-17">
                                        <Link href="#">Floyd Miles</Link>
                                        <p>Group Manager</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side bg-17">
                                    <div className="team-content ">
                                        <Link href="#">Floyd Miles</Link>
                                        <p>Group Manager</p>
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
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="single-team">
                                <div className="team-sides team-font-side">
                                    <div className="team-img">
                                        <img src="/assets/img/team/team7.jpg" alt="" />
                                    </div>
                                    <div className="team-content bg-18">
                                        <Link href="#">Ralph Edwards</Link>
                                        <p>Senior Analytics</p>
                                    </div>
                                </div>
                                <div className="team-sides team-back-side bg-18">
                                    <div className="team-content">
                                        <Link href="#">Ralph Edwards</Link>
                                        <p>Senior Analytics</p>
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
