'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BlogDetay() {
    const params = useParams()
    const [blog, setBlog] = useState(null)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (params.slug) {
            fetchBlog()
            fetchRecentBlogs()
        }
    }, [params.slug])

    const fetchBlog = async () => {
        try {
            const res = await fetch(`/api/blogs/${params.slug}`)
            if (res.ok) {
                const data = await res.json()
                setBlog(data)
            } else if (res.status === 404) {
                setNotFound(true)
            }
        } catch (err) {
            console.error('Blog çekilemedi:', err)
            setNotFound(true)
        } finally {
            setLoading(false)
        }
    }

    const fetchRecentBlogs = async () => {
        try {
            const res = await fetch('/api/blogs')
            if (res.ok) {
                const data = await res.json()
                const published = data.filter(b => b.status === 'Yayında' && b.slug !== params.slug).slice(0, 3)
                setRecentBlogs(published)
            }
        } catch (err) {
            console.error('Son yazılar çekilemedi:', err)
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

    if (loading) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Yükleniyor... | Solo Teknoloji" breadcrumbTitle="Blog Detay">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                        <p style={{ color: '#666' }}>Yükleniyor...</p>
                    </div>
                </div>
            </Layout>
        )
    }

    if (notFound || !blog) {
        return (
            <Layout headerStyle={1} footerStyle={1} headTitle="Blog Bulunamadı | Solo Teknoloji" breadcrumbTitle="Blog Detay">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-file-circle-question" style={{ fontSize: '60px', color: '#ddd', marginBottom: '20px', display: 'block' }}></i>
                        <h2 style={{ color: '#666', marginBottom: '15px' }}>Blog Yazısı Bulunamadı</h2>
                        <p style={{ color: '#999', marginBottom: '30px' }}>Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
                        <Link href="/blog" style={{ background: '#21BB9F', color: '#fff', padding: '12px 30px', borderRadius: '50px', textDecoration: 'none' }}>
                            <i className="fa-solid fa-arrow-left" style={{ marginRight: '10px' }}></i>
                            Blog Sayfasına Dön
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle={`${blog.title} | Solo Teknoloji`}
                breadcrumbTitle="Blog"
                breadcrumbSubtitle={blog.title}
            >
                <div>
                    <div className="single-blog-area padding-top inner-font-1 inner-blog-1" id="home">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="single-blog-contents lg-mr-15">
                                        {blog.image && (
                                            <div className="single-blog-img" style={{ marginBottom: '30px' }}>
                                                <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '16px' }} />
                                            </div>
                                        )}

                                        {/* Blog Meta Bilgileri */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '15px',
                                            alignItems: 'center',
                                            marginBottom: '30px',
                                            paddingBottom: '20px',
                                            borderBottom: '1px solid #eee'
                                        }}>
                                            {/* Tarih */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: 'linear-gradient(135deg, rgba(33, 187, 159, 0.1) 0%, rgba(33, 187, 159, 0.05) 100%)',
                                                padding: '8px 16px',
                                                borderRadius: '50px',
                                                border: '1px solid rgba(33, 187, 159, 0.2)'
                                            }}>
                                                <i className="fa-regular fa-calendar" style={{ color: '#21BB9F', fontSize: '14px' }}></i>
                                                <span style={{ color: '#161540', fontSize: '14px', fontWeight: '500' }}>
                                                    {blog.created_at ? formatDate(blog.created_at) : ''}
                                                </span>
                                            </div>

                                            {/* Kategori */}
                                            {blog.category && (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                                    padding: '8px 16px',
                                                    borderRadius: '50px',
                                                    boxShadow: '0 2px 8px rgba(33, 187, 159, 0.3)'
                                                }}>
                                                    <i className="fa-solid fa-tag" style={{ color: '#fff', fontSize: '12px' }}></i>
                                                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Okuma Süresi */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: '#f8f9fa',
                                                padding: '8px 16px',
                                                borderRadius: '50px',
                                                border: '1px solid #eee'
                                            }}>
                                                <i className="fa-regular fa-clock" style={{ color: '#666', fontSize: '14px' }}></i>
                                                <span style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>
                                                    {Math.max(1, Math.ceil((blog.content?.length || 0) / 1000))} dk okuma
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '16px', color: '#444' }}>
                                            {blog.content}
                                        </div>

                                        <div className="theme-border" style={{ margin: '40px 0' }} />
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                {blog.category && (
                                                    <div className="tags">
                                                        <ul>
                                                            <li>Kategori:</li>
                                                            <li>
                                                                <Link href="#">{blog.category}</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="social social3 text-right social-share">
                                                    <ul>
                                                        <li>Paylaş:</li>
                                                        <li>
                                                            <Link data-bs-toggle="tooltip" title="LinkedIn" href="https://linkedin.com" target="_blank">
                                                                <i className="fa-brands fa-linkedin-in" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link data-bs-toggle="tooltip" title="Facebook" href="https://facebook.com" target="_blank">
                                                                <i className="fa-brands fa-facebook-f" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link data-bs-toggle="tooltip" title="WhatsApp" href="https://wa.me/905365014600" target="_blank">
                                                                <i className="fa-brands fa-whatsapp" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
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
                                                {recentBlogs.map((b) => (
                                                    <div className="recent-post" key={b.id}>
                                                        <div className="recent-post-content">
                                                            <Link href={`/blog/${b.slug || b.id}`}>{b.title}</Link>
                                                            <div className="blog-date-time">
                                                                <ul className="blog-date">
                                                                    <li>{b.created_at ? formatShortDate(b.created_at) : ''}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="recent-img">
                                                            <img
                                                                src={b.image || '/assets/img/blog/recent1.png'}
                                                                alt={b.title}
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
                    <div style={{ height: '80px' }}></div>
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
