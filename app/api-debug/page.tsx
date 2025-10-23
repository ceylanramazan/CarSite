'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, Copy, Check } from 'lucide-react'

interface APIResponse {
  endpoint: string
  method: string
  request: any
  response: any
  status: 'loading' | 'success' | 'error'
  timestamp: string
}

export default function APIDebugPage() {
  const [responses, setResponses] = useState<APIResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const testEndpoints = [
    {
      name: 'Years API',
      endpoint: '/api/smartiq/years',
      method: 'GET',
      request: null
    },
    {
      name: 'Brands API (2022)',
      endpoint: '/api/smartiq/brands',
      method: 'POST',
      request: { year: 2022 }
    },
    {
      name: 'Models API (2022, BMW)',
      endpoint: '/api/smartiq/models',
      method: 'POST',
      request: { year: 2022, brandId: 1 }
    },
    {
      name: 'Body Types API',
      endpoint: '/api/smartiq/body-types',
      method: 'POST',
      request: { year: 2022, brandId: 1, modelId: 1 }
    },
    {
      name: 'Transmission Types API',
      endpoint: '/api/smartiq/transmission-types',
      method: 'POST',
      request: { year: 2022, brandId: 1, modelId: 1 }
    },
    {
      name: 'Fuel Types API',
      endpoint: '/api/smartiq/fuel-types',
      method: 'POST',
      request: { year: 2022, brandId: 1, modelId: 1 }
    },
    {
      name: 'Versions API',
      endpoint: '/api/smartiq/versions',
      method: 'POST',
      request: { year: 2022, brandId: 1, modelId: 1 }
    },
    {
      name: 'Equipments API',
      endpoint: '/api/smartiq/equipments',
      method: 'POST',
      request: { year: 2022, brandId: 1, modelId: 1 }
    },
    {
      name: 'Pricing API',
      endpoint: '/api/smartiq/pricing',
      method: 'POST',
      request: {
        year: 2022,
        brandId: 1,
        modelId: 1,
        bodyTypeId: 1,
        transmissionTypeId: 1,
        fuelTypeId: 1,
        versionId: 1,
        kilometer: 50000
      }
    }
  ]

  const testAllAPIs = async () => {
    setLoading(true)
    setResponses([])
    
    for (const test of testEndpoints) {
      const response: APIResponse = {
        endpoint: test.endpoint,
        method: test.method,
        request: test.request,
        response: null,
        status: 'loading',
        timestamp: new Date().toLocaleTimeString()
      }
      
      setResponses(prev => [...prev, response])
      
      try {
        const fetchOptions: RequestInit = {
          method: test.method,
          headers: {
            'Content-Type': 'application/json',
          }
        }
        
        if (test.request) {
          fetchOptions.body = JSON.stringify(test.request)
        }
        
        const apiResponse = await fetch(test.endpoint, fetchOptions)
        const data = await apiResponse.json()
        
        setResponses(prev => prev.map(r => 
          r.endpoint === test.endpoint 
            ? { ...r, response: data, status: apiResponse.ok ? 'success' : 'error' }
            : r
        ))
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500))
        
      } catch (error) {
        setResponses(prev => prev.map(r => 
          r.endpoint === test.endpoint 
            ? { ...r, response: { error: error instanceof Error ? error.message : 'Unknown error' }, status: 'error' }
            : r
        ))
      }
    }
    
    setLoading(false)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'loading': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartIQ API Debug</h1>
          <p className="text-gray-600">API endpoint&apos;lerini test edin ve response&apos;ları görün</p>
        </div>

        <div className="mb-6">
          <Button 
            onClick={testAllAPIs} 
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                API&apos;ler Test Ediliyor...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tüm API&apos;leri Test Et
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6">
          {responses.map((response, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {response.endpoint}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(response.status)}>
                      {response.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{response.timestamp}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Method: <span className="font-mono">{response.method}</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {response.request && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Request:</h4>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(response.request, null, 2)}
                    </pre>
                  </div>
                )}
                
                {response.status === 'loading' && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                )}
                
                {response.response && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-700">Response:</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(JSON.stringify(response.response, null, 2), index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto max-h-96">
                      {JSON.stringify(response.response, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {responses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Henüz API test edilmedi</p>
            <p className="text-gray-400 text-sm mt-2">Yukarıdaki butona tıklayarak API&apos;leri test edin</p>
          </div>
        )}
      </div>
    </div>
  )
}
