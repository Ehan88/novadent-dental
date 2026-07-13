import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ChevronDown } from 'lucide-react'

// FDI tooth numbering: 11-18 (upper right), 21-28 (upper left), 31-38 (lower left), 41-48 (lower right)
const TEETH = {
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
  upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  lowerRight: [41, 42, 43, 44, 45, 46, 47, 48],
}

const SERVICE_COLORS = {
  'Dental Implant': '#0ea5e9',
  'Crown': '#8b5cf6',
  'Filling': '#06d6a0',
  'Root Canal': '#f59e0b',
  'Extraction': '#ef4444',
  'Whitening': '#ec4899',
  'Bridge': '#6366f1',
  'Veneer': '#14b8a6',
  'Bonding': '#84cc16',
  'Scaling': '#f97316',
  'None': '#374151',
}

const SERVICES = Object.keys(SERVICE_COLORS).filter(s => s !== 'None')

const TOOTH_NAMES = {
  11: 'Upper Right Central Incisor', 12: 'Upper Right Lateral Incisor',
  13: 'Upper Right Canine', 14: 'Upper Right 1st Premolar',
  15: 'Upper Right 2nd Premolar', 16: 'Upper Right 1st Molar',
  17: 'Upper Right 2nd Molar', 18: 'Upper Right 3rd Molar',
  21: 'Upper Left Central Incisor', 22: 'Upper Left Lateral Incisor',
  23: 'Upper Left Canine', 24: 'Upper Left 1st Premolar',
  25: 'Upper Left 2nd Premolar', 26: 'Upper Left 1st Molar',
  27: 'Upper Left 2nd Molar', 28: 'Upper Left 3rd Molar',
  31: 'Lower Left Central Incisor', 32: 'Lower Left Lateral Incisor',
  33: 'Lower Left Canine', 34: 'Lower Left 1st Premolar',
  35: 'Lower Left 2nd Premolar', 36: 'Lower Left 1st Molar',
  37: 'Lower Left 2nd Molar', 38: 'Lower Left 3rd Molar',
  41: 'Lower Right Central Incisor', 42: 'Lower Right Lateral Incisor',
  43: 'Lower Right Canine', 44: 'Lower Right 1st Premolar',
  45: 'Lower Right 2nd Premolar', 46: 'Lower Right 1st Molar',
  47: 'Lower Right 2nd Molar', 48: 'Lower Right 3rd Molar',
}

function ToothSVG({ number, service, isSelected, isHovered, onClick, onHover, onLeave }) {
  const color = service ? SERVICE_COLORS[service] : '#64748b'
  const isActive = isSelected || isHovered

  // Tooth shape varies by type
  const isMolar = [16,17,18,26,27,28,36,37,38,46,47,48].includes(number)
  const isPremolar = [14,15,24,25,34,35,44,45].includes(number)
  const isCanine = [13,23,33,43].includes(number)

  // Scale factors for tooth size
  const w = isMolar ? 38 : isPremolar ? 34 : isCanine ? 30 : 28
  const h = isMolar ? 42 : isPremolar ? 38 : isCanine ? 40 : 36
  const rx = isMolar ? 6 : isPremolar ? 8 : isCanine ? 10 : 6

  return (
    <g
      transform={`translate(${28 - w/2}, ${30 - h/2})`}
      onClick={() => onClick(number)}
      onMouseEnter={() => onHover(number)}
      onMouseLeave={onLeave}
      className="cursor-pointer"
      style={{ transition: 'all 0.2s ease' }}
    >
      {/* Tooth body */}
      <rect
        x="0" y="0" width={w} height={h}
        rx={rx}
        fill={isActive ? color : `${color}22`}
        stroke={color}
        strokeWidth={isActive ? 2.5 : 1.5}
        style={{ transition: 'all 0.2s ease' }}
      />
      {/* Root lines for molars */}
      {isMolar && (
        <>
          <line x1={w*0.3} y1={h-2} x2={w*0.25} y2={h+8} stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1={w*0.5} y1={h-1} x2={w*0.5} y2={h+10} stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1={w*0.7} y1={h-2} x2={w*0.75} y2={h+8} stroke={color} strokeWidth="1.5" opacity="0.5" />
        </>
      )}
      {/* Root for other teeth */}
      {!isMolar && (
        <line x1={w/2} y1={h-2} x2={w/2} y2={h+8} stroke={color} strokeWidth="1.5" opacity="0.5" />
      )}
      {/* Tooth number */}
      <text
        x={w/2} y={h/2 + 4}
        textAnchor="middle"
        fill={isActive ? '#fff' : color}
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        {number}
      </text>
      {/* Service indicator dot */}
      {service && (
        <circle cx={w-4} cy="4" r="4" fill={color} stroke="#fff" strokeWidth="1" />
      )}
    </g>
  )
}

export default function DentalChart({ treatmentPlan = {}, onToothSelect }) {
  const [selectedTooth, setSelectedTooth] = useState(null)
  const [hoveredTooth, setHoveredTooth] = useState(null)
  const [showServiceMenu, setShowServiceMenu] = useState(false)

  const handleToothClick = (number) => {
    setSelectedTooth(number)
    setShowServiceMenu(true)
  }

  const handleAssignService = (tooth, service) => {
    onToothSelect(tooth, service)
    setShowServiceMenu(false)
    setSelectedTooth(null)
  }

  const handleClearTooth = (tooth) => {
    onToothSelect(tooth, null)
    setShowServiceMenu(false)
    setSelectedTooth(null)
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">Interactive Dental Chart</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(SERVICE_COLORS).filter(([k]) => k !== 'None').map(([service, color]) => (
            <span key={service} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-gray-600 dark:text-gray-400">{service}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 520 340"
          className="w-full max-w-2xl mx-auto"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
        >
          {/* Arch labels */}
          <text x="130" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" letterSpacing="2">UPPER RIGHT</text>
          <text x="390" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" letterSpacing="2">UPPER LEFT</text>
          <text x="130" y="328" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" letterSpacing="2">LOWER RIGHT</text>
          <text x="390" y="328" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600" letterSpacing="2">LOWER LEFT</text>

          {/* Upper arch curve */}
          <path
            d="M 30,130 Q 260,50 490,130"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Lower arch curve */}
          <path
            d="M 30,210 Q 260,290 490,210"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Upper Right teeth (11-18) */}
          {TEETH.upperRight.map((num, i) => (
            <g key={num} transform={`translate(${45 + i * 52}, 55)`}>
              <ToothSVG
                number={num}
                service={treatmentPlan[num]?.service}
                isSelected={selectedTooth === num}
                isHovered={hoveredTooth === num}
                onClick={handleToothClick}
                onHover={setHoveredTooth}
                onLeave={() => setHoveredTooth(null)}
              />
            </g>
          ))}

          {/* Upper Left teeth (21-28) */}
          {TEETH.upperLeft.map((num, i) => (
            <g key={num} transform={`translate(${265 + i * 52}, 55)`}>
              <ToothSVG
                number={num}
                service={treatmentPlan[num]?.service}
                isSelected={selectedTooth === num}
                isHovered={hoveredTooth === num}
                onClick={handleToothClick}
                onHover={setHoveredTooth}
                onLeave={() => setHoveredTooth(null)}
              />
            </g>
          ))}

          {/* Lower Left teeth (31-38) */}
          {TEETH.lowerLeft.map((num, i) => (
            <g key={num} transform={`translate(${45 + i * 52}, 215)`}>
              <ToothSVG
                number={num}
                service={treatmentPlan[num]?.service}
                isSelected={selectedTooth === num}
                isHovered={hoveredTooth === num}
                onClick={handleToothClick}
                onHover={setHoveredTooth}
                onLeave={() => setHoveredTooth(null)}
              />
            </g>
          ))}

          {/* Lower Right teeth (41-48) */}
          {TEETH.lowerRight.map((num, i) => (
            <g key={num} transform={`translate(${265 + i * 52}, 215)`}>
              <ToothSVG
                number={num}
                service={treatmentPlan[num]?.service}
                isSelected={selectedTooth === num}
                isHovered={hoveredTooth === num}
                onClick={handleToothClick}
                onHover={setHoveredTooth}
                onLeave={() => setHoveredTooth(null)}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredTooth && !showServiceMenu && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="text-center mt-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white/10 text-white text-sm font-medium">
              Tooth #{hoveredTooth} — {TOOTH_NAMES[hoveredTooth]}
              {treatmentPlan[hoveredTooth]?.service && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: SERVICE_COLORS[treatmentPlan[hoveredTooth].service] }}>
                  {treatmentPlan[hoveredTooth].service}
                </span>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Assignment Popup */}
      <AnimatePresence>
        {showServiceMenu && selectedTooth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowServiceMenu(false); setSelectedTooth(null) }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Tooth #{selectedTooth}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{TOOTH_NAMES[selectedTooth]}</p>
                </div>
                <button onClick={() => { setShowServiceMenu(false); setSelectedTooth(null) }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">Assign Treatment</p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map(service => (
                  <button
                    key={service}
                    onClick={() => handleAssignService(selectedTooth, service)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      treatmentPlan[selectedTooth]?.service === service
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: SERVICE_COLORS[service] }} />
                    {service}
                    {treatmentPlan[selectedTooth]?.service === service && <Check className="w-3.5 h-3.5 ml-auto" />}
                  </button>
                ))}
              </div>

              {treatmentPlan[selectedTooth]?.service && (
                <button
                  onClick={() => handleClearTooth(selectedTooth)}
                  className="w-full mt-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                >
                  Clear Treatment
                </button>
              )}

              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10 text-xs text-gray-400 text-center">
                Click a tooth → pick a service → chart updates instantly
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { SERVICE_COLORS, TOOTH_NAMES, SERVICES }
