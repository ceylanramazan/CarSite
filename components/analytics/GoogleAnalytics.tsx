'use client'

import Script from 'next/script'
import { isAnalyticsAccepted } from '@/lib/cookie-consent'
import { useEffect, useState } from 'react'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    // Check if user has consented to analytics
    if (isAnalyticsAccepted()) {
      setCanLoad(true)
    }
  }, [])

  if (!canLoad) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  )
}
