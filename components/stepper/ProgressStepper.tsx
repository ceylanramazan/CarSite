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
    <nav aria-label="Progress" className="mb-10">
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative">
          <ol className="flex items-start justify-between">
            {steps.map((step, stepIdx) => {
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              const isPending = currentStep < step.id

              return (
                <li
                  key={step.id}
                  className={cn(
                    'relative flex flex-col items-center',
                    'w-full'
                  )}
                >
                  {/* Bağlantı çizgisi - SADECE son adım değilse göster */}
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute left-[calc(50%+2rem)] top-8 h-1 w-[calc(100%-4rem)] -z-10">
                      {/* Arka plan çizgisi - her zaman görünür (gri) */}
                      <div className="h-full w-full bg-gray-300 rounded-full relative">
                        {/* Dolum çizgisi - sadece tamamlanan adımlarda (mavi) */}
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ 
                            width: isCompleted ? '100%' : '0%'
                          }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary to-primary/90 rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step Circle */}
                  <div className="relative z-10 flex flex-col items-center">
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 200,
                          damping: 15
                        }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg ring-4 ring-primary/20"
                      >
                        <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2.5} />
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 200,
                          damping: 15
                        }}
                        className="relative flex h-16 w-16 items-center justify-center"
                      >
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-white shadow-xl">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-xl">
                            {step.id}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-50 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500 font-semibold text-lg">
                          {step.id}
                        </div>
                      </div>
                    )}

                    {/* Step Label */}
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stepIdx * 0.1 }}
                      className={cn(
                        'mt-4 text-center text-sm font-bold sm:text-base px-2',
                        isCurrent && 'text-primary',
                        isCompleted && 'text-primary',
                        isPending && 'text-gray-500'
                      )}
                    >
                      {step.name}
                    </motion.span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </nav>
  )
}
