import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 relative min-w-[300px]"
    >
      <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">"{testimonial.text}"</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-white/5">
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.treatment}</p>
        </div>
      </div>
    </motion.div>
  )
}
