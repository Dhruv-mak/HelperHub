import { LoginForm } from "@/components/login-form"
import { Navbar } from "@/components/Navbar"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar
        menuItems={[]}
        showThemeToggle={true}
        showLoginButton={true}
        onLoginClick={() => navigate("/login")}
      />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  )
}