import { NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function GET() {
  try {
    const years = await SmartIQAPI.getYears()
    return NextResponse.json({ success: true, data: years })
  } catch (error) {
    console.error('SmartIQ Years API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
