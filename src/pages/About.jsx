import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Heart, Lightbulb, Award, Monitor, Scan, Zap, Cpu } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../components/ScrollReveal'
import { CLINIC } from '../utils/constants'

const values = [
  { icon: Shield, title: 'Excellence', desc: 'We strive for the highest standards in every procedure, using evidence-based techniques and premium materials.' },
  { icon: Heart, title: 'Compassion', desc: 'Your comfort matters. We treat every patient with empathy, patience, and genuine care for your well-being.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We invest in the latest dental technology to provide faster, more accurate, and less invasive treatments.' },
  { icon: Award, title: 'Integrity', desc: 'Transparent pricing, honest recommendations, and ethical practices form the foundation of our clinic.' },
]

const tech = [
  { icon: Monitor, name: 'Digital X-Ray', desc: 'Instant, high-resolution imaging with 90% less radiation than traditional X-rays.' },
  { icon: Scan, name: '3D CBCT Scanner', desc: 'Complete 3D jaw visualization for precise implant planning and surgical guides.' },
  { icon: Zap, name: 'Laser Dentistry', desc: 'Minimally soft tissue procedures with faster healing and less discomfort.' },
  { icon: Cpu, name: 'CAD/CAM System', desc: 'Same-day crowns and restorations designed and milled in-office.' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">About Novadent Dental Hospital</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">Building healthier smiles in Kalnad, Kerala since 2010.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-primary font-semibold text-sm">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">A Decade of Smiling Faces</h2>
                <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                  <p>Founded in 2010 by Dr. Arun Menon, {CLINIC.name} began with a simple vision: to bring world-class dental care to the community of Kalnad and surrounding areas in Kerala.</p>
                  <p>What started as a small practice has grown into a full-service dental clinic with four specialist doctors, cutting-edge technology, and a reputation for exceptional patient care. Over the past decade, we have treated over 5,000 patients and established ourselves as the most trusted dental clinic in the region.</p>
                  <p>Our clinic combines the warmth of Kerala hospitality with international standards of dental care. Every member of our team shares a passion for creating healthy, beautiful smiles that last a lifetime.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-blue-500/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-primary/30 mb-2">15+</div>
                    <div className="text-gray-500 dark:text-gray-400 font-medium">Years of Excellence</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-xl">
                  <div className="text-2xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-gray-500">Happy Patients</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Making World-Class Dental Care Accessible</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                We believe everyone deserves a healthy, confident smile. Our mission is to provide exceptional dental care using the latest technology, in a warm and welcoming environment, at prices that are fair and transparent.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Values" title="What We Stand For" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
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

      {/* Technology */}
      <section className="py-20 lg:py-28 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Technology" title="State-of-the-Art Equipment" description="We invest in the latest dental technology to ensure the best outcomes for our patients." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tech.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-3xl bg-gradient-to-r from-primary to-blue-600 p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience the Difference</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join thousands of happy patients who trust us with their smiles.</p>
              <Link to="/appointment" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all hover:shadow-xl">
                Book Your Visit <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </motion.div>
  )
}
