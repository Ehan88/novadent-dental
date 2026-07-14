import { motion } from 'framer-motion'
import { Award, Clock } from 'lucide-react'

export default function DoctorCard({ doctor }) {
  const initials = doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      <div className="h-48 bg-gradient-to-br from-primary/20 via-blue-500/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
          {initials}
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
          <Clock className="w-3 h-3" /> {doctor.experience}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
        <p className="text-primary font-medium text-sm mb-1">{doctor.specialty}</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-3 flex items-center gap-1"><Award className="w-3 h-3" />{doctor.qualification}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{doctor.bio}</p>
      </div>
    </motion.div>
  )
}
