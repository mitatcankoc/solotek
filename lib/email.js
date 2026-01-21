import nodemailer from 'nodemailer';

// SMTP Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // SSL/TLS
    auth: {
        user: 'info@soloteknoloji.com.tr',
        pass: 'Sol2025@.'
    }
});

// Solo Teknoloji Email Template
const getEmailTemplate = (title, content, buttonText = null, buttonLink = null) => {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                                🔧 SOLO TEKNOLOJİ
                            </h1>
                            <p style="color: #21BB9F; margin: 8px 0 0 0; font-size: 13px; letter-spacing: 2px;">
                                BARKOD & OTOMASYON ÇÖZÜMLERİ
                            </p>
                        </td>
                    </tr>

                    <!-- Title Bar -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #21BB9F 0%, #1a9980 100%); padding: 20px 40px;">
                            <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">
                                📬 ${title}
                            </h2>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 35px 40px;">
                            ${content}
                        </td>
                    </tr>

                    ${buttonText && buttonLink ? `
                    <!-- Button -->
                    <tr>
                        <td style="padding: 0 40px 35px 40px; text-align: center;">
                            <a href="${buttonLink}" style="display: inline-block; background: linear-gradient(135deg, #21BB9F 0%, #1a9980 100%); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 15px rgba(33, 187, 159, 0.3);">
                                ${buttonText}
                            </a>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px 40px; border-top: 1px solid #eee;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #666; font-size: 13px; margin: 0 0 10px 0;">
                                            <strong style="color: #333;">Solo Teknoloji</strong>
                                        </p>
                                        <p style="color: #888; font-size: 12px; margin: 0 0 5px 0;">
                                            📍 Bulgurlu Mah. Bağlarbaşı Cad. No:112/2 Üsküdar, İstanbul
                                        </p>
                                        <p style="color: #888; font-size: 12px; margin: 0 0 15px 0;">
                                            📞 0216 326 60 00 | ✉️ info@soloteknoloji.com.tr
                                        </p>
                                        <p style="color: #aaa; font-size: 11px; margin: 0;">
                                            © ${new Date().getFullYear()} Solo Teknoloji. Tüm hakları saklıdır.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

// İletişim formu için email gönder
export async function sendContactEmail(data) {
    const { ad_soyad, email, telefon, konu, mesaj } = data;

    const content = `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">👤 Ad Soyad</span>
                    <span style="color: #333; font-size: 15px; font-weight: 600;">${ad_soyad}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">✉️ E-posta</span>
                    <a href="mailto:${email}" style="color: #21BB9F; font-size: 15px; text-decoration: none;">${email}</a>
                </td>
            </tr>
            ${telefon ? `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">📞 Telefon</span>
                    <a href="tel:${telefon}" style="color: #21BB9F; font-size: 15px; text-decoration: none;">${telefon}</a>
                </td>
            </tr>
            ` : ''}
            ${konu ? `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">📋 Konu</span>
                    <span style="color: #333; font-size: 15px;">${konu}</span>
                </td>
            </tr>
            ` : ''}
            <tr>
                <td style="padding: 15px 0;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 8px;">💬 Mesaj</span>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #21BB9F;">
                        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-line;">${mesaj}</p>
                    </div>
                </td>
            </tr>
        </table>
    `;

    const mailOptions = {
        from: '"Solo Teknoloji" <info@soloteknoloji.com.tr>',
        to: 'info@soloteknoloji.com.tr',
        replyTo: email,
        subject: `🔔 Yeni İletişim: ${ad_soyad} ${konu ? `- ${konu}` : ''}`,
        html: getEmailTemplate('Yeni İletişim Mesajı', content, 'Yanıtla', `mailto:${email}`)
    };

    return transporter.sendMail(mailOptions);
}

// Demo talebi için email gönder
export async function sendDemoRequestEmail(data) {
    const { ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj } = data;

    const content = `
        <div style="background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">
                🎯 Yeni bir demo talebi alındı!
            </p>
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">👤 Ad Soyad</span>
                    <span style="color: #333; font-size: 15px; font-weight: 600;">${ad_soyad}</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">✉️ E-posta</span>
                    <a href="mailto:${email}" style="color: #21BB9F; font-size: 15px; text-decoration: none;">${email}</a>
                </td>
            </tr>
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">📞 Telefon</span>
                    <a href="tel:${telefon}" style="color: #21BB9F; font-size: 15px; text-decoration: none;">${telefon}</a>
                </td>
            </tr>
            ${firma ? `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">🏢 Firma</span>
                    <span style="color: #333; font-size: 15px;">${firma}</span>
                </td>
            </tr>
            ` : ''}
            ${sektor ? `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">🏭 Sektör</span>
                    <span style="color: #333; font-size: 15px;">${sektor}</span>
                </td>
            </tr>
            ` : ''}
            ${urun_ilgi ? `
            <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 4px;">📦 İlgilenilen Ürün</span>
                    <span style="color: #21BB9F; font-size: 15px; font-weight: 600;">${urun_ilgi}</span>
                </td>
            </tr>
            ` : ''}
            ${mesaj ? `
            <tr>
                <td style="padding: 15px 0;">
                    <span style="color: #888; font-size: 12px; display: block; margin-bottom: 8px;">💬 Ek Not</span>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #21BB9F;">
                        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-line;">${mesaj}</p>
                    </div>
                </td>
            </tr>
            ` : ''}
        </table>
    `;

    const mailOptions = {
        from: '"Solo Teknoloji Demo" <info@soloteknoloji.com.tr>',
        to: 'info@soloteknoloji.com.tr',
        replyTo: email,
        subject: `🎯 Demo Talebi: ${ad_soyad} ${firma ? `- ${firma}` : ''}`,
        html: getEmailTemplate('Yeni Demo Talebi', content, 'Hemen Ara', `tel:${telefon}`)
    };

    return transporter.sendMail(mailOptions);
}

export default transporter;
