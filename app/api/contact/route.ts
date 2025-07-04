import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// This helper function sends the email
const sendEmail = async (name: string, email: string, phone: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"Website Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER, // or another email if you want to receive it elsewhere
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send email:', (error as Error).message)
    throw new Error('Failed to send email')
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 })
    }

    await sendEmail(name, email, phone, message)
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 }) 
  } catch (error) {
    console.error('Error in POST handler:', error)
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 })
  }
}
