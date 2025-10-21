import { Metadata } from 'next'
import { Cookie, Shield, Eye, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Çerez Politikası - Any 2. El',
  description: 'Any 2. El web sitesinde çerez kullanımı hakkında detaylı bilgiler.',
}

export default function CerezPolitikasi() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 sm:px-8 py-8 sm:py-12">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Çerez Politikası</h1>
                <p className="text-gray-600 mt-2">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-8 sm:py-12 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Çerezler Hakkında</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any 2. El web sitesi, size en iyi kullanıcı deneyimini sunmak ve web sitesinin düzgün çalışmasını sağlamak için çerezler kullanır. Bu politika, hangi çerezlerin kullanıldığını ve bunların nasıl yönetileceğini açıklar.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Çerezler, web sitelerinin ziyaretçileri tanımasına ve onların tercihlerini hatırlamasına olanak tanıyan küçük metin dosyalarıdır.
              </p>
            </section>

            {/* Cookie Types */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Çerez Türleri</h2>
              
              <div className="space-y-6">
                {/* Zorunlu Çerezler */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Zorunlu Çerezler</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Bu çerezler web sitesinin temel işlevselliği için gereklidir ve devre dışı bırakılamaz. Güvenlik, form işlemleri ve kullanıcı tercihleri gibi temel özellikler için kullanılır.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Oturum yönetimi</li>
                        <li>• Güvenlik çerezleri</li>
                        <li>• Form verileri</li>
                        <li>• Dil tercihi</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Analitik Çerezler */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analitik Çerezler</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Bu çerezler web sitesi kullanımını analiz etmek ve iyileştirmek için kullanılır. Anonim veri toplar ve kişisel bilgilerinizi içermez.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Google Analytics (GA4)</li>
                        <li>• Yandex Metrika</li>
                        <li>• Sayfa görüntüleme sayıları</li>
                        <li>• Kullanıcı davranış analizi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Çerez Yönetimi</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Çerez Tercihlerinizi Yönetin</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Çerez tercihlerinizi istediğiniz zaman değiştirebilirsiniz. Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</p>
                      <p><strong>Firefox:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</p>
                      <p><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third Party Services */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Üçüncü Taraf Hizmetler</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900">Google Analytics</h3>
                  <p className="text-gray-700 text-sm">
                    Web sitesi trafiğini analiz etmek için kullanılır. Veriler anonim olarak işlenir.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900">Yandex Metrika</h3>
                  <p className="text-gray-700 text-sm">
                    Kullanıcı davranışlarını analiz etmek için kullanılır. Veriler anonim olarak işlenir.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Çerez politikası hakkında sorularınız için{' '}
                <a href="mailto:anycars34@gmail.com" className="text-primary hover:underline font-medium">
                  anycars34@gmail.com
                </a>{' '}
                adresinden bizimle iletişime geçebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
