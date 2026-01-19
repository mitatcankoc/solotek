
'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from "react"

export default function CaseStudyFilter2({ twocol, blogSm }) {
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

            <div className="blog-area inner-blog-1 casestudy-2 section-padding inner-font-1">
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
                        <div className="col-md-6 col-lg-4 mesonry-item design marketing stories lifestyle">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-1.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design marketing">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-2.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design marketing stories">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-3.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design marketing stories">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-4.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design lifestyle stories">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-5.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design markering">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-6.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design lifestyle">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-7.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design lifestyle stories">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-8.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mesonry-item design lifestyle marketing">
                            <div className="single-case-study-2 trans-1">
                                <div className="case-study-img">
                                    <Link href="/single-case-study-1"><img src="/assets/img/case-study/case-9.jpg" alt="" /></Link>
                                </div>
                                <div className="case-study-contents">
                                    <ul className="case-categories">
                                        <li>
                                            <Link href="/single-case-study-1">HUMAN RESOURCES</Link>
                                        </li>
                                    </ul>
                                    <h4>
                                        <Link href="/single-case-study-1">Kinabalu National Forest Human resoucres management</Link>
                                    </h4>
                                    <Link href="/single-case-study-1" className="theme-btn-13">Learn More
                                        <img src="/assets/img/icons/arrow-up-inner.svg" alt="" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
