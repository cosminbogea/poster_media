import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "san-marino-wedding",
    title: "PUMA x SAN SAN GEAR",
    subtitle: "FULL THROTTLE",
    description:
      "Direzione artistica, progettazione degli oggetti produzione evento, shooting fotografico",
    date: "Ottobre 2025",
    location: "San Marino",
    image: {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
      alt: "San Marino Wedding - Elena & Marco",
      width: "30",
    },
  },
  {
    slug: "rimini-fashion",
    title: "RIMINI FASHION WEEK",
    subtitle: "Summer Collection 2025",
    description:
      "Documentazione completa della settimana della moda di Rimini, con focus sulle nuove collezioni estive. Un progetto che ha coinvolto backstage, sfilate e ritratti dei designer emergenti della riviera romagnola.",
    date: "Giugno 2025",
    location: "Rimini, Italia",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
      alt: "Rimini Fashion Week",
      width: "50",
    },
  },
  {
    slug: "corporate-brand",
    title: "BRAND IDENTITY",
    subtitle: "Luxe Hotels Group",
    description:
      "Sviluppo completo dell'identità visiva per una catena di hotel di lusso. Dal concept iniziale alla realizzazione di tutti i materiali fotografici per web, stampa e social media.",
    date: "Marzo 2025",
    location: "Milano, Italia",
    image: {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
      alt: "Luxe Hotels Brand Identity",
      width: "100",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
