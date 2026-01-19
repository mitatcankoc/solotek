
import Link from "next/link"

export default function Blog() {
    return (
        <>
            <div className="blog-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600}>Our Blog</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}>Take a look at the latest <span className="heilight-right heading-underline">articles from</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-duration={600}>
                            <div className="single-blog blog-sm">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog4.png" alt="" />
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Stories</Link></li>
                                </ul>
                                <h3><Link href="/single">The logistics of cooking in a double-lockdown.</Link></h3>
                                <p>In the past 90 days, the world has a serious escalation in cyberattacks.</p>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-duration={800}>
                            <div className="single-blog blog-sm">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog5.png" alt="" />
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Stories</Link></li>
                                </ul>
                                <h3><Link href="/single">Yes we can! Keeping Berlin's small businesses alive.</Link></h3>
                                <p>In the past 90 days, the world has a serious escalation in cyberattacks.</p>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="single-blog blog-sm">
                                <div className="blog-img">
                                    <img src="/assets/img/blog/blog6.png" alt="" />
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Stories</Link></li>
                                </ul>
                                <h3><Link href="/single">Five things all HRs think when they think of diversity.</Link></h3>
                                <p>In the past 90 days, the world has a serious escalation in cyberattacks.</p>
                            </div>
                        </div>
                        <div className="space40" />
                        <div className="col-12 text-center">
                            <Link href="/blog" className="theme-btn-5">Read all blog posts</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
