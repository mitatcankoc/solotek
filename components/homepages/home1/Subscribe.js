
import Link from "next/link"

export default function Subscribe() {
    return (
        <>
            <div className="subscribe-4 bg12 padding-90 inner-font-1 inner-subscribe" style={{ background: '#1A1A1A' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="heading4 white-heading inner-heading no-margin-heading">
                                <h2>Hizmetlerimiz Hakkında Bilgi Alın</h2>
                                <p>İşletmenize özel çözümler için bizimle iletişime geçin. Size en uygun sistemi birlikte belirleyelim.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <Link href="/iletisim" className="theme-btn-2" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '20px', whiteSpace: 'nowrap', gap: '10px' }}>
                                İletişime Geç <span><i className="fa-solid fa-arrow-right" /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
