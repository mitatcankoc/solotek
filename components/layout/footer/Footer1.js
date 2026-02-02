
import Link from "next/link";
export default function Footer1() {
    return (
        <>
            <footer className="footer-area padding-top footer-2 bg9">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer mr50">
                                <Link href="/" className="footer-logo">
                                    <img src="/assets/img/site_logo-Photoroom.png" alt="Solo Teknoloji" style={{ maxHeight: '60px' }} />
                                </Link>
                                <div className="space20" />
                                <p>Solo Teknoloji, barkodlu sistem satış ve kurulumu, terazi ve yazılım çözümleri ile sektörün öncü kuruluşları arasında yer almaktadır. Güvenilir ve kaliteli hizmetler sunmaktayız.</p>
                            </div>
                        </div>
                        <div className="col-lg col-md-6">
                            <div className="single-footer">
                                <h3>Ürünlerimiz</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link href="/urunler/el-terminalleri">El Terminalleri</Link>
                                        </li>
                                        <li>
                                            <Link href="/urunler/barkod-yazicilar">Barkod Yazıcılar</Link>
                                        </li>
                                        <li>
                                            <Link href="/urunler/barkod-okuyucular">Barkod Okuyucular</Link>
                                        </li>
                                        <li>
                                            <Link href="/urunler/endustriyel-panel-pc">Endüstriyel Panel PC</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg col-md-6">
                            <div className="single-footer">
                                <h3>Kurumsal</h3>
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link href="/hizmetlerimiz">Hizmetlerimiz</Link>
                                        </li>
                                        <li>
                                            <Link href="/hakkimizda">Hakkımızda</Link>
                                        </li>
                                        <li>
                                            <Link href="/referanslar">Referanslarımız</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog">Blog</Link>
                                        </li>
                                        <li>
                                            <Link href="/iletisim">İletişim</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-footer">
                                <h3>İletişim</h3>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <Link href="tel:+905365014600">+90 536 501 46 00</Link>
                                        <Link href="tel:+905432599784">+90 543 259 97 84</Link>
                                        <Link href="tel:+905438624751">+90 543 862 47 51</Link>
                                    </div>
                                </div>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <Link href="mailto:info@soloteknoloji.com.tr">info@soloteknoloji.com.tr</Link>
                                    </div>
                                </div>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <span>Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul</span>
                                    </div>
                                </div>
                                <div className="footer-contact">
                                    <div className="single-contact">
                                        <div className="contact-icon">
                                            <i className="fa-solid fa-clock"></i>
                                        </div>
                                        <span>Pzt-Cuma: 08:00-18:30 | Cmt: 09:00-16:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center copyright2">
                        <div className="col-lg-12 text-center">
                            <p>© 2026 Solo Teknoloji San. Tic. Ltd. Şti. Tüm Hakları Saklıdır. | By Design <a href="https://mcankoc.com.tr/" target="_blank" rel="noopener noreferrer" style={{ color: '#21bb9f' }}>Can Koç</a></p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Legal Links Section */}
            <div className="footer-legal-links">
                <div className="container">
                    <ul>
                        <li><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
                        <li><Link href="/cerez-politikasi">Çerez Politikası</Link></li>
                        <li><Link href="/kvkk">KVKK Aydınlatma Metni</Link></li>
                        <li><Link href="/bilgi-guvenligi">Bilgi Güvenliği Politikası</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
