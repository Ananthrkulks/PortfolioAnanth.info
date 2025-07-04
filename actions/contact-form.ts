"use server"

import { z } from "zod"
import emailjs from "@emailjs/nodejs"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

// Type for the form data
export type ContactFormData = z.infer<typeof contactFormSchema>

// Type for the response
export type ContactFormResponse = {
  success: boolean
  message: string
}

// Initialize EmailJS with environment variables
const initEmailJS = () => {
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
    privateKey: process.env.EMAILJS_PRIVATE_KEY || "",
  })
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResponse> {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData)

    // Initialize EmailJS
    initEmailJS()

    // Send email using EmailJS
    await emailjs.send(process.env.EMAILJS_SERVICE_ID || "", process.env.EMAILJS_TEMPLATE_ID || "", {
      from_name: validatedData.name,
      from_email: validatedData.email,
      message: validatedData.message,
      to_name: "Ananth R Kulkarni",
      reply_to: validatedData.email,
    })

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return {
        success: false,
        message: `Validation error: ${errorMessage}`,
      }
    }

    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later.",
    }
  }
}
