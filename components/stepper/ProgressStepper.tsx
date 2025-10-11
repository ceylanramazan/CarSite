'use client'

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
    <nav aria-label="Progress" className="mb-8 sm:mb-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => {
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              const isPending = currentStep < step.id

              return (
                <li
                  key={step.id}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {/* Bağlantı çizgisi */}
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute left-[50%] right-[-50%] top-[28px] sm:top-[32px] h-0.5 sm:h-1 -z-10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: isCompleted ? 1 : 0
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full w-full bg-primary origin-left"
                        style={{ transformOrigin: 'left' }}
                      />
                      <div 
                        className={cn(
                          "absolute top-0 left-0 h-full w-full -z-10",
                          isCompleted ? "bg-primary" : "bg-gray-300"
                        )}
                      />
                    </div>
                  )}

                  {/* Step Circle */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: stepIdx * 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }}
                      className={cn(
                        "flex items-center justify-center rounded-full font-bold text-base sm:text-lg transition-all duration-300",
                        "h-14 w-14 sm:h-16 sm:w-16",
                        (isCompleted || isCurrent) && "bg-primary text-white shadow-lg",
                        isPending && "bg-white border-2 sm:border-[3px] border-primary text-primary"
                      )}
                    >
                      {step.id}
                    </motion.div>

                    {/* Step Label */}
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stepIdx * 0.1 + 0.2 }}
                      className={cn(
                        'mt-2 sm:mt-3 text-center text-xs sm:text-sm font-medium px-1 sm:px-2 whitespace-nowrap',
                        (isCurrent || isCompleted) && 'text-primary font-semibold',
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
