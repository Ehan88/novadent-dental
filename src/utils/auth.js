const AUTH_KEY = 'novadent_staff_auth'
const PW_KEY = 'novadent_staff_pw_v2'

// Default staff password — change this on first login
const DEFAULT_PW = 'DDDD'

export function getStaffPassword() {
  return localStorage.getItem(PW_KEY) || DEFAULT_PW
}

export function setStaffPassword(newPw) {
  localStorage.setItem(PW_KEY, newPw)
}

export function login(password) {
  if (password === getStaffPassword()) {
    const session = { loggedIn: true, at: Date.now() }
    localStorage.setItem(AUTH_KEY, JSON.stringify(session))
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function isStaffLoggedIn() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return false
    const session = JSON.parse(raw)
    // Session expires after 8 hours
    if (Date.now() - session.at > 8 * 60 * 60 * 1000) {
      localStorage.removeItem(AUTH_KEY)
      return false
    }
    return session.loggedIn === true
  } catch {
    return false
  }
}
