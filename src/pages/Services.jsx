import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ClipboardCheck, Stethoscope, HeartHandshake } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import ScrollReveal from '../components/ScrollReveal'
import { SERVICES, CLINIC } from '../utils/constants'

const process = [
  { icon: ClipboardCheck, title: 'Consultation', desc: 'Complete oral examination, digital X-rays, and personalized treatment planning with our specialists.' },
  { icon: Stethoscope, title: 'Treatment', desc: 'Precision treatment using the latest technology, performed by experienced specialists in a comfortable environment.' },
  { icon: HeartHandshake, title: 'Follow-up', desc: 'Post-treatment care, recovery guidance, and regular check-ups to ensure lasting results and optimal oral health.' },
]

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Our Services</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">Comprehensive dental solutions tailored to your needs, delivered with care and precision.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.05}>
                <ServiceCard service={s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50/50/80 dark:bg-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="Our Treatment Process" description="A simple three-step process to get you the care you need." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {process.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center relative">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <p.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-0 right-1/2 translate-x-20 -translate-y-2 text-6xl font-black text-gray-200 dark:text-white/5">{i + 1}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-3xl bg-gradient-to-r from-primary to-blue-600 p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need a Consultation?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Book an appointment to discuss your dental needs with our experts.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/appointment" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all">
                  Book Now <ArrowRight className="w-5 h-5" />
                </Link>
                <a href={CLINIC.phoneLink} className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/25 transition-all">
                  Call {CLINIC.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </motion.div>
  )
}
