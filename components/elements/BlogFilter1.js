
'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from "react"

export default function BlogFilter1({ twocol, blogSm }) {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient || typeof window === 'undefined') return

        let timeoutId = null

        const initIsotope = async () => {
            const Isotope = (await import("isotope-layout")).default
            timeoutId = setTimeout(() => {
                const gridElement = document.getElementById("masonry-grid")
                if (gridElement && !isotope.current) {
                    isotope.current = new Isotope("#masonry-grid", {
                        itemSelector: ".mesonry-item",
                        // layoutMode: "fitRows",
                        percentPosition: true,
                        masonry: {
                            columnWidth: ".mesonry-item",
                        },
                        animationOptions: {
                            duration: 750,
                            easing: "linear",
                            queue: false,
                        },
                    })
                }
            }, 1000)
        }

        initIsotope()

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            if (isotope.current) {
                isotope.current.destroy()
                isotope.current = null
            }
        }
    }, [isClient])
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )

    const activeBtn = (value) => (value === filterKey ? "active" : "")
    return (
        <>
            <div className="blog-area inner-blog-1 section-padding inner-font-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mesonry-menu">
                                <ul id="grid-filter">
                                    <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>All</li>
                                    <li className={activeBtn("lifestyle")} onClick={handleFilterKeyChange("lifestyle")}>Lifestyle</li>
                                    <li className={activeBtn("stories")} onClick={handleFilterKeyChange("stories")}>Stories</li>
                                    <li className={activeBtn("design")} onClick={handleFilterKeyChange("design")}>Design</li>
                                    <li className={activeBtn("marketing")} onClick={handleFilterKeyChange("marketing")}>Marketing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="masonry-grid">
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design marketing stories lifestyle`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog3.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Business opportunities are like buses, there's always one
                                        coming.</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design marketing`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog4.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Best Practices for Employee Recognition Programs</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design marketing stories`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog5.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Leadership Burnout: What causes it and how to avoid it</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design marketing stories`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog6.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Best Practices for Employee Recognition Programs</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design lifestyle stories`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog7.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Business opportunities are like buses, there's always one
                                        coming.</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design markering`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog8.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Leadership Burnout: What causes it and how to avoid it</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design lifestyle`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog9.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Business opportunities are like buses, there's always one
                                        coming.</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item stories lifestyle`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog3.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Leadership Burnout: What causes it and how to avoid it</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                        <div className={`${twocol ? "col-md-6" : "col-md-6 col-lg-4"}  mesonry-item design`}>
                            <div className={`single-blog ${blogSm ? "blog-sm" : "blog-md"} `}>
                                <div className="blog-img">
                                    <Link href="/single-1"><img src="/assets/img/blog/blog2.png" alt="" /></Link>
                                </div>
                                <ul className="blog-tags">
                                    <li><Link href="#">Lifestyle</Link></li>
                                </ul>
                                <h3>
                                    <Link href="/single-1">Business opportunities are like buses, there's always one
                                        coming.</Link>
                                </h3>
                                <p>
                                    In the past 90 days, the world has a serious escalation in
                                    cyberattacks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
