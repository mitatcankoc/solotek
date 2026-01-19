import Layout from "@/components/layout/Layout"

export default function Page() {
    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Çerez Politikası | Cookie Policy | Solo Teknoloji"
                metaDescription="Solo Teknoloji çerez politikası. Web sitemizde kullanılan çerez türleri, amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi."
                metaKeywords="çerez politikası, cookie policy, web çerezleri, tarayıcı çerezleri, gizlilik, solo teknoloji"
                breadcrumbTitle="Çerez Politikası">
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="legal-content">
                                    <h2>Çerez Politikası</h2>
                                    <p><strong>Son Güncelleme:</strong> Ocak 2026</p>

                                    <h3>1. Çerez Nedir?</h3>
                                    <p>Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin düzgün çalışmasını sağlamak, deneyiminizi geliştirmek ve site kullanımını analiz etmek için kullanılır.</p>

                                    <h3>2. Kullandığımız Çerez Türleri</h3>

                                    <h4>2.1 Zorunlu Çerezler</h4>
                                    <p>Bu çerezler, web sitesinin temel işlevlerini yerine getirmesi için gereklidir. Bunlar olmadan site düzgün çalışmaz.</p>

                                    <h4>2.2 Performans Çerezleri</h4>
                                    <p>Bu çerezler, ziyaretçilerin siteyi nasıl kullandığı hakkında bilgi toplar. Tüm bilgiler anonimdir ve siteyi geliştirmek için kullanılır.</p>

                                    <h4>2.3 İşlevsellik Çerezleri</h4>
                                    <p>Bu çerezler, sitenin tercihlerinizi hatırlamasını sağlar (dil tercihi, konum gibi).</p>

                                    <h4>2.4 Hedefleme/Reklam Çerezleri</h4>
                                    <p>Bu çerezler, ilgi alanlarınıza uygun reklamlar göstermek için kullanılabilir.</p>

                                    <h3>3. Üçüncü Taraf Çerezleri</h3>
                                    <p>Web sitemizde aşağıdaki üçüncü taraf hizmetleri kullanılabilir:</p>
                                    <ul>
                                        <li><strong>Google Analytics:</strong> Site trafiğini analiz etmek için</li>
                                        <li><strong>Google Maps:</strong> Harita hizmetleri için</li>
                                        <li><strong>Sosyal Medya:</strong> Paylaşım butonları için</li>
                                    </ul>

                                    <h3>4. Çerezleri Yönetme</h3>
                                    <p>Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. Çoğu tarayıcı aşağıdaki seçenekleri sunar:</p>
                                    <ul>
                                        <li>Tüm çerezleri kabul etme</li>
                                        <li>Çerez yerleştirildiğinde bildirim alma</li>
                                        <li>Tüm çerezleri reddetme</li>
                                    </ul>
                                    <p><strong>Not:</strong> Çerezleri devre dışı bırakmak, web sitesinin bazı özelliklerinin düzgün çalışmamasına neden olabilir.</p>

                                    <h3>5. Çerez Onayı</h3>
                                    <p>Web sitemizi kullanarak, bu Çerez Politikası kapsamında çerez kullanımını kabul etmiş olursunuz.</p>

                                    <h3>6. Politika Değişiklikleri</h3>
                                    <p>Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanacaktır.</p>

                                    <h3>7. İletişim</h3>
                                    <p>Çerez politikamızla ilgili sorularınız için:</p>
                                    <p><strong>E-posta:</strong> info@soloteknoloji.com.tr<br />
                                        <strong>Telefon:</strong> +90 536 501 46 00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
