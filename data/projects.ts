import { Project } from "@/types/project";

const BRYAN = {
  s1: "https://res.cloudinary.com/djhods3my/image/upload/v1773572266/still-01_nnsudo.webp",
  s2: "https://res.cloudinary.com/djhods3my/image/upload/v1773572266/still-02_btkf5y.webp",
  s3: "https://res.cloudinary.com/djhods3my/image/upload/v1773572267/still-03_tddbhv.webp",
  s4: "https://res.cloudinary.com/djhods3my/image/upload/v1773572267/still-04_pecgig.webp",
  s5: "https://res.cloudinary.com/djhods3my/image/upload/v1773572268/still-05_ac2j18.webp",
};

const Q3 = {
  s1: "https://res.cloudinary.com/djhods3my/image/upload/v1773573317/still-01_rareue.webp",
  s2: "https://res.cloudinary.com/djhods3my/image/upload/v1773573317/still-02_hvlteh.webp",
  s3: "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-03_b803lq.webp",
  s4: "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-04_zfe8rc.webp",
  s5: "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-05_dgogfb.webp",
  s6: "https://res.cloudinary.com/djhods3my/image/upload/v1773573320/still-06_tddbpa.webp",
  s7: "https://res.cloudinary.com/djhods3my/image/upload/v1773573321/still-07_ksotbd.webp",
  s8: "https://res.cloudinary.com/djhods3my/image/upload/v1773573321/still-08_nrmzud.webp",
  s9: "https://res.cloudinary.com/djhods3my/image/upload/v1773573322/still-09_txtazy.webp",
  s10: "https://res.cloudinary.com/djhods3my/image/upload/v1773573323/still-10_ekyuq2.webp",
  s11: "https://res.cloudinary.com/djhods3my/image/upload/v1773573324/still-11_ckvs1d.webp",
  s12: "https://res.cloudinary.com/djhods3my/image/upload/v1773573325/still-12_fdqarg.webp",
  s13: "https://res.cloudinary.com/djhods3my/image/upload/v1773573326/still-13_dnjzft.webp",
};

const Q4 = {
  s1: "https://res.cloudinary.com/djhods3my/image/upload/v1773573341/still-01_trskoh.webp",
  s2: "https://res.cloudinary.com/djhods3my/image/upload/v1773573341/still-02_elzo6z.webp",
  s3: "https://res.cloudinary.com/djhods3my/image/upload/v1773573342/still-03_craqn0.webp",
  s4: "https://res.cloudinary.com/djhods3my/image/upload/v1773573343/still-04_jeu83w.webp",
  s5: "https://res.cloudinary.com/djhods3my/image/upload/v1773573344/still-05_ybuf0f.webp",
  s6: "https://res.cloudinary.com/djhods3my/image/upload/v1773573345/still-06_czhey3.webp",
};

const RBR = {
  s1: "https://res.cloudinary.com/djhods3my/image/upload/v1773573362/still-01_dxt0s0.webp",
  s2: "https://res.cloudinary.com/djhods3my/image/upload/v1773573363/still-02_gamwln.webp",
  s3: "https://res.cloudinary.com/djhods3my/image/upload/v1773573364/still-03_lg1bho.webp",
  s4: "https://res.cloudinary.com/djhods3my/image/upload/v1773573366/still-04_uumsdo.webp",
  s5: "https://res.cloudinary.com/djhods3my/image/upload/v1773573367/still-05_etnc0n.webp",
  s6: "https://res.cloudinary.com/djhods3my/image/upload/v1773573368/still-06_m7lnps.webp",
  s7: "https://res.cloudinary.com/djhods3my/image/upload/v1773573369/still-07_codipn.webp",
  s8: "https://res.cloudinary.com/djhods3my/image/upload/v1773573370/still-08_ozpz9j.webp",
  s9: "https://res.cloudinary.com/djhods3my/image/upload/v1773573371/still-09_zof9iy.webp",
};

export const projects: Project[] = [
  {
    slug: "bryan",
    title: "BRYAN",
    subtitle: "LA CORSA DI UNA VITA",
    coverMobile: BRYAN.s5,
    coverDesktop: [BRYAN.s5, BRYAN.s2],
    description:
      "Bryan – The Race of a Lifetime is a documentary by Jacopo Semprini telling the story of Sammarinese former motocross rider Bryan Toccaceli.",
    secondaryDescription:
      "The film traces his human and sporting journey: from the birth of his passion for engines to his racing career, through the severe accident that changed his life, the long rehabilitation process, and the construction of a new vision for the future. What emerges is a story of resilience, identity and transformation, rooted in the values of motorsport yet capable of speaking to a wider audience. The narrative is guided by the protagonist's voice, supported by contributions from family and close friends, alongside figures connected to the world of professional motorcycle racing. The film originated as an independent project developed in the Republic of San Marino, with the aim of conveying a message of hope and determination through a true story. The national premiere took place in 2022 at Teatro Concordia in San Marino during the Misano MotoGP weekend, playing to a sold-out audience and attended by institutional representatives and MotoGP riders. From 2022 to 2024 the film was distributed on Sky and is now available on YouTube.",
    date: "2022",
    location: "San Marino",
    stills: [
      [BRYAN.s5, BRYAN.s2],
      [BRYAN.s3],
      [BRYAN.s4],
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
    coverMobile: Q3.s7,
    coverDesktop: [Q3.s5, Q3.s12, Q3.s6],
    stills: [
      [Q3.s1],
      [Q3.s2],
      [Q3.s3, Q3.s4],
      [Q3.s6, Q3.s7, Q3.s8],
      [Q3.s9, Q3.s5, Q3.s10],
      [Q3.s13, Q3.s11, Q3.s12],
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
    coverMobile: Q4.s4,
    coverDesktop: [Q4.s1],
    stills: [
      [Q4.s1],
      [Q4.s2],
      [Q4.s3],
      [Q4.s6, Q4.s4, Q4.s5],
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
    coverMobile: RBR.s7,
    coverDesktop: [RBR.s4, RBR.s2, RBR.s3],
    stills: [
      [RBR.s1, RBR.s2, RBR.s3],
      [RBR.s4, RBR.s5, RBR.s6],
      [RBR.s7, RBR.s8, RBR.s9],
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
