import Link from "next/link";

export default function Blog() {
    return (
        <>
            <div className="blog-area blog4 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading4 text-center">
                                <small data-aos="fade-up" data-aos-duration={400} className="overline">
                                    Our Blog
                                </small>
                                <h2 data-aos="fade-up" data-aos-duration={600}>
                                    Take a look at the latest articles from Consultia.
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration={400}>
                            <div className="single-blog blog-xlg">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog4.png" alt="" />
                                </div>
                                <div className="blog-contents">
                                    <ul className="blog-tags">
                                        <li>
                                            <Link href="#">Awards</Link>
                                        </li>
                                        <li>
                                            <Link href="#">December 6, 2026</Link>
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link href="/single">Avenues Financial Hailed as a Global Leader in the Financial Industry.</Link>
                                    </h3>
                                    <p>At Avenues Financial, we are a team of knowledgeable experienced accounting and business professionals that provide solutions to your accounting needs....</p>
                                    <div className="space20" />
                                    <Link className="theme-btn-12" href="#">
                                        Read more <i className="fa-solid fa-angle-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-blog blog-xlg">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog1.png" alt="" />
                                </div>
                                <div className="blog-contents">
                                    <ul className="blog-tags">
                                        <li>
                                            <Link href="#">Awards</Link>
                                        </li>
                                        <li>
                                            <Link href="#">December 6, 2026</Link>
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link href="/single">Ecommerce Website Development Project Plan: A Guide to Your Project</Link>
                                    </h3>
                                    <p>At Avenues Financial, we are a team of knowledgeable experienced accounting and business professionals that provide solutions to your accounting needs....</p>
                                    <div className="space20" />
                                    <Link className="theme-btn-12" href="#">
                                        Read more <i className="fa-solid fa-angle-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-blog blog-xlg">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog6.png" alt="" />
                                </div>
                                <div className="blog-contents">
                                    <ul className="blog-tags">
                                        <li>
                                            <Link href="#">Awards</Link>
                                        </li>
                                        <li>
                                            <Link href="#">December 6, 2026</Link>
                                        </li>
                                    </ul>
                                    <h3>
                                        <Link href="/single">How Much Ecommerce Website Costs: Set the Right Budget for Your Project.</Link>
                                    </h3>
                                    <p>At Avenues Financial, we are a team of knowledgeable experienced accounting and business professionals that provide solutions to your accounting needs....</p>
                                    <div className="space20" />
                                    <Link className="theme-btn-12" href="#">
                                        Read more <i className="fa-solid fa-angle-right" />
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
