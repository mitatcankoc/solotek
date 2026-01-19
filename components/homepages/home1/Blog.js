'use client'
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs')
            if (res.ok) {
                const data = await res.json()
                // Sadece yayındaki blogları al ve son 3 tanesini göster
                const publishedBlogs = data.filter(blog => blog.status === 'Yayında').slice(0, 3)
                setBlogs(publishedBlogs)
            }
        } catch (err) {
            console.error('Blog verileri çekilemedi:', err)
        } finally {
            setLoading(false)
        }
    }

    const delays = [600, 800, 1000]

    // Eğer blog yoksa bu bölümü hiç gösterme
    if (!loading && blogs.length === 0) {
        return null
    }

    return (
        <>
            <div className="blog-area blog2 section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="heading2 text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="Blog ikonu" />Blog & Haberler</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}><span className="heilight-left">Solo</span> Teknoloji'den en son haberler ve makaleler.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ? (
                            // Yükleme durumu
                            [1, 2, 3].map((_, index) => (
                                <div key={index} className="col-lg-4" data-aos="fade-up" data-aos-duration={delays[index]}>
                                    <div className="single-blog blog-md">
                                        <div className="blog-img" style={{ background: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '30px', color: '#ccc' }}></i>
                                        </div>
                                        <div className="blog-contents">
                                            <div style={{ height: '20px', background: '#f0f0f0', marginBottom: '10px', borderRadius: '4px' }}></div>
                                            <div style={{ height: '40px', background: '#f0f0f0', marginBottom: '10px', borderRadius: '4px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            blogs.map((blog, index) => (
                                <div key={blog.id} className="col-lg-4" data-aos="fade-up" data-aos-duration={delays[index] || 1000}>
                                    <div className="single-blog blog-md">
                                        <div className="blog-img">
                                            <img
                                                src={blog.image || '/assets/img/blog/blog1.png'}
                                                alt={blog.title}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="blog-contents">
                                            <ul className="blog-tags">
                                                <li>
                                                    <Link href="#">
                                                        <img src="/assets/img/icons/hands.svg" alt="Blog ikonu" />
                                                        {blog.category || 'Genel'}
                                                    </Link>
                                                </li>
                                            </ul>
                                            <h3>
                                                <Link href={`/blog/${blog.slug || blog.id}`}>{blog.title}</Link>
                                            </h3>
                                            <Link href={`/blog/${blog.slug || blog.id}`} className="theme-btn-4">
                                                Devamını Oku <span><i className="fa-solid fa-arrow-right" /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {blogs.length > 0 && (
                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <Link href="/blog" className="theme-btn-2" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '20px', whiteSpace: 'nowrap', gap: '10px' }}>
                                    Tüm Yazıları Gör <span><i className="fa-solid fa-arrow-right"></i></span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
