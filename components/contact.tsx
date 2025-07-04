"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Palette, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [formState, setFormState] = useState<{
    isSubmitting: boolean
    response: { success: boolean; message: string } | null
  }>({
    isSubmitting: false,
    response: null,
  })

  const [formErrors, setFormErrors] = useState<{
    name?: string
    email?: string
    phone?: string
    message?: string
  }>({})

  const validateForm = (): boolean => {
    const errors: {
      name?: string
      email?: string
      phone?: string
      message?: string
    } = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Trim input data directly
    const trimmedData: FormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    }
  
    // Validate using trimmedData
    const errors: {
      name?: string
      email?: string
      phone?: string
      message?: string
    } = {}
  
    if (!trimmedData.name) {
      errors.name = "Name is required"
    } else if (trimmedData.name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    }
  
    if (!trimmedData.email) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedData.email)) {
      errors.email = "Please enter a valid email address"
    }
  
    if (trimmedData.phone && !/^[0-9+\-\s()]{7,15}$/.test(trimmedData.phone)) {
      errors.phone = "Please enter a valid phone number"
    }
  
    if (!trimmedData.message) {
      errors.message = "Message is required"
    } else if (trimmedData.message.length < 10) {
      errors.message = "Message must be at least 10 characters"
    }
  
    setFormErrors(errors)
  
    if (Object.keys(errors).length > 0) {
      return
    }
  
    setFormState({
      isSubmitting: true,
      response: null,
    })
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      })
  
      const data = await response.json()
  
      setFormState({
        isSubmitting: false,
        response: {
          success: data.success,
          message: data.message,
        },
      })
  
      // Reset form only if success
      if (data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState({
        isSubmitting: false,
        response: {
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        },
      })
    }
  }
  
  return (
    <section className="py-20 bg-muted" id="contact">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Create Something Amazing</h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a project in mind or just want to chat about 3D art, I'm always excited to connect with
                fellow creators and potential clients.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>ananthrkulks@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>+917899033043</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>Kaiga Township, Karwar, Karnataka, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://artstation.com" target="_blank" rel="noopener noreferrer">
                  <Palette className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
                  <ImageIcon className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              {formState.response && (
                <Alert
                  className={`mb-6 ${formState.response.success ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}
                  variant={formState.response.success ? "default" : "destructive"}
                >
                  {formState.response.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{formState.response.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{formState.response.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className={formErrors.name ? "text-red-500" : ""}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className={formErrors.name ? "border-red-500" : ""}
                    disabled={formState.isSubmitting}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={formErrors.email ? "text-red-500" : ""}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className={formErrors.email ? "border-red-500" : ""}
                    disabled={formState.isSubmitting}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className={formErrors.phone ? "text-red-500" : ""}>
                    Phone (optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                    className={formErrors.phone ? "border-red-500" : ""}
                    disabled={formState.isSubmitting}
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={formErrors.message ? "text-red-500" : ""}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className={formErrors.message ? "border-red-500" : ""}
                    disabled={formState.isSubmitting}
                  />
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
