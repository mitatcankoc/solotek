import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/public/assets/css/plugins/bootstrap.min.css";
import "@/public/assets/css/plugins/aos.css";
import "@/public/assets/css/plugins/slick-slider.css";
import "@/public/assets/css/plugins/nice-select.css";
import "@/public/assets/css/plugins/fonts.css";
import "@/public/assets/css/master.css";
import "@/public/assets/css/h4-master.css";

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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
                {/* FontAwesome 6 Free CDN - solid + brands */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/solid.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
