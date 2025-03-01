import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Phone, Building, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"

const organizationFormSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    organizationName: z
      .string()
      .min(2, "Organization name must be at least 2 characters")
      .max(100, "Organization name must not exceed 100 characters"),
    // Rest of your schema remains the same
    phoneNumber: z.string().min(10),
    address: z.string().min(10).max(200),
    description: z.string().min(100).max(1000),
    profilePicture: z.instanceof(File).optional(),
  })

type OrganizationFormValues = z.infer<typeof organizationFormSchema>

export function OrganizationRegistration() {
  const navigate = useNavigate()
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
  })

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    onChange: (...event: any[]) => void
  ) => {
    if (e.target.files?.[0]) {
      onChange(e.target.files[0])
    }
  }

  function onSubmit(data: OrganizationFormValues) {
    console.log(data)
    // Handle form submission
  }

  return (
    <>
      <Navbar
        menuItems={[]}
        showThemeToggle={true}
        showLoginButton={true}
        onLoginClick={() => navigate("/login")}
      />
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        <div className="container max-w-2xl mx-auto px-4 py-8">
          <Card className="backdrop-blur-sm border-muted/40">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Complete Organization Profile</CardTitle>
              <CardDescription>
                Tell us about your organization and its mission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Your Organization Name" className="pl-10" {...field} />
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
                        <FormLabel>Organization Logo</FormLabel>
                        <FormControl>
                          <div className="grid w-full items-center gap-1.5">
                            <Label
                              htmlFor="picture"
                              className={cn(
                                "relative flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed px-6 py-8",
                                "border-muted-foreground/25 hover:border-primary transition-colors",
                                value && "border-primary bg-primary/5"
                              )}
                            >
                              <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                                <div className="text-sm text-muted-foreground">
                                  {value?.name || "Upload your organization logo"}
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
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="+1 (555) 000-0000" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="123 Main St, City, Country" 
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your organization's mission, goals, and the impact you want to make..." 
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Complete Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}