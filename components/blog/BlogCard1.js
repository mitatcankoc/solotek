import Link from "next/link"

export default function BlogCard1({ item }) {
    return (
        <>


            <div className="single-blog blog-lg">
                <div className="blog-img">
                    <Link href={`/blog-1/${item.id}`}><img src={`/assets/img/blog/${item.img}`} alt="" /></Link>
                </div>
                <ul className="blog-tags">
                    <li><Link href="#">Lifestyle</Link></li>
                </ul>
                <h3><Link href={`/blog-1/${item.id}`}>{item.title}</Link></h3>
                <p>In the past 90 days, the world has a serious escalation in cyberattacks.</p>
            </div>

        </>
    )
}
