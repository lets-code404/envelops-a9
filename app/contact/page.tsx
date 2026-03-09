"use client";

import React from "react"

import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building2,
  User,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Stationery Lane", "Mumbai, Maharashtra 400001", "India"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 22 1234 5678"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@envelop.in", "orders@envelop.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our products or need a custom quote? We are
              here to help you find the perfect envelope solution for your
              needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail) => (
                        <p key={detail} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border/50 shadow-xl">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-accent" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We will get back to you
                        within 24 hours.
                      </p>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormState({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            inquiryType: "",
                            message: "",
                          });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-serif text-2xl font-bold">
                            Send us a Message
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Fill out the form and we will respond promptly
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              required
                              value={formState.name}
                              onChange={(e) =>
                                setFormState({ ...formState, name: e.target.value })
                              }
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              required
                              value={formState.email}
                              onChange={(e) =>
                                setFormState({ ...formState, email: e.target.value })
                              }
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              placeholder="+91 98765 43210"
                              value={formState.phone}
                              onChange={(e) =>
                                setFormState({ ...formState, phone: e.target.value })
                              }
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              Company Name
                            </Label>
                            <Input
                              id="company"
                              placeholder="Your Company"
                              value={formState.company}
                              onChange={(e) =>
                                setFormState({ ...formState, company: e.target.value })
                              }
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Inquiry Type *</Label>
                          <Select
                            value={formState.inquiryType}
                            onValueChange={(value) =>
                              setFormState({ ...formState, inquiryType: value })
                            }
                            required
                          >
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="bulk">Bulk Order Quote</SelectItem>
                              <SelectItem value="custom">Custom Design</SelectItem>
                              <SelectItem value="partnership">Business Partnership</SelectItem>
                              <SelectItem value="support">Order Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Your Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your requirements..."
                            rows={5}
                            required
                            value={formState.message}
                            onChange={(e) =>
                              setFormState({ ...formState, message: e.target.value })
                            }
                            className="bg-background resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden border-border/50 shadow-xl">
                <div className="h-80 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="text-center relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Stationery Lane, Mumbai
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Contact Options */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call Now</p>
                      <p className="font-semibold">+91 98765 43210</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Us</p>
                      <p className="font-semibold">hello@envelop.in</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Link */}
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Find quick answers to common questions about orders,
                    shipping, and customization.
                  </p>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    View FAQs
                    <span className="text-lg">&rarr;</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
