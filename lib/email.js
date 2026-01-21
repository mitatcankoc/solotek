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

// Solo Teknoloji - Professional Email Template
const getEmailTemplate = (type, title, content, actionButton = null) => {
    const isDemo = type === 'demo';
    const accentColor = isDemo ? '#f59e0b' : '#21BB9F';
    const headerBg = isDemo
        ? 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);'
        : 'background: linear-gradient(135deg, #21BB9F 0%, #1a9980 100%);';

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
        .mso-button {padding: 14px 30px !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; -webkit-font-smoothing: antialiased;">
    
    <!-- Wrapper -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0f2f5;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" align="center" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
                    
                    <!-- Logo Header -->
                    <tr>
                        <td style="background: #1a1a1a; padding: 28px 40px; border-radius: 12px 12px 0 0;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <table role="presentation" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="vertical-align: middle;">
                                                    <div style="width: 38px; height: 38px; background: linear-gradient(135deg, #21BB9F 0%, #1a9980 100%); border-radius: 8px; text-align: center; line-height: 38px; margin-right: 12px;">
                                                        <span style="color: #fff; font-size: 18px; font-weight: bold;">S</span>
                                                    </div>
                                                </td>
                                                <td style="vertical-align: middle;">
                                                    <span style="color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">SOLO</span>
                                                    <span style="color: #21BB9F; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;"> TEKNOLOJİ</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right" style="vertical-align: middle;">
                                        <span style="color: #6b7280; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 500;">Barkod &amp; Otomasyon</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Title Section -->
                    <tr>
                        <td style="${headerBg} padding: 22px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="vertical-align: middle;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600; line-height: 1.3;">
                                            ${isDemo ? '&#127919;' : '&#9993;'} ${title}
                                        </h1>
                                        <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0 0; font-size: 12px;">${new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="background: #ffffff; padding: 35px 40px;">
                            ${content}
                        </td>
                    </tr>

                    ${actionButton ? `
                    <!-- Action Button -->
                    <tr>
                        <td style="background: #ffffff; padding: 0 40px 35px 40px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 8px; ${headerBg}">
                                        <a href="${actionButton.url}" target="_blank" class="mso-button" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
                                            ${actionButton.text}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Divider -->
                    <tr>
                        <td style="background: #ffffff; padding: 0 40px;">
                            <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 20%, #e5e7eb 80%, transparent 100%);"></div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #ffffff; padding: 30px 40px; border-radius: 0 0 12px 12px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <!-- Contact Info -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto 20px auto;">
                                            <tr>
                                                <td style="padding: 0 15px; text-align: center;">
                                                    <a href="tel:+905365014600" style="color: #1a1a1a; text-decoration: none; font-size: 13px; font-weight: 500;">
                                                        <span style="color: #21BB9F; margin-right: 6px;">&#x260E;</span>
                                                        0536 501 46 00
                                                    </a>
                                                </td>
                                                <td style="padding: 0 15px; text-align: center; border-left: 1px solid #e5e7eb;">
                                                    <a href="mailto:info@soloteknoloji.com.tr" style="color: #1a1a1a; text-decoration: none; font-size: 13px; font-weight: 500;">
                                                        <span style="color: #21BB9F; margin-right: 6px;">&#x2709;</span>
                                                        info@soloteknoloji.com.tr
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Address -->
                                        <p style="color: #6b7280; font-size: 12px; margin: 0 0 15px 0; line-height: 1.6;">
                                            Hasanpaşa, Uzunçayır Cd. No:2/42, 34722 Kadıköy/İstanbul
                                        </p>

                                        <!-- Copyright -->
                                        <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                                            © ${new Date().getFullYear()} Solo Teknoloji San. Tic. Ltd. Şti. Tüm hakları saklıdır.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Legal Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <p style="color: #9ca3af; font-size: 10px; margin: 0; line-height: 1.6;">
                                Bu e-posta, soloteknoloji.tr web sitesi üzerinden gönderilen bir form bildirimidir.
                                <br>Lütfen bu e-postayı yanıtlamayın, doğrudan müşteri ile iletişime geçin.
                            </p>
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

// Form satırı oluştur
const createRow = (icon, label, value, isLink = false, linkType = null) => {
    if (!value) return '';

    let displayValue = value;
    if (isLink && linkType === 'email') {
        displayValue = `<a href="mailto:${value}" style="color: #21BB9F; text-decoration: none; font-weight: 500;">${value}</a>`;
    } else if (isLink && linkType === 'phone') {
        displayValue = `<a href="tel:${value}" style="color: #21BB9F; text-decoration: none; font-weight: 500;">${value}</a>`;
    }

    return `
        <tr>
            <td style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width: 130px; vertical-align: top;">
                            <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">
                                ${icon} ${label}
                            </span>
                        </td>
                        <td style="vertical-align: top;">
                            <span style="color: #1f2937; font-size: 14px; line-height: 1.5;">${displayValue}</span>
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
            <td style="padding: 20px 0 0 0;">
                <div style="background: #f9fafb; border-radius: 10px; padding: 20px; border-left: 4px solid ${accentColor};">
                    <p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0; font-weight: 600;">Mesaj</p>
                    <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-line;">${message}</p>
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
            ${createRow('&#x1F464;', 'Ad Soyad', ad_soyad)}
            ${createRow('&#x2709;', 'E-posta', email, true, 'email')}
            ${createRow('&#x260E;', 'Telefon', telefon, true, 'phone')}
            ${createRow('&#x1F4CB;', 'Konu', konu)}
            ${createMessageBox(mesaj)}
        </table>
    `;

    const mailOptions = {
        from: '"Solo Teknoloji" <info@soloteknoloji.com.tr>',
        to: 'info@soloteknoloji.com.tr',
        replyTo: email,
        subject: `Yeni İletişim Formu: ${ad_soyad}${konu ? ` - ${konu}` : ''}`,
        html: getEmailTemplate('contact', 'Yeni İletişim Mesajı', content, {
            text: 'Müşteriye Yanıt Ver',
            url: `mailto:${email}?subject=Re: ${konu || 'İletişim formunuz hakkında'}`
        })
    };

    return transporter.sendMail(mailOptions);
}

// Demo talebi için email gönder
export async function sendDemoRequestEmail(data) {
    const { ad_soyad, email, telefon, firma, sektor, urun_ilgi, mesaj } = data;

    const content = `
        <!-- Demo Alert Banner -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 16px 20px; margin-bottom: 25px; border: 1px solid #fcd34d;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="width: 40px; vertical-align: middle;">
                        <div style="width: 32px; height: 32px; background: #f59e0b; border-radius: 50%; text-align: center; line-height: 32px;">
                            <span style="color: #fff; font-size: 14px;">&#x1F3AF;</span>
                        </div>
                    </td>
                    <td style="vertical-align: middle; padding-left: 12px;">
                        <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">Yeni Demo Talebi Alındı!</p>
                        <p style="color: #a16207; margin: 3px 0 0 0; font-size: 12px;">Lütfen en kısa sürede müşteri ile iletişime geçin.</p>
                    </td>
                </tr>
            </table>
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            ${createRow('&#x1F464;', 'Ad Soyad', ad_soyad)}
            ${createRow('&#x2709;', 'E-posta', email, true, 'email')}
            ${createRow('&#x260E;', 'Telefon', telefon, true, 'phone')}
            ${createRow('&#x1F3E2;', 'Firma', firma)}
            ${createRow('&#x1F3ED;', 'Sektör', sektor)}
            ${createRow('&#x1F4E6;', 'İlgilenilen Ürün', urun_ilgi)}
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
