"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Mail, Phone } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-4">Contact</p>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-balance">
          Let&apos;s create something beautiful together
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Ready to start your project? Get in touch and let&apos;s discuss how we can bring your vision to life.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-input focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-input focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-input focus:border-primary focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-serif mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@poster.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>hello@poster.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@poster.photo</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif mb-4">Studio Location</h3>
              <p className="text-muted-foreground leading-relaxed">
                123 Creative Avenue
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
