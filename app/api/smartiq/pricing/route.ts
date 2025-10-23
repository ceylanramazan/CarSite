import { NextRequest, NextResponse } from 'next/server'
import { SmartIQAPI } from '@/lib/smartiq-api'

export async function POST(request: NextRequest) {
  try {
    const pricingRequest = await request.json()
    
    console.log('Pricing API Request:', JSON.stringify(pricingRequest, null, 2))
    
    // Validate required fields
    const requiredFields = ['year', 'brandId', 'modelId', 'bodyTypeId', 'transmissionTypeId', 'fuelTypeId', 'versionId', 'kilometer']
    const missingFields = requiredFields.filter(field => !pricingRequest[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate kilometer range
    if (pricingRequest.kilometer < 0 || pricingRequest.kilometer > 1000000) {
      return NextResponse.json(
        { success: false, error: 'Kilometer value must be between 0 and 1,000,000' },
        { status: 400 }
      )
    }

    // Validate year range
    const currentYear = new Date().getFullYear()
    if (pricingRequest.year < 1990 || pricingRequest.year > currentYear) {
      return NextResponse.json(
        { success: false, error: `Year must be between 1990 and ${currentYear}` },
        { status: 400 }
      )
    }

    // Validate cityCode if provided
    if (pricingRequest.cityCode && (pricingRequest.cityCode < 1 || pricingRequest.cityCode > 81)) {
      return NextResponse.json(
        { success: false, error: 'City code must be between 1 and 81' },
        { status: 400 }
      )
    }

    const pricing = await SmartIQAPI.getPricing(pricingRequest)
    return NextResponse.json({ success: true, data: pricing })
  } catch (error) {
    console.error('SmartIQ Pricing API Error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
