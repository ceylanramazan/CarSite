import { NextRequest, NextResponse } from 'next/server'
import type { OfferPayload, OfferResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const offerData: OfferPayload = await request.json()
    
    console.log('Offer submission received:', JSON.stringify(offerData, null, 2))
    
    // Validate required fields
    if (!offerData.vehicle || !offerData.contact) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Vehicle and contact information are required' 
        },
        { status: 400 }
      )
    }
    
    // Generate a mock offer ID
    const offerId = `OFFER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Mock response - in real implementation, this would save to database
    const response: OfferResponse = {
      status: 'success',
      message: 'Teklifiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.',
      offer_id: offerId
    }
    
    console.log('Offer created successfully:', offerId)
    
    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    console.error('Offer submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your offer' 
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
