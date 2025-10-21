'use client'

import Script from 'next/script'
import { isAnalyticsAccepted } from '@/lib/cookie-consent'
import { useEffect, useState } from 'react'

interface YandexMetrikaProps {
  counterId: string
}

export default function YandexMetrika({ counterId }: YandexMetrikaProps) {
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
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterId}, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true,
               defer:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
