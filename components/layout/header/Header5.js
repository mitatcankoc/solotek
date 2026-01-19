import Link from "next/link"
import Menu from "../Menu"
export default function Header5({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header id="header" className={`header header-5 header-absolute d-none d-lg-block ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="header_menu_area">
                                    <div className="logo">
                                        <Link href="/"><img src="/assets/img/logo/home4-header-logo.svg" alt="" /></Link>
                                    </div>
                                    <div className="main-menu">
                                        <div className="menu-wrap">
                                            <Menu />
                                        </div>
                                    </div>
                                </div>
                                <div className="desktop-info">
                                    <div className="quick_contact">
                                        <div className="quick_contact_icon bg-white">
                                            <i className="fa-light fa-phone" />
                                        </div>
                                        <div className="quick_contact_content">
                                            <small className="font-f-3 font-f-5">Hotline 24/7</small>
                                            <Link href="tel:+49 30 923325544 font-f-6">+49 30 923325544</Link>
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
