import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '@pages/Home'
import Login from '@pages/Login'
import { Register } from '@pages/Register'
import { ThemeProvider } from '@components/theme-provider'
import { VolunteerRegistration } from '@pages/VoluteerRegistration'
import { OrganizationRegistration } from '@pages/OrganizationRegistration'
import { AuthProvider } from '@/contexts/auth-context'

export function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/register/volunteer" element={<VolunteerRegistration />} />
            <Route path="/register/organization" element={<OrganizationRegistration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}