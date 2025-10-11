'use client'

import { CheckCircle2 } from 'lucide-react'
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
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={cn(
              'relative flex flex-col items-center',
              stepIdx !== steps.length - 1 ? 'flex-1' : ''
            )}
          >
            {/* Line */}
            {stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  'absolute left-1/2 top-4 h-0.5 w-full',
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                )}
                aria-hidden="true"
              />
            )}

            {/* Circle */}
            <div className="relative z-10">
              {currentStep > step.id ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              ) : currentStep === step.id ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <div className="h-2 w-2 rounded-full bg-gray-300" />
                </div>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'mt-2 text-xs font-medium sm:text-sm',
                currentStep >= step.id ? 'text-primary' : 'text-gray-500'
              )}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

