import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('eya_auth')?.value
  return NextResponse.json({ isAdmin: token === 'admin' })
}
