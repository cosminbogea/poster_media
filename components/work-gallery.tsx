"use client"

import { useState } from "react"
import Image from "next/image"

const categories = ["All", "Portrait", "Landscape", "Events", "Commercial"]

const works = [
  {
    id: 1,
    title: "Urban Portrait",
    category: "Portrait",
    image: "/artistic-bw-portrait.png",
  },
  {
    id: 2,
    title: "Mountain Dawn",
    category: "Landscape",
    image: "/mountain-landscape-photography-dramatic-lighting.jpg",
  },
  {
    id: 3,
    title: "Wedding Ceremony",
    category: "Events",
    image: "/elegant-wedding-photography-candid-moment.jpg",
  },
  {
    id: 4,
    title: "Brand Campaign",
    category: "Commercial",
    image: "/commercial-product-photography-minimalist.jpg",
  },
  {
    id: 5,
    title: "Studio Session",
    category: "Portrait",
    image: "/studio-portrait-photography-artistic-lighting.jpg",
  },
  {
    id: 6,
    title: "Coastal Sunset",
    category: "Landscape",
    image: "/coastal-sunset-photography-golden-hour.jpg",
  },
]

export function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredWorks = activeCategory === "All" ? works : works.filter((work) => work.category === activeCategory)

  return (
    <section id="work" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Selected Work</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          A curated collection of moments captured through the lens
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm uppercase tracking-widest transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <div key={work.id} className="group relative overflow-hidden bg-secondary aspect-[4/5] cursor-pointer">
              <Image
                src={work.image || "/placeholder.svg"}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-end p-6">
                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs uppercase tracking-widest text-background/80 mb-1">{work.category}</p>
                  <h3 className="text-lg font-serif text-background">{work.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
