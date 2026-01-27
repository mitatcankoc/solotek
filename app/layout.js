import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/public/assets/css/plugins/bootstrap.min.css";
// import "public/assets/css/plugins/owl.carousel.min.css"
import "@/public/assets/css/plugins/aos.css";
import "@/public/assets/css/plugins/fontawesome.css";
import "@/public/assets/css/plugins/slick-slider.css";
import "@/public/assets/css/plugins/nice-select.css";
import "@/public/assets/css/plugins/fonts.css";
import "@/public/assets/css/master.css";
import "@/public/assets/css/h4-master.css";

export const metadata = {
    metadataBase: new URL('https://solo.mcankoc.com.tr'),
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
            </head>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
