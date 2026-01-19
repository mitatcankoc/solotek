
import Link from "next/link";
import { useState, useEffect } from "react";
export default function MobileMenu({ isMobileMenu, handleMobileMenu, scrollDirection, scroll }) {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    // Mobil menü açıkken body'ye class ekle
    useEffect(() => {
        if (isMobileMenu) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        // Cleanup
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isMobileMenu]);

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    // Sticky header için class belirleme
    const getHeaderClass = () => {
        let baseClass = "mobile-header mobile-header-4 d-lg-none";
        if (scroll) {
            baseClass += " mobile-header-sticky";
            if (scrollDirection === 'up') {
                baseClass += " mobile-header-visible";
            } else {
                baseClass += " mobile-header-hidden";
            }
        }
        return baseClass;
    };

    return (
        <>
            <div className={getHeaderClass()}>
                <div className="container-fluid">
                    <div className="col-12">
                        <div className="mobile-header-elements">
                            <div className="mobile-logo">
                                <Link href="/">
                                    <img src="/assets/img/site_logo-Photoroom.png" alt="Solo Teknoloji" style={{ maxHeight: '45px' }} />
                                </Link>
                            </div>
                            <div className="mobile-nav-icon" onClick={handleMobileMenu}>
                                <i className="fa-solid fa-bars" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`mobile-sidebar ${isMobileMenu ? "mobile-menu-active" : ""}`}>
                <div className="menu-close" onClick={handleMobileMenu}>
                    <i className="fa-solid fa-xmark" />
                </div>
                <div className="mobile-nav">
                    <ul className="mobile-nav-list">
                        <li>
                            <Link href="/">Ana Sayfa</Link>
                        </li>
                        <li>
                            <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
                        </li>
                        <li>
                            <Link href="/urunler">Ürünlerimiz</Link>
                        </li>
                        <li className="has-children">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link href="/hakkimizda" style={{ color: '#fff' }}>
                                    Hakkımızda
                                </Link>
                                <i
                                    onClick={() => handleToggle('hakkimizda')}
                                    className={`fa-solid ${isActive.key === 'hakkimizda' ? 'fa-angle-up' : 'fa-angle-down'}`}
                                    style={{ cursor: 'pointer', color: '#fff', padding: '10px' }}
                                />
                            </div>
                            <ul className="mobile-menu-sub" style={{
                                display: isActive.key === 'hakkimizda' ? 'block' : 'none',
                                background: '#fff',
                                borderRadius: '8px',
                                padding: '10px 15px',
                                marginTop: '10px'
                            }}>
                                <li>
                                    <Link href="/referanslar" style={{ color: '#333' }}>
                                        Referanslarımız
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/suruculer">Sürücüler</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li className="has-children">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Link href="/iletisim" style={{ color: '#fff' }}>
                                    İletişim
                                </Link>
                                <i
                                    onClick={() => handleToggle('iletisim')}
                                    className={`fa-solid ${isActive.key === 'iletisim' ? 'fa-angle-up' : 'fa-angle-down'}`}
                                    style={{ fontSize: '14px', color: '#fff', cursor: 'pointer', padding: '5px 10px' }}
                                ></i>
                            </div>
                            <ul className="mobile-menu-sub" style={{
                                display: isActive.key === 'iletisim' ? 'block' : 'none',
                                background: '#fff',
                                borderRadius: '8px',
                                padding: '10px 15px',
                                marginTop: '10px'
                            }}>
                                <li>
                                    <Link href="/demo-talep" style={{ color: '#333' }}>
                                        Demo Talep Et
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="mobile-contact">
                        <div className="single-footer">
                            <h3>İletişim</h3>
                            <div className="footer-contact">
                                <div className="single-contact">
                                    <div className="contact-icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <Link href="tel:+905365014600">+90 536 501 46 00</Link>
                                    <Link href="tel:+905438624751">+90 543 862 47 51</Link>
                                </div>
                            </div>
                            <div className="footer-contact">
                                <div className="single-contact">
                                    <div className="contact-icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <Link href="mailto:info@soloteknoloji.com.tr">info@soloteknoloji.com.tr</Link>
                                </div>
                            </div>
                            <div className="footer-contact">
                                <div className="single-contact">
                                    <div className="contact-icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <span style={{ color: '#fff', fontSize: '14px' }}>Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
