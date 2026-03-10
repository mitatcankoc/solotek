import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// GÜVENLİK: Sadece bu secret key ile çalışır
const DEPLOY_SECRET = 'solo2026deploy!restart';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const action = searchParams.get('action') || 'status';

    if (secret !== DEPLOY_SECRET) {
        return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
    }

    try {
        if (action === 'status') {
            // Sunucu durumunu kontrol et
            const { stdout: pm2List } = await execAsync('pm2 list --no-color 2>/dev/null || echo "pm2 yok"');
            const { stdout: nodeV } = await execAsync('node -v');
            const { stdout: diskSpace } = await execAsync('df -h / | tail -1');
            const { stdout: memInfo } = await execAsync('free -m | head -3');

            return NextResponse.json({
                status: 'ok',
                node_version: nodeV.trim(),
                disk: diskSpace.trim(),
                memory: memInfo.trim(),
                pm2: pm2List.trim(),
                cwd: process.cwd(),
                env: process.env.NODE_ENV
            });
        }

        if (action === 'restart') {
            // PM2 ile restart
            const { stdout, stderr } = await execAsync(
                'cd /home/u136381340/htdocs/soloteknoloji.tr && pm2 restart all --update-env 2>&1 || echo "PM2 restart basarisiz"'
            );
            return NextResponse.json({
                message: 'Restart komutu gönderildi',
                output: stdout.trim(),
                errors: stderr ? stderr.trim() : null
            });
        }

        if (action === 'rebuild') {
            // Build ve restart
            const { stdout, stderr } = await execAsync(
                'cd /home/u136381340/htdocs/soloteknoloji.tr && npm run build 2>&1 && pm2 restart all --update-env 2>&1',
                { timeout: 120000, maxBuffer: 10 * 1024 * 1024 }
            );
            return NextResponse.json({
                message: 'Rebuild tamamlandı',
                output: stdout.trim().slice(-2000),
                errors: stderr ? stderr.trim().slice(-1000) : null
            });
        }

        if (action === 'pull-rebuild') {
            // Git pull + build + restart
            const { stdout, stderr } = await execAsync(
                'cd /home/u136381340/htdocs/soloteknoloji.tr && git pull origin main 2>&1 && npm run build 2>&1 && pm2 restart all --update-env 2>&1',
                { timeout: 180000, maxBuffer: 10 * 1024 * 1024 }
            );
            return NextResponse.json({
                message: 'Pull + Rebuild tamamlandı',
                output: stdout.trim().slice(-3000),
                errors: stderr ? stderr.trim().slice(-1000) : null
            });
        }

        return NextResponse.json({ error: 'Geçersiz action. Kullanılabilir: status, restart, rebuild, pull-rebuild' }, { status: 400 });

    } catch (error) {
        return NextResponse.json({
            error: 'Komut çalıştırılamadı',
            message: error.message,
            stderr: error.stderr ? error.stderr.slice(-1000) : null
        }, { status: 500 });
    }
}
