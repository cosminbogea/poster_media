import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bryan",
    title: "BRYAN",
    subtitle: "LA CORSA DI UNA VITA",
    coverMobile: "/works/bryan/still-05.webp",
    coverDesktop: ["/works/bryan/still-05.webp", "/works/bryan/still-02.webp"],
    description:
      "Bryan – The Race of a Lifetime is a documentary by Jacopo Semprini telling the story of Sammarinese former motocross rider Bryan Toccaceli.",
    secondaryDescription:
      "The film traces his human and sporting journey: from the birth of his passion for engines to his racing career, through the severe accident that changed his life, the long rehabilitation process, and the construction of a new vision for the future. What emerges is a story of resilience, identity and transformation, rooted in the values of motorsport yet capable of speaking to a wider audience. The narrative is guided by the protagonist's voice, supported by contributions from family and close friends, alongside figures connected to the world of professional motorcycle racing. The film originated as an independent project developed in the Republic of San Marino, with the aim of conveying a message of hope and determination through a true story. The national premiere took place in 2022 at Teatro Concordia in San Marino during the Misano MotoGP weekend, playing to a sold-out audience and attended by institutional representatives and MotoGP riders. From 2022 to 2024 the film was distributed on Sky and is now available on YouTube.",
    date: "2022",
    location: "San Marino",
    stills: [
      ["/works/bryan/still-05.webp", "/works/bryan/still-02.webp"],
      ["/works/bryan/still-03.webp"],
      ["/works/bryan/still-04.webp"],
    ],
    video: {
      src: "https://res.cloudinary.com/djhods3my/video/upload/v1771848716/output_tft0qd.mp4",
      poster:
        "https://res.cloudinary.com/djhods3my/image/upload/v1771881675/locandina0_sapy7q.webp",
      fullFilmUrl: "https://www.youtube.com/watch?v=0b-aA5Mncac",
    },
  },
  {
    slug: "q3",
    title: "AUDI Q3",
    subtitle: "VISUAL PRODUCTION",
    description:
      "Visual study dedicated to the new Audi Q3, aimed at exploring its character through a cinematic and contemporary visual language.",
    secondaryDescription:
      "Set within a minimal and immersive natural environment, the project highlights the vehicle's lines, technology and identity, working through atmosphere, depth and precise light control. The aesthetic draws inspiration from the premium automotive world, with a narrative approach focused on shaping brand perception.",
    date: "2025",
    location: "Italia",
    coverMobile: "/works/q3/still-07.webp",
    coverDesktop: [
      "/works/q3/still-05.webp",
      "/works/q3/still-12.webp",
      "/works/q3/still-06.webp",
    ],
    stills: [
      ["/works/q3/still-01.webp"],
      ["/works/q3/still-02.webp"],
      ["/works/q3/still-03.webp", "/works/q3/still-04.webp"],
      [
        "/works/q3/still-06.webp",
        "/works/q3/still-07.webp",
        "/works/q3/still-08.webp",
      ],
      [
        "/works/q3/still-09.webp",
        "/works/q3/still-05.webp",
        "/works/q3/still-10.webp",
      ],
      [
        "/works/q3/still-13.webp",
        "/works/q3/still-11.webp",
        "/works/q3/still-12.webp",
      ],
    ],
  },
  {
    slug: "q4",
    title: "AUDI Q4 E-TRON",
    subtitle: "VISUAL PRODUCTION",
    description:
      "Visual study dedicated to the Audi Q4 e-tron, aimed at expressing its character through an essential and contemporary cinematic language.",
    secondaryDescription:
      "Set across mountain landscapes and high-altitude roads, the project highlights the vehicle's presence, proportions and technology, working with natural light, depth and its relationship with the surrounding environment. The focus is on product perception, clean lines and the creation of strong, recognisable imagery. The aesthetic draws inspiration from the premium automotive world and the narrative of modern travel, with a visual approach designed to convey autonomy, silence and precision.",
    date: "2021",
    location: "Italia",
    coverMobile: "/works/q4/still-04.webp",
    coverDesktop: ["/works/q4/still-01.webp"],
    stills: [
      ["/works/q4/still-01.webp"],
      ["/works/q4/still-02.webp"],
      ["/works/q4/still-03.webp"],
      [
        "/works/q4/still-06.webp",
        "/works/q4/still-04.webp",
        "/works/q4/still-05.webp",
      ],
    ],
  },
  {
    slug: "rbr",
    title: "RINASCITA BASKET RIMINI",
    subtitle: "GAME PRODUCTION",
    description:
      "Photo and video production dedicated to the visual storytelling of basketball in a live game context, with an approach focused on rhythm, intensity and sporting identity.",
    secondaryDescription:
      "The project combines photography and video to build a coherent visual language between action, crowd and arena atmosphere, highlighting the energy, physicality and narrative tension of the game. The focus is on creating dynamic and recognisable imagery capable of conveying the team's character and the live experience of the event. An ongoing production developed for communication, digital content and sports brand promotion, with a contemporary aesthetic designed for media, social platforms and editorial use.",
    date: "2023/2024",
    location: "Rimini, Italia",
    coverMobile: "/works/rbr/still-07.webp",
    coverDesktop: [
      "/works/rbr/still-04.webp",
      "/works/rbr/still-02.webp",
      "/works/rbr/still-03.webp",
    ],
    stills: [
      [
        "/works/rbr/still-01.webp",
        "/works/rbr/still-02.webp",
        "/works/rbr/still-03.webp",
      ],
      [
        "/works/rbr/still-04.webp",
        "/works/rbr/still-05.webp",
        "/works/rbr/still-06.webp",
      ],
      [
        "/works/rbr/still-07.webp",
        "/works/rbr/still-08.webp",
        "/works/rbr/still-09.webp",
      ],
    ],
    video: {
      src: "https://res.cloudinary.com/djhods3my/video/upload/v1771877626/output_xvhdky.mp4",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
