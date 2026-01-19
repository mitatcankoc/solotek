import Layout from "@/components/layout/Layout"

export default function Page() {
    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Gizlilik Politikası | Privacy Policy | Solo Teknoloji"
                metaDescription="Solo Teknoloji gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı, korunduğu ve haklarınız hakkında detaylı bilgi."
                metaKeywords="gizlilik politikası, privacy policy, kişisel veri, veri güvenliği, veri koruma, solo teknoloji"
                breadcrumbTitle="Gizlilik Politikası">
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="legal-content">
                                    <h2>Gizlilik Politikası</h2>
                                    <p><strong>Son Güncelleme:</strong> Ocak 2026</p>

                                    <h3>1. Giriş</h3>
                                    <p>Solo Teknoloji San. Tic. Ltd. Şti. ("Solo Teknoloji", "biz", "bizim") olarak, gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.</p>

                                    <h3>2. Toplanan Bilgiler</h3>
                                    <p>Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:</p>
                                    <ul>
                                        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası</li>
                                        <li><strong>İletişim Bilgileri:</strong> Adres, şirket adı</li>
                                        <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri</li>
                                        <li><strong>Kullanım Bilgileri:</strong> Sayfa görüntülemeleri, tıklama verileri</li>
                                    </ul>

                                    <h3>3. Bilgilerin Kullanımı</h3>
                                    <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
                                    <ul>
                                        <li>Hizmetlerimizi sunmak ve geliştirmek</li>
                                        <li>Müşteri taleplerini yanıtlamak</li>
                                        <li>Teknik destek sağlamak</li>
                                        <li>Pazarlama iletişimleri göndermek (onayınız dahilinde)</li>
                                        <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                                    </ul>

                                    <h3>4. Bilgilerin Paylaşımı</h3>
                                    <p>Kişisel bilgilerinizi üçüncü taraflarla yalnızca aşağıdaki durumlarda paylaşırız:</p>
                                    <ul>
                                        <li>Açık onayınızı aldığımızda</li>
                                        <li>Yasal zorunluluk durumlarında</li>
                                        <li>Hizmet sağlayıcılarımızla (gizlilik sözleşmeleri dahilinde)</li>
                                    </ul>

                                    <h3>5. Veri Güvenliği</h3>
                                    <p>Kişisel verilerinizi korumak için uygun teknik ve organizasyonel önlemler alıyoruz. Bu önlemler şunları içerir:</p>
                                    <ul>
                                        <li>SSL şifreleme</li>
                                        <li>Güvenlik duvarları</li>
                                        <li>Erişim kontrolü</li>
                                        <li>Düzenli güvenlik denetimleri</li>
                                    </ul>

                                    <h3>6. Haklarınız</h3>
                                    <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                                    <ul>
                                        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                        <li>İşlenmişse bilgi talep etme</li>
                                        <li>Verilerin düzeltilmesini isteme</li>
                                        <li>Verilerin silinmesini talep etme</li>
                                        <li>İşlemeye itiraz etme</li>
                                    </ul>

                                    <h3>7. İletişim</h3>
                                    <p>Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:</p>
                                    <p><strong>E-posta:</strong> info@soloteknoloji.com.tr<br />
                                        <strong>Telefon:</strong> +90 536 501 46 00<br />
                                        <strong>Adres:</strong> Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
