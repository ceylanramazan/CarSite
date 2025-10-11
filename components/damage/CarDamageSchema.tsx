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
      {/* Modern SVG Araç Şeması */}
      <div className="relative mx-auto max-w-3xl bg-gray-50 rounded-2xl p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 900"
          className="w-full h-auto"
          style={{ maxHeight: '700px' }}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          <style>{`
            .car-part {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
              stroke: #1e293b;
              stroke-width: 2;
              filter: url(#shadow);
            }
            .car-part:hover {
              stroke: #0ea5e9;
              stroke-width: 3;
              transform: scale(1.01);
              filter: url(#shadow) brightness(1.05);
            }
          `}</style>

          {/* Sağ Ön Çamurluk (Top Right) */}
          <path 
            className="car-part SagOnCamurluk" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('front-right-fender')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SagOnCamurluk')}
            d="M 520 80 L 680 80 Q 720 100 740 140 L 740 280 Q 720 250 680 230 L 560 230 L 520 80 Z"
          />

          {/* Sol Ön Çamurluk (Top Left) */}
          <path 
            className="car-part SolOnCamurluk" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('front-left-fender')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SolOnCamurluk')}
            d="M 280 80 L 120 80 Q 80 100 60 140 L 60 280 Q 80 250 120 230 L 240 230 L 280 80 Z"
          />

          {/* Kaput (Hood) */}
          <rect 
            className="car-part Kaput" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('hood')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('Kaput')}
            x="280" y="80" width="240" height="150" rx="15"
          />

          {/* Sağ Ön Kapı (Right Front Door) */}
          <rect 
            className="car-part SagOnKapi" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('right-door-front')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SagOnKapi')}
            x="560" y="280" width="120" height="140" rx="8"
          />

          {/* Sol Ön Kapı (Left Front Door) */}
          <rect 
            className="car-part SolOnKapi" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('left-door-front')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SolOnKapi')}
            x="120" y="280" width="120" height="140" rx="8"
          />

          {/* Tavan (Roof) */}
          <rect 
            className="car-part Tavan" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('roof')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('Tavan')}
            x="280" y="280" width="240" height="140" rx="10"
          />

          {/* Sağ Arka Kapı (Right Rear Door) */}
          <rect 
            className="car-part SagArkaKapi" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('right-door-rear')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SagArkaKapi')}
            x="560" y="470" width="120" height="140" rx="8"
          />

          {/* Sol Arka Kapı (Left Rear Door) */}
          <rect 
            className="car-part SolArkaKapi" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('left-door-rear')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SolArkaKapi')}
            x="120" y="470" width="120" height="140" rx="8"
          />

          {/* Bagaj (Trunk) */}
          <rect 
            className="car-part Bagaj" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('trunk')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('Bagaj')}
            x="280" y="660" width="240" height="150" rx="15"
          />

          {/* Sağ Arka Çamurluk (Bottom Right) */}
          <path 
            className="car-part SagArkaCamurluk" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('rear-right-fender')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SagArkaCamurluk')}
            d="M 520 810 L 680 810 Q 720 790 740 750 L 740 610 Q 720 640 680 660 L 560 660 L 520 810 Z"
          />

          {/* Sol Arka Çamurluk (Bottom Left) */}
          <path 
            className="car-part SolArkaCamurluk" 
            onClick={handlePathClick}
            onMouseEnter={() => setHoveredPart('rear-left-fender')}
            onMouseLeave={() => setHoveredPart(null)}
            fill={getPartFill('SolArkaCamurluk')}
            d="M 280 810 L 120 810 Q 80 790 60 750 L 60 610 Q 80 640 120 660 L 240 660 L 280 810 Z"
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

