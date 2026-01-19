'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
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
                // Sadece yayındaki blogları al
                const publishedBlogs = data.filter(blog => blog.status === 'Yayında')
                setBlogs(publishedBlogs)
            }
        } catch (err) {
            console.error('Blog verileri çekilemedi:', err)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    const formatShortDate = (dateString) => {
        const date = new Date(dateString)
        const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
            'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
        return `${date.getDate()}.${months[date.getMonth()]}.${date.getFullYear()}`
    }

    const recentBlogs = blogs.slice(0, 3)

    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Blog | Barkod Teknolojileri ve Sektör Haberleri | Solo Teknoloji"
                metaDescription="Barkod sistemleri, POS teknolojileri, el terminalleri ve otomasyon çözümleri hakkında güncel blog yazıları, haberler ve sektör analizleri."
                metaKeywords="barkod teknoloji blog, pos sistemleri haber, el terminali rehber, otomasyon çözümleri makale, sektör haberleri"
                breadcrumbTitle="Blog">
                <div>
                    <div className="blog-area inner-blog-1 section-padding inner-font-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-lg-8">
                                    <div className="lg-mr-15">
                                        {loading ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                                                    <p style={{ color: '#666' }}>Yükleniyor...</p>
                                                </div>
                                            </div>
                                        ) : blogs.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                                <i className="fa-solid fa-folder-open" style={{ fontSize: '60px', color: '#ddd', marginBottom: '20px', display: 'block' }}></i>
                                                <h3 style={{ color: '#666' }}>Henüz blog yazısı yok</h3>
                                                <p style={{ color: '#999' }}>Yakında yeni içerikler eklenecek!</p>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {blogs.map((blog) => (
                                                    <div className="col-lg-6" key={blog.id}>
                                                        <div className="single-blog blog-md">
                                                            <div className="blog-img">
                                                                <Link href={`/blog/${blog.slug || blog.id}`}>
                                                                    <img
                                                                        src={blog.image || '/assets/img/blog/blog1.png'}
                                                                        alt={blog.title}
                                                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <h3>
                                                                <Link href={`/blog/${blog.slug || blog.id}`}>{blog.title}</Link>
                                                            </h3>
                                                            <p>{blog.content ? blog.content.substring(0, 100) + '...' : ''}</p>
                                                            <div className="blog-footer">
                                                                <span className="blog-date">
                                                                    <i className="fa-regular fa-calendar"></i>
                                                                    {blog.created_at ? formatDate(blog.created_at) : 'Tarih yok'}
                                                                </span>
                                                                <Link href={`/blog/${blog.slug || blog.id}`} className="blog-read-more">
                                                                    Devamını Oku <i className="fa-solid fa-arrow-right"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="widgets lg-ml-15">
                                        <div className="single-widget about-widget">
                                            <div className="about-author">
                                                <img src="/assets/img/site_logo-Photoroom.png" alt="Solo Teknoloji" style={{ maxWidth: '150px' }} />
                                            </div>
                                            <h4>Solo Teknoloji</h4>
                                            <p>Barkodlu sistem satış ve kurulumu, terazi ve yazılım çözümleri ile sektörün öncü kuruluşları arasında yer almaktayız.</p>
                                        </div>
                                        {recentBlogs.length > 0 && (
                                            <div className="single-widget recent-posts">
                                                <h3>Son Yazılar</h3>
                                                {recentBlogs.map((blog) => (
                                                    <div className="recent-post" key={blog.id}>
                                                        <div className="recent-post-content">
                                                            <Link href={`/blog/${blog.slug || blog.id}`}>{blog.title}</Link>
                                                            <div className="blog-date-time">
                                                                <ul className="blog-date">
                                                                    <li>
                                                                        <Link href="#">
                                                                            {blog.created_at ? formatShortDate(blog.created_at) : ''}
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="recent-img">
                                                            <img
                                                                src={blog.image || '/assets/img/blog/recent1.png'}
                                                                alt={blog.title}
                                                                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*=====CTA=======*/}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Sorularınız mı Var?</h2>
                                        <p>Teknolojik ihtiyaçlarınız için bizimle iletişime geçin.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/iletisim" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                        İletişime Geç
                                        <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
