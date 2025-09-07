import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Car,
  Smartphone,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-montserrat font-black text-xl text-foreground">
                ParkEasy
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="font-open-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="font-open-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="font-open-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <Button
                variant="outline"
                size="sm"
                className="font-open-sans bg-transparent"
              >
                Sign In
              </Button>
              <Link href="/gate">
                <Button size="sm" className="font-open-sans cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="font-open-sans">
                  🚀 Now Available in 50+ Cities
                </Badge>
                <h1 className="font-montserrat font-black text-4xl lg:text-6xl text-balance text-foreground">
                  Skip the Search,
                  <span className="text-primary"> Secure Your Space</span>
                </h1>
                <p className="font-open-sans text-lg text-muted-foreground text-pretty max-w-lg">
                  Find and reserve parking spots instantly with ParkEasy. Save
                  time, reduce stress, and never circle the block again.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/gate">
                  <Button
                    size="lg"
                    className="font-open-sans font-semibold cursor-pointer group"
                  >
                    Find Parking Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-open-sans bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-open-sans">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-open-sans">Secure Payments</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-122 h-122">
                <img
                  src="/parking.jpg"
                  alt="Modern parking facility with digital displays"
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-open-sans text-sm font-medium">
                    3 spots available nearby
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-foreground">
              How It Works
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to secure your parking spot and get on with
              your day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-montserrat font-bold text-xl">
                  Find Your Spot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Search for available parking spots near your destination using
                  our real-time map.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Smartphone className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-montserrat font-bold text-xl">
                  Reserve Instantly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Book your spot with one tap. Get instant confirmation and
                  directions to your space.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-montserrat font-bold text-xl">
                  Park & Pay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Arrive at your reserved spot and pay seamlessly through the
                  app. No coins, no hassle.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-foreground">
                  Smart Parking for Smart Cities
                </h2>
                <p className="font-open-sans text-lg text-muted-foreground">
                  Experience the future of urban mobility with our intelligent
                  parking solutions.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-foreground">
                      Real-Time Availability
                    </h3>
                    <p className="font-open-sans text-muted-foreground">
                      Live updates on parking availability so you never waste
                      time searching.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-foreground">
                      Guaranteed Spots
                    </h3>
                    <p className="font-open-sans text-muted-foreground">
                      Your reservation is protected. If your spot isn't
                      available, we'll find you another or refund you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-lg text-foreground">
                      Premium Locations
                    </h3>
                    <p className="font-open-sans text-muted-foreground">
                      Access to exclusive parking spots in prime locations
                      across the city.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/smartphone-app-showing-parking-map-with-available-.jpg"
                alt="ParkEasy mobile app interface"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-foreground">
              Loved by Drivers Everywhere
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground">
              Join thousands of satisfied customers who've made parking
              stress-free.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-open-sans text-muted-foreground mb-4">
                  "ParkEasy saved me 20 minutes every day. I can't imagine going
                  back to circling blocks looking for parking."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-montserrat font-bold text-primary">
                      SM
                    </span>
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-sm">
                      Sarah Martinez
                    </p>
                    <p className="font-open-sans text-xs text-muted-foreground">
                      Downtown Commuter
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-open-sans text-muted-foreground mb-4">
                  "The app is incredibly intuitive. I found a spot right next to
                  the restaurant in seconds."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-montserrat font-bold text-accent">
                      JD
                    </span>
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-sm">
                      James Davis
                    </p>
                    <p className="font-open-sans text-xs text-muted-foreground">
                      Weekend Explorer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-open-sans text-muted-foreground mb-4">
                  "Perfect for business meetings. I always arrive on time now
                  that parking is guaranteed."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-montserrat font-bold text-primary">
                      AL
                    </span>
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-sm">
                      Alex Liu
                    </p>
                    <p className="font-open-sans text-xs text-muted-foreground">
                      Business Professional
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-montserrat font-black text-3xl lg:text-4xl text-balance">
              Ready to Transform Your Parking Experience?
            </h2>
            <p className="font-open-sans text-lg opacity-90">
              Join over 100,000 drivers who've already made the switch to
              stress-free parking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="font-open-sans font-semibold"
              >
                Download App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-open-sans border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Car className="h-6 w-6 text-sidebar-primary" />
                <span className="font-montserrat font-black text-lg text-sidebar-foreground">
                  ParkEasy
                </span>
              </div>
              <p className="font-open-sans text-sm text-sidebar-foreground/70">
                Making urban parking simple, smart, and stress-free for
                everyone.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-sm text-sidebar-foreground mb-4">
                Product
              </h3>
              <ul className="space-y-2 font-open-sans text-sm text-sidebar-foreground/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Locations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-sm text-sidebar-foreground mb-4">
                Support
              </h3>
              <ul className="space-y-2 font-open-sans text-sm text-sidebar-foreground/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-sm text-sidebar-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-2 font-open-sans text-sm text-sidebar-foreground/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
            <p className="font-open-sans text-sm text-sidebar-foreground/70">
              © 2024 ParkEasy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
