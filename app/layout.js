import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/public/assets/css/plugins/bootstrap.min.css";
import "@/public/assets/css/plugins/fonts.css";
import "@/public/assets/css/master.css";
import "@/public/assets/css/h4-master.css";
import Script from "next/script";

export const metadata = {
    metadataBase: new URL('https://soloteknoloji.tr'),
    alternates: {
        canonical: './',
    },
    title: "Solo Teknoloji | POS Sistemleri, Barkod ve Yazılım Çözümleri",
    description: "Solo Teknoloji - Yeni nesil POS sistemleri, barkodlu sistem satış ve kurulum, terazi ve yazılım çözümleri, teknik servis desteği. Zebra, Honeywell, Datalogic yetkili satıcısı.",
    icons: {
        icon: '/assets/img/site_logo-Photoroom.png',
        shortcut: '/assets/img/site_logo-Photoroom.png',
        apple: '/assets/img/site_logo-Photoroom.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr" id="#top" translate="no" suppressHydrationWarning>
            <head>
                <meta name="google" content="notranslate" />
                <meta name="google-site-verification" content="UfFYKUqPNXJfJf65qIdWiQ3qXVt2HW5llvBY8Euyn5E" />
                {/* Font preconnect */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* FontAwesome - async (non-render-blocking) */}
                <link
                    rel="stylesheet"
                    href="/assets/css/plugins/fontawesome.css"
                    media="print"
                    onLoad="this.media='all'"
                />
                {/* AOS - async (non-render-blocking) */}
                <link
                    rel="stylesheet"
                    href="/assets/css/plugins/aos.css"
                    media="print"
                    onLoad="this.media='all'"
                />
                {/* Slick & Nice Select - async */}
                <link
                    rel="stylesheet"
                    href="/assets/css/plugins/slick-slider.css"
                    media="print"
                    onLoad="this.media='all'"
                />
                <link
                    rel="stylesheet"
                    href="/assets/css/plugins/nice-select.css"
                    media="print"
                    onLoad="this.media='all'"
                />
            </head>
            <body suppressHydrationWarning>
                {children}
                {/* Fallback: Load async CSS if onLoad doesn't fire */}
                <Script id="load-async-css" strategy="afterInteractive">{`
                    setTimeout(function(){
                        var links = document.querySelectorAll('link[media="print"]');
                        links.forEach(function(l){ l.media = 'all'; });
                    }, 100);
                `}</Script>
            </body>
        </html>
    );
}
