
export default function Breadcrumb({ breadcrumbTitle, breadcrumbSubtitle }) {
    // Sayfa başlıklarına göre alt başlık belirleme
    const getSubtitle = () => {
        if (breadcrumbSubtitle) return breadcrumbSubtitle;
        
        const subtitles = {
            'Hakkımızda': 'Deneyimli & Profesyonel Teknoloji Çözümleri',
            'Hizmetlerimiz': 'Güvenilir ve Kaliteli Hizmetler',
            'İLETİŞİM': 'Solo Teknoloji - Barkod, POS ve Yazılım Çözümleri',
            'Blog': 'Haberler ve Makaleler',
            'Ürünler': 'Teknoloji Ürünleri',
        };
        
        return subtitles[breadcrumbTitle] || 'Solo Teknoloji - Barkod, POS ve Yazılım Çözümleri';
    };

    return (
        <>
            <div className="inner-1 bg-13" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="inner-title text-center">
                                <p>{breadcrumbTitle}</p>
                                <h1>{getSubtitle()}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
