'use client'
import Link from "next/link"
import { useState } from "react"

export default function Pricing() {
    const [isToggled, setToggled] = useState(false)
    const handleToggle = () => setToggled(!isToggled)
    return (
        <>
            <div className="pricing-area pricing2 section-padding2 bg5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="heading2 text-center">
                                <small data-aos="fade-up" data-aos-duration={600} className="heading-top"><img src="/assets/img/icons/hands.svg" alt="" />Fiyatlandırma</small>
                                <h2 data-aos="fade-up" data-aos-duration={800}><span className="heilight-left">En</span> uygun maliyetli teknoloji çözümlerini sunuyoruz.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="plan-toggle-wrap" data-aos="fade-up" data-aos-duration={1000}>
                                <div className="toggle-inner">
                                    <input id="ce-toggle" onClick={handleToggle} type="checkbox" />
                                    <span className="custom-toggle" />
                                    <div className="t-month">
                                        <h4>Aylık</h4>
                                    </div>
                                    <div className="t-year">
                                        <h4>Yıllık <span>(%20 Tasarruf)</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space50" />
                    <div className="tab-content">
                        {isToggled ?
                            <>
                                <div id="yearly">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="single-price active">
                                                <div className="price-heading">
                                                    <p>Başlangıç</p>
                                                    <h5>Küçük işletmeler için temel teknoloji çözümleri.</h5>
                                                    <h3>₺2.900/ay</h3>
                                                    <h6>Yıllık Faturalandırma</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="/contact-1" className="price-btn active">Ücretsiz Danışmanlık</Link>
                                                    <h4>Başlangıç Paketinde Neler Var</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Barkod Sistemi Kurulumu</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Temel Yazılım Desteği</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Teknik Servis (Haftalık)</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>E-posta Desteği</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Temel Raporlama</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Profesyonel</p>
                                                    <h5>Orta ölçekli işletmeler için gelişmiş çözümler.</h5>
                                                    <h3>₺5.900/ay</h3>
                                                    <h6>Yıllık Faturalandırma</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="/contact-1" className="price-btn">Ücretsiz Danışmanlık</Link>
                                                    <h4>Başlangıç + Ek Özellikler</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Terazi Entegrasyonu</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel Yazılım Geliştirme</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Öncelikli Teknik Destek</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Stok Yönetimi</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Gelişmiş Raporlama</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="single-price">
                                                <div className="price-heading">
                                                    <p>Kurumsal</p>
                                                    <h5>Büyük işletmeler için tam kapsamlı çözümler.</h5>
                                                    <h3>₺9.900/ay</h3>
                                                    <h6>Yıllık Faturalandırma</h6>
                                                </div>
                                                <div className="price-body">
                                                    <Link href="/contact-1" className="price-btn">Ücretsiz Danışmanlık</Link>
                                                    <h4>Profesyonel + Ek Özellikler</h4>
                                                    <ul>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Tam Entegrasyon</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel Danışmanlık</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Yerinde Teknik Destek</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Lojistik Yönetimi</li>
                                                        <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel API Entegrasyonu</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <> <div id="monthly">
                                <div className="row">
                                    <div className="col-lg-4" data-aos="fade-up" data-aos-duration={800}>
                                        <div className="single-price">
                                            <div className="price-heading">
                                                <p>Başlangıç</p>
                                                <h5>Küçük işletmeler için temel teknoloji çözümleri.</h5>
                                                <h3>₺3.500/ay</h3>
                                                <h6>Aylık Faturalandırma</h6>
                                            </div>
                                            <div className="price-body">
                                                <Link href="/contact-1" className="price-btn">Ücretsiz Danışmanlık</Link>
                                                <h4>Başlangıç Paketinde Neler Var</h4>
                                                <ul>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Barkod Sistemi Kurulumu</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Temel Yazılım Desteği</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Teknik Servis (Haftalık)</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>E-posta Desteği</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Temel Raporlama</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4" data-aos="fade-up" data-aos-duration={1000}>
                                        <div className="single-price active">
                                            <div className="price-heading">
                                                <p>Profesyonel</p>
                                                <h5>Orta ölçekli işletmeler için gelişmiş çözümler.</h5>
                                                <h3>₺6.900/ay</h3>
                                                <h6>Aylık Faturalandırma</h6>
                                            </div>
                                            <div className="price-body">
                                                <Link href="/contact-1" className="price-btn active">Ücretsiz Danışmanlık</Link>
                                                <h4>Başlangıç + Ek Özellikler</h4>
                                                <ul>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Terazi Entegrasyonu</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel Yazılım Geliştirme</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Öncelikli Teknik Destek</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Stok Yönetimi</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Gelişmiş Raporlama</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4" data-aos="fade-up" data-aos-duration={1200}>
                                        <div className="single-price">
                                            <div className="price-heading">
                                                <p>Kurumsal</p>
                                                <h5>Büyük işletmeler için tam kapsamlı çözümler.</h5>
                                                <h3>₺11.900/ay</h3>
                                                <h6>Aylık Faturalandırma</h6>
                                            </div>
                                            <div className="price-body">
                                                <Link href="/contact-1" className="price-btn">Ücretsiz Danışmanlık</Link>
                                                <h4>Profesyonel + Ek Özellikler</h4>
                                                <ul>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Tam Entegrasyon</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel Danışmanlık</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Yerinde Teknik Destek</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Lojistik Yönetimi</li>
                                                    <li><span className="pricing-icon"><img src="/assets/img/icons/double-check2.png" alt="" /></span>Özel API Entegrasyonu</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}
