
import CounterUp from "@/components/elements/CounterUp"
import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Page() {

    return (
        <>

            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Hakkımızda | Solo Teknoloji - Kurumsal Bilgiler"
                metaDescription="Solo Teknoloji hakkında. 2020'den beri barkod sistemleri, POS cihazları ve teknik servis alanında güvenilir çözümler sunan Türkiye'nin lider teknoloji şirketi."
                metaKeywords="solo teknoloji hakkında, kurumsal, şirket profili, vizyon misyon, barkod sistemleri şirketi, pos çözümleri"
                breadcrumbTitle="Hakkımızda">
                <div>
                    {/* Hakkımızda Ana Bölüm */}
                    <div className="about-inner bg-28 section-padding">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="mr50">
                                        <div className="heading2 no-margin-heading">
                                            <small className="heading-top inner-heading-top">
                                                <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Deneyimli & Profesyonel
                                            </small>
                                            <h2>Solo Teknoloji San. Tic. Ltd. Şti.</h2>
                                            <p>
                                                2020 yılından bu yana barkod sistemleri, el terminalleri ve kurumsal otomasyon çözümleri alanında hizmet veren Solo Teknoloji, sektörün önde gelen teknoloji entegratörlerinden biridir. Zebra, Honeywell ve Datalogic gibi dünya liderlerinin yetkili iş ortağı olarak, işletmelere uçtan uca çözümler sunuyoruz.
                                            </p>
                                            <p>
                                                El terminalleri, barkod okuyucular, etiket yazıcıları ve özelleştirilmiş yazılım çözümleriyle donatılmış kapsamlı ürün portföyümüz sayesinde, perakende, lojistik, üretim ve sağlık sektörlerinde yüzlerce işletmenin dijital dönüşümüne katkı sağladık.
                                            </p>
                                            <p>
                                                Deneyimli teknik kadromuz ve profesyonel destek hizmetlerimizle, müşterilerimizin operasyonel verimliliğini artırmayı ve iş süreçlerini optimize etmeyi hedefliyoruz.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-bg-main-img position-relative ml50">
                                        <img src="/assets/img/hakkimizda.webp" alt="Solo Teknoloji" style={{ borderRadius: '16px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Misyon Bölümü */}
                    <div className="about-inner padding-bottom bg-29">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="about-bg-main-img position-relative mr50">
                                        <img src="/assets/img/misyonumuz.webp" alt="Misyonumuz" style={{ borderRadius: '16px' }} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="ml50">
                                        <div className="heading2 no-margin-heading">
                                            <small className="heading-top inner-heading-top" style={{ marginTop: '30px', display: 'inline-block' }}>
                                                <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Misyonumuz
                                            </small>
                                            <h2>Müşteri Odaklı Çözümler</h2>
                                            <p>
                                                Solo Teknoloji, müşterilerinin ihtiyaçlarını en iyi şekilde analiz ederek yenilikçi, güvenilir ve sürdürülebilir yazılım çözümleri sunmayı amaçlar.
                                            </p>
                                            <p>
                                                Barkodlu sistemler, terazi entegrasyonları ve teknik servis desteğiyle iş süreçlerini daha verimli, hızlı ve hatasız hale getirmek için çalışır.
                                            </p>
                                            <p>
                                                Müşteri memnuniyetini ve teknolojiyle sağlanan değer artışını ön planda tutar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vizyon Bölümü */}
                    <div className="about-inner section-padding bg-28">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="mr50">
                                        <div className="heading2 no-margin-heading">
                                            <small className="heading-top inner-heading-top">
                                                <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Vizyonumuz
                                            </small>
                                            <h2>Sektörde Lider Olmak</h2>
                                            <p>
                                                Barkodlu sistemler, terazi çözümleri ve yazılım alanında lider bir teknoloji firması olmayı hedefleyen Solo Teknoloji, müşterilerine global standartlarda hizmet sunarak sektörde yenilikçi çözümlerle fark yaratmayı amaçlar.
                                            </p>
                                            <p>
                                                Sürekli gelişen teknolojiyi takip ederek ulusal ve uluslararası pazarda tanınan, güvenilir ve tercih edilen bir marka olmayı hedefler.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-bg-main-img position-relative ml50">
                                        <img src="/assets/img/about/about21.png" alt="Vizyonumuz" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sayılarla Biz */}
                    <div className="counter-4 inner-counter-4 inner-font-1 section-padding" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 white-heading text-center">
                                        <small className="heading-top inner-heading-top">
                                            <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Sayılarla Biz
                                        </small>
                                        <h2>Neden Solo Teknoloji?</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row counters-3">
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={20} />+</h3>
                                        <p>Yıllık Deneyim</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={500} />+</h3>
                                        <p>Mutlu Müşteri</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={1000} />+</h3>
                                        <p>Tamamlanan Proje</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-6">
                                    <div className="single-couter-3">
                                        <h3><CounterUp count={98} />%</h3>
                                        <p>Müşteri Memnuniyeti</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hizmetlerimiz */}
                    <div className="service-inner-1 section-padding2 inner-font-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center">
                                        <small className="heading-top inner-heading-top">
                                            <img src="/assets/img/icons/hands.svg" alt="Bölüm ikonu" />Hizmetlerimiz
                                        </small>
                                        <h2>Sunduğumuz Çözümler</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-cash-register"></i>
                                        </div>
                                        <h3>POS Sistemleri</h3>
                                        <p>
                                            Restoran ve Cafeler için tasarlanan yeni nesil POS sistemleri. Otomasyon sistemleri ile uyumlu yazar kasa çözümleri.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-barcode"></i>
                                        </div>
                                        <h3>Barkod Sistemleri</h3>
                                        <p>
                                            Barkod okuyucu, el terminali ve yazıcı satışı ile profesyonel kurulum hizmetleri. Zebra, Honeywell, Datalogic ürünleri.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-scale-balanced"></i>
                                        </div>
                                        <h3>Terazi Sistemleri</h3>
                                        <p>
                                            Market, mağaza ve üretim tesisleri için terazi sistemleri ve entegre yazılım çözümleri.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-code"></i>
                                        </div>
                                        <h3>Yazılım Çözümleri</h3>
                                        <p>
                                            Restoran yazılımı, stok yönetimi ve raporlama sistemleri ile işletmenizi dijitalleştirin.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-screwdriver-wrench"></i>
                                        </div>
                                        <h3>Teknik Servis</h3>
                                        <p>
                                            Barkod, elektronik ve yazılım alanında 10-15 yıl deneyimli uzman kadro ile teknik servis desteği.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="single-service text-center">
                                        <div className="service-icon">
                                            <i className="fa-solid fa-headset"></i>
                                        </div>
                                        <h3>Danışmanlık</h3>
                                        <p>
                                            Teknolojik ihtiyaçlarınız için analiz, planlama ve uygulama süreçlerinde profesyonel danışmanlık.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* İletişim CTA */}
                    <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="heading4 white-heading inner-heading no-margin-heading">
                                        <h2>Bizimle İletişime Geçin</h2>
                                        <p>
                                            Teknolojik ihtiyaçlarınız için size en uygun çözümleri sunmak için buradayız.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/iletisim" className="theme-btn-1" style={{ background: '#21BB9F', padding: '15px 30px', display: 'inline-block', marginTop: '20px' }}>
                                        İletişime Geç
                                        <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
