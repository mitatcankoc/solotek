import Layout from "@/components/layout/Layout"

export default function Page() {
    return (
        <>
            <Layout
                headerStyle={1}
                footerStyle={1}
                headTitle="Bilgi Güvenliği Politikası | ISO 27001 Uyumlu | Solo Teknoloji"
                metaDescription="Solo Teknoloji bilgi güvenliği politikası. ISO 27001 standartlarına uyumlu güvenlik önlemleri, veri şifreleme ve olay yönetimi prosedürleri."
                metaKeywords="bilgi güvenliği, iso 27001, veri güvenliği, siber güvenlik, güvenlik politikası, solo teknoloji"
                breadcrumbTitle="Bilgi Güvenliği Politikası">
                <div className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="legal-content">
                                    <h2>Bilgi Güvenliği Politikası</h2>
                                    <p><strong>Son Güncelleme:</strong> Ocak 2026</p>

                                    <h3>1. Amaç</h3>
                                    <p>Solo Teknoloji San. Tic. Ltd. Şti. olarak, müşterilerimizin ve iş ortaklarımızın bilgilerinin güvenliğini en üst düzeyde tutmayı taahhüt ediyoruz. Bu politika, bilgi güvenliği yönetim sistemimizin temel ilkelerini belirler.</p>

                                    <h3>2. Kapsam</h3>
                                    <p>Bu politika, Solo Teknoloji tarafından işlenen tüm bilgi varlıklarını, sistemlerini ve süreçlerini kapsar. Tüm çalışanlar, yükleniciler ve iş ortakları bu politikaya uymakla yükümlüdür.</p>

                                    <h3>3. Temel İlkeler</h3>

                                    <h4>3.1 Gizlilik</h4>
                                    <p>Bilgilere yalnızca yetkili kişilerin erişmesini sağlarız. Hassas bilgiler şifrelenir ve güvenli ortamlarda saklanır.</p>

                                    <h4>3.2 Bütünlük</h4>
                                    <p>Bilgilerin doğruluğunu ve tamlığını koruruz. Verilerin yetkisiz değiştirilmesini önleyen kontroller uygularız.</p>

                                    <h4>3.3 Erişilebilirlik</h4>
                                    <p>Yetkili kullanıcıların ihtiyaç duydukları bilgilere zamanında erişebilmelerini sağlarız.</p>

                                    <h3>4. Güvenlik Önlemleri</h3>
                                    <ul>
                                        <li><strong>Fiziksel Güvenlik:</strong> Sunucu odaları ve veri merkezleri fiziksel erişim kontrolü ile korunur</li>
                                        <li><strong>Ağ Güvenliği:</strong> Güvenlik duvarları, saldırı tespit sistemleri ve VPN kullanılır</li>
                                        <li><strong>Uygulama Güvenliği:</strong> Yazılımlar düzenli olarak güncellenir ve güvenlik testlerinden geçirilir</li>
                                        <li><strong>Veri Şifreleme:</strong> Hassas veriler hem aktarım hem de depolama sırasında şifrelenir</li>
                                        <li><strong>Yedekleme:</strong> Düzenli yedekleme ve felaket kurtarma planları uygulanır</li>
                                    </ul>

                                    <h3>5. Olay Yönetimi</h3>
                                    <p>Güvenlik olayları derhal raporlanır ve değerlendirilir. Olay müdahale prosedürlerimiz:</p>
                                    <ul>
                                        <li>Olayın tespiti ve raporlanması</li>
                                        <li>Olayın değerlendirilmesi ve sınıflandırılması</li>
                                        <li>Müdahale ve düzeltici eylemler</li>
                                        <li>Kök neden analizi</li>
                                        <li>Önleyici tedbirler</li>
                                    </ul>

                                    <h3>6. Eğitim ve Farkındalık</h3>
                                    <p>Tüm çalışanlarımız düzenli bilgi güvenliği eğitimi alır. Güvenlik farkındalığı programlarımız sürekli güncellenir.</p>

                                    <h3>7. Uyumluluk</h3>
                                    <p>Bilgi güvenliği uygulamalarımız aşağıdaki standart ve düzenlemelerle uyumludur:</p>
                                    <ul>
                                        <li>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</li>
                                        <li>ISO 27001 Bilgi Güvenliği Yönetim Sistemi standartları</li>
                                    </ul>

                                    <h3>8. İletişim</h3>
                                    <p>Bilgi güvenliği ile ilgili sorularınız veya güvenlik olayı bildirimleri için:</p>
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
