import Link from "next/link"
import Menu from "../Menu"
export default function Header4({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header id="header" className={`header header-1 header-absolute d-none d-lg-block ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="header_menu_area">
                                    <div className="logo" style={{ maxWidth: 120 }}>
                                        <Link href="/"><img src="/assets/img/logo/site-logo-1.svg" alt="" /></Link>
                                    </div>
                                    <div className="main-menu">
                                        <div className="menu-wrap">
                                            <Menu />
                                            <div className="mobile-header-btn">
                                                <div className="header-btn d-md-none">
                                                    <Link href="#" className="theme-btn-9">Find a Financial Advisor</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="desktop-info">
                                    <div className="quick_contact">
                                        <div className="quick_contact_icon bg-26">
                                            <i className="fa-light fa-phone" />
                                        </div>
                                        <div className="quick_contact_content">
                                            <small>Hotline 24/7</small>
                                            <Link href="tel:+49 30 923325544">+49 30 923325544</Link>
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
