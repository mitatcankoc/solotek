import Link from "next/link"
import Menu from "../Menu"
export default function Header2({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header id="header" className={`header header-4 header-absolute d-none d-lg-block ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="header_menu_area">
                                    <div className="logo">
                                        <Link href="/"><img src="/assets/img/logo/site-logo-5.svg" alt="" /></Link>
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
                                <div className="header-btn d-none d-md-block">
                                    <Link href="#" className="theme-btn-9">Find a Financial Advisor</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >

        </>
    )
}
