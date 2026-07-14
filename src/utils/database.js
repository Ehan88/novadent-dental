import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  query, orderBy, where, writeBatch, getDoc, setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

// ── Collections ──
const patientsRef = collection(db, 'patients')
const appointmentsRef = collection(db, 'appointments')
const treatmentPlansRef = collection(db, 'treatmentPlans')

// ── Helpers ──
function normalizePhone(phone) {
  return phone.replace(/\s+/g, '').trim()
}

async function getCollection(ref) {
  const snap = await getDocs(ref)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ── Patients ──

export async function findPatientByPhone(phone) {
  const norm = normalizePhone(phone)
  const patients = await getCollection(patientsRef)
  return patients.find(p => normalizePhone(p.phone) === norm) || null
}

export async function getAllPatients() {
  return (await getCollection(patientsRef)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getPatientById(id) {
  const snap = await getDoc(doc(db, 'patients', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function getPatientHistory(patientId) {
  const all = await getAllAppointments()
  return all.filter(a => a.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function ensurePatient(booking) {
  const existing = await findPatientByPhone(booking.phone)
  if (existing) {
    const updates = {}
    if (booking.name && booking.name !== existing.name) updates.name = booking.name
    if (booking.email && booking.email !== existing.email) updates.email = booking.email
    updates.visitCount = (existing.visitCount || 1) + 1
    await updateDoc(doc(db, 'patients', existing.id), updates)
    return existing.id
  }
  const docRef = await addDoc(patientsRef, {
    name: booking.name,
    phone: booking.phone,
    email: booking.email || '',
    createdAt: new Date().toISOString(),
    visitCount: 1,
  })
  return docRef.id
}

// ── Appointments ──

export async function getAllAppointments() {
  return (await getCollection(appointmentsRef)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getAppointmentCount() {
  const all = await getAllAppointments()
  return all.length
}

export async function getRecentAppointments(limit = 5) {
  return (await getAllAppointments()).slice(0, limit)
}

export async function getStats() {
  const all = await getAllAppointments()
  const patients = await getAllPatients()
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

export async function addAppointment(booking) {
  const patientId = await ensurePatient(booking)
  const all = await getAllAppointments()
  const prevVisits = all.filter(a => a.patientId === patientId).length
  const newAppt = {
    ...booking,
    patientId,
    visitNumber: prevVisits + 1,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  const docRef = await addDoc(appointmentsRef, newAppt)
  return { ...newAppt, id: docRef.id }
}

export async function updateAppointmentStatus(id, status) {
  await updateDoc(doc(db, 'appointments', id), { status })
}

export async function deleteAppointment(id) {
  await deleteDoc(doc(db, 'appointments', id))
}

export async function clearAllAppointments() {
  const appts = await getCollection(appointmentsRef)
  const batch = writeBatch(db)
  appts.forEach(a => batch.delete(doc(db, 'appointments', a.id)))
  await batch.commit()
  const pts = await getCollection(patientsRef)
  const batch2 = writeBatch(db)
  pts.forEach(p => batch2.delete(doc(db, 'patients', p.id)))
  await batch2.commit()
}

// ── Treatment Plans ──

export async function getTreatmentPlan(appointmentId) {
  const snap = await getDoc(doc(db, 'treatmentPlans', String(appointmentId)))
  return snap.exists() ? snap.data().teeth || {} : {}
}

export async function updateTreatmentPlan(appointmentId, toothNumber, service, notes = '') {
  const ref = doc(db, 'treatmentPlans', String(appointmentId))
  const snap = await getDoc(ref)
  const current = snap.exists() ? snap.data().teeth || {} : {}
  const updated = { ...current }

  if (service === null) {
    delete updated[toothNumber]
  } else {
    updated[toothNumber] = {
      service,
      notes: notes || updated[toothNumber]?.notes || '',
      status: updated[toothNumber]?.status || 'planned',
      updatedAt: new Date().toISOString(),
    }
  }

  if (Object.keys(updated).length === 0) {
    await deleteDoc(ref).catch(() => {})
  } else {
    await setDoc(ref, { teeth: updated }, { merge: true })
  }
  return updated
}

export async function updateToothStatus(appointmentId, toothNumber, status) {
  const ref = doc(db, 'treatmentPlans', String(appointmentId))
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const teeth = snap.data().teeth || {}
  if (teeth[toothNumber]) {
    teeth[toothNumber].status = status
    teeth[toothNumber].updatedAt = new Date().toISOString()
    await setDoc(ref, { teeth }, { merge: true })
  }
}

export async function clearTreatmentPlan(appointmentId) {
  await deleteDoc(doc(db, 'treatmentPlans', String(appointmentId))).catch(() => {})
}

export async function getTreatmentStats() {
  const plans = await getCollection(treatmentPlansRef)
  const allTeeth = plans.flatMap(p => Object.values(p.teeth || {}))
  const total = allTeeth.length
  const byService = {}
  const byStatus = { planned: 0, 'in-progress': 0, completed: 0 }
  allTeeth.forEach(({ service, status }) => {
    byService[service] = (byService[service] || 0) + 1
    if (byStatus[status] !== undefined) byStatus[status]++
  })
  return { total, byService, byStatus, patientsWithPlans: plans.length }
}
