import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PackageCard({ pkg }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`rounded-2xl p-8 relative ${
        pkg.popular
          ? 'bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl shadow-primary/20 scale-[1.02]'
          : 'glass-card'
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-gray-900 text-xs font-bold rounded-full">
          Most Popular
        </span>
      )}
      <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{pkg.name}</h3>
      <div className={`text-3xl font-bold mb-6 ${pkg.popular ? 'text-white' : 'text-primary'}`}>{pkg.price}</div>
      <ul className="space-y-3 mb-8">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.popular ? 'text-accent' : 'text-primary'}`} />
            <span className={pkg.popular ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="/appointment"
        className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
          pkg.popular
            ? 'bg-white text-primary hover:bg-gray-100'
            : 'bg-primary text-white hover:bg-primary-dark'
        }`}
      >
        Get Started
      </a>
    </motion.div>
  )
}
