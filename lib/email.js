import nodemailer from 'nodemailer';

// SMTP Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@soloteknoloji.com.tr',
        pass: 'Sol2025@.'
    }
});

// Solo Teknoloji - Modern Minimal Email Template
const getEmailTemplate = (type, title, content, actionButton = null) => {
    const isDemo = type === 'demo';
    const accentColor = isDemo ? '#f59e0b' : '#21BB9F';

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
    <!--[if mso]>
    <style type="text/css">
        table {border-collapse: collapse;}
        td, th {padding: 0;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased;">
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" align="center" width="560" cellspacing="0" cellpadding="0" style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #f1f5f9;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <span style="color: #0f172a; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">SOLO</span>
                                        <span style="color: ${accentColor}; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;"> TEKNOLOJİ</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Title -->
                    <tr>
                        <td style="padding: 28px 40px 8px 40px;">
                            <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.3px;">${title}</h1>
                            <p style="color: #64748b; margin: 8px 0 0 0; font-size: 13px;">${new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' })}</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px 40px 32px 40px;">
                            ${content}
                        </td>
                    </tr>

                    ${actionButton ? `
                    <!-- Action Button -->
                    <tr>
                        <td style="padding: 0 40px 32px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="background: ${accentColor}; border-radius: 8px;">
                                        <a href="${actionButton.url}" target="_blank" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: 600;">
                                            ${actionButton.text} →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #f1f5f9;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0; font-weight: 500;">
                                            <a href="tel:+902163266000" style="color: #0f172a; text-decoration: none;">0216 326 60 00</a>
                                            &nbsp;•&nbsp;
                                            <a href="mailto:info@soloteknoloji.com.tr" style="color: #0f172a; text-decoration: none;">info@soloteknoloji.com.tr</a>
                                        </p>
                                        <p style="color: #94a3b8; font-size: 11px; margin: 0 0 12px 0;">
                                            © ${new Date().getFullYear()} Solo Teknoloji • soloteknoloji.tr
                                        </p>
                                        <p style="color: #94a3b8; font-size: 10px; margin: 0; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                                            Bu e-posta, soloteknoloji.tr web sitesi üzerinden gönderilen bir form bildirimidir.<br>
                                            Lütfen bu e-postayı yanıtlamayın, doğrudan müşteri ile iletişime geçin.
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

// Form satırı oluştur - Minimal tasarım
const createRow = (label, value, isLink = false, linkType = null) => {
    if (!value) return '';

    let displayValue = value;
    if (isLink && linkType === 'email') {
        displayValue = `<a href="mailto:${value}" style="color: #21BB9F; text-decoration: none;">${value}</a>`;
    } else if (isLink && linkType === 'phone') {
        displayValue = `<a href="tel:${value}" style="color: #21BB9F; text-decoration: none;">${value}</a>`;
    }

    return `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width: 100px; vertical-align: top;">
                            <span style="color: #94a3b8; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
                        </td>
                        <td style="vertical-align: top;">
                            <span style="color: #0f172a; font-size: 14px; font-weight: 500;">${displayValue}</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;
};

// Mesaj kutusu oluştur
const createMessageBox = (message, accentColor = '#21BB9F') => {
    if (!message) return '';
    return `
        <tr>
            <td style="padding: 16px 0 0 0;">
                <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border-left: 3px solid ${accentColor};">
                    <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; font-weight: 600;">Mesaj</p>
                    <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${message}</p>
                </div>
            </td>
        </tr>
    `;
};

// İletişim formu için email gönder
export async function sendContactEmail(data) {
    const { ad_soyad, email, telefon, konu, mesaj } = data;

    const content = `
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${createRow('Ad Soyad', ad_soyad)}
            ${createRow('E-posta', email, true, 'email')}
            ${createRow('Telefon', telefon, true, 'phone')}
            ${createRow('Konu', konu)}
            ${createMessageBox(mesaj)}
        </table>
    `;

    const mailOptions = {
        from: '"Solo Teknoloji" <info@soloteknoloji.com.tr>',
        to: 'info@soloteknoloji.com.tr',
        replyTo: email,
        subject: `Yeni İletişim: ${ad_soyad}${konu ? ` - ${konu}` : ''}`,
        html: getEmailTemplate('contact', 'Yeni İletişim Mesajı', content, {
            text: 'Yanıtla',
            url: `mailto:${email}?subject=Re: ${konu || 'İletişim formunuz hakkında'}`
        })
    };

    return transporter.sendMail(mailOptions);
}

// Demo talebi için email gönder
export async function sendDemoRequestEmail(data) {
    const { ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj } = data;

    const content = `
        <!-- Alert -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
            <p style="color: #92400e; margin: 0; font-size: 13px; font-weight: 600;">🎯 Yeni Demo Talebi - Lütfen hemen iletişime geçin!</p>
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${createRow('Ad Soyad', ad_soyad)}
            ${createRow('E-posta', email, true, 'email')}
            ${createRow('Telefon', telefon, true, 'phone')}
            ${createRow('Firma', firma)}
            ${createRow('Sektör', sektor)}
            ${createRow('İlgilenilen Ürün', urun_ilgi)}
            ${createMessageBox(mesaj, '#f59e0b')}
        </table>
    `;

    const mailOptions = {
        from: '"Solo Teknoloji Demo" <info@soloteknoloji.com.tr>',
        to: 'info@soloteknoloji.com.tr',
        replyTo: email,
        subject: `Demo Talebi: ${ad_soyad}${firma ? ` - ${firma}` : ''}`,
        html: getEmailTemplate('demo', 'Yeni Demo Talebi', content, {
            text: 'Hemen Ara',
            url: `tel:${telefon}`
        })
    };

    return transporter.sendMail(mailOptions);
}

export default transporter;
