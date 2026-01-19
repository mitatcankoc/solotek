
'use client'
import AOS from 'aos'
import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import Breadcrumb from './Breadcrumb'
import DemoSidebar from "./DemoSidebar"
import MobileMenu from './MobileMenu'
import PageHead from './PageHead'
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Footer3 from "./footer/Footer3"
import Footer4 from "./footer/Footer4"
import Footer5 from "./footer/Footer5"
import Footer6 from './footer/Footer6'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header3 from "./header/Header3"
import Header4 from "./header/Header4"
import Header5 from "./header/Header5"
import Header6 from "./header/Header6"
import Header7 from "./header/Header7"

export default function Layout({ headerStyle, footerStyle, headTitle, metaDescription, metaKeywords, breadcrumbTitle, breadcrumbSubtitle, children }) {
    const [scroll, setScroll] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('up')
    const [lastScrollY, setLastScrollY] = useState(0)
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

    // İç sayfa mı kontrolü (breadcrumbTitle varsa iç sayfadır)
    const isInnerPage = !!breadcrumbTitle

    useEffect(() => {
        AOS.init()

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Scroll yönünü belirle
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setScrollDirection('down')
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up')
            }

            setLastScrollY(currentScrollY)

            const scrollCheck = currentScrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        }

        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [lastScrollY, scroll])
    return (
        <div className={isInnerPage ? 'inner-page' : ''}>
            <PageHead headTitle={headTitle} metaDescription={metaDescription} metaKeywords={metaKeywords} />

            {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />}
            {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 4 ? <Header4 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 5 ? <Header5 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 6 ? <Header6 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 7 ? (
                <>
                    <Header7 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
                    {/* Mobil için Header1 */}
                    <div className="d-lg-none">
                        <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
                    </div>
                </>
            ) : null}

            <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} scrollDirection={scrollDirection} scroll={scroll} />

            {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} breadcrumbSubtitle={breadcrumbSubtitle} />}
            {children}

            {!footerStyle && < Footer1 />}
            {footerStyle == 1 ? < Footer1 /> : null}
            {footerStyle == 2 ? < Footer2 /> : null}
            {footerStyle == 3 ? < Footer3 /> : null}
            {footerStyle == 4 ? < Footer4 /> : null}
            {footerStyle == 5 ? < Footer5 /> : null}
            {footerStyle == 6 ? < Footer6 /> : null}

            <DemoSidebar />

            <BackToTop scroll={scroll} />
        </div>
    )
}
