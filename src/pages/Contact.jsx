import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import FAQ from '../components/FAQ'
import ScrollReveal from '../components/ScrollReveal'
import { CLINIC, FAQS } from '../utils/constants'

const contactInfo = [
  { icon: MapPin, title: 'Visit Us', lines: [CLINIC.address], color: 'from-blue-500 to-cyan-400' },
  { icon: Phone, title: 'Call Us', lines: [CLINIC.phone], href: CLINIC.phoneLink, color: 'from-green-500 to-emerald-400' },
  { icon: Mail, title: 'Email Us', lines: [CLINIC.email], href: `mailto:${CLINIC.email}`, color: 'from-purple-500 to-pink-400' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Contact Us</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">We'd love to hear from you. Reach out to us anytime.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactInfo.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-6 text-center group hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <c.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{c.title}</h3>
                  {c.lines.map((l, j) => (
                    <a key={j} href={c.href || '#'} className={`block text-sm text-gray-500 dark:text-gray-400 ${c.href ? 'hover:text-primary transition-colors' : ''}`}>{l}</a>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                <iframe src={CLINIC.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Clinic Location" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              {submitted ? (
                <div className="glass-card rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
                    <input type="email" required placeholder="Email *" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
                    <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} />
                    <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className={inputClass} />
                  </div>
                  <textarea required placeholder="Your Message *" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass} mt-4`} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="mt-6 w-full py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow">
                    <Send className="w-5 h-5" /> Send Message
                  </motion.button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hours + FAQ */}
      <section className="py-20 lg:py-28 bg-gray-50/50/80 dark:bg-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <ScrollReveal>
                <SectionHeading eyebrow="Visiting Hours" title="When to Visit" align="left" />
                <div className="glass-card rounded-2xl p-6 mt-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-primary" /></div>
                      <div><p className="font-medium text-gray-900 dark:text-white">Monday - Saturday</p><p className="text-sm text-gray-500 dark:text-gray-400">9:00 AM - 8:00 PM</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-accent" /></div>
                      <div><p className="font-medium text-gray-900 dark:text-white">Sunday</p><p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM - 2:00 PM</p></div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-white/5">
                    <p className="text-sm text-gray-500 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Emergency:</strong> Available 24/7. Call {CLINIC.phone} for urgent dental emergencies.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div>
              <SectionHeading eyebrow="FAQ" title="Common Questions" align="left" />
              <div className="mt-8">
                <FAQ faqs={FAQS.slice(0, 4)} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  )
}
