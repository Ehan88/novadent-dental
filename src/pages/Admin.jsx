import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3, Calendar, CheckCircle, Clock, Users, TrendingUp,
  Phone, Mail, Trash2, CheckCircle2, XCircle, Eye, RefreshCw, Stethoscope,
  Bell, BellOff, LogOut,
} from 'lucide-react'
import {
  getAllAppointments, getStats, updateAppointmentStatus, deleteAppointment,
} from '../utils/database'
import { logout } from '../utils/auth'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

const COLORS = [
  'bg-primary', 'bg-accent', 'bg-purple-500', 'bg-amber-500',
  'bg-rose-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500',
]

export default function Admin() {
  const [appointments, setAppointments] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [showNotifs, setShowNotifs] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const prevCountRef = useRef(0)
  const notifAudio = useRef(null)

  const refresh = () => {
    const all = getAllAppointments()
    const newCount = all.length

    // Detect new bookings
    if (prevCountRef.current > 0 && newCount > prevCountRef.current) {
      const newOnes = all.slice(0, newCount - prevCountRef.current)
      const newNotifs = newOnes.map(a => ({
        id: Date.now() + Math.random(),
        name: a.name,
        service: a.service,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      }))
      setNotifications(prev => [...newNotifs, ...prev].slice(0, 20))

      // Play notification sound
      if (soundEnabled && notifAudio.current) {
        notifAudio.current.play().catch(() => {})
      }

      // Browser notification
      if (Notification.permission === 'granted') {
        newOnes.forEach(a => {
          new Notification('🦷 New Booking!', {
            body: `${a.name} booked ${a.service} for ${a.date}`,
            icon: '/tooth-icon.png',
          })
        })
      }
    }

    prevCountRef.current = newCount
    setAppointments(all)
    setStats(getStats())
  }

  useEffect(() => { refresh() }, [])

  // Auto-refresh every 8 seconds
  useEffect(() => {
    const interval = setInterval(refresh, 8000)
    return () => clearInterval(interval)
  }, [soundEnabled])

  // Request browser notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
    setShowNotifs(false)
  }

  const handleStatus = (id, status) => {
    updateAppointmentStatus(id, status)
    refresh()
  }

  const handleDelete = (id) => {
    if (confirm('Delete this appointment?')) {
      deleteAppointment(id)
      refresh()
    }
  }

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter(a => a.status === filter)

  if (!stats) return null

  const maxService = Math.max(...Object.values(stats.byService), 1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-surface-dark pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appointment Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage all patient bookings</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markAllRead() }}
                className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">Notifications</h4>
                      <div className="flex gap-2">
                        <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          {soundEnabled ? '🔊' : '🔇'}
                        </button>
                        <button onClick={clearNotifications} className="text-xs text-gray-400 hover:text-red-500">Clear all</button>
                      </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 text-sm">
                          <BellOff className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          No new bookings yet
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`px-4 py-3 border-b border-gray-100 dark:border-white/5 ${!n.read ? 'bg-primary/5' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                                {n.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{n.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{n.service}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                              </div>
                              {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={refresh} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total Bookings', value: stats.total, color: 'from-primary to-blue-600' },
            { icon: CheckCircle, label: 'Confirmed', value: stats.confirmed, color: 'from-green-500 to-emerald-500' },
            { icon: Clock, label: 'Pending', value: stats.pending, color: 'from-amber-500 to-orange-500' },
            { icon: TrendingUp, label: 'This Week', value: stats.thisWeek, color: 'from-purple-500 to-pink-500' },
            { icon: Calendar, label: 'Upcoming', value: stats.upcoming, color: 'from-teal-500 to-cyan-500' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Service Breakdown */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-1 glass-card rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Bookings by Service
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.byService)
                .sort((a, b) => b[1] - a[1])
                .map(([service, count], i) => (
                  <div key={service}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300 truncate mr-2">{service}</span>
                      <span className="font-semibold text-gray-900 dark:text-white shrink-0">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / maxService) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`h-full rounded-full ${COLORS[i % COLORS.length]}`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Recent Bookings */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 glass-card rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Recent Bookings
            </h3>
            <div className="space-y-3">
              {appointments.slice(0, 5).map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setSelected(a)}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{a.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.service} · {a.date} {a.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2 ${
                    a.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* All Appointments Table */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200/50 dark:border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> All Appointments
              </h3>
              <div className="flex gap-2">
                {['all', 'pending', 'confirmed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                      filter === f
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {f} {f === 'pending' ? `(${stats.pending})` : f === 'confirmed' ? `(${stats.confirmed})` : `(${stats.total})`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-white/5">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{a.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Phone className="w-3 h-3" /> {a.phone}
                            {a.email && <><Mail className="w-3 h-3 ml-1" /> {a.email}</>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">{a.service}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      <div>{a.date}</div>
                      <div className="text-xs text-gray-500">{a.time}</div>
                    </td>
                    <td className="px-6 py-4 max-w-[200px]">
                      <p className="text-gray-600 dark:text-gray-400 text-xs truncate" title={a.message}>{a.message || '—'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/treatment/${a.id}`} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors" title="Treatment Plan">
                          <Stethoscope className="w-4 h-4 text-primary" />
                        </Link>
                        <button onClick={() => setSelected(a)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" title="View details">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        {a.status === 'pending' && (
                          <button onClick={() => handleStatus(a.id, 'confirmed')} className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors" title="Confirm">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </button>
                        )}
                        {a.status === 'confirmed' && (
                          <button onClick={() => handleStatus(a.id, 'pending')} className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors" title="Mark pending">
                            <XCircle className="w-4 h-4 text-amber-500" />
                          </button>
                        )}
                        <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No appointments found.</div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appointment Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Patient</span><span className="font-medium text-gray-900 dark:text-white">{selected.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Phone</span><a href={`tel:${selected.phone}`} className="font-medium text-primary">{selected.phone}</a></div>
              {selected.email && <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email</span><span className="font-medium text-gray-900 dark:text-white">{selected.email}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Service</span><span className="font-medium text-primary">{selected.service}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Date</span><span className="font-medium text-gray-900 dark:text-white">{selected.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Time</span><span className="font-medium text-gray-900 dark:text-white">{selected.time}</span></div>
              <div className="flex justify-between items-start"><span className="text-gray-500 dark:text-gray-400">Reason</span><span className="font-medium text-gray-900 dark:text-white text-right max-w-[250px]">{selected.message || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  selected.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>{selected.status}</span>
              </div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Booked on</span><span className="font-medium text-gray-900 dark:text-white">{new Date(selected.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
              <Link to={`/treatment/${selected.id}`} onClick={() => setSelected(null)} className="flex-1 py-2.5 bg-primary text-white text-center rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors">Treatment Plan</Link>
              <a href={`tel:${selected.phone}`} className="flex-1 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-center rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">Call Patient</a>
              {selected.status === 'pending' ? (
                <button onClick={() => { handleStatus(selected.id, 'confirmed'); setSelected(null) }} className="flex-1 py-2.5 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors">Confirm</button>
              ) : (
                <button onClick={() => { handleStatus(selected.id, 'pending'); setSelected(null) }} className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl font-medium text-sm hover:bg-amber-600 transition-colors">Mark Pending</button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Notification Sound */}
      <audio ref={notifAudio} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGczIj2NysijaTkmTaLC07Z2RCw5dLbR2b1xOiVgjr3Uu3hAK1aXz9S1e0IqWZ3R07V+QypWnM/TtX1DKlac" type="audio/wav" />
      </audio>

      {/* Logout floating button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => { logout(); window.location.href = '/login' }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/25"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </motion.div>
  )
}
