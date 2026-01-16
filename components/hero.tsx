import { Logo } from "./logo"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="w-full max-w-4xl mx-auto text-center">
        <Logo className="w-full h-auto text-foreground mb-12" />

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-serif italic">
          Capturing moments that tell stories
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-primary text-primary text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
