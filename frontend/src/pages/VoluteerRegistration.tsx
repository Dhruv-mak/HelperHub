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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const skills = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Social Media",
  "Teaching",
  "Event Planning",
  "Photography",
  "Translation",
  "First Aid",
  "Project Management",
] as const

const volunteerFormSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must not exceed 500 characters"),
  weeklyHours: z.number().min(1).max(40),
  location: z.string().min(3, "Location must be at least 3 characters"),
  skills: z.array(z.string()).min(1, "Select at least one skill")
})

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>

export function VolunteerRegistration() {
  const navigate = useNavigate()
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      skills: [],
      weeklyHours: 5
    }
  })

  function onSubmit(data: VolunteerFormValues) {
    console.log(data)
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
              <CardTitle className="text-2xl font-bold">Complete Your Volunteer Profile</CardTitle>
              <CardDescription>
                Tell us more about yourself and your volunteering interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="abcd@gmail.com" {...field} />
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
                          <Input type="password" placeholder="••••••••" {...field} />
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
                          <Input placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself, your experience, and what motivates you to volunteer..." 
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weeklyHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekly Available Hours</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            max={40}
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                Select skills
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search skills..." />
                                <CommandEmpty>No skill found.</CommandEmpty>
                                <CommandGroup>
                                  {skills.map((skill) => (
                                    <CommandItem
                                      key={skill}
                                      onSelect={() => {
                                        const currentValue = field.value || []
                                        const newValue = currentValue.includes(skill)
                                          ? currentValue.filter((s) => s !== skill)
                                          : [...currentValue, skill]
                                        field.onChange(newValue)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(skill) 
                                            ? "opacity-100" 
                                            : "opacity-0"
                                        )}
                                      />
                                      {skill}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((skill) => (
                            <Badge 
                              key={skill}
                              variant="secondary"
                              className="gap-1 px-2 py-0.5"
                            >
                              {skill}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => {
                                  field.onChange(
                                    field.value?.filter((s) => s !== skill)
                                  )
                                }}
                              />
                            </Badge>
                          ))}
                        </div>
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