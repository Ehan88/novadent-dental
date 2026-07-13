import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react'
import { CLINIC, SERVICES } from '../utils/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{CLINIC.name}</h3>
            <p className="text-sm leading-relaxed mb-4">{CLINIC.tagline}. Providing world-class dental care with state-of-the-art technology and a patient-first approach.</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs hover:bg-primary/20 hover:text-primary transition-all">{s[0]}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['Home','/'],['About','/about'],['Services','/services'],['Doctors','/doctors'],['Gallery','/gallery'],['Contact','/contact']].map(([l,p]) => (
                <li key={p}><Link to={p} className="hover:text-primary transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.slice(0,6).map(s => (
                <li key={s.id}><Link to="/services" className="hover:text-primary transition-colors">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a href={CLINIC.phoneLink} className="flex items-start gap-2 hover:text-primary transition-colors"><Phone className="w-4 h-4 mt-0.5 shrink-0" />{CLINIC.phone}</a>
              <a href={`mailto:${CLINIC.email}`} className="flex items-start gap-2 hover:text-primary transition-colors"><Mail className="w-4 h-4 mt-0.5 shrink-0" />{CLINIC.email}</a>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{CLINIC.address}</p>
              <p className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 shrink-0" />{CLINIC.hours}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Kerala</p>
        </div>
      </div>
    </footer>
  )
}
