import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.GOOGLE_DRIVE_API_KEY

interface DriveFile {
  id: string
  name: string
  mimeType: string
}

/** Bir Drive klasöründeki dosya ve alt klasörleri listele */
async function listFolder(folderId: string): Promise<DriveFile[]> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=1000&orderBy=name`
  const res = await fetch(url, { next: { revalidate: 300 } }) // 5 dk cache
  if (!res.ok) return []
  const data = await res.json()
  return data.files ?? []
}

/** GET /api/drive?folderId=xxx
 *  → { folders: [{id, name}], photos: [{id, name, url}] }
 */
export async function GET(req: NextRequest) {
  const folderId = req.nextUrl.searchParams.get('folderId')
  if (!folderId || !API_KEY) {
    return NextResponse.json({ folders: [], photos: [] })
  }

  const files = await listFolder(folderId)

  const folders = files
    .filter(f => f.mimeType === 'application/vnd.google-apps.folder')
    .map(f => ({ id: f.id, name: f.name }))

  const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'])
  const photos = files
    .filter(f => imageTypes.has(f.mimeType))
    .map(f => ({
      id: f.id,
      name: f.name,
      url: `https://drive.google.com/thumbnail?id=${f.id}&sz=w800`,
      urlFull: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1920`,
    }))

  return NextResponse.json({ folders, photos })
}
