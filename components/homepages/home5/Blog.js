
import Link from "next/link"

export default function Blog() {
    return (
        <>
            <div className="home-blog section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 m-auto text-center">
                            <div className="hadding5">
                                <span className="span font-f-5 font-18 line-height-18 weight-400" data-aos="fade-up" data-aos-duration={800}>Our Blog</span>
                                <div className="space10" />
                                <h1 className="font-f-6 font-30 font-lg-42 weight-600 line-height-38 line-height-lg-48 color4" data-aos="fade-up" data-aos-duration={1000}>Take a look at the latest articles from
                                    Consultia.</h1>
                            </div>
                        </div>
                    </div>
                    <div className="space30" />
                    <div className="row">
                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={800}>
                            <div className="home4-blog-items">
                                <div className="home4-blog-items-img">
                                    <img src="/assets/img/blog/home4-blog1.png" alt="" />
                                </div>
                                <div className="hadding5 home4-blog-hadding">
                                    <span className="span font-f-5 font-14 line-height-14 weight-400">Insurance</span>
                                    <div className="space10" />
                                    <h4 className="font-f-6 weight-500 font-20 color4"> <Link href="/blog-mesonry-1" className="color4 line-height-lg-28">Avenues Financial Hailed as a Global Leader in the
                                        Financial Industry.</Link></h4>
                                    <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">At Avenues Financial, we
                                        are a team of knowledgeable  experienced accounting and business professionals that
                                        provide solutions to your accounting needs....
                                    </p>
                                    <Link href="/blog-1" className="home4-blog-btn font-f-5 font-16 line-height-26 weight-400">Read
                                        More <i className="fa-solid fa-angle-right" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="home4-blog-items">
                                <div className="home4-blog-items-img">
                                    <img src="/assets/img/blog/home4-blog2.png" alt="" />
                                </div>
                                <div className="hadding5 home4-blog-hadding">
                                    <span className="span font-f-5 font-14 line-height-lg-14 weight-400">Insurance</span>
                                    <div className="space10" />
                                    <h4 className="font-f-6 weight-500 font-20 color4"> <Link href="/blog-mesonry-1" className="color4 line-height-lg-28">Avenues Financial Hailed as a Global Leader in the
                                        Financial Industry.</Link></h4>
                                    <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">At Avenues Financial, we
                                        are a team of knowledgeable  experienced accounting and business professionals that
                                        provide solutions to your accounting needs....
                                    </p>
                                    <Link href="/blog-1" className="home4-blog-btn font-f-5 font-16 line-height-32 weight-400">Read
                                        More <i className="fa-solid fa-angle-right" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="home4-blog-items">
                                <div className="home4-blog-items-img">
                                    <img src="/assets/img/blog/home4-blog3.png" alt="" />
                                </div>
                                <div className="hadding5 home4-blog-hadding">
                                    <span className="span font-f-5 font-14 line-height-lg-14 weight-400">Insurance</span>
                                    <div className="space10" />
                                    <h4 className="font-f-6 font-20 weight-500 color4"> <Link href="/blog-mesonry-1" className="color4 line-height-lg-28">Avenues Financial Hailed as a Global Leader in the
                                        Financial Industry.</Link></h4>
                                    <p className="font-f-5 font-16 line-height-lg-26 weight-400 color-p-4">At Avenues Financial, we
                                        are a team of knowledgeable  experienced accounting and business professionals that
                                        provide solutions to your accounting needs....
                                    </p>
                                    <Link href="/blog-1" className="home4-blog-btn font-f-5 font-16 line-height-32 weight-400">Read
                                        More <i className="fa-solid fa-angle-right" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
