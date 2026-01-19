
import Link from "next/link"

export default function ProductCategories() {
    return (
        <>
            <div className="product-categories section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="heading2 white-heading text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />Ürün Kategorileri</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}><span className="heilight-left">Solo Teknoloji</span> ürün yelpazesi</h2>
                            </div>
                        </div>
                    </div>
                    <div className="space30" />
                    <div className="row">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={600}>
                            <div className="product-category-box">
                                <div className="category-icon">
                                    <i className="fa-solid fa-mobile-screen-button"></i>
                                </div>
                                <h3>El Terminali</h3>
                                <p>Zebra El Terminalleri, Honeywell El Terminalleri, En Yeni Modeller, Güçlü Stok...</p>
                                <Link href="/urunler/el-terminalleri" className="category-link">Tümünü Gör <span>»</span></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                            <div className="product-category-box">
                                <div className="category-icon">
                                    <i className="fa-solid fa-print"></i>
                                </div>
                                <h3>Yazıcı</h3>
                                <p>Barkod Yazıcı, Etiket Yazıcı, Kart Yazıcı, RFID Yazıcı, Mobil Yazıcı, Termal Transfer...</p>
                                <Link href="/urunler/barkod-yazicilar" className="category-link">Tümünü Gör <span>»</span></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="product-category-box">
                                <div className="category-icon">
                                    <i className="fa-solid fa-qrcode"></i>
                                </div>
                                <h3>Barkod Okuyucu</h3>
                                <p>El Tipi Barkod Okuyucular, Ultra Sağlam, Market Tipi Barkod Okuyucular...</p>
                                <Link href="/urunler/barkod-okuyucular" className="category-link">Tümünü Gör <span>»</span></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
                            <div className="product-category-box">
                                <div className="category-icon">
                                    <i className="fa-solid fa-desktop"></i>
                                </div>
                                <h3>Endüstriyel Panel PC</h3>
                                <p>Sağlam yapılı endüstriyel bilgisayarlar, dokunmatik panel PC, üretim hattı çözümleri...</p>
                                <Link href="/urunler/endustriyel-panel-pc" className="category-link">Tümünü Gör <span>»</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
