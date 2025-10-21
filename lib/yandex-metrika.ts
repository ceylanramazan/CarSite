// Yandex Metrika utility functions

declare global {
  interface Window {
    ym: (counterId: string, action: string, ...args: any[]) => void
  }
}

export const YANDEX_COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_COUNTER_ID

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.ym && YANDEX_COUNTER_ID) {
    window.ym(YANDEX_COUNTER_ID, 'hit', url, {
      title: title || document.title,
      referer: document.referrer,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.ym && YANDEX_COUNTER_ID) {
    window.ym(YANDEX_COUNTER_ID, 'reachGoal', action, {
      category: category,
      label: label,
      value: value,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName)
}

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', 'engagement', buttonName)
}

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent('phone_click', 'contact', phoneNumber)
}

// Track email clicks
export const trackEmailClick = (email: string) => {
  trackEvent('email_click', 'contact', email)
}

// Track external links
export const trackExternalLink = (url: string) => {
  trackEvent('external_link', 'navigation', url)
}

// Track file downloads
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', 'engagement', fileName)
}
