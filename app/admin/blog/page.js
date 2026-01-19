'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminBlog() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs?all=1')
            if (!res.ok) throw new Error('Veri çekilemedi')
            const data = await res.json()
            setBlogs(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
            try {
                const res = await fetch(`/api/blogs?id=${id}`, {
                    method: 'DELETE'
                })
                if (res.ok) {
                    setBlogs(blogs.filter(blog => blog.id !== id))
                }
            } catch (err) {
                alert('Silme işlemi başarısız')
            }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ textAlign: 'center' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '40px', color: '#21BB9F', marginBottom: '15px' }}></i>
                    <p style={{ color: '#666' }}>Yükleniyor...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <div className="blog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '50px',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '15px'
                        }}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            Blog Yönetimi
                        </span>
                        <h1 className="admin-page-title" style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#161540',
                            marginBottom: '8px',
                            fontFamily: '"DM Serif Display", serif'
                        }}>
                            <span style={{ color: '#21BB9F' }}>Blog</span> Yazıları
                        </h1>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: 0 }}>
                            Toplam {blogs.length} blog yazısı bulunmaktadır
                        </p>
                    </div>
                    <Link
                        href="/admin/blog/ekle"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 28px',
                            background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                            borderRadius: '50px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: '0 4px 15px rgba(33, 187, 159, 0.3)'
                        }}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Yeni Yazı Ekle
                    </Link>
                </div>
            </div>

            {error && (
                <div style={{
                    background: '#fee',
                    border: '1px solid #fcc',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    color: '#c00'
                }}>
                    <i className="fa-solid fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
                    {error}
                </div>
            )}

            {/* Blog Grid */}
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        style={{
                            background: '#fff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #eee',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'
                            e.currentTarget.style.transform = 'translateY(-5px)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {/* Image */}
                        <div style={{
                            height: '180px',
                            overflow: 'hidden',
                            position: 'relative',
                            background: '#f0f0f0'
                        }}>
                            {blog.image ? (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: '#ccc'
                                }}>
                                    <i className="fa-solid fa-image" style={{ fontSize: '40px' }}></i>
                                </div>
                            )}
                            <span style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                color: '#fff',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500'
                            }}>
                                {blog.category || 'Genel'}
                            </span>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '25px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#161540',
                                marginBottom: '12px',
                                fontFamily: '"DM Serif Display", serif',
                                lineHeight: '1.4',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {blog.title}
                            </h3>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                marginBottom: '20px',
                                fontSize: '13px',
                                color: '#888'
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <i className="fa-regular fa-calendar"></i>
                                    {blog.created_at ? formatDate(blog.created_at) : 'Tarih yok'}
                                </span>
                            </div>

                            {/* Bottom Row */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '15px',
                                borderTop: '1px solid #f0f0f0'
                            }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    background: blog.status === 'Yayında' ? 'rgba(33, 187, 159, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    color: blog.status === 'Yayında' ? '#21BB9F' : '#f59e0b',
                                    fontWeight: '500'
                                }}>
                                    <div style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: blog.status === 'Yayında' ? '#21BB9F' : '#f59e0b'
                                    }}></div>
                                    {blog.status || 'Taslak'}
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link
                                        href={`/admin/blog/duzenle/${blog.id}`}
                                        style={{
                                            width: '34px',
                                            height: '34px',
                                            background: 'rgba(33, 187, 159, 0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#21BB9F',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Düzenle"
                                    >
                                        <i className="fa-solid fa-pen" style={{ fontSize: '12px' }}></i>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        style={{
                                            width: '34px',
                                            height: '34px',
                                            background: 'rgba(231, 76, 60, 0.1)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#e74c3c',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Sil"
                                    >
                                        <i className="fa-solid fa-trash" style={{ fontSize: '12px' }}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <Link
                    href="/admin/blog/ekle"
                    style={{
                        background: 'linear-gradient(135deg, rgba(33, 187, 159, 0.05) 0%, rgba(33, 187, 159, 0.02) 100%)',
                        borderRadius: '16px',
                        border: '2px dashed rgba(33, 187, 159, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '350px',
                        textDecoration: 'none'
                    }}
                >
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '15px'
                    }}>
                        <i className="fa-solid fa-plus" style={{ color: '#fff', fontSize: '24px' }}></i>
                    </div>
                    <p style={{ color: '#21BB9F', fontSize: '16px', fontWeight: '500', margin: 0 }}>
                        Yeni Blog Yazısı Ekle
                    </p>
                </Link>
            </div>

            <style jsx>{`
                @media (max-width: 1200px) {
                    .blog-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 768px) {
                    .blog-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .blog-header {
                        flex-direction: column !important;
                    }
                }
                @media (max-width: 576px) {
                    .admin-page-title {
                        font-size: 22px !important;
                    }
                }
            `}</style>
        </div>
    )
}
