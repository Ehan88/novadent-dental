import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import AppointmentForm from '../components/AppointmentForm'
import ScrollReveal from '../components/ScrollReveal'
import { CLINIC } from '../utils/constants'

const contactCards = [
  { icon: Phone, label: 'Call Us', value: CLINIC.phone, href: CLINIC.phoneLink, color: 'from-blue-500 to-cyan-400' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: CLINIC.whatsappLink, color: 'from-green-500 to-emerald-400' },
  { icon: Mail, label: 'Email', value: CLINIC.email, href: `mailto:${CLINIC.email}`, color: 'from-purple-500 to-pink-400' },
]

export default function Appointment() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">Appointment</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Book an Appointment</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">Schedule your visit in just a few clicks. We'll confirm your appointment within the hour.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <AppointmentForm />
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Clinic Hours</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" /><div><p className="font-medium text-gray-900 dark:text-white">Mon - Sat</p><p className="text-gray-500 dark:text-gray-400">9:00 AM - 8:00 PM</p></div></div>
                    <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" /><div><p className="font-medium text-gray-900 dark:text-white">Sunday</p><p className="text-gray-500 dark:text-gray-400">10:00 AM - 2:00 PM</p></div></div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Location</h3>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-gray-500 dark:text-gray-400">{CLINIC.address}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <iframe src={CLINIC.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Clinic Location" />
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {contactCards.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:shadow-xl transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{c.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{c.value}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  )
}
