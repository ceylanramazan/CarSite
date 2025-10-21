'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Check, X } from 'lucide-react'

interface KvkkConsentProps {
  onAccept: (consents: { dataProcessing: boolean; marketing: boolean; analytics: boolean }) => void
  onReject: () => void
}

export default function KvkkConsent({ onAccept, onReject }: KvkkConsentProps) {
  const [dataProcessing, setDataProcessing] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  const handleAccept = () => {
    onAccept({
      dataProcessing: dataProcessing,
      marketing: marketing,
      analytics: analytics
    })
  }

  const allAccepted = dataProcessing && marketing && analytics

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">KVKK Aydınlatma Metni</h3>
          <p className="text-sm text-gray-600">Kişisel verilerinizin işlenmesi hakkında bilgilendirme</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          Any 2. El olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, 
          kişisel verilerinizin işlenmesi konusunda aşağıdaki bilgilendirmeyi yapmaktayız.
        </p>

        <div className="space-y-4">
          {/* Veri İşleme Onayı */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="dataProcessing"
                checked={dataProcessing}
                onChange={(e) => setDataProcessing(e.target.checked)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
              />
              <div className="flex-1">
                <label htmlFor="dataProcessing" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Veri İşleme Onayı (Zorunlu)
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Kişisel verilerinizin araç değerlendirme, teklif sunma ve hizmet sunumu amacıyla işlenmesini kabul ediyorum.
                </p>
              </div>
            </div>
          </div>

          {/* Pazarlama Onayı */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="marketing"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
              />
              <div className="flex-1">
                <label htmlFor="marketing" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Pazarlama İletişimi Onayı (İsteğe Bağlı)
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  SMS, e-posta ve telefon ile pazarlama mesajları, kampanyalar ve özel teklifler almayı kabul ediyorum.
                </p>
              </div>
            </div>
          </div>

          {/* Analitik Onayı */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="analytics"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Analitik Veri Toplama Onayı (İsteğe Bağlı)
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Web sitesi kullanım analizi ve hizmet iyileştirme amacıyla anonim veri toplanmasını kabul ediyorum.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Veri Güvenliği</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Verileriniz SSL şifreleme ile korunmaktadır</li>
            <li>• Üçüncü taraflarla paylaşılmaz</li>
            <li>• İstediğiniz zaman silme hakkınız vardır</li>
            <li>• KVKK kapsamında haklarınızı kullanabilirsiniz</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleAccept}
          disabled={!dataProcessing}
          className={`flex-1 ${
            allAccepted 
              ? 'bg-primary hover:bg-primary/90 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Check className="h-4 w-4 mr-2" />
          {allAccepted ? 'Tüm Onayları Ver' : 'Zorunlu Onayları Ver'}
        </Button>
        
        <Button
          onClick={onReject}
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-2" />
          Reddet
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Detaylı bilgi için{' '}
        <a href="/kvkk" className="text-primary hover:underline">
          KVKK Aydınlatma Metni
        </a>{' '}
        ve{' '}
        <a href="/gizlilik" className="text-primary hover:underline">
          Gizlilik Politikası
        </a>{' '}
        sayfalarını inceleyebilirsiniz.
      </p>
    </div>
  )
}
