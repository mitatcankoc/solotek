import Link from "next/link";
export default function Footer4() {
    return (
        <>
            <footer className="footer-area footer-1 bg1">
                <div className="subscribe-form">
                    <div className="container">
                        <div className="subscribe subscribe-1">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <h3>Join Us today and let us help you to grow your business.</h3>
                                </div>
                                <div className="col-md-6">
                                    <div className="subscribe-btn text-right">
                                        <Link href="#" className="theme-btn-1">
                                            Get a Free Consultaion
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer">
                                <Link style={{ maxWidth: 250 }} href="/" className="footer-logo">
                                    <img src="/assets/img/logo/site-logo-1.svg" alt="" />
                                </Link>
                                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                                <div className="social">
                                    <ul>
                                        <li>
                                            <Link data-bs-toggle="tooltip" title="Linked in" href="#">
                                                <i className="fa-brands fa-linkedin-in" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link data-bs-toggle="tooltip" title="Facebook" href="#">
                                                <i className="fa-brands fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link data-bs-toggle="tooltip" title="Instagram" href="#">
                                                <i className="fa-brands fa-instagram" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link data-bs-toggle="tooltip" title="TikTok" href="#">
                                                <i className="fa-brands fa-tiktok" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="copyright">
                                    <p>© 2026 Consultia Limited.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-6">
                            <div className="single-footer">
                                <h3>Learn</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link href="#">Product</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Pricing</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Schedule a demo</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Our Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-6">
                            <div className="single-footer">
                                <h3>Our Company</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link href="#">About us</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link href="#">User Terms</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Help Centre</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer">
                                <h3>Get in touch</h3>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <img src="/assets/img/icons/contact-phone.svg" alt="" />
                                        </div>
                                        <Link href="#">USA: +91 02 2585 0556</Link>
                                        <Link href="#">UK: +61 02 2585 0556</Link>
                                    </div>
                                </div>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <img src="/assets/img/icons/contact-email.svg" alt="" />
                                        </div>
                                        <Link href="#">Contacthelp@Demoui.co</Link>
                                        <Link href="#">Info@Demoui.co</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space50" />
                </div>
            </footer>
        </>
    );
}
