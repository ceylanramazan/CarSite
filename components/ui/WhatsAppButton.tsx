'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '905449275328' // WhatsApp numarası (ülke kodu ile)
  const message = 'Merhaba! Araç alım satım konusunda bilgi almak istiyorum.'
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp ile iletişime geç"
    >
      {/* Ana buton */}
      <div className="relative">
        {/* Hover efekti için büyük alan */}
        <div className="absolute -inset-4 rounded-full bg-green-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
        
        {/* WhatsApp butonu */}
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        
        {/* Pulse animasyonu */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        WhatsApp ile iletişime geç
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </a>
  )
}
