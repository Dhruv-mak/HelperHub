import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { RegistrationForm } from "@/components/register-form"
import { Navbar } from "@/components/Navbar"

export function Register() {

    const navigate = useNavigate()
    return (
        <>
            <Navbar
                menuItems={[]}
                showThemeToggle={true}
                showLoginButton={true}
                onLoginClick={() => navigate("/login")}
            />
            <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
                <div className="container max-w-md mx-auto px-4 py-8">
                    <Card className="backdrop-blur-sm border-muted/40">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                            <CardDescription>
                                Enter your details below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            < RegistrationForm />
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    )
}