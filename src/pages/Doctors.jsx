import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Heart, Lightbulb } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import DoctorCard from '../components/DoctorCard'
import ScrollReveal from '../components/ScrollReveal'
import { DOCTORS } from '../utils/constants'

const teamValues = [
  { icon: Shield, title: 'Continuous Learning', desc: 'Our doctors regularly attend international conferences and training programs to stay at the forefront of dental science.' },
  { icon: Heart, title: 'Patient First', desc: "Every treatment plan is created with the patient's comfort, safety, and long-term health as the top priority." },
  { icon: Lightbulb, title: 'Collaborative Care', desc: 'Our team works together across specialties to provide comprehensive, coordinated treatment for the best outcomes.' },
]

export default function Doctors() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Meet Our Doctors</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">Our team of qualified specialists brings decades of combined experience and a genuine passion for patient care.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTORS.map((d, i) => (
              <ScrollReveal key={d.id} delay={i * 0.1}>
                <DoctorCard doctor={d} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Team Values" title="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamValues.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 text-center h-full group hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Schedule a Consultation</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Meet our doctors and discuss your treatment options in person.</p>
              <Link to="/appointment" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl">
                Book Appointment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </motion.div>
  )
}
