"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto text-foreground" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#work"
            className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            Work
          </Link>
          <Link
            href="#about"
            className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link
              href="#work"
              className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="#about"
              className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
