import Link from "next/link"
import Menu from "../Menu"
export default function Header3({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header id="header" className={`header bg8 header-absolute header-3 d-none d-lg-block  ${scroll ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-elements">
                                <div className="logo">
                                    <Link href="/"><img src="/assets/img/logo/site-logo-4.svg" alt="" /></Link>
                                </div>
                                <div className="main-menu">
                                    <div className="menu-wrap">
                                        <Menu />
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
