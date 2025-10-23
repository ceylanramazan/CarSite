'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { OfferFormData } from '@/types'

interface OfferFormContextType {
  formData: OfferFormData
  updateFormData: (data: Partial<OfferFormData>) => void
  resetFormData: () => void
  isLoaded: boolean
}

const OfferFormContext = createContext<OfferFormContextType | undefined>(
  undefined
)

export function OfferFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<OfferFormData>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load form data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('offerFormData')
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setFormData(parsedData)
          console.log('📦 Form data loaded from localStorage:', parsedData)
        } else {
          console.log('📦 No saved data in localStorage')
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    // Delay to ensure localStorage is available
    const timer = setTimeout(loadData, 100)
    return () => clearTimeout(timer)
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('offerFormData', JSON.stringify(formData))
    }
  }, [formData])

  const updateFormData = (data: Partial<OfferFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetFormData = () => {
    console.log('🗑️ Resetting form data')
    setFormData({})
    localStorage.removeItem('offerFormData')
  }

  return (
    <OfferFormContext.Provider
      value={{ formData, updateFormData, resetFormData, isLoaded }}
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

