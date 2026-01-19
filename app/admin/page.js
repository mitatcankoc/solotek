'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        blogs: 0,
        referanslar: 0,
        urunler: 0,
        mesajlar: 0,
        demoTalepleri: 0,
        kategoriler: 0,
        markalar: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const [
                blogRes,
                referansRes,
                urunRes,
                mesajRes,
                demoRes,
                kategoriRes,
                markaRes
            ] = await Promise.all([
                fetch('/api/blogs'),
                fetch('/api/referanslar'),
                fetch('/api/urunler'),
                fetch('/api/iletisim'),
                fetch('/api/demo-talep'),
                fetch('/api/kategoriler'),
                fetch('/api/markalar')
            ])

            const [blogs, referanslar, urunler, mesajlar, demoTalepleri, kategoriler, markalar] = await Promise.all([
                blogRes.ok ? blogRes.json() : [],
                referansRes.ok ? referansRes.json() : [],
                urunRes.ok ? urunRes.json() : [],
                mesajRes.ok ? mesajRes.json() : [],
                demoRes.ok ? demoRes.json() : [],
                kategoriRes.ok ? kategoriRes.json() : [],
                markaRes.ok ? markaRes.json() : []
            ])

            setStats({
                blogs: Array.isArray(blogs) ? blogs.length : 0,
                referanslar: Array.isArray(referanslar) ? referanslar.length : 0,
                urunler: Array.isArray(urunler) ? urunler.length : 0,
                mesajlar: Array.isArray(mesajlar) ? mesajlar.length : 0,
                demoTalepleri: Array.isArray(demoTalepleri) ? demoTalepleri.length : 0,
                kategoriler: Array.isArray(kategoriler) ? kategoriler.length : 0,
                markalar: Array.isArray(markalar) ? markalar.length : 0
            })
        } catch (error) {
            console.error('Stats yüklenirken hata:', error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        { label: 'Toplam Ürün', value: stats.urunler, icon: 'fa-box', color: '#21BB9F', href: '/admin/urunler' },
        { label: 'Kategoriler', value: stats.kategoriler, icon: 'fa-tags', color: '#8b5cf6', href: '/admin/urunler/kategoriler' },
        { label: 'Markalar', value: stats.markalar, icon: 'fa-building', color: '#3498db', href: '/admin/urunler/markalar' },
        { label: 'Blog Yazıları', value: stats.blogs, icon: 'fa-newspaper', color: '#f59e0b', href: '/admin/blog' },
        { label: 'Referanslar', value: stats.referanslar, icon: 'fa-star', color: '#ec4899', href: '/admin/referanslar' },
        { label: 'Mesajlar', value: stats.mesajlar, icon: 'fa-envelope', color: '#e74c3c', href: '/admin/mesajlar' },
        { label: 'Demo Talepleri', value: stats.demoTalepleri, icon: 'fa-calendar-check', color: '#06b6d4', href: '/admin/demo-talepleri' },
    ]

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 className="page-title" style={{ fontSize: '28px', fontWeight: '600', color: '#1A1A1A', marginBottom: '5px' }}>
                    Dashboard
                </h1>
                <p style={{ color: '#666', marginBottom: 0 }}>
                    Solo Teknoloji yönetim paneline hoş geldiniz. Buradan tüm içeriklerinizi kolayca yönetebilirsiniz.
                </p>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        href={stat.href}
                        style={{
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '25px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            textDecoration: 'none',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        className="stat-card"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>{stat.label}</p>
                                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A', marginBottom: 0 }}>
                                    {loading ? (
                                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '20px', color: '#ccc' }}></i>
                                    ) : stat.value}
                                </h3>
                            </div>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                background: `${stat.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <i className={`fa-solid ${stat.icon}`} style={{ fontSize: '20px', color: stat.color }}></i>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="actions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1A1A1A' }}>
                        <i className="fa-solid fa-box" style={{ marginRight: '10px', color: '#21BB9F' }}></i>
                        Ürün Yönetimi
                    </h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Ürünlerinizi ekleyin, düzenleyin veya silin.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link
                            href="/admin/urunler"
                            style={{
                                padding: '10px 20px',
                                background: '#f4f6f9',
                                borderRadius: '8px',
                                color: '#1A1A1A',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            Tüm Ürünler
                        </Link>
                        <Link
                            href="/admin/urunler/ekle"
                            style={{
                                padding: '10px 20px',
                                background: '#21BB9F',
                                borderRadius: '8px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i>
                            Yeni Ürün
                        </Link>
                    </div>
                </div>

                <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1A1A1A' }}>
                        <i className="fa-solid fa-newspaper" style={{ marginRight: '10px', color: '#f59e0b' }}></i>
                        Blog Yönetimi
                    </h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Blog yazılarınızı ekleyin, düzenleyin veya silin.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link
                            href="/admin/blog"
                            style={{
                                padding: '10px 20px',
                                background: '#f4f6f9',
                                borderRadius: '8px',
                                color: '#1A1A1A',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            Tüm Yazılar
                        </Link>
                        <Link
                            href="/admin/blog/ekle"
                            style={{
                                padding: '10px 20px',
                                background: '#f59e0b',
                                borderRadius: '8px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i>
                            Yeni Yazı
                        </Link>
                    </div>
                </div>

                <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1A1A1A' }}>
                        <i className="fa-solid fa-star" style={{ marginRight: '10px', color: '#ec4899' }}></i>
                        Referans Yönetimi
                    </h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Referanslarınızı ekleyin, düzenleyin veya silin.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link
                            href="/admin/referanslar"
                            style={{
                                padding: '10px 20px',
                                background: '#f4f6f9',
                                borderRadius: '8px',
                                color: '#1A1A1A',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            Tüm Referanslar
                        </Link>
                        <Link
                            href="/admin/referanslar/ekle"
                            style={{
                                padding: '10px 20px',
                                background: '#ec4899',
                                borderRadius: '8px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            <i className="fa-solid fa-plus" style={{ marginRight: '5px' }}></i>
                            Yeni Referans
                        </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                }
                @media (max-width: 1200px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .actions-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 768px) {
                    .page-title {
                        font-size: 22px !important;
                    }
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .actions-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}
