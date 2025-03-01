import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/Hero"
import { useNavigate } from "react-router-dom"

const navigationItems = [
    {
        title: "Register",
        subItems: [
            {
                title: "Register as Organization",
                href: "/register/organization",
                description: "Manage projects, events, and recruit volunteers."
            },
            {
                title: "Register as Volunteer",
                href: "/register/volunteer",
                description: "Explore opportunities and track your volunteer hours."
            }
        ]
    },
    {
        title: "About",
        href: "/about"
    }
]

export const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="h-screen w-full">
            <Navbar
                menuItems={navigationItems}
                showThemeToggle={true}
                showLoginButton={true}
                onLoginClick={() => navigate("/login")}
            />
            <HeroSection />
        </div>
    )
}