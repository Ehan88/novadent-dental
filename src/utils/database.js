const DB_KEY = 'novadent_appointments'

// Seed demo data so the dashboard isn't empty on first visit
const SEED_DATA = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com', date: '2026-07-14', time: '10:00 AM', service: 'Dental Implants', message: 'Want to discuss implant options for missing tooth.', status: 'confirmed', createdAt: '2026-07-10T09:15:00' },
  { id: 2, name: 'Amina Begum', phone: '+91 87654 32109', email: 'amina@email.com', date: '2026-07-14', time: '11:00 AM', service: 'Pediatric Dentistry', message: 'First dental visit for my 4-year-old daughter.', status: 'confirmed', createdAt: '2026-07-10T10:22:00' },
  { id: 3, name: 'Suresh Nair', phone: '+91 76543 21098', email: 'suresh@email.com', date: '2026-07-15', time: '2:00 PM', service: 'Teeth Whitening', message: 'Interested in professional whitening treatment.', status: 'confirmed', createdAt: '2026-07-11T08:45:00' },
  { id: 4, name: 'Fathima Rashid', phone: '+91 65432 10987', email: 'fathima@email.com', date: '2026-07-15', time: '3:00 PM', service: 'Orthodontics', message: 'Consultation for invisible aligners.', status: 'pending', createdAt: '2026-07-11T14:30:00' },
  { id: 5, name: 'Vinod Menon', phone: '+91 54321 09876', email: 'vinod@email.com', date: '2026-07-16', time: '10:00 AM', service: 'Root Canal', message: 'Severe toothache in lower left molar.', status: 'confirmed', createdAt: '2026-07-12T07:10:00' },
  { id: 6, name: 'Deepa Krishna', phone: '+91 43210 98765', email: 'deepa@email.com', date: '2026-07-16', time: '11:00 AM', service: 'Cosmetic Dentistry', message: 'Want veneers for front teeth.', status: 'pending', createdAt: '2026-07-12T11:55:00' },
  { id: 7, name: 'Mohammed Iqbal', phone: '+91 32109 87654', email: 'iqbal@email.com', date: '2026-07-17', time: '9:00 AM', service: 'Dental Crowns', message: 'Broken tooth needs crown replacement.', status: 'confirmed', createdAt: '2026-07-12T16:20:00' },
  { id: 8, name: 'Lakshmi Menon', phone: '+91 21098 76543', email: 'lakshmi@email.com', date: '2026-07-17', time: '2:00 PM', service: 'Gum Treatment', message: 'Bleeding gums for the past week.', status: 'pending', createdAt: '2026-07-13T09:00:00' },
  { id: 9, name: 'Anil Kumar', phone: '+91 10987 65432', email: 'anil@email.com', date: '2026-07-18', time: '10:00 AM', service: 'Teeth Whitening', message: 'Annual whitening appointment.', status: 'confirmed', createdAt: '2026-07-13T10:30:00' },
  { id: 10, name: 'Shameera P', phone: '+91 09876 54321', email: 'shameera@email.com', date: '2026-07-18', time: '3:00 PM', service: 'Dental Implants', message: 'Consultation for multiple implants.', status: 'confirmed', createdAt: '2026-07-13T12:15:00' },
]

function getAll() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) {
      // First visit — seed demo data
      localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA))
      return SEED_DATA
    }
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function save(appointments) {
  localStorage.setItem(DB_KEY, JSON.stringify(appointments))
}

export function getAppointmentCount() {
  return getAll().length
}

export function getRecentAppointments(limit = 5) {
  return getAll()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
}

export function getAllAppointments() {
  return getAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getStats() {
  const all = getAll()
  const now = new Date()

  // Service breakdown
  const byService = {}
  all.forEach(a => {
    byService[a.service] = (byService[a.service] || 0) + 1
  })

  // Status breakdown
  const confirmed = all.filter(a => a.status === 'confirmed').length
  const pending = all.filter(a => a.status === 'pending').length

  // This week
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisWeek = all.filter(a => new Date(a.createdAt) >= weekAgo).length

  // Today
  const todayStr = now.toISOString().split('T')[0]
  const today = all.filter(a => a.date === todayStr).length

  // Upcoming (date >= today)
  const upcoming = all.filter(a => a.date >= todayStr).length

  return {
    total: all.length,
    confirmed,
    pending,
    thisWeek,
    today,
    upcoming,
    byService,
  }
}

export function addAppointment(booking) {
  const all = getAll()
  const newAppt = {
    ...booking,
    id: Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  all.push(newAppt)
  save(all)
  return newAppt
}

export function updateAppointmentStatus(id, status) {
  const all = getAll()
  const idx = all.findIndex(a => a.id === id)
  if (idx !== -1) {
    all[idx].status = status
    save(all)
  }
}

export function deleteAppointment(id) {
  const all = getAll().filter(a => a.id !== id)
  save(all)
}

export function clearAllAppointments() {
  localStorage.removeItem(DB_KEY)
}

// ── Treatment Plans ──
const TP_KEY = 'novadent_treatment_plans'

const SEED_PLANS = {
  1: { 14: { service: 'Dental Implant', notes: 'Missing premolar — implant + crown recommended', status: 'planned' } },
  5: { 36: { service: 'Root Canal', notes: 'Deep caries, pulpitis — RCT then crown', status: 'in-progress' } },
  7: { 26: { service: 'Crown', notes: 'Cracked molar — full zirconia crown', status: 'planned' } },
  10: { 11: { service: 'Dental Implant', notes: 'Missing central incisor — implant placement', status: 'planned' }, 21: { service: 'Veneer', notes: 'Chipped edge — composite veneer', status: 'completed' } },
}

function getTreatmentPlans() {
  try {
    const raw = localStorage.getItem(TP_KEY)
    if (!raw) {
      localStorage.setItem(TP_KEY, JSON.stringify(SEED_PLANS))
      return SEED_PLANS
    }
    return JSON.parse(raw)
  } catch { return {} }
}

function saveTreatmentPlans(plans) {
  localStorage.setItem(TP_KEY, JSON.stringify(plans))
}

export function getTreatmentPlan(appointmentId) {
  const plans = getTreatmentPlans()
  return plans[appointmentId] || {}
}

export function updateTreatmentPlan(appointmentId, toothNumber, service, notes = '') {
  const plans = getTreatmentPlans()
  if (!plans[appointmentId]) plans[appointmentId] = {}

  if (service === null) {
    delete plans[appointmentId][toothNumber]
  } else {
    plans[appointmentId][toothNumber] = {
      service,
      notes: notes || plans[appointmentId][toothNumber]?.notes || '',
      status: plans[appointmentId][toothNumber]?.status || 'planned',
      updatedAt: new Date().toISOString(),
    }
  }

  // Clean up empty plans
  if (Object.keys(plans[appointmentId]).length === 0) {
    delete plans[appointmentId]
  }

  saveTreatmentPlans(plans)
  return plans[appointmentId] || {}
}

export function updateToothStatus(appointmentId, toothNumber, status) {
  const plans = getTreatmentPlans()
  if (plans[appointmentId]?.[toothNumber]) {
    plans[appointmentId][toothNumber].status = status
    plans[appointmentId][toothNumber].updatedAt = new Date().toISOString()
    saveTreatmentPlans(plans)
  }
}

export function clearTreatmentPlan(appointmentId) {
  const plans = getTreatmentPlans()
  delete plans[appointmentId]
  saveTreatmentPlans(plans)
}

export function getTreatmentStats() {
  const plans = getTreatmentPlans()
  const allTeeth = Object.values(plans).flat()
  const total = allTeeth.length
  const byService = {}
  const byStatus = { planned: 0, 'in-progress': 0, completed: 0 }

  allTeeth.forEach(({ service, status }) => {
    byService[service] = (byService[service] || 0) + 1
    if (byStatus[status] !== undefined) byStatus[status]++
  })

  return { total, byService, byStatus, patientsWithPlans: Object.keys(plans).length }
}
