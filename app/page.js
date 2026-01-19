import Layout from "@/components/layout/Layout"

import About from "@/components/homepages/home1/About"
import About2 from "@/components/homepages/home1/About2"
import Blog from "@/components/homepages/home1/Blog"
import ProductCategories from "@/components/homepages/home1/ProductCategories"
import Subscribe from "@/components/homepages/home1/Subscribe"
import TaxBusiness from "@/components/homepages/home1/TaxBusiness"
import Welcome from "@/components/homepages/home1/Welcome"
export default function Page() {

    return (
        <>

            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Solo Teknoloji | POS Sistemleri, Barkod Çözümleri ve Teknik Servis"
                metaDescription="Solo Teknoloji - Türkiye'nin lider barkod sistemleri, POS cihazları, el terminalleri ve teknik servis hizmetleri sağlayıcısı. Zebra, Honeywell, Datalogic yetkili distribütörü. 7/24 destek."
                metaKeywords="solo teknoloji, barkod sistemleri, pos cihazları, el terminali, barkod yazıcı, teknik servis, zebra, honeywell, datalogic, otomasyon sistemleri"
            >
                <Welcome />
                <TaxBusiness />
                <ProductCategories />
                <About />
                <About2 />
                {/* <CaseStudy /> */}
                {/* <Pricing /> */}
                {/* <Testimonial /> */}
                <Blog />
                <Subscribe />
            </Layout>
        </>
    )
}
