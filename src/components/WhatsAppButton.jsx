import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { CLINIC } from '../utils/constants'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CLINIC.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.a>
  )
}
