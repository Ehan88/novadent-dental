import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Clock } from 'lucide-react'

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Stethoscope

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card rounded-2xl p-6 group cursor-pointer h-full"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-white/5">
        <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3.5 h-3.5" />{service.duration}</span>
        <span className="flex items-center gap-0.5 text-sm font-semibold text-primary">{service.price}</span>
      </div>
    </motion.div>
  )
}
