"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FaqSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
            <CardDescription>
              Find answers to the most frequently asked questions about my 3D design services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is your typical project timeline?</AccordionTrigger>
                <AccordionContent>
                  Project timelines vary based on complexity and scope. A character model might take 1-2 weeks, while a
                  full environment could take 4-6 weeks. During our initial consultation, I'll provide a detailed
                  timeline specific to your project needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What file formats do you deliver?</AccordionTrigger>
                <AccordionContent>
                  I can deliver in various formats including .fbx, .obj, .blend, .max, and .ma/.mb. For textures, I
                  provide .png, .jpg, .tif, and .psd files with organized layers. I'll ensure the deliverables match
                  your technical requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer revisions?</AccordionTrigger>
                <AccordionContent>
                  Yes, my standard packages include 2-3 rounds of revisions. This ensures we achieve the exact look and
                  functionality you're seeking. Additional revision rounds can be arranged if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do you handle project pricing?</AccordionTrigger>
                <AccordionContent>
                  Pricing is customized based on project requirements, complexity, timeline, and usage rights. I offer
                  both fixed-price quotes and hourly rates depending on the nature of the work. Contact me with your
                  project details for a personalized quote.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can you work with specific technical constraints?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. I'm experienced in creating assets for various platforms including mobile, VR/AR,
                  real-time engines, film, and print. I can optimize models for polygon count, texture resolution, and
                  other technical specifications to meet your platform requirements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
