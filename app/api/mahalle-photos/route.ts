import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/** GET /api/mahalle-photos?path=bayindir/arkeoloji/antik-yollar */
export async function GET(req: NextRequest) {
  const subPath = req.nextUrl.searchParams.get('path') ?? ''

  // Güvenlik: sadece mahalleler klasörü altında çalış
  const safePath = subPath.replace(/\.\./g, '').replace(/[^a-zA-Z0-9\-_/]/g, '')
  const dir = path.join(process.cwd(), 'public', 'mahalleler', safePath)

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return NextResponse.json({ photos: [] })
  }

  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp', '.svg'])
  const files = fs.readdirSync(dir)
    .filter(f => exts.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'tr'))
    .map(f => `/mahalleler/${safePath}/${f}`)

  return NextResponse.json({ photos: files })
}
