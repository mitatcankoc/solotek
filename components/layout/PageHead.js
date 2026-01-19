"use client";

import { useEffect } from "react";

const PageHead = ({ headTitle, metaDescription, metaKeywords }) => {
    useEffect(() => {
        if (typeof document !== "undefined") {
            // Title
            document.title = headTitle ? headTitle : "Solo Teknoloji | POS Sistemleri, Barkod Çözümleri ve Teknik Servis";

            // Meta Description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = metaDescription || "Solo Teknoloji - Türkiye'nin lider barkod sistemleri, POS çözümleri, el terminalleri ve teknik servis hizmetleri sağlayıcısı. Zebra, Honeywell, Datalogic yetkili distribütörü.";

            // Meta Keywords
            let metaKw = document.querySelector('meta[name="keywords"]');
            if (!metaKw) {
                metaKw = document.createElement('meta');
                metaKw.name = 'keywords';
                document.head.appendChild(metaKw);
            }
            metaKw.content = metaKeywords || "barkod sistemleri, pos cihazları, el terminali, barkod yazıcı, barkod okuyucu, zebra, honeywell, datalogic, teknik servis, solo teknoloji";

            // Canonical URL
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = window.location.href;

            // Open Graph
            updateMetaTag('og:title', headTitle || "Solo Teknoloji | POS ve Barkod Çözümleri");
            updateMetaTag('og:description', metaDescription || "Türkiye'nin lider barkod ve POS çözümleri sağlayıcısı");
            updateMetaTag('og:type', 'website');
            updateMetaTag('og:url', window.location.href);
            updateMetaTag('og:site_name', 'Solo Teknoloji');

            // Twitter Card
            updateMetaTag('twitter:card', 'summary_large_image');
            updateMetaTag('twitter:title', headTitle || "Solo Teknoloji | POS ve Barkod Çözümleri");
            updateMetaTag('twitter:description', metaDescription || "Türkiye'nin lider barkod ve POS çözümleri sağlayıcısı");
        }
    }, [headTitle, metaDescription, metaKeywords]);

    const updateMetaTag = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`) ||
            document.querySelector(`meta[name="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.setAttribute('property', property);
            } else {
                meta.name = property;
            }
            document.head.appendChild(meta);
        }
        meta.content = content;
    };

    return null;
};

export default PageHead;
