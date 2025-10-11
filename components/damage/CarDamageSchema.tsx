'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Araç parçaları ve SVG class isimleri eşleştirmesi
const CAR_PARTS_MAP: Record<string, string> = {
  'hood': 'Kaput',
  'roof': 'Tavan', 
  'trunk': 'Bagaj',
  'front-left-fender': 'Sol Ön Çamurluk',
  'front-right-fender': 'Sağ Ön Çamurluk',
  'rear-left-fender': 'Sol Arka Çamurluk',
  'rear-right-fender': 'Sağ Arka Çamurluk',
  'left-door-front': 'Sol Ön Kapı',
  'right-door-front': 'Sağ Ön Kapı',
  'left-door-rear': 'Sol Arka Kapı',
  'right-door-rear': 'Sağ Arka Kapı',
}

interface CarDamageSchemaProps {
  selectedParts: string[]
  onPartToggle: (partId: string) => void
}

export default function CarDamageSchema({
  selectedParts,
  onPartToggle,
}: CarDamageSchemaProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  // SVG path elementine tıklandığında
  const handlePathClick = (e: React.MouseEvent<SVGPathElement>) => {
    const target = e.currentTarget
    const classList = target.getAttribute('class') || ''
    
    // Class'tan parça ismini bul
    const partClasses = ['SolOnCamurluk', 'SagOnCamurluk', 'SolArkaCamurluk', 'SagArkaCamurluk',
                         'SolOnKapi', 'SagOnKapi', 'SolArkaKapi', 'SagArkaKapi', 
                         'Kaput', 'Tavan', 'Bagaj']
    
    const foundPart = partClasses.find(part => classList.includes(part))
    if (foundPart) {
      // Türkçe isimden key'e çevir
      const partKey = foundPart.toLowerCase()
        .replace('soloncamurluk', 'front-left-fender')
        .replace('sagoncamurluk', 'front-right-fender')
        .replace('solarkacamurluk', 'rear-left-fender')
        .replace('sagarkacamurluk', 'rear-right-fender')
        .replace('solonkapi', 'left-door-front')
        .replace('sagonkapi', 'right-door-front')
        .replace('solarkakapi', 'left-door-rear')
        .replace('sagarkakapi', 'right-door-rear')
        .replace('kaput', 'hood')
        .replace('tavan', 'roof')
        .replace('bagaj', 'trunk')
      
      onPartToggle(partKey)
    }
  }

  const getPartFill = (partClass: string) => {
    const partKey = partClass.toLowerCase()
      .replace('soloncamurluk', 'front-left-fender')
      .replace('sagoncamurluk', 'front-right-fender')
      .replace('solarkacamurluk', 'rear-left-fender')
      .replace('sagarkacamurluk', 'rear-right-fender')
      .replace('solonkapi', 'left-door-front')
      .replace('sagonkapi', 'right-door-front')
      .replace('solarkakapi', 'left-door-rear')
      .replace('sagarkakapi', 'right-door-rear')
      .replace('kaput', 'hood')
      .replace('tavan', 'roof')
      .replace('bagaj', 'trunk')
    
    return selectedParts.includes(partKey) ? '#ef4444' : '#FFFFFF'
  }

  return (
    <div className="space-y-6">
      {/* Profesyonel SVG Araç Şeması */}
      <div className="relative mx-auto max-w-2xl">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 616.62 662.77"
          className="w-full h-auto drop-shadow-2xl"
          style={{ maxHeight: '600px' }}
        >
          <style>{`
            .car-part {
              transition: all 0.2s ease;
              cursor: pointer;
              stroke: #000;
              stroke-width: 0.75;
            }
            .car-part:hover {
              opacity: 0.8;
              filter: brightness(0.95);
            }
          `}</style>

          {/* Sağ Arka Kapı */}
          <path 
            className="car-part SagArkaKapi" 
            onClick={handlePathClick}
            fill={getPartFill('SagArkaKapi')}
            d="M243.69,241.41c-4.57-19.97-11.12-40.1-17.15-59.74l-36.62-0.5c-0.21,5.59-3.73,62.12-61.99,72.6
            c0.1,15.33,0.22,30.67,0.21,46c0,0.32,0,0.64,0,0.96h76.44c2.41-38.85,5.76-77.61,10.71-116.25c0.48-0.09,0.96-0.17,1.44-0.26
            c1.56,4.6,3.28,9.15,4.67,13.81c10.01,33.52,17.05,67.69,18.58,102.71h10.01C250.56,281,248.22,261.17,243.69,241.41z" 
          />

          {/* Sağ Ön Kapı */}
          <path 
            className="car-part SagOnKapi" 
            onClick={handlePathClick}
            fill={getPartFill('SagOnKapi')}
            d="M239.97,300.74c0.2,4.57,0.32,9.15,0.32,13.74c0.06,36.54-10.22,60.71-33.58,87.28
            c-1.04,1.18-2.25,2.2-4.08,3.11c1.15-37.17-0.36-67.09,1.94-104.13h-76.44c0,0.36,0,0.72,0,1.08
            c-0.04,39.29-0.17,78.58-0.26,117.87c0,1.97,0,3.94,0,6.34c1.54,0.23,2.35,0.45,3.15,0.45c22.15,0.02,44.31,0.1,66.46-0.11
            c1.87-0.02,4.43-1.57,5.46-3.19c7.21-11.35,14.35-22.76,21-34.44c5.25-9.22,10.74-18.48,14.45-28.35c7.4-19.65,11-39.6,11.59-59.66
            H239.97z" 
          />

          {/* Sağ Arka Çamurluk */}
          <path 
            className="car-part SagArkaCamurluk" 
            onClick={handlePathClick}
            fill={getPartFill('SagArkaCamurluk')}
            d="M212.94,181.71l-23.01,0c0,0-0.63,61.34-62.48,72.15c0-9.19,0-17.39,0-26.57
            c19.43-5.13,33.86-24.01,30.47-49.63c-1.33-10.06-6.33-18.93-13.68-26.21c-10.35-10.26-23.19-12.81-37.33-11.7
            c0.25-2.4,0.45-4.33,0.7-6.8c8.82,2.04,17.15,4.29,25.6,5.84c8.53,1.56,16.68,5.73,25.84,3.49c7.91-1.93,15.93-3.68,24-4.62
            c7.09-0.83,11.41-3.42,11.68-11.12c0.07-2.13,0.92-4.23,1.47-6.33c1.92-7.33,5.43-14.78-3.23-21.52c6.27-0.82,8.64,1.11,9.32,5.65
            c0.62,4.11,1.13,8.31,2.4,12.24c7.32,22.72,16.68,42.43,24.16,65.1l-14.36,0.05" 
          />

          {/* Sol Ön Kapı */}
          <path 
            className="car-part SolOnKapi" 
            onClick={handlePathClick}
            fill={getPartFill('SolOnKapi')}
            d="M430.28,301.04c2.36,37.05,3.77,74.07,4.82,111.23c-1.53-1.36-3.18-2.59-4.56-4.09
            c-28.05-30.53-40.68-66.31-38.24-107.15h-9.22c0.5,19.27,3.53,38.31,10.32,56.96c8.52,23.4,22.64,43.78,35.74,64.68
            c1.83,2.93,3.96,3.91,7.33,3.89c20.99-0.13,41.98-0.05,62.97-0.07c1.58,0,3.16-0.23,4.9-0.36v-125.1H430.28z" 
          />

          {/* Sol Arka Kapı */}
          <path 
            className="car-part SolArkaKapi" 
            onClick={handlePathClick}
            fill={getPartFill('SolArkaKapi')}
            d="M443.22,182.93l-24.36,0.08c-0.06-0.43-0.11-0.87-0.17-1.3c5.47,40.07,9.09,79.88,11.61,119.64h74.04v-48.19
            C442.5,242.35,443.22,182.93,443.22,182.93z" 
          />

          {/* Sol Arka Çamurluk */}
          <path 
            className="car-part SolArkaCamurluk" 
            onClick={handlePathClick}
            fill={getPartFill('SolArkaCamurluk')}
            d="M498.58,137.09c-8.53,1.56-16.68,5.73-25.84,3.49c-7.91-1.93-15.93-3.68-24-4.62
            c-7.09-0.83-11.41-3.42-11.68-11.12c-0.07-2.13-0.92-4.23-1.47-6.33c-1.92-7.33-5.43-14.78,3.23-21.52
            c-6.27-0.82-8.64,1.11-9.32,5.65c-0.62,4.11-1.13,8.31-2.4,12.24c-7.32,22.72-14.68,45.43-22.16,68.1l12.36,0.05l0.5,0
            c0.24-0.34,0.54-0.76,0.9-1.3c0.06,0.43,0.11,0.87,0.17,1.3l24.36-0.08c0,0-0.72,59.42,61.12,70.23c0-9.19,0-18.39,0-27.57
            c-19.43-5.13-33.86-24.01-30.47-49.63c1.33-10.06,6.33-18.93,13.68-26.21c10.35-10.26,23.19-12.81,37.33-11.7
            c-0.25-2.4-0.45-4.33-0.7-6.80C515.35,133.3,507.03,135.54,498.58,137.09z" 
          />

          {/* Kaput */}
          <path 
            className="car-part Kaput" 
            onClick={handlePathClick}
            fill={getPartFill('Kaput')}
            d="M222.98,399.77c5.12,3.76,11.37,4.42,12.4,11.59c0.25,1.74,3.29,3.94,5.38,4.40
            c10.86,2.36,21.76,5.43,32.77,6.01c22.61,1.19,45.33,1.90,67.92,0.98c15.66-0.64,31.22-4.25,46.79-6.69
            c4.40-0.69,6.58-3.56,8.76-7.69c1.88-3.56,6.88-5.46,10.52-8.10c0,12.32,0.29,23.76-0.06,35.18c-0.71,22.97-0.77,46.02-2.93,68.86
            c-3.14,33.24-20.68,53.65-53.25,61.98c-25.44,6.51-51.38,7.43-76.93-0.46c-29.08-8.99-47.22-31.66-48.61-62.18
            c-1.53-33.44-2.03-66.93-2.97-100.39C222.75,402.46,222.86,401.66,222.98,399.77z" 
          />

          {/* Tavan */}
          <path 
            className="car-part Tavan" 
            onClick={handlePathClick}
            fill={getPartFill('Tavan')}
            d="M379.52,354.19c-42.83,6.8-85.11,5.3-127.72,0.29c6.74-38.78,9.5-77.79,0.01-116.84c42.56,0,85,0,127.97,0
            C370.09,276.67,372.71,315.59,379.52,354.19z" 
          />

          {/* Bagaj */}
          <path 
            className="car-part Bagaj" 
            onClick={handlePathClick}
            fill={getPartFill('Bagaj')}
            d="M398.52,196.75c-4.3-2.49-7.59-4.72-11.15-6.39c-4.86-2.28-9.83-5.58-14.91-5.91
            c-24.07-1.56-48.19-2.93-72.29-3.02c-14.57-0.05-29.18,2.15-43.71,3.84c-3.6,0.42-7.09,2.58-10.42,4.34
            c-3.76,1.99-7.28,4.44-11.81,7.24c-0.73-3.9-1.81-6.9-1.77-9.89c0.27-17.81,0.73-35.62,1.34-53.43c0.06-1.7,1.22-3.73,2.5-4.97
            c11.6-11.21,26.08-16.89,41.37-20.70c18.32-4.57,36.92-6.96,55.78-4.72c22.95,2.72,44.59,9.06,62.13,25.16
            c1.59,1.46,2.87,4.07,2.96,6.20c0.74,17.46,1.24,34.94,1.59,52.41C400.2,189.92,399.18,192.95,398.52,196.75z" 
          />

          {/* Sağ Ön Çamurluk */}
          <path 
            className="car-part SagOnCamurluk" 
            onClick={handlePathClick}
            fill={getPartFill('SagOnCamurluk')}
            d="M176.87,550.32c0-6.78,1.69-13.95-0.35-19.8c-4.27-12.21-5.8-25.62-14.15-36.28
            c-0.75-0.96-1.22-2.41-1.21-3.64c0.18-23.61-10.82-39.33-33.19-47.3c0-5.21,0-10.48,0-16.23c23.87,0,47.53,0,71.19,0
            C201.2,447.1,184.47,540.08,176.87,550.32z" 
          />

          {/* Sol Ön Çamurluk */}
          <path 
            className="car-part SolOnCamurluk" 
            onClick={handlePathClick}
            fill={getPartFill('SolOnCamurluk')}
            d="M504.43,427.08c0,5.7,0,11,0,16.58c-16.32,4.79-28.76,15.47-30.69,31.94c-1.86,15.78-10.52,28.59-13.81,43.55
            c-1.67,7.59-5.64,14.73-4.98,22.93c0.19,2.31,0.42,4.62,0.63,6.93c-0.46,0.13-0.91,0.27-1.37,0.4c-1.83-6.13-4-12.18-5.44-18.40
            c-7.90-34.08-12.49-68.68-15.94-103.94C456.56,427.08,480.25,427.08,504.43,427.08z" 
          />
        </svg>

        {/* Hover Tooltip */}
        {hoveredPart && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg pointer-events-none z-10"
          >
            {CAR_PARTS_MAP[hoveredPart]}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
        <div className="flex items-center justify-center gap-6 flex-wrap text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded border-2 border-gray-400 bg-white" />
            <span className="text-gray-700">Orijinal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded border-2 border-red-500 bg-red-500" />
            <span className="text-gray-700">Değişen/Hasarlı</span>
          </div>
        </div>
      </div>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(CAR_PARTS_MAP).map(([partKey, partName]) => {
          const isSelected = selectedParts.includes(partKey)
          return (
            <motion.button
              key={partKey}
              type="button"
              onClick={() => onPartToggle(partKey)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all',
                isSelected
                  ? 'bg-red-500 text-white border-red-500 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:bg-red-50'
              )}
            >
              {partName}
            </motion.button>
          )
        })}
      </div>

      {/* Info */}
      <p className="text-center text-sm text-gray-500">
        💡 Hasarlı veya değişen parçaları seçiniz (SVG üzerinden veya butonlardan)
      </p>
    </div>
  )
}

