'use client'

import React, { createContext, useContext, useState } from 'react'
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

  const updateFormData = (data: Partial<OfferFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetFormData = () => {
    setFormData({})
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

