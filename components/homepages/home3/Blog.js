import Link from "next/link";

export default function Blog() {
    return (
        <>
            <div className="blog-area blog3 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="heading3 text-center">
                                <small data-aos="fade-oup" data-aos-duration={600} className="overline">
                                    Our Blog
                                </small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>
                                    Take a look at the latest articles from Consultia.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-blog blog-md">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog4.png" alt="" />
                                </div>
                                <div className="blog-contents">
                                    <ul className="blog-tags">
                                        <li>
                                            <Link href="#">November 25, 2026</Link>
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link href="/single">How To Write Your Consulting Firm Mission Statement ( Why It’s Important).</Link>
                                    </h3>
                                    <Link href="#" className="theme-btn-4">
                                        Read More{" "}
                                        <span>
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-blog blog-md">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog1.png" alt="" />
                                </div>
                                <div className="blog-contents">
                                    <ul className="blog-tags">
                                        <li>
                                            <Link href="#"> November 25, 2026</Link>
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link href="/single">Personal Branding For Consultants: Be Authentic To Get More Clients.</Link>
                                    </h3>
                                    <Link href="#" className="theme-btn-4">
                                        Read More{" "}
                                        <span>
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
