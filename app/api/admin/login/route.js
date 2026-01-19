import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// POST - Giriş doğrulama
export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Veritabanından kullanıcıyı kontrol et
        const [rows] = await pool.query(
            'SELECT * FROM admin_users WHERE email = ? AND password = ?',
            [email, password]
        );

        if (rows.length > 0) {
            const user = rows[0];

            // Son giriş zamanını güncelle
            await pool.query(
                'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
                [user.id]
            );

            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } else {
            return NextResponse.json({
                success: false,
                error: 'E-posta veya şifre hatalı!'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Giriş hatası:', error);
        return NextResponse.json({
            success: false,
            error: 'Sunucu hatası',
            message: error.message,
            code: error.code
        }, { status: 500 });
    }
}
