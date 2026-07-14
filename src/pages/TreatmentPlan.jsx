import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Printer, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import DentalChart, { SERVICE_COLORS, TOOTH_NAMES } from '../components/DentalChart'
import {
  getAllAppointments, getTreatmentPlan, updateTreatmentPlan,
  updateToothStatus, clearTreatmentPlan,
} from '../utils/database'

export default function TreatmentPlan() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [plan, setPlan] = useState({})
  const [selectedTooth, setSelectedTooth] = useState(null)

  useEffect(() => {
    const load = async () => {
      const all = await getAllAppointments()
      const appt = all.find(a => a.id === id || String(a.id) === String(id))
      if (appt) {
        setAppointment(appt)
        setPlan(await getTreatmentPlan(appt.id))
      }
    }
    load()
  }, [id])

  const handleToothSelect = async (tooth, service) => {
    const updated = await updateTreatmentPlan(appointment.id, tooth, service)
    setPlan({ ...updated })
    setSelectedTooth(tooth)
  }

  const handleStatusChange = async (tooth, status) => {
    await updateToothStatus(appointment.id, tooth, status)
    setPlan(await getTreatmentPlan(appointment.id))
  }

  const handleClearAll = async () => {
    if (confirm('Clear entire treatment plan for this patient?')) {
      await clearTreatmentPlan(appointment.id)
      setPlan({})
    }
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-surface-dark pt-24 pb-12 flex items-center justify-center">
        <p className="text-gray-500">Loading patient data...</p>
      </div>
    )
  }

  const treatedTeeth = Object.keys(plan).map(Number)
  const plannedCount = treatedTeeth.filter(t => plan[t].status === 'planned').length
  const inProgressCount = treatedTeeth.filter(t => plan[t].status === 'in-progress').length
  const completedCount = treatedTeeth.filter(t => plan[t].status === 'completed').length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-50 dark:bg-surface-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Treatment Plan</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{appointment.name} — {appointment.service}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleClearAll} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>

        {/* Patient Info + Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Patient</p>
            <p className="font-semibold text-gray-900 dark:text-white">{appointment.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.phone}</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Primary Service</p>
            <p className="font-semibold text-primary">{appointment.service}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.date} {appointment.time}</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Teeth Mapped</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{treatedTeeth.length}</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Treatment Status</p>
            <div className="flex gap-2 mt-1">
              <span className="text-xs font-medium text-amber-600">{plannedCount} planned</span>
              <span className="text-xs font-medium text-blue-600">{inProgressCount} active</span>
              <span className="text-xs font-medium text-green-600">{completedCount} done</span>
            </div>
          </div>
        </div>

        {/* Dental Chart */}
        <div className="mb-8">
          <DentalChart treatmentPlan={plan} onToothSelect={handleToothSelect} />
        </div>

        {/* Treatment Summary Table */}
        {treatedTeeth.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-white/5">
              <h3 className="font-bold text-gray-900 dark:text-white">Treatment Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200/50 dark:border-white/5">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tooth</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Treatment</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Notes</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-white/5">
                  {treatedTeeth.sort((a, b) => a - b).map(tooth => (
                    <tr key={tooth} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: SERVICE_COLORS[plan[tooth].service] }}>
                            {tooth}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-xs">{TOOTH_NAMES[tooth]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">{plan[tooth].service}</span>
                      </td>
                      <td className="px-6 py-4 max-w-[250px]">
                        <input
                          value={plan[tooth].notes || ''}
                          onChange={(e) => {
                            const updated = { ...plan }
                            updated[tooth] = { ...updated[tooth], notes: e.target.value }
                            setPlan(updated)
                          }}
                          onBlur={() => updateTreatmentPlan(appointment.id, tooth, plan[tooth].service, plan[tooth].notes)}
                          placeholder="Add notes..."
                          className="w-full bg-transparent text-sm text-gray-600 dark:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary/30 rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={plan[tooth].status}
                          onChange={(e) => handleStatusChange(tooth, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-lg border-0 focus:ring-2 focus:ring-primary/30 ${
                            plan[tooth].status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                            plan[tooth].status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                          }`}
                        >
                          <option value="planned">Planned</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleToothSelect(tooth, null)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {treatedTeeth.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-lg mb-2">No treatments mapped yet</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Click any tooth on the chart above to assign a treatment.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
