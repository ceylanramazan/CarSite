'use client'

import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Step {
  id: number
  name: string
  href: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
}

export default function ProgressStepper({
  steps,
  currentStep,
}: ProgressStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <div className="mx-auto max-w-4xl px-4">
        <ol className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={cn(
                'relative flex flex-col items-center',
                stepIdx !== steps.length - 1 ? 'flex-1' : ''
              )}
            >
              {/* Line - sadece son adım değilse göster */}
              {stepIdx < steps.length - 1 && (
                <div className="absolute left-1/2 top-6 h-1 w-full">
                  <div className="h-full w-full bg-gray-200/50 rounded-full">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: currentStep > step.id ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Circle */}
              <div className="relative z-10">
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg"
                  >
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </motion.div>
                ) : currentStep === step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-primary bg-white shadow-lg"
                  >
                    <div className="h-5 w-5 rounded-full bg-primary animate-pulse" />
                  </motion.div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'mt-3 text-center text-sm font-semibold sm:text-base',
                  currentStep >= step.id 
                    ? 'text-primary' 
                    : 'text-gray-500'
                )}
              >
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

