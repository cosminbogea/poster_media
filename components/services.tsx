import { Camera, ImageIcon, Film, Sparkles } from "lucide-react"

const services = [
  {
    icon: Camera,
    title: "Portrait Photography",
    description: "Capturing personality and emotion in every frame, from professional headshots to artistic portraits.",
  },
  {
    icon: ImageIcon,
    title: "Event Coverage",
    description: "Documenting your special moments with an unobtrusive yet comprehensive approach.",
  },
  {
    icon: Film,
    title: "Commercial Work",
    description: "Brand photography that tells your story and connects with your audience.",
  },
  {
    icon: Sparkles,
    title: "Fine Art Prints",
    description: "Limited edition prints of signature landscape and abstract work for collectors.",
  },
]

export function Services() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-4">Services</p>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-balance">What I offer</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
