import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const filters = ['All', 'Implants', 'Whitening', 'Orthodontics', 'Smile Makeover']

const galleryItems = [
  { id: 1, title: 'Before & After - Implant Case', category: 'Implants', gradient: 'from-blue-500 to-cyan-400' },
  { id: 2, title: 'Complete Smile Transformation', category: 'Smile Makeover', gradient: 'from-purple-500 to-pink-400' },
  { id: 3, title: 'Professional Whitening Results', category: 'Whitening', gradient: 'from-amber-500 to-yellow-400' },
  { id: 4, title: 'Invisible Aligner Progress', category: 'Orthodontics', gradient: 'from-green-500 to-emerald-400' },
  { id: 5, title: 'Full Arch Implant Restoration', category: 'Implants', gradient: 'from-indigo-500 to-blue-400' },
  { id: 6, title: 'Veneer Makeover - Upper Arch', category: 'Smile Makeover', gradient: 'from-rose-500 to-red-400' },
  { id: 7, title: 'Deep Stain Removal', category: 'Whitening', gradient: 'from-teal-500 to-cyan-400' },
  { id: 8, title: 'Braces Results - 12 Months', category: 'Orthodontics', gradient: 'from-violet-500 to-purple-400' },
  { id: 9, title: 'Single Tooth Implant', category: 'Implants', gradient: 'from-sky-500 to-blue-400' },
  { id: 10, title: 'Full Mouth Rehabilitation', category: 'Smile Makeover', gradient: 'from-fuchsia-500 to-pink-400' },
  { id: 11, title: 'Take-Home Whitening Kit Results', category: 'Whitening', gradient: 'from-lime-500 to-green-400' },
  { id: 12, title: 'Crossbite Correction', category: 'Orthodontics', gradient: 'from-orange-500 to-red-400' },
]

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Gallery</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Our Gallery</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">See the transformations we achieve for our patients every day.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active === f
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  className={`relative h-56 rounded-2xl bg-gradient-to-br ${item.gradient} overflow-hidden cursor-pointer group`}
                  onClick={() => setLightbox(item)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">{item.category}</span>
                    <h4 className="text-white font-semibold text-sm mt-2 drop-shadow-lg">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl aspect-[4/3] rounded-3xl bg-gradient-to-br ${lightbox.gradient} relative`}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">{lightbox.category}</span>
                <h3 className="text-white font-bold text-xl mt-2">{lightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
