
import Link from "next/link"

export default function Team() {
    return (
        <>
            <div className="team-area team-1 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600}>Our Team</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>Meet with our <span className="heilight-right heading-underline">expert team</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-team trans-1">
                                <div className="team-img img-zoom">
                                    <img src="/assets/img/team/team1.jpg" alt="" />
                                </div>
                                <div className="team-content">
                                    <Link href="#">Jacob Jones</Link>
                                    <p>Associate Consultant</p>
                                    <div className="team-socials">
                                        <ul>
                                            <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                            <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-team active trans-1">
                                <div className="team-img img-zoom">
                                    <img src="/assets/img/team/team2.jpg" alt="" />
                                </div>
                                <div className="team-content">
                                    <Link href="#">Kathryn Murphy</Link>
                                    <p>Senior Consultant</p>
                                    <div className="team-socials">
                                        <ul>
                                            <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                            <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-team trans-1">
                                <div className="team-img img-zoom">
                                    <img src="/assets/img/team/team3.jpg" alt="" />
                                </div>
                                <div className="team-content">
                                    <Link href="#">Floyd Miles</Link>
                                    <p>Group Manager</p>
                                    <div className="team-socials">
                                        <ul>
                                            <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                            <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="single-team trans-1">
                                <div className="team-img img-zoom">
                                    <img src="/assets/img/team/team4.jpg" alt="" />
                                </div>
                                <div className="team-content">
                                    <Link href="#">Ralph Edwards</Link>
                                    <p>Senior Analytics</p>
                                    <div className="team-socials">
                                        <ul>
                                            <li><Link data-bs-toggle="tooltip" title="Linked in" href="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                            <li><Link data-bs-toggle="tooltip" title="Facebook" href="#"><i className="fa-brands fa-facebook-f" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="Instagram" href="#"><i className="fa-brands fa-instagram" /></Link>
                                            </li>
                                            <li><Link data-bs-toggle="tooltip" title="TikTok" href="#"><i className="fa-brands fa-tiktok" /></Link></li>
                                        </ul>
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
