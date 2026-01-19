
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'editor', 'moderator') DEFAULT 'admin',
    avatar VARCHAR(500) DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    last_login DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_users (email, password, name, role) VALUES 
('admin@soloteknoloji.com.tr', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'admin')
ON DUPLICATE KEY UPDATE name = VALUES(name);

CREATE TABLE IF NOT EXISTS kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    aciklama TEXT DEFAULT NULL,
    icon VARCHAR(100) DEFAULT NULL,
    resim VARCHAR(500) DEFAULT NULL,
    ust_kategori_id INT DEFAULT NULL,
    sira INT DEFAULT 0,
    aktif TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ust_kategori_id) REFERENCES kategoriler(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO kategoriler (ad, slug, aciklama, icon, sira) VALUES 
('El Terminalleri', 'el-terminalleri', 'Zebra, Honeywell, Datalogic marka el terminalleri', 'fa-mobile-screen-button', 1),
('Barkod Yazıcılar', 'barkod-yazicilar', 'Masaüstü, endüstriyel ve mobil barkod yazıcılar', 'fa-print', 2),
('Barkod Okuyucular', 'barkod-okuyucular', 'El tipi ve sabit barkod okuyucular', 'fa-qrcode', 3),
('Mobil Yazıcılar', 'mobil-yazicilar', 'Taşınabilir etiket ve fiş yazıcılar', 'fa-print', 4),
('Endüstriyel Panel PC', 'endustriyel-panel-pc', 'Sağlam yapılı endüstriyel bilgisayarlar', 'fa-desktop', 5)
ON DUPLICATE KEY UPDATE ad = VALUES(ad);

CREATE TABLE IF NOT EXISTS markalar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo VARCHAR(500) DEFAULT NULL,
    aciklama TEXT DEFAULT NULL,
    website VARCHAR(500) DEFAULT NULL,
    sira INT DEFAULT 0,
    aktif TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO markalar (ad, slug, logo, website, sira) VALUES 
('Zebra', 'zebra', '/assets/img/re/zebra-logo-horizontal.svg', 'https://www.zebra.com', 1),
('Honeywell', 'honeywell', '/assets/img/re/HON logo_200x37 2.png', 'https://www.honeywell.com', 2),
('Datalogic', 'datalogic', '/assets/img/re/logo.png', 'https://www.datalogic.com', 3),
('TSC', 'tsc', NULL, 'https://www.tscprinters.com', 4),
('Newland', 'newland', NULL, 'https://www.newland-id.com', 5),
('Urovo', 'urovo', NULL, 'https://www.urovo.com', 6)
ON DUPLICATE KEY UPDATE ad = VALUES(ad);

CREATE TABLE IF NOT EXISTS urunler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    kisa_aciklama TEXT DEFAULT NULL,
    aciklama LONGTEXT DEFAULT NULL,
    kategori_id INT NOT NULL,
    marka_id INT DEFAULT NULL,
    model VARCHAR(255) DEFAULT NULL,
    fiyat DECIMAL(10,2) DEFAULT NULL,
    indirimli_fiyat DECIMAL(10,2) DEFAULT NULL,
    stok INT DEFAULT 0,
    resim VARCHAR(500) DEFAULT NULL,
    galeri JSON DEFAULT NULL,
    ozellikler JSON DEFAULT NULL,
    dokumanlar JSON DEFAULT NULL,
    aksesuarlar JSON DEFAULT NULL,
    video_url VARCHAR(500) DEFAULT NULL,
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    meta_keywords VARCHAR(500) DEFAULT NULL,
    one_cikan TINYINT(1) DEFAULT 0,
    yeni TINYINT(1) DEFAULT 0,
    aktif TINYINT(1) DEFAULT 1,
    goruntulenme INT DEFAULT 0,
    sira INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE CASCADE,
    FOREIGN KEY (marka_id) REFERENCES markalar(id) ON DELETE SET NULL,
    INDEX idx_kategori (kategori_id),
    INDEX idx_marka (marka_id),
    INDEX idx_slug (slug),
    INDEX idx_aktif (aktif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT DEFAULT NULL,
    content LONGTEXT NOT NULL,
    image VARCHAR(500) DEFAULT NULL,
    author VARCHAR(100) DEFAULT 'Admin',
    category VARCHAR(100) DEFAULT NULL,
    tags JSON DEFAULT NULL,
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_description TEXT DEFAULT NULL,
    views INT DEFAULT 0,
    is_featured TINYINT(1) DEFAULT 0,
    is_published TINYINT(1) DEFAULT 1,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS referanslar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firma_adi VARCHAR(255) NOT NULL,
    slug VARCHAR(255) DEFAULT NULL,
    logo VARCHAR(500) DEFAULT NULL,
    logo_url VARCHAR(500) DEFAULT NULL,
    aciklama TEXT DEFAULT NULL,
    sektor VARCHAR(100) DEFAULT NULL,
    website VARCHAR(500) DEFAULT NULL,
    one_cikan TINYINT(1) DEFAULT 0,
    aktif TINYINT(1) DEFAULT 1,
    sira INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO referanslar (firma_adi, logo_url, sektor, one_cikan, sira) VALUES 
('Zebra Technologies', '/assets/img/re/zebra-logo-horizontal.svg', 'Teknoloji', 1, 1),
('Honeywell', '/assets/img/re/HON logo_200x37 2.png', 'Teknoloji', 1, 2),
('Datalogic', '/assets/img/re/logo.png', 'Teknoloji', 1, 3)
ON DUPLICATE KEY UPDATE firma_adi = VALUES(firma_adi);

CREATE TABLE IF NOT EXISTS suruculer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    baslik VARCHAR(255) NOT NULL,
    slug VARCHAR(255) DEFAULT NULL,
    aciklama TEXT DEFAULT NULL,
    kategori VARCHAR(100) DEFAULT NULL,
    marka VARCHAR(100) DEFAULT NULL,
    model VARCHAR(255) DEFAULT NULL,
    versiyon VARCHAR(50) DEFAULT NULL,
    isletim_sistemi VARCHAR(100) DEFAULT NULL,
    dosya_url VARCHAR(500) NOT NULL,
    dosya_boyutu VARCHAR(50) DEFAULT NULL,
    dosya_tipi VARCHAR(50) DEFAULT NULL,
    indirme_sayisi INT DEFAULT 0,
    aktif TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS demo_talep (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_soyad VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(50) NOT NULL,
    firma VARCHAR(255) DEFAULT NULL,
    sektor VARCHAR(100) DEFAULT NULL,
    urun_ilgi VARCHAR(255) DEFAULT NULL,
    mesaj TEXT DEFAULT NULL,
    durum ENUM('beklemede', 'arandı', 'tamamlandı', 'iptal') DEFAULT 'beklemede',
    notlar TEXT DEFAULT NULL,
    ip_adresi VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_durum (durum),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS iletisim (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_soyad VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(50) DEFAULT NULL,
    konu VARCHAR(255) DEFAULT NULL,
    mesaj TEXT NOT NULL,
    okundu TINYINT(1) DEFAULT 0,
    durum ENUM('yeni', 'okundu', 'cevaplandi', 'arsivlendi') DEFAULT 'yeni',
    ip_adresi VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_durum (durum),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_ayarlari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anahtar VARCHAR(100) NOT NULL UNIQUE,
    deger TEXT DEFAULT NULL,
    tur ENUM('text', 'textarea', 'number', 'boolean', 'json', 'image') DEFAULT 'text',
    aciklama VARCHAR(255) DEFAULT NULL,
    grup VARCHAR(100) DEFAULT 'genel',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_ayarlari (anahtar, deger, tur, aciklama, grup) VALUES 
('site_adi', 'Solo Teknoloji', 'text', 'Site başlığı', 'genel'),
('site_slogan', 'Barkod ve Otomasyon Çözümleri', 'text', 'Site sloganı', 'genel'),
('telefon_1', '+90 536 501 46 00', 'text', 'Ana telefon numarası', 'iletisim'),
('telefon_2', '+90 543 862 47 51', 'text', 'İkinci telefon/WhatsApp', 'iletisim'),
('email', 'info@soloteknoloji.com.tr', 'text', 'E-posta adresi', 'iletisim'),
('adres', 'Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul', 'textarea', 'Şirket adresi', 'iletisim'),
('google_maps_link', 'https://maps.app.goo.gl/BS52pJaDdynDVWiP8', 'text', 'Google Maps linki', 'iletisim'),
('calisma_saatleri', 'Pzt-Cuma: 08:00-18:30 | Cmt: 09:00-16:00', 'text', 'Çalışma saatleri', 'iletisim'),
('facebook', '', 'text', 'Facebook URL', 'sosyal'),
('instagram', '', 'text', 'Instagram URL', 'sosyal'),
('linkedin', '', 'text', 'LinkedIn URL', 'sosyal'),
('whatsapp', '+905438624751', 'text', 'WhatsApp numarası', 'sosyal')
ON DUPLICATE KEY UPDATE deger = VALUES(deger);

CREATE TABLE IF NOT EXISTS urun_galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    urun_id INT NOT NULL,
    resim_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255) DEFAULT NULL,
    sira INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (urun_id) REFERENCES urunler(id) ON DELETE CASCADE,
    INDEX idx_urun (urun_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    expires DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_token (session_token),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO urunler (ad, slug, kisa_aciklama, aciklama, kategori_id, marka_id, model, resim, aktif, one_cikan) VALUES 
('Zebra TC21', 'zebra-tc21', 'Kompakt ve dayanıklı el terminali', '<p>Zebra TC21, perakende ve hafif endüstriyel uygulamalar için tasarlanmış kompakt bir el terminalidir.</p>', 1, 1, 'TC21', '/assets/img/products/tc21.png', 1, 1),
('Honeywell CT60', 'honeywell-ct60', 'Yüksek performanslı mobil bilgisayar', '<p>Honeywell CT60, zorlu depo ve lojistik operasyonları için ideal bir el terminalidir.</p>', 1, 2, 'CT60', '/assets/img/products/ct60.png', 1, 1),
('Zebra ZD421', 'zebra-zd421', 'Masaüstü termal yazıcı', '<p>Zebra ZD421, kompakt tasarımı ve güvenilir performansıyla öne çıkan masaüstü barkod yazıcıdır.</p>', 2, 1, 'ZD421', '/assets/img/products/zd421.png', 1, 0)
ON DUPLICATE KEY UPDATE ad = VALUES(ad);

INSERT INTO blogs (title, slug, excerpt, content, author, category, is_featured, is_published) VALUES 
('Barkod Sistemleri Nasıl Çalışır?', 'barkod-sistemleri-nasil-calisir', 'Barkod sistemlerinin temel çalışma prensibi ve işletmelere sağladığı avantajlar hakkında bilgi edinin.', '<p>Barkod sistemleri, ürünlerin hızlı ve doğru tanımlanmasını sağlayan teknolojilerdir...</p>', 'Admin', 'Teknoloji', 1, 1),
('El Terminali Seçerken Dikkat Edilmesi Gerekenler', 'el-terminali-secerken-dikkat-edilmesi-gerekenler', 'İşletmeniz için doğru el terminalini seçerken göz önünde bulundurmanız gereken önemli faktörler.', '<p>El terminali seçimi, işletmenizin verimliliğini doğrudan etkileyen önemli bir karardır...</p>', 'Admin', 'Rehber', 0, 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);
