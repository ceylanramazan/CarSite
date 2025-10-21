'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Cookie, Settings, Check } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analyticsAccepted, setAnalyticsAccepted] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('analytics-consent', 'accepted')
    setIsVisible(false)
    // Reload page to activate analytics
    window.location.reload()
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    localStorage.setItem('analytics-consent', 'declined')
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', 'custom')
    localStorage.setItem('analytics-consent', analyticsAccepted ? 'accepted' : 'declined')
    setIsVisible(false)
    if (analyticsAccepted) {
      window.location.reload()
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Cookie Banner */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Çerez Kullanımı</h3>
              <p className="text-sm text-gray-600">Size daha iyi bir deneyim sunmak için çerez kullanıyoruz</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {!showDetails ? (
            // Simple view
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Bu web sitesi, size en iyi deneyimi sunmak için çerezler kullanır. 
                Çerezler, web sitesinin düzgün çalışması ve kullanımınızı analiz etmek için kullanılır.
              </p>
              <p className="text-sm text-gray-600">
                Detaylı bilgi için{' '}
                <Link href="/cerez-politikasi" className="text-primary hover:underline font-medium">
                  Çerez Politikamıza
                </Link>{' '}
                bakın.
              </p>
            </div>
          ) : (
            // Detailed view
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Çerez Türleri</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Zorunlu Çerezler</h5>
                      <p className="text-sm text-gray-600">Web sitesinin temel işlevselliği için gerekli çerezler. Bu çerezler devre dışı bırakılamaz.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        id="analytics"
                        checked={analyticsAccepted}
                        onChange={(e) => setAnalyticsAccepted(e.target.checked)}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="analytics" className="font-medium text-gray-900 cursor-pointer">
                        Analitik Çerezler
                      </label>
                      <p className="text-sm text-gray-600">Web sitesi kullanımını analiz etmek ve iyileştirmek için kullanılır. Google Analytics ve Yandex Metrika dahil.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Tümünü Kabul Et
            </Button>
            
            <Button
              onClick={handleAcceptNecessary}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Sadece Gerekli
            </Button>
            
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showDetails ? 'Basit Görünüm' : 'Ayarlar'}
            </Button>
          </div>

          {showDetails && (
            <div className="mt-4">
              <Button
                onClick={handleSavePreferences}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                Tercihlerimi Kaydet
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
