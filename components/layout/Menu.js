"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Menu() {
    const routerPath = usePathname();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [kategoriler, setKategoriler] = useState([]);

    useEffect(() => {
        if (routerPath == "/index-rtl-1") {
            document.documentElement.lang = "ar";
            document.documentElement.dir = "rtl";
            document.body.classList.add("rtl-version");
        } else {
            document.documentElement.lang = "tr";
            document.documentElement.dir = "";
            document.body.classList.remove("rtl-version");
        }
    });

    // Kategorileri API'den çek
    useEffect(() => {
        const fetchKategoriler = async () => {
            try {
                const res = await fetch('/api/kategoriler');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setKategoriler(data);
                }
            } catch (error) {
                console.error('Kategoriler yüklenemedi:', error);
            }
        };
        fetchKategoriler();
    }, []);

    const handleMouseEnter = (menu) => {
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
        <>
            <ul className="menu_list scroll">
                <li>
                    <Link href="/" className={routerPath === "/" ? "active" : ""}>Ana Sayfa</Link>
                </li>
                <li>
                    <Link href="/hizmetlerimiz" className={routerPath === "/hizmetlerimiz" ? "active" : ""}>Hizmetlerimiz</Link>
                </li>
                <li
                    className={`has-dropdown ${openDropdown === 'urunler' ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter('urunler')}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }}
                >
                    <Link href="/urunler" className={routerPath.startsWith("/urunler") ? "active" : ""}>
                        Ürünlerimiz <i className="fa-solid fa-angle-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    </Link>
                    <ul className="sub-menu" style={{
                        display: openDropdown === 'urunler' ? 'block' : 'none',
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        background: '#fff',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        padding: '10px 0',
                        zIndex: '999',
                        minWidth: '200px'
                    }}>
                        {kategoriler.map((kategori) => (
                            <li key={kategori.id}>
                                <Link href={`/urunler/${kategori.slug}`} style={{
                                    display: 'block',
                                    padding: '10px 25px',
                                    color: '#333',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s'
                                }}>
                                    {kategori.ad}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li
                    className={`has-dropdown ${openDropdown === 'hakkimizda' ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter('hakkimizda')}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }}
                >
                    <Link href="/hakkimizda" className={routerPath === "/hakkimizda" || routerPath === "/referanslar" ? "active" : ""}>
                        Hakkımızda <i className="fa-solid fa-angle-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    </Link>
                    <ul className="sub-menu" style={{
                        display: openDropdown === 'hakkimizda' ? 'block' : 'none',
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        background: '#fff',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        padding: '10px 0',
                        zIndex: '999'
                    }}>
                        <li>
                            <Link href="/referanslar" style={{
                                display: 'block',
                                padding: '10px 25px',
                                color: '#333',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s'
                            }}>
                                Referanslarımız
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href="/suruculer" className={routerPath === "/suruculer" ? "active" : ""}>Sürücüler</Link>
                </li>
                <li>
                    <Link href="/blog" className={routerPath === "/blog" ? "active" : ""}>Blog</Link>
                </li>
                <li
                    className={`has-dropdown ${openDropdown === 'iletisim' ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter('iletisim')}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }}
                >
                    <Link href="/iletisim" className={routerPath === "/iletisim" || routerPath === "/demo-talep" ? "active" : ""}>
                        İletişim <i className="fa-solid fa-angle-down" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                    </Link>
                    <ul className="sub-menu" style={{
                        display: openDropdown === 'iletisim' ? 'block' : 'none',
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        background: '#fff',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        padding: '10px 0',
                        zIndex: '999'
                    }}>
                        <li>
                            <Link href="/demo-talep" style={{
                                display: 'block',
                                padding: '10px 20px',
                                color: '#333',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap'
                            }}>
                                Demo Talep Et
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    );
}
