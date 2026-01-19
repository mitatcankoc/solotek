import Link from "next/link"
import Menu from "../Menu"
export default function Header6({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header id="header" className={`header header-6 header-absolute d-none d-lg-block ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="header_menu_area">
                                    <div className="logo">
                                        <Link href="/"><img src="/assets/img/logo/home6-header-logo.svg" alt="" /></Link>
                                    </div>
                                    <div className="main-menu main-menu6">
                                        <div className="menu-wrap">
                                            <Menu />
                                        </div>
                                    </div>
                                </div>
                                <div className="desktop-info">
                                    <div className="button6">
                                        <Link href="/contact-1">Contact Us</Link>
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
