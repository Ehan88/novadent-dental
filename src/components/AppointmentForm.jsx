import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Loader2, UserCheck } from 'lucide-react'
import { SERVICES } from '../utils/constants'
import { addAppointment, findPatientByPhone } from '../utils/database'

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [returning, setReturning] = useState(null) // patient object if returning

  const handlePhoneBlur = useCallback(() => {
    if (!form.phone || form.phone.replace(/\s/g, '').length < 10) return
    const patient = findPatientByPhone(form.phone)
    if (patient) {
      setReturning(patient)
      setForm(prev => ({ ...prev, name: prev.name || patient.name, email: prev.email || patient.email }))
    } else {
      setReturning(null)
    }
  }, [form.phone])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    addAppointment(form)
    setTimeout(() => setStatus('success'), 1200)
  }

  const resetForm = () => {
    setForm({ name: '', phone: '', email: '', date: '', time: '', service: '', message: '' })
    setReturning(null)
    setStatus('idle')
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm'

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-10 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {returning ? 'Appointment Booked!' : 'Appointment Booked!'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {returning
              ? `Welcome back, ${form.name}! We'll confirm shortly. (Visit #${returning.visitCount + 1})`
              : "We'll confirm your appointment via phone or WhatsApp shortly."
            }
          </p>
          <button onClick={resetForm} className="mt-6 px-6 py-2 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors">
            Book Another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Book Your Appointment</h3>

          {/* Returning patient badge */}
          <AnimatePresence>
            {returning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
              >
                <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Welcome back, {returning.name}!</p>
                  <p className="text-xs text-green-600 dark:text-green-400">This will be visit #{returning.visitCount + 1}. Previous visits: {returning.visitCount}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
            <input required placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} onBlur={handlePhoneBlur} className={inputClass} />
            <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
            <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className={inputClass} />
            <select required value={form.time} onChange={e => setForm({...form, time: e.target.value})} className={inputClass}>
              <option value="">Select Time *</option>
              {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={inputClass}>
              <option value="">Select Service *</option>
              {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
          </div>
          <textarea placeholder="Additional Message" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass} mt-4`} />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow disabled:opacity-50"
          >
            {status === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Booking...</> : <><Send className="w-5 h-5" /> {returning ? 'Book Follow-up' : 'Book Appointment'}</>}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
