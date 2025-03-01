"use client"

import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Avatar, AvatarImage } from "@components/ui/avatar"
import { Globe, ArrowRight, Heart, Users, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-muted" />

      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Main content */}
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col space-y-8">
            {/* Join callout */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-muted/50 p-1 pr-6 backdrop-blur-sm">
              <Link to="/register/volunteer">
                <Button variant="default" className="rounded-full px-5 hover:scale-105 transition-transform cursor-pointer">
                  Join the Movement
                </Button>
              </Link>
              <span className="flex items-center text-sm font-medium">
                <Globe className="mr-2 h-4 w-4" />
                5,000+ Volunteers Worldwide
              </span>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Empower Change
              </span>
              <br />
              Through Volunteering
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Connect with causes that inspire you, make lasting impacts, and build a
              better world together with our intelligent volunteer matching platform.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/register/volunteer">
                  <Button size="lg" className="group cursor-pointer">
                    Join as Volunteer
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/register/organization">
                  <Button size="lg" variant="outline" className="group cursor-pointer">
                    Register Organization
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { icon: Heart, label: "Causes", value: "200+" },
                { icon: Users, label: "Volunteers", value: "5,000+" },
                { icon: Calendar, label: "Events", value: "1,000+" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="mx-auto h-6 w-6 mb-2 text-primary" />
                  <div className="font-bold text-xl">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex justify-center">
            <Card className="bg-background/60 backdrop-blur-md border-muted">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6">
                  {/* Avatar stack */}
                  <div className="flex -space-x-4 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Avatar
                        key={item}
                        className="h-16 w-16 border-4 border-background transition-transform hover:scale-110"
                      >
                        <AvatarImage src={`./src/assets/images/prof${item}.jpg`} />
                      </Avatar>
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">Join Our Community</h2>
                    <p className="text-muted-foreground">
                      Connect with passionate volunteers and create meaningful impact together
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-secondary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}