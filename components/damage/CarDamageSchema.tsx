'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CarPart {
  id: string
  name: string
  path: string
}

const CAR_PARTS: CarPart[] = [
  { id: 'hood', name: 'Kaput', path: 'M150,80 L250,80 L260,120 L140,120 Z' },
  { id: 'roof', name: 'Tavan', path: 'M140,120 L260,120 L260,180 L140,180 Z' },
  { id: 'trunk', name: 'Bagaj', path: 'M140,180 L260,180 L250,220 L150,220 Z' },
  { id: 'front-bumper', name: 'Ön Tampon', path: 'M130,60 L270,60 L260,80 L140,80 Z' },
  { id: 'rear-bumper', name: 'Arka Tampon', path: 'M140,220 L260,220 L270,240 L130,240 Z' },
  { id: 'front-left-fender', name: 'Ön Sol Çamurluk', path: 'M100,90 L140,80 L140,120 L100,130 Z' },
  { id: 'front-right-fender', name: 'Ön Sağ Çamurluk', path: 'M260,80 L300,90 L300,130 L260,120 Z' },
  { id: 'rear-left-fender', name: 'Arka Sol Çamurluk', path: 'M100,170 L140,180 L140,220 L100,210 Z' },
  { id: 'rear-right-fender', name: 'Arka Sağ Çamurluk', path: 'M260,180 L300,170 L300,210 L260,220 Z' },
  { id: 'left-door-front', name: 'Sol Ön Kapı', path: 'M100,120 L140,120 L140,150 L100,150 Z' },
  { id: 'right-door-front', name: 'Sağ Ön Kapı', path: 'M260,120 L300,120 L300,150 L260,150 Z' },
  { id: 'left-door-rear', name: 'Sol Arka Kapı', path: 'M100,150 L140,150 L140,180 L100,180 Z' },
  { id: 'right-door-rear', name: 'Sağ Arka Kapı', path: 'M260,150 L300,150 L300,180 L260,180 Z' },
]

interface CarDamageSchemaProps {
  selectedParts: string[]
  onPartToggle: (partId: string) => void
}

export default function CarDamageSchema({
  selectedParts,
  onPartToggle,
}: CarDamageSchemaProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* SVG Car Schema */}
      <div className="relative mx-auto max-w-lg">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Car Base */}
          <rect
            x="130"
            y="60"
            width="140"
            height="180"
            fill="#e5e7eb"
            stroke="#9ca3af"
            strokeWidth="2"
            rx="8"
          />

          {/* Car Parts */}
          {CAR_PARTS.map((part) => {
            const isSelected = selectedParts.includes(part.id)
            const isHovered = hoveredPart === part.id

            return (
              <motion.path
                key={part.id}
                d={part.path}
                fill={isSelected ? '#0ea5e9' : isHovered ? '#e0f2fe' : '#f3f4f6'}
                stroke={isSelected ? '#0284c7' : '#9ca3af'}
                strokeWidth="2"
                className="cursor-pointer transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPartToggle(part.id)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  filter: isSelected
                    ? 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.5))'
                    : 'none',
                }}
              />
            )
          })}

          {/* Windshields */}
          <rect
            x="150"
            y="100"
            width="100"
            height="40"
            fill="#bfdbfe"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.6"
          />
          <rect
            x="150"
            y="160"
            width="100"
            height="40"
            fill="#bfdbfe"
            stroke="#60a5fa"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Wheels */}
          <circle cx="130" cy="100" r="15" fill="#374151" stroke="#1f2937" strokeWidth="2" />
          <circle cx="270" cy="100" r="15" fill="#374151" stroke="#1f2937" strokeWidth="2" />
          <circle cx="130" cy="200" r="15" fill="#374151" stroke="#1f2937" strokeWidth="2" />
          <circle cx="270" cy="200" r="15" fill="#374151" stroke="#1f2937" strokeWidth="2" />
        </svg>

        {/* Hovered Part Label */}
        {hoveredPart && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg pointer-events-none z-10"
          >
            {CAR_PARTS.find((p) => p.id === hoveredPart)?.name}
          </motion.div>
        )}
      </div>

      {/* Legend & Grid Buttons */}
      <div>
        <div className="mb-4 flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-primary border-2 border-primary" />
            <span className="text-gray-700">Seçili</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-gray-100 border-2 border-gray-400" />
            <span className="text-gray-700">Seçilmemiş</span>
          </div>
        </div>

        {/* Grid Buttons for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CAR_PARTS.map((part) => {
            const isSelected = selectedParts.includes(part.id)
            return (
              <motion.button
                key={part.id}
                type="button"
                onClick={() => onPartToggle(part.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all',
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-primary/5'
                )}
              >
                {part.name}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Info */}
      <p className="text-center text-sm text-gray-500">
        💡 Hasarlı veya değişen parçaları işaretleyiniz
      </p>
    </div>
  )
}

