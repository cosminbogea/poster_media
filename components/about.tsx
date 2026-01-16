import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] bg-accent overflow-hidden">
            <Image src="/professional-photographer-portrait-artistic.jpg" alt="Photographer" fill className="object-cover" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">About the Artist</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
              Every frame tells a story worth remembering
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over a decade of experience capturing life&apos;s most precious moments, I bring a unique
                perspective to every shoot. My approach combines technical precision with artistic intuition.
              </p>
              <p>
                From intimate portraits to grand landscapes, from corporate events to personal celebrations, I believe
                in creating images that resonate on a deeper level.
              </p>
              <p>Based in New York City, available worldwide for projects that inspire.</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-serif">10+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Years</p>
              </div>
              <div>
                <p className="text-3xl font-serif">500+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-serif">50+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
