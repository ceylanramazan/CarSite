// Cookie consent utility functions

export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const ANALYTICS_CONSENT_KEY = 'analytics-consent'

export type CookieConsentStatus = 'accepted' | 'necessary' | 'custom' | null

// Check if user has given consent
export const getCookieConsent = (): CookieConsentStatus => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsentStatus
}

// Check if analytics is accepted
export const isAnalyticsAccepted = (): boolean => {
  if (typeof window === 'undefined') return false
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  const analytics = localStorage.getItem(ANALYTICS_CONSENT_KEY)
  
  return consent === 'accepted' || analytics === 'accepted'
}

// Set cookie consent
export const setCookieConsent = (status: CookieConsentStatus) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(COOKIE_CONSENT_KEY, status || '')
}

// Set analytics consent
export const setAnalyticsConsent = (accepted: boolean) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(ANALYTICS_CONSENT_KEY, accepted ? 'accepted' : 'declined')
}

// Clear all consent
export const clearConsent = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(COOKIE_CONSENT_KEY)
  localStorage.removeItem(ANALYTICS_CONSENT_KEY)
}

// Check if consent banner should be shown
export const shouldShowConsentBanner = (): boolean => {
  if (typeof window === 'undefined') return false
  return !localStorage.getItem(COOKIE_CONSENT_KEY)
}
