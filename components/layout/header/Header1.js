
import Link from "next/link"
import Menu from "../Menu"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <div className="header-top-bar d-none d-lg-block" style={{ backgroundColor: '#21BB9F', padding: '8px 0', color: '#fff', fontSize: '14px', fontWeight: '500' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <span style={{ marginRight: '10px' }}>Tüm Barkod İhtiyaçlarınız için Hemen Arayabilirsiniz:</span>
                            <a href="tel:+902163266000" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>
                                <i className="fa-solid fa-phone" style={{ marginRight: '5px' }}></i>
                                0216 326 60 00
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <header id="header" className={`header header-2 header-absolute d-none d-lg-block ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="header_menu_area">
                                    <div className="logo">
                                        <Link href="/"><img src="/assets/img/site_logo-Photoroom.png" alt="Solo Teknoloji" style={{ maxHeight: '50px' }} /></Link>
                                    </div>
                                    <div className="main-menu">
                                        <div className="menu-wrap">
                                            <Menu />
                                        </div>
                                    </div>
                                </div>
                                <div className="desktop-info">
                                    <div className="quick_contact">
                                        <div className="quick_contact_icon bg-27">
                                            <i className="fa-light fa-phone" />
                                        </div>
                                        <div className="quick_contact_content">
                                            <small>Bizi Arayın</small>
                                            <Link href="tel:+902163266000">0216 326 60 00</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
