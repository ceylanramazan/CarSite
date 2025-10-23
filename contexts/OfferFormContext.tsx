'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { OfferFormData } from '@/types'

interface OfferFormContextType {
  formData: OfferFormData
  updateFormData: (data: Partial<OfferFormData>) => void
  resetFormData: () => void
}

const OfferFormContext = createContext<OfferFormContextType | undefined>(
  undefined
)

export function OfferFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<OfferFormData>({})

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('offerFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        console.log('📦 Form data loaded from localStorage:', parsedData)
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('offerFormData', JSON.stringify(formData))
      console.log('💾 Form data saved to localStorage:', formData)
    }
  }, [formData])

  const updateFormData = (data: Partial<OfferFormData>) => {
    console.log('🔄 Updating form data:', data)
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetFormData = () => {
    console.log('🗑️ Resetting form data')
    setFormData({})
    localStorage.removeItem('offerFormData')
  }

  return (
    <OfferFormContext.Provider
      value={{ formData, updateFormData, resetFormData }}
    >
      {children}
    </OfferFormContext.Provider>
  )
}

export function useOfferForm() {
  const context = useContext(OfferFormContext)
  if (!context) {
    throw new Error('useOfferForm must be used within OfferFormProvider')
  }
  return context
}

