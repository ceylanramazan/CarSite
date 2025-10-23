// Test API endpoint directly
async function testEndpoint() {
  try {
    console.log('Testing /api/smartiq/years endpoint...')
    
    const response = await fetch('http://localhost:3000/api/smartiq/years')
    console.log('Status:', response.status)
    
    const data = await response.json()
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (data.success) {
      console.log('✅ Endpoint works! Years:', data.data?.slice(0, 5))
    } else {
      console.log('❌ Endpoint Error:', data.error)
    }
    
  } catch (error) {
    console.error('❌ Network Error:', error.message)
  }
}

testEndpoint()
