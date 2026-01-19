
'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from "react"

export default function CareerFilter1({ twocol, blogSm }) {
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

            <div className="row">
                <div className="col-12">
                    <div className="mesonry-menu">
                        <ul id="grid-filter">
                            <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>All</li>
                            <li className={activeBtn("product")} onClick={handleFilterKeyChange("product")} data-category="product">Product</li>
                            <li className={activeBtn("engineering")} onClick={handleFilterKeyChange("engineering")} data-category="engineering">Engineering</li>
                            <li className={activeBtn("development")} onClick={handleFilterKeyChange("development")} data-category="development">Development</li>
                            <li className={activeBtn("design")} onClick={handleFilterKeyChange("design")} data-category="design">Design</li>
                            <li className={activeBtn("marketing")} onClick={handleFilterKeyChange("marketing")} data-category="marketing">Marketing</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="job-items" id="masonry-grid">
                        <div className="single-job mesonry-item product design">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Product</h5>
                                <h3>QA Manager</h3>
                                <p>Los Angeles, USA / Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item design engineering">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Development</h5>
                                <h3>Software Engineer- Frontend</h3>
                                <p>Houston</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item markering engineering">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Development</h5>
                                <h3>Senior Software Engineer- Backend</h3>
                                <p>Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item development design">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Product</h5>
                                <h3>QA Engineer</h3>
                                <p>Los Angeles, USA / Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item product development">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Marketing</h5>
                                <h3>Business Development Executive</h3>
                                <p>Houston., USA / Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item design marketing">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Development</h5>
                                <h3>Design Lead</h3>
                                <p>Houston., USA / Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                        <div className="single-job mesonry-item marketing prduct">
                            <div className="job-desc">
                                <div className="job-icon">
                                    <img src="/assets/img/icons/user.svg" alt="" />
                                </div>
                                <h5>Design</h5>
                                <h3>Community Manager</h3>
                                <p>Los Angeles, USA / Remote</p>
                            </div>
                            <div className="job-apply">
                                <Link href="#" className="theme-btn-14">Apply Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
