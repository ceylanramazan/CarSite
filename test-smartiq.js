// SmartIQ API Test Script
const SMARTIQ_BASE_URL = 'https://qa.smartiq.io/mars/autoPricingAPI'
const API_USER = 'test@test.com'
const API_KEY = 'test_api_key'

async function testSmartIQAPI() {
  try {
    console.log('Testing SmartIQ API...')
    console.log('URL:', SMARTIQ_BASE_URL + '/carWizard')
    console.log('User:', API_USER)
    console.log('Key:', API_KEY)
    
    const response = await fetch(SMARTIQ_BASE_URL + '/carWizard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiUser: API_USER,
        apiKey: API_KEY
      })
    })

    console.log('Response Status:', response.status)
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
    
    const data = await response.text()
    console.log('Raw Response:', data)
    
    if (response.ok) {
      const jsonData = JSON.parse(data)
      console.log('Parsed Response:', JSON.stringify(jsonData, null, 2))
    } else {
      console.log('Error Response:', data)
    }
    
  } catch (error) {
    console.error('Test Error:', error)
  }
}

testSmartIQAPI()
