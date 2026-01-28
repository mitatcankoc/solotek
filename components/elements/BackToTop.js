
export default function BackToTop({ scroll, settings }) {
    const whatsappNumber = settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '905438624751';
    const whatsappMessage = settings?.whatsapp_message ? encodeURIComponent(settings.whatsapp_message) : '';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="whatsapp-float"
                style={{
                    position: 'fixed',
                    right: '30px',
                    bottom: scroll ? '90px' : '30px',
                    zIndex: 998,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#25D366',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                }}>
                <i className="fa-brands fa-whatsapp"></i>
            </a>

            {scroll && (
                <a className="progress-wrap active-progress" href="#top" style={{ zIndex: 999 }}>
                    <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                    </svg>
                </a>
            )}

            <style jsx>{`
                .whatsapp-float:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 15px rgba(37, 211, 102, 0.4);
                }
            `}</style>
        </>
    )
}