import { Navigate } from 'react-router-dom'
import { isStaffLoggedIn } from '../utils/auth'

export default function ProtectedRoute({ children }) {
  if (!isStaffLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  return children
}
