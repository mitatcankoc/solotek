"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header7({ scroll, isMobileMenu, handleMobileMenu }) {
    const routerPath = usePathname();
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleMouseEnter = (menu) => {
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <>
            {/* Desktop Header */}
            <header
                className={`main-header-modern d-none d-lg-block ${scroll ? "scrolled" : ""}`}
                style={{
                    position: 'fixed',
                    top: scroll ? '20px' : '0',
                    left: scroll ? '24px' : '0',
                    right: scroll ? '24px' : '0',
                    zIndex: 1000,
                    padding: scroll ? '0' : '20px 24px',
                    background: 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <div
                    className="header-container-modern"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        maxWidth: scroll ? '1200px' : '100%',
                        margin: '0 auto',
                        padding: scroll ? '12px 24px' : '0',
                        background: scroll ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
                        backdropFilter: scroll ? 'blur(20px)' : 'none',
                        boxShadow: scroll ? '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.08)' : 'none',
                        borderRadius: scroll ? '20px' : '0',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/assets/img/site_logo-Photoroom.png" alt="Solo Teknoloji" style={{ maxHeight: '45px' }} />
                    </Link>

                    {/* Navigation - Pill Style */}
                    <nav style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <ul style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: scroll ? 'transparent' : '#ffffff',
                            padding: scroll ? '0' : '5px 6px',
                            borderRadius: '100px',
                            boxShadow: scroll ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06)',
                            listStyle: 'none',
                            margin: 0,
                            transition: 'all 0.3s ease'
                        }}>
                            <li>
                                <Link
                                    href="/"
                                    style={{
                                        display: 'block',
                                        padding: '10px 22px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        color: routerPath === '/' ? '#ffffff' : '#1b2a47',
                                        backgroundColor: routerPath === '/' ? '#1b2a47' : 'transparent',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter('urunler')}
                                onMouseLeave={handleMouseLeave}
                                style={{ position: 'relative' }}
                            >
                                <Link
                                    href="/urunler"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '10px 22px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        color: routerPath.startsWith('/urunler') ? '#ffffff' : '#1b2a47',
                                        backgroundColor: routerPath.startsWith('/urunler') ? '#1b2a47' : 'transparent',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Ürünler
                                    <i className="fa-solid fa-chevron-down" style={{
                                        fontSize: '10px',
                                        transition: 'transform 0.2s ease',
                                        transform: openDropdown === 'urunler' ? 'rotate(180deg)' : 'rotate(0)'
                                    }}></i>
                                </Link>
                                {/* Dropdown Menu */}
                                <ul style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 12px)',
                                    left: '0',
                                    minWidth: '240px',
                                    background: '#1b2a47',
                                    borderRadius: '12px',
                                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                                    padding: '8px',
                                    opacity: openDropdown === 'urunler' ? 1 : 0,
                                    visibility: openDropdown === 'urunler' ? 'visible' : 'hidden',
                                    transform: openDropdown === 'urunler' ? 'translateY(0)' : 'translateY(8px)',
                                    transition: 'all 0.2s ease',
                                    zIndex: 10000,
                                    listStyle: 'none'
                                }}>
                                    <li>
                                        <Link href="/urunler/el-terminalleri" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            transition: 'all 0.15s ease'
                                        }}>
                                            <span style={{
                                                width: '34px',
                                                height: '34px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px'
                                            }}>
                                                <i className="fa-solid fa-mobile-screen-button"></i>
                                            </span>
                                            El Terminalleri
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/urunler/barkod-yazicilar" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            transition: 'all 0.15s ease'
                                        }}>
                                            <span style={{
                                                width: '34px',
                                                height: '34px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px'
                                            }}>
                                                <i className="fa-solid fa-print"></i>
                                            </span>
                                            Barkod Yazıcılar
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/urunler/barkod-okuyucular" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            transition: 'all 0.15s ease'
                                        }}>
                                            <span style={{
                                                width: '34px',
                                                height: '34px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px'
                                            }}>
                                                <i className="fa-solid fa-qrcode"></i>
                                            </span>
                                            Barkod Okuyucular
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/urunler/rfid" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            transition: 'all 0.15s ease'
                                        }}>
                                            <span style={{
                                                width: '34px',
                                                height: '34px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px'
                                            }}>
                                                <i className="fa-solid fa-wifi"></i>
                                            </span>
                                            RFID Sistemleri
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link
                                    href="/hizmetlerimiz"
                                    style={{
                                        display: 'block',
                                        padding: '10px 22px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        color: routerPath === '/hizmetlerimiz' ? '#ffffff' : '#1b2a47',
                                        backgroundColor: routerPath === '/hizmetlerimiz' ? '#1b2a47' : 'transparent',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Hizmetlerimiz
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/hakkimizda"
                                    style={{
                                        display: 'block',
                                        padding: '10px 22px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        color: routerPath === '/hakkimizda' ? '#ffffff' : '#1b2a47',
                                        backgroundColor: routerPath === '/hakkimizda' ? '#1b2a47' : 'transparent',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/iletisim"
                                    style={{
                                        display: 'block',
                                        padding: '10px 22px',
                                        fontWeight: '500',
                                        fontSize: '14px',
                                        color: routerPath === '/iletisim' ? '#ffffff' : '#1b2a47',
                                        backgroundColor: routerPath === '/iletisim' ? '#1b2a47' : 'transparent',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Header Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Link
                            href="/demo-talep"
                            style={{
                                width: '42px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                color: '#140f07',
                                fontSize: '1.1rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <i className="fa-regular fa-paper-plane"></i>
                        </Link>
                        <Link
                            href="tel:+905365014600"
                            style={{
                                width: '42px',
                                height: '42px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                color: '#140f07',
                                fontSize: '1.1rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <i className="fa-solid fa-phone"></i>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

