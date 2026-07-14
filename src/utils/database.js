const DB_KEY = 'novadent_appointments'
const PT_KEY = 'novadent_patients'

// ── Seed Data ──

const SEED_PATIENTS = [
  { id: 'P1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com', createdAt: '2026-07-10T09:15:00', visitCount: 2 },
  { id: 'P2', name: 'Amina Begum', phone: '+91 87654 32109', email: 'amina@email.com', createdAt: '2026-07-10T10:22:00', visitCount: 1 },
  { id: 'P3', name: 'Suresh Nair', phone: '+91 76543 21098', email: 'suresh@email.com', createdAt: '2026-07-11T08:45:00', visitCount: 3 },
  { id: 'P4', name: 'Fathima Rashid', phone: '+91 65432 10987', email: 'fathima@email.com', createdAt: '2026-07-11T14:30:00', visitCount: 1 },
  { id: 'P5', name: 'Vinod Menon', phone: '+91 54321 09876', email: 'vinod@email.com', createdAt: '2026-07-12T07:10:00', visitCount: 2 },
  { id: 'P6', name: 'Deepa Krishna', phone: '+91 43210 98765', email: 'deepa@email.com', createdAt: '2026-07-12T11:55:00', visitCount: 1 },
  { id: 'P7', name: 'Mohammed Iqbal', phone: '+91 32109 87654', email: 'iqbal@email.com', createdAt: '2026-07-12T16:20:00', visitCount: 1 },
  { id: 'P8', name: 'Lakshmi Menon', phone: '+91 21098 76543', email: 'lakshmi@email.com', createdAt: '2026-07-13T09:00:00', visitCount: 1 },
  { id: 'P9', name: 'Anil Kumar', phone: '+91 10987 65432', email: 'anil@email.com', createdAt: '2026-07-13T10:30:00', visitCount: 2 },
  { id: 'P10', name: 'Shameera P', phone: '+91 09876 54321', email: 'shameera@email.com', createdAt: '2026-07-13T12:15:00', visitCount: 1 },
]

const SEED_APPOINTMENTS = [
  { id: 1, patientId: 'P1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com', date: '2026-07-14', time: '10:00 AM', service: 'Dental Implants', message: 'Want to discuss implant options for missing tooth.', status: 'confirmed', createdAt: '2026-07-10T09:15:00', visitNumber: 1 },
  { id: 2, patientId: 'P1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com', date: '2026-07-18', time: '11:00 AM', service: 'Dental Implants', message: 'Follow-up — implant placement confirmed.', status: 'confirmed', createdAt: '2026-07-14T08:00:00', visitNumber: 2 },
  { id: 3, patientId: 'P2', name: 'Amina Begum', phone: '+91 87654 32109', email: 'amina@email.com', date: '2026-07-14', time: '11:00 AM', service: 'Pediatric Dentistry', message: 'First dental visit for my 4-year-old daughter.', status: 'confirmed', createdAt: '2026-07-10T10:22:00', visitNumber: 1 },
  { id: 4, patientId: 'P3', name: 'Suresh Nair', phone: '+91 76543 21098', email: 'suresh@email.com', date: '2026-07-15', time: '2:00 PM', service: 'Teeth Whitening', message: 'Interested in professional whitening treatment.', status: 'confirmed', createdAt: '2026-07-11T08:45:00', visitNumber: 1 },
  { id: 5, patientId: 'P3', name: 'Suresh Nair', phone: '+91 76543 21098', email: 'suresh@email.com', date: '2026-07-16', time: '2:00 PM', service: 'Teeth Whitening', message: 'Whitening session 2 of 3.', status: 'confirmed', createdAt: '2026-07-13T10:00:00', visitNumber: 2 },
  { id: 6, patientId: 'P3', name: 'Suresh Nair', phone: '+91 76543 21098', email: 'suresh@email.com', date: '2026-07-18', time: '2:00 PM', service: 'Teeth Whitening', message: 'Final whitening session + checkup.', status: 'pending', createdAt: '2026-07-14T09:00:00', visitNumber: 3 },
  { id: 7, patientId: 'P4', name: 'Fathima Rashid', phone: '+91 65432 10987', email: 'fathima@email.com', date: '2026-07-15', time: '3:00 PM', service: 'Orthodontics', message: 'Consultation for invisible aligners.', status: 'pending', createdAt: '2026-07-11T14:30:00', visitNumber: 1 },
  { id: 8, patientId: 'P5', name: 'Vinod Menon', phone: '+91 54321 09876', email: 'vinod@email.com', date: '2026-07-16', time: '10:00 AM', service: 'Root Canal', message: 'Severe toothache in lower left molar.', status: 'confirmed', createdAt: '2026-07-12T07:10:00', visitNumber: 1 },
  { id: 9, patientId: 'P5', name: 'Vinod Menon', phone: '+91 54321 09876', email: 'vinod@email.com', date: '2026-07-20', time: '10:00 AM', service: 'Root Canal', message: 'Root canal session 2 — filling.', status: 'pending', createdAt: '2026-07-15T08:00:00', visitNumber: 2 },
  { id: 10, patientId: 'P6', name: 'Deepa Krishna', phone: '+91 43210 98765', email: 'deepa@email.com', date: '2026-07-16', time: '11:00 AM', service: 'Cosmetic Dentistry', message: 'Want veneers for front teeth.', status: 'pending', createdAt: '2026-07-12T11:55:00', visitNumber: 1 },
  { id: 11, patientId: 'P7', name: 'Mohammed Iqbal', phone: '+91 32109 87654', email: 'iqbal@email.com', date: '2026-07-17', time: '9:00 AM', service: 'Dental Crowns', message: 'Broken tooth needs crown replacement.', status: 'confirmed', createdAt: '2026-07-12T16:20:00', visitNumber: 1 },
  { id: 12, patientId: 'P8', name: 'Lakshmi Menon', phone: '+91 21098 76543', email: 'lakshmi@email.com', date: '2026-07-17', time: '2:00 PM', service: 'Gum Treatment', message: 'Bleeding gums for the past week.', status: 'pending', createdAt: '2026-07-13T09:00:00', visitNumber: 1 },
  { id: 13, patientId: 'P9', name: 'Anil Kumar', phone: '+91 10987 65432', email: 'anil@email.com', date: '2026-07-18', time: '10:00 AM', service: 'Teeth Whitening', message: 'Annual whitening appointment.', status: 'confirmed', createdAt: '2026-07-13T10:30:00', visitNumber: 1 },
  { id: 14, patientId: 'P9', name: 'Anil Kumar', phone: '+91 10987 65432', email: 'anil@email.com', date: '2026-07-20', time: '11:00 AM', service: 'General Checkup', message: 'Routine annual checkup.', status: 'confirmed', createdAt: '2026-07-14T07:00:00', visitNumber: 2 },
  { id: 15, patientId: 'P10', name: 'Shameera P', phone: '+91 09876 54321', email: 'shameera@email.com', date: '2026-07-18', time: '3:00 PM', service: 'Dental Implants', message: 'Consultation for multiple implants.', status: 'confirmed', createdAt: '2026-07-13T12:15:00', visitNumber: 1 },
]

// ── Patients ──

function getPatients() {
  try {
    const raw = localStorage.getItem(PT_KEY)
    if (!raw) { localStorage.setItem(PT_KEY, JSON.stringify(SEED_PATIENTS)); return SEED_PATIENTS }
    return JSON.parse(raw)
  } catch { return [] }
}

function savePatients(pts) { localStorage.setItem(PT_KEY, JSON.stringify(pts)) }

export function findPatientByPhone(phone) {
  const norm = phone.replace(/\s+/g, '').trim()
  return getPatients().find(p => p.phone.replace(/\s+/g, '').trim() === norm) || null
}

export function getAllPatients() {
  return getPatients().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getPatientById(id) {
  return getPatients().find(p => p.id === id) || null
}

export function getPatientHistory(patientId) {
  return getAllAppointments().filter(a => a.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function ensurePatient(booking) {
  const existing = findPatientByPhone(booking.phone)
  if (existing) {
    // Update name/email if changed
    const pts = getPatients()
    const idx = pts.findIndex(p => p.id === existing.id)
    if (idx !== -1) {
      if (booking.name && booking.name !== existing.name) pts[idx].name = booking.name
      if (booking.email && booking.email !== existing.email) pts[idx].email = booking.email
      pts[idx].visitCount = (pts[idx].visitCount || 1) + 1
      savePatients(pts)
    }
    return existing.id
  }
  // New patient
  const id = 'P' + Date.now()
  const pts = getPatients()
  pts.push({ id, name: booking.name, phone: booking.phone, email: booking.email || '', createdAt: new Date().toISOString(), visitCount: 1 })
  savePatients(pts)
  return id
}

// ── Appointments ──

function getAll() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) { localStorage.setItem(DB_KEY, JSON.stringify(SEED_APPOINTMENTS)); return SEED_APPOINTMENTS }
    return JSON.parse(raw)
  } catch { return [] }
}

function save(appts) { localStorage.setItem(DB_KEY, JSON.stringify(appts)) }

export function getAllAppointments() { return getAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }

export function getAppointmentCount() { return getAll().length }

export function getRecentAppointments(limit = 5) {
  return getAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit)
}

export function getStats() {
  const all = getAll()
  const patients = getPatients()
  const now = new Date()
  const byService = {}
  all.forEach(a => { byService[a.service] = (byService[a.service] || 0) + 1 })
  const confirmed = all.filter(a => a.status === 'confirmed').length
  const pending = all.filter(a => a.status === 'pending').length
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisWeek = all.filter(a => new Date(a.createdAt) >= weekAgo).length
  const todayStr = now.toISOString().split('T')[0]
  const today = all.filter(a => a.date === todayStr).length
  const upcoming = all.filter(a => a.date >= todayStr).length
  return { total: all.length, confirmed, pending, thisWeek, today, upcoming, byService, totalPatients: patients.length }
}

export function addAppointment(booking) {
  const patientId = ensurePatient(booking)
  const all = getAll()
  // Count existing visits for this patient to assign visitNumber
  const prevVisits = all.filter(a => a.patientId === patientId).length
  const newAppt = {
    ...booking, id: Date.now(), patientId, visitNumber: prevVisits + 1,
    status: 'pending', createdAt: new Date().toISOString(),
  }
  all.push(newAppt)
  save(all)
  return newAppt
}

export function updateAppointmentStatus(id, status) {
  const all = getAll()
  const idx = all.findIndex(a => a.id === id)
  if (idx !== -1) { all[idx].status = status; save(all) }
}

export function deleteAppointment(id) { save(getAll().filter(a => a.id !== id)) }
export function clearAllAppointments() { localStorage.removeItem(DB_KEY); localStorage.removeItem(PT_KEY) }

// ── Treatment Plans ──
const TP_KEY = 'novadent_treatment_plans'

const SEED_PLANS = {
  1: { 14: { service: 'Dental Implant', notes: 'Missing premolar — implant + crown recommended', status: 'planned' } },
  8: { 36: { service: 'Root Canal', notes: 'Deep caries, pulpitis — RCT then crown', status: 'in-progress' } },
  11: { 26: { service: 'Crown', notes: 'Cracked molar — full zirconia crown', status: 'planned' } },
  15: { 11: { service: 'Dental Implant', notes: 'Missing central incisor — implant placement', status: 'planned' }, 21: { service: 'Veneer', notes: 'Chipped edge — composite veneer', status: 'completed' } },
}

function getTreatmentPlans() {
  try {
    const raw = localStorage.getItem(TP_KEY)
    if (!raw) { localStorage.setItem(TP_KEY, JSON.stringify(SEED_PLANS)); return SEED_PLANS }
    return JSON.parse(raw)
  } catch { return {} }
}

function saveTreatmentPlans(plans) { localStorage.setItem(TP_KEY, JSON.stringify(plans)) }

export function getTreatmentPlan(appointmentId) { return getTreatmentPlans()[appointmentId] || {} }

export function updateTreatmentPlan(appointmentId, toothNumber, service, notes = '') {
  const plans = getTreatmentPlans()
  if (!plans[appointmentId]) plans[appointmentId] = {}
  if (service === null) { delete plans[appointmentId][toothNumber] }
  else {
    plans[appointmentId][toothNumber] = {
      service, notes: notes || plans[appointmentId][toothNumber]?.notes || '',
      status: plans[appointmentId][toothNumber]?.status || 'planned',
      updatedAt: new Date().toISOString(),
    }
  }
  if (Object.keys(plans[appointmentId]).length === 0) delete plans[appointmentId]
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
