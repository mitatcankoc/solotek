'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";

function HoverButton({ href, children, primary = false }) {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '14px 28px',
        borderRadius: '8px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.3s',
        border: '2px solid #21BB9F',
    };

    const primaryStyle = isHovered ? {
        ...baseStyle,
        background: '#fff',
        color: '#21BB9F',
    } : {
        ...baseStyle,
        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
        color: '#fff',
    };

    const secondaryStyle = isHovered ? {
        ...baseStyle,
        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
        color: '#fff',
    } : {
        ...baseStyle,
        background: '#fff',
        color: '#21BB9F',
    };

    return (
        <Link
            href={href}
            style={primary ? primaryStyle : secondaryStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Link>
    );
}

export default function NotFound() {
    return (
        <>
            <Layout>
                <div className="error-page section-padding" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #fff 100%)' }}>
                    <div className="space100" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 m-auto">
                                <div className="text-center">
                                    <div style={{
                                        fontSize: '180px',
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #21BB9F 0%, #1a9980 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: '1',
                                        marginBottom: '20px'
                                    }}>
                                        404
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 m-auto">
                                <div className="space30" />
                                <div className="text-center">
                                    <div className="heading2 no-margin-heading">
                                        <h2>Sayfa Bulunamadı!</h2>
                                        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                                            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                                            Aşağıdaki bağlantıları kullanarak sitemizde gezinebilirsiniz.
                                        </p>
                                        <div className="space30" />
                                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                            <HoverButton href="/" primary>
                                                <i className="fa-solid fa-house" style={{ marginRight: '8px' }}></i>
                                                Ana Sayfa
                                            </HoverButton>
                                            <HoverButton href="/urunler">
                                                <i className="fa-solid fa-box" style={{ marginRight: '8px' }}></i>
                                                Ürünlerimiz
                                            </HoverButton>
                                            <HoverButton href="/iletisim">
                                                <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>
                                                İletişim
                                            </HoverButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space100" />
                </div>
            </Layout>
        </>
    );
}
