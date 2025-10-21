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
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Cookie Banner */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Çerezler</h3>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!showDetails ? (
            // Simple view
            <div className="space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                Size daha iyi bir deneyim sunmak için çerez kullanıyoruz.
              </p>
              <p className="text-xs text-gray-600">
                Detaylı bilgi için{' '}
                <Link href="/cerez-politikasi" className="text-primary hover:underline font-medium">
                  Çerez Politikamıza
                </Link>{' '}
                bakın.
              </p>
            </div>
          ) : (
            // Detailed view
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Çerez Türleri</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Zorunlu Çerezler</h5>
                      <p className="text-xs text-gray-600">Temel işlevsellik için gerekli.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        id="analytics"
                        checked={analyticsAccepted}
                        onChange={(e) => setAnalyticsAccepted(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="analytics" className="text-sm font-medium text-gray-900 cursor-pointer">
                        Analitik Çerezler
                      </label>
                      <p className="text-xs text-gray-600">Kullanım analizi için.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium"
              >
                Kabul Et
              </Button>
              
              <Button
                onClick={handleAcceptNecessary}
                size="sm"
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
              >
                Sadece Gerekli
              </Button>
            </div>
            
            <Button
              onClick={() => setShowDetails(!showDetails)}
              size="sm"
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Settings className="h-3 w-3 mr-1" />
              {showDetails ? 'Basit Görünüm' : 'Ayarlar'}
            </Button>
          </div>

          {showDetails && (
            <div className="mt-3">
              <Button
                onClick={handleSavePreferences}
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium"
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
