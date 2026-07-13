import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Gallery from './pages/Gallery'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import TreatmentPlan from './pages/TreatmentPlan'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-surface-dark text-gray-200' : 'bg-surface text-gray-800'}`}>
      {!isLoginPage && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <ScrollToTop />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/treatment/:id" element={<ProtectedRoute><TreatmentPlan /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <WhatsAppButton />}
    </div>
  )
}

export default App
