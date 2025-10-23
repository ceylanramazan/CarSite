'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { expertiseSchema } from '@/lib/validations'
import { useOfferForm } from '@/contexts/OfferFormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import ProgressStepper from '@/components/stepper/ProgressStepper'
import { motion } from 'framer-motion'
import { FileCheck, Calendar, Shield, Wrench, Upload, X, FileText, Image } from 'lucide-react'
import { useState } from 'react'
import type { ExpertiseDTO } from '@/types'

const steps = [
  { id: 1, name: 'Araç Bilgileri', href: '/teklif-al/arac-bilgileri' },
  { id: 2, name: 'Hasar Bilgileri', href: '/teklif-al/hasar-bilgileri' },
  { id: 3, name: 'Ekspertiz Bilgileri', href: '/teklif-al/ekspertiz-bilgileri' },
  { id: 4, name: 'İletişim', href: '/teklif-al/iletisim' },
  { id: 5, name: 'Özet', href: '/teklif-al/ozet' },
]

export default function EkspertizBilgileriPage() {
  const router = useRouter()
  const { formData, updateFormData } = useOfferForm()
  
  // File upload states
  const [expertiseFiles, setExpertiseFiles] = useState<File[]>([])
  const [tramerFiles, setTramerFiles] = useState<File[]>([])
  const [maintenanceFiles, setMaintenanceFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ExpertiseDTO>({
    resolver: zodResolver(expertiseSchema),
    defaultValues: formData.expertise || {
      has_expertise: false,
      tramer_check: false,
      maintenance_records: false,
    },
  })

  const hasExpertise = watch('has_expertise')

  // File upload handlers
  const handleFileUpload = (files: FileList | null, type: 'expertise' | 'tramer' | 'maintenance') => {
    if (!files) return
    
    const newFiles = Array.from(files)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    const validFiles = newFiles.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} dosyası çok büyük. Maksimum 10MB olmalıdır.`)
        return false
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`${file.name} dosya formatı desteklenmiyor. Sadece JPG, PNG, GIF, PDF, DOC, DOCX formatları kabul edilir.`)
        return false
      }
      return true
    })
    
    switch (type) {
      case 'expertise':
        setExpertiseFiles(prev => [...prev, ...validFiles])
        break
      case 'tramer':
        setTramerFiles(prev => [...prev, ...validFiles])
        break
      case 'maintenance':
        setMaintenanceFiles(prev => [...prev, ...validFiles])
        break
    }
  }

  const removeFile = (index: number, type: 'expertise' | 'tramer' | 'maintenance') => {
    switch (type) {
      case 'expertise':
        setExpertiseFiles(prev => prev.filter((_, i) => i !== index))
        break
      case 'tramer':
        setTramerFiles(prev => prev.filter((_, i) => i !== index))
        break
      case 'maintenance':
        setMaintenanceFiles(prev => prev.filter((_, i) => i !== index))
        break
    }
  }

  const onSubmit = (data: ExpertiseDTO) => {
    // Add file information to the data
    const dataWithFiles = {
      ...data,
      expertiseFiles: expertiseFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
      tramerFiles: tramerFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
      maintenanceFiles: maintenanceFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    }
    
    updateFormData({ expertise: dataWithFiles })
    router.push('/teklif-al/iletisim')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-primary/5 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <ProgressStepper steps={steps} currentStep={3} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-2xl border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-secondary">
              Ekspertiz Bilgileri
            </h1>
            <p className="text-lg text-gray-600">
              Aracınızın ekspertiz raporu ve bakım kayıtları
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Ekspertiz Durumu */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg bg-gradient-to-r from-green-50 to-primary/10 p-6 border-2 border-green-200"
            >
              <div className="flex items-start space-x-3">
                <Controller
                  name="has_expertise"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="has_expertise"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1"
                    />
                  )}
                />
                <div className="flex-1">
                  <Label htmlFor="has_expertise" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                    <FileCheck className="mr-2 h-5 w-5 text-green-600" />
                    Aracımın ekspertiz raporu var
                  </Label>
                  <p className="mt-1 text-sm text-gray-500">
                    Ekspertiz raporu aracınızın değerini artırır
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ekspertiz Detayları */}
            {hasExpertise && (
              <>
                {/* Ekspertiz Şirketi & Tarih */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="expertise_company" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Ekspertiz Şirketi
                    </Label>
                    <Input
                      id="expertise_company"
                      placeholder="Örn: Any 2. El Ekspertiz"
                      {...register('expertise_company')}
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label htmlFor="expertise_date" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Ekspertiz Tarihi
                    </Label>
                    <Input
                      id="expertise_date"
                      type="date"
                      {...register('expertise_date')}
                      className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </div>

                {/* Ekspertiz Puanı */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="expertise_score" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <FileCheck className="mr-2 h-5 w-5 text-primary" />
                    Ekspertiz Puanı (0-100)
                  </Label>
                  <Input
                    id="expertise_score"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Örn: 85"
                    {...register('expertise_score', { valueAsNumber: true })}
                    className="h-12 text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.expertise_score && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center"
                    >
                      ⚠️ {errors.expertise_score.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Ekspertiz Rapor Notu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Label htmlFor="expertise_report" className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    Rapor Notu (Opsiyonel)
                  </Label>
                  <Textarea
                    id="expertise_report"
                    placeholder="Ekspertiz raporundaki önemli notlar..."
                    rows={4}
                    {...register('expertise_report')}
                    className="text-base transition-all hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </motion.div>

                {/* Ekspertiz Raporu Dosya Yükleme */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label className="mb-2 flex items-center text-base font-semibold text-gray-700">
                    <Upload className="mr-2 h-5 w-5 text-primary" />
                    Ekspertiz Raporu Yükle
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                      onChange={(e) => handleFileUpload(e.target.files, 'expertise')}
                      className="hidden"
                      id="expertise-file-upload"
                    />
                    <label htmlFor="expertise-file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Dosyaları buraya sürükleyin veya tıklayarak seçin
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
                      </p>
                    </label>
                  </div>
                  
                  {/* Yüklenen Dosyalar */}
                  {expertiseFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {expertiseFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'expertise')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {/* Tramer & Bakım Kayıtları */}
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: hasExpertise ? 0.4 : 0.2 }}
                className="rounded-lg bg-blue-50 p-5 border-2 border-blue-200"
              >
                <div className="flex items-start space-x-3">
                  <Controller
                    name="tramer_check"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="tramer_check"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="flex-1">
                    <Label htmlFor="tramer_check" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                      <Shield className="mr-2 h-5 w-5 text-blue-600" />
                      Tramer Sorgusu Yapıldı
                    </Label>
                    <p className="mt-1 text-xs text-gray-500">
                      Araç geçmişi kontrol edildi
                    </p>
                  </div>
                </div>
                
                {/* Tramer Dosya Yükleme */}
                <div className="mt-4">
                  <Label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                    <Upload className="mr-2 h-4 w-4 text-blue-600" />
                    Tramer Raporu Yükle
                  </Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                      onChange={(e) => handleFileUpload(e.target.files, 'tramer')}
                      className="hidden"
                      id="tramer-file-upload"
                    />
                    <label htmlFor="tramer-file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-1">
                        Tramer raporu yükle
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, JPG, PNG (Max 10MB)
                      </p>
                    </label>
                  </div>
                  
                  {/* Yüklenen Tramer Dosyalar */}
                  {tramerFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {tramerFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-100 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-800">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'tramer')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: hasExpertise ? 0.45 : 0.25 }}
                className="rounded-lg bg-purple-50 p-5 border-2 border-purple-200"
              >
                <div className="flex items-start space-x-3">
                  <Controller
                    name="maintenance_records"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="maintenance_records"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="flex-1">
                    <Label htmlFor="maintenance_records" className="cursor-pointer flex items-center text-base font-semibold text-gray-700">
                      <Wrench className="mr-2 h-5 w-5 text-purple-600" />
                      Bakım Kayıtları Mevcut
                    </Label>
                    <p className="mt-1 text-xs text-gray-500">
                      Düzenli bakım yapıldı
                    </p>
                  </div>
                </div>
                
                {/* Bakım Kayıtları Dosya Yükleme */}
                <div className="mt-4">
                  <Label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                    <Upload className="mr-2 h-4 w-4 text-purple-600" />
                    Bakım Kayıtları Yükle
                  </Label>
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                      onChange={(e) => handleFileUpload(e.target.files, 'maintenance')}
                      className="hidden"
                      id="maintenance-file-upload"
                    />
                    <label htmlFor="maintenance-file-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-1">
                        Bakım kayıtları yükle
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, JPG, PNG (Max 10MB)
                      </p>
                    </label>
                  </div>
                  
                  {/* Yüklenen Bakım Dosyalar */}
                  {maintenanceFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {maintenanceFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-purple-100 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-800">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'maintenance')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: hasExpertise ? 0.5 : 0.3 }}
              className="flex justify-between pt-6"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.push('/teklif-al/hasar-bilgileri')}
                className="h-12 px-8 text-base font-semibold"
              >
                ← Geri
              </Button>
              <Button type="submit" size="lg" className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                Devam Et →
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

