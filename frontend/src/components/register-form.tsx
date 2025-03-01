import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserCircle2, Mail, Lock, Users } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { userRegistrationSchema, type UserRegistrationFormValues } from "@/components/register-form.types"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function RegistrationForm() {
    const form = useForm<UserRegistrationFormValues>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            userRole: "VOLUNTEER",
        },
    })

    function onSubmit(data: UserRegistrationFormValues) {
        console.log(data)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        if (e.target.files?.[0]) {
            onChange(e.target.files[0])
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <UserCircle2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="John Doe" className="pl-10" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label
                                        htmlFor="picture"
                                        className="relative flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 px-6 py-8 hover:border-primary transition-colors"
                                    >
                                        <div className="space-y-2 text-center">
                                            <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                                            <div className="text-sm text-muted-foreground">
                                                {value?.name || "Drop your image here or click to upload"}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                PNG, JPG or WEBP (max. 2MB)
                                            </div>
                                        </div>
                                        <Input
                                            id="picture"
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="sr-only"
                                            onChange={(e) => handleImageUpload(e, onChange)}
                                            {...field}
                                        />
                                    </Label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="you@example.com" className="pl-10" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userRole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <SelectTrigger className="pl-10">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </div>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
                                    <SelectItem value="ORGANIZATION_ADMIN">Organization Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Create Account</Button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                        Sign in
                    </Link>
                </div>
            </form>
        </Form>
    )
}