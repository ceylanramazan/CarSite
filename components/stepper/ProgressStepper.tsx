'use client'

import { cn } from '@/lib/utils'

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
    <nav aria-label="Progress" className="mb-6 sm:mb-8">
      <div className="mx-auto max-w-4xl px-4">
        <ol className="flex items-center justify-between relative">
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
                  <div className="absolute left-1/2 right-0 top-[20px] sm:top-[24px] -translate-y-1/2 h-[3px] w-full z-0">
                    <div 
                      className={cn(
                        "h-full w-full",
                        isCompleted ? "bg-primary" : "bg-gray-300"
                      )}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full font-bold transition-all duration-200",
                      "h-10 w-10 sm:h-12 sm:w-12",
                      "text-sm sm:text-base",
                      (isCompleted || isCurrent) && "bg-primary text-white",
                      isPending && "bg-white border-[3px] border-primary text-primary"
                    )}
                  >
                    {step.id}
                  </div>

                  {/* Step Label */}
                  <span
                    className={cn(
                      'mt-2 sm:mt-3 text-center text-[11px] sm:text-xs font-medium px-1',
                      (isCurrent || isCompleted) && 'text-primary',
                      isPending && 'text-gray-500'
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
