import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "puma-san-san-gear",
    title: "PUMA x SAN SAN GEAR",
    subtitle: "FULL THROTTLE",
    description:
      "Direzione artistica, progettazione degli oggetti produzione evento, shooting fotografico",
    date: "Ottobre 2025",
    location: "San Marino",
    image: {
      src: "/image_1.jpg",
      alt: "Puma x San San Gear - Full Throttle",
      width: "100",
    },
  },
  {
    slug: "rimini-fashion",
    title: "RIMINI FASHION WEEK",
    subtitle: "Summer Collection 2025",
    description:
      "Documentazione completa della settimana della moda di Rimini, con focus sulle nuove collezioni estive e i designer emergenti della riviera romagnola.",
    date: "Giugno 2025",
    location: "Rimini, Italia",
    image: {
      src: "/image_2.jpg",
      alt: "Rimini Fashion Week",
      width: "30",
    },
  },
  {
    slug: "luxe-hotels",
    title: "BRAND IDENTITY",
    subtitle: "Luxe Hotels Group",
    description:
      "Sviluppo completo dell'identità visiva per una catena di hotel di lusso. Dal concept iniziale alla realizzazione di tutti i materiali fotografici per web, stampa e social media.",
    date: "Marzo 2025",
    location: "Milano, Italia",
    image: {
      src: "/image_3.jpg",
      alt: "Luxe Hotels Brand Identity",
      width: "30",
    },
  },
  {
    slug: "adidas-streetwear",
    title: "ADIDAS ORIGINALS",
    subtitle: "Street Culture",
    description:
      "Campagna fotografica per il lancio della nuova linea streetwear. Shooting urbano tra le strade di Bologna con modelli e artisti locali.",
    date: "Settembre 2025",
    location: "Bologna, Italia",
    image: {
      src: "/iamge_4.jpg",
      alt: "Adidas Originals Street Culture",
      width: "30",
    },
  },
  {
    slug: "venice-editorial",
    title: "VENICE EDITORIAL",
    subtitle: "Acqua Alta",
    description:
      "Servizio editoriale realizzato durante l'acqua alta a Venezia. Un racconto visivo che unisce moda e architettura in uno scenario unico al mondo.",
    date: "Novembre 2025",
    location: "Venezia, Italia",
    image: {
      src: "/image_5.jpg",
      alt: "Venice Editorial - Acqua Alta",
      width: "30",
    },
  },
  {
    slug: "ferrari-racing",
    title: "FERRARI CHALLENGE",
    subtitle: "Monza Circuit",
    description:
      "Copertura fotografica completa del Ferrari Challenge al circuito di Monza. Dalle prove libere alla cerimonia di premiazione, catturando la velocità e l'emozione della competizione.",
    date: "Luglio 2025",
    location: "Monza, Italia",
    image: {
      src: "/image_6.jpg",
      alt: "Ferrari Challenge Monza",
      width: "30",
    },
  },
  {
    slug: "dolce-vita-campaign",
    title: "LA DOLCE VITA",
    subtitle: "Resort Collection",
    description:
      "Campagna pubblicitaria per una collezione resort ispirata alla dolce vita italiana. Ambientata sulla costiera amalfitana con riprese al tramonto tra Positano e Ravello.",
    date: "Maggio 2025",
    location: "Costiera Amalfitana, Italia",
    image: {
      src: "/image_7.jpg",
      alt: "La Dolce Vita Resort Collection",
      width: "30",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
