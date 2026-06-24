import { Project } from "@/types/project";

const R2 = "https://pub-a7b3ff1651a3482b9a2e460b704d5b87.r2.dev";

const JUSTIN = {
  s1: `${R2}/justin/still-01`,
  s2: `${R2}/justin/still-02`,
  s3: `${R2}/justin/still-03`,
  s4: `${R2}/justin/still-04`,
  s5: `${R2}/justin/still-05`,
  s6: `${R2}/justin/still-06`,
  s7: `${R2}/justin/still-07`,
  s8: `${R2}/justin/still-08`,
  s9: `${R2}/justin/still-09`,
  s10: `${R2}/justin/still-10`,
  s11: `${R2}/justin/still-11`,
  s12: `${R2}/justin/still-12`,
  s13: `${R2}/justin/still-13`,
  s14: `${R2}/justin/still-14`,
  s15: `${R2}/justin/still-15`,
  s16: `${R2}/justin/still-16`,
  s17: `${R2}/justin/still-17`,
  s18: `${R2}/justin/still-18`,
  s19: `${R2}/justin/still-19`,
  s20: `${R2}/justin/still-20`,
  s21: `${R2}/justin/still-21`,
};

const BRYAN = {
  s1: `${R2}/bryan/still-01`,
  s2: `${R2}/bryan/still-02`,
  s3: `${R2}/bryan/still-03`,
  s4: `${R2}/bryan/still-04`,
  s5: `${R2}/bryan/still-05`,
  v1: `${R2}/bryan/video-01.mp4`,
};

const Q3 = {
  s1: `${R2}/q3/still-01`,
  s2: `${R2}/q3/still-02`,
  s3: `${R2}/q3/still-03`,
  s4: `${R2}/q3/still-04`,
  s5: `${R2}/q3/still-05`,
  s6: `${R2}/q3/still-06`,
  s7: `${R2}/q3/still-07`,
  s8: `${R2}/q3/still-08`,
  s9: `${R2}/q3/still-09`,
  s10: `${R2}/q3/still-10`,
  s11: `${R2}/q3/still-11`,
  s12: `${R2}/q3/still-12`,
  s13: `${R2}/q3/still-13`,
};

const Q4 = {
  s1: `${R2}/q4/still-01`,
  s2: `${R2}/q4/still-02`,
  s3: `${R2}/q4/still-03`,
  s4: `${R2}/q4/still-04`,
  s5: `${R2}/q4/still-05`,
  s6: `${R2}/q4/still-06`,
};

const RBR = {
  s1: `${R2}/rbr/still-01`,
  s2: `${R2}/rbr/still-02`,
  s3: `${R2}/rbr/still-03`,
  s4: `${R2}/rbr/still-04`,
  s5: `${R2}/rbr/still-05`,
  s6: `${R2}/rbr/still-06`,
  s7: `${R2}/rbr/still-07`,
  s8: `${R2}/rbr/still-08`,
  s9: `${R2}/rbr/still-09`,
  v1: `${R2}/rbr/video-01.mp4`,
};

const RBRDOCS = {
  c1: `${R2}/rbrdocs/cover-01`,
  c2: `${R2}/rbrdocs/cover-02`,
  c3: `${R2}/rbrdocs/cover-03`,
  v1: `${R2}/rbrdocs/video-01.mp4`,
  v2: `${R2}/rbrdocs/video-02.mp4`,
  v3: `${R2}/rbrdocs/video-03.mp4`,
};

const SMADONNATA = {
  auds1: `${R2}/smadonnata/audi-still-01`,
  auds2: `${R2}/smadonnata/audi-still-02`,
  auds3: `${R2}/smadonnata/audi-still-03`,
  audv: `${R2}/smadonnata/audi-video.mp4`,
  sks1: `${R2}/smadonnata/skoda-still-01`,
  sks2: `${R2}/smadonnata/skoda-still-02`,
  sks3: `${R2}/smadonnata/skoda-still-03`,
  skv: `${R2}/smadonnata/skoda-video.mp4`,
  vws1: `${R2}/smadonnata/vw-still-01`,
  vws2: `${R2}/smadonnata/vw-still-02`,
  vws3: `${R2}/smadonnata/vw-still-03`,
  vwv: `${R2}/smadonnata/vw-video.mp4`,
};

export const projects: Project[] = [
  {
    slug: "rbr-documentary-series",
    title: "RINASCITA BASKET RIMINI",
    description:
      "A cinematic social-first documentary series exploring the human side of basketball through the voices, stories and passion surrounding Rinascita Basket Rimini.",
    secondaryDescription:
      "A documentary series created by Poster Media in collaboration with Rinascita Basket Rimini and Dole Italia to tell the story of basketball through the voices of the people who truly live it. From team leaders and rising young talents to lifelong supporters, each episode explores the human side of the sport: passion, sacrifice, identity and belonging. A cinematic social-first format designed to go beyond the court and capture the deep connection between Rimini, its basketball culture and its fans. Directed by Jacopo Semprini.",
    date: "2026",
    location: "Rimini, Italia",
    coverMobile: RBRDOCS.c1,
    coverDesktop: [RBRDOCS.c1, RBRDOCS.c2, RBRDOCS.c3],
    stills: [[RBRDOCS.c1, RBRDOCS.c2, RBRDOCS.c3]],
    videosOnly: true,
    videos: [
      { src: RBRDOCS.v1, afterRow: 0, interactive: true, poster: RBRDOCS.c1 },
      { src: RBRDOCS.v2, afterRow: 0, interactive: true, poster: RBRDOCS.c2 },
      { src: RBRDOCS.v3, afterRow: 0, interactive: true, poster: RBRDOCS.c3 },
    ],
  },
  {
    slug: "smadonnata",
    title: "AUDI, VOLKSWAGEN & ŠKODA",
    subtitle: "social media production",
    description:
      "Social-first photo and video production for Audi, Volkswagen and Škoda during Smadonnata 2026",
    secondaryDescription:
      "Photo and video production for the social media channels of Audi, Volkswagen and Škoda during Smadonnata 2026 in Madonna di Campiglio (TN)\n\nThe work included the production of social-first visual content and the development of communication concepts, captions and storytelling tailored to each brand identity, with a strong focus on highlighting the vehicles, their features and the overall positioning of the brands across digital platforms.",
    date: "2026",
    location: "Madonna di Campiglio, Italia",
    coverMobile: SMADONNATA.auds3,
    coverDesktop: [SMADONNATA.auds3, SMADONNATA.sks3, SMADONNATA.vws1],
    stills: [
      [SMADONNATA.auds1, SMADONNATA.auds2, SMADONNATA.auds3],
      [SMADONNATA.sks1, SMADONNATA.sks2, SMADONNATA.sks3],
      [SMADONNATA.vws1, SMADONNATA.vws2, SMADONNATA.vws3],
    ],
    videos: [
      { src: SMADONNATA.audv, afterRow: 0, interactive: true },
      { src: SMADONNATA.skv, afterRow: 1, interactive: true },
      { src: SMADONNATA.vwv, afterRow: 2, interactive: true },
    ],
  },
  {
    slug: "justin-johnson",
    title: "JUSTIN JOHNSON'S HOMECOMING",
    subtitle: "PHOTO PRODUCTION",
    description:
      "Visual study of Justin Johnson during a Serie A2 game between Verona and Rimini, capturing the intensity of play and the emotional weight of facing a former team.",
    secondaryDescription:
      "Visual study dedicated to Justin Johnson, captured during a Serie A2 matchup between Scaligera Basket Verona and Dole Basket Rimini.\n\nThe project revolves around a return, Johnson stepping back onto the court against his former team, in front of a crowd that once supported him. This underlying narrative shaped the visual direction of the entire shoot.\n\nThe work focuses on contrast: intensity and control, physicality and awareness. Through careful attention to color, composition, and the interplay of light and shadow, the goal was to translate the energy of the game into a cinematic and contemporary visual language.\n\nBeyond performance, the images aim to capture a more nuanced layer — the connection with a former audience, the emotional tension of the moment, and the balance between competitiveness and respect.",
    date: "2026",
    location: "Rimini",
    coverMobile: JUSTIN.s7,
    coverDesktop: [JUSTIN.s12, JUSTIN.s21, JUSTIN.s7],
    stills: [
      [JUSTIN.s1, JUSTIN.s2, JUSTIN.s3],
      [JUSTIN.s4, JUSTIN.s5, JUSTIN.s6],
      [JUSTIN.s7, JUSTIN.s8, JUSTIN.s9],
      [JUSTIN.s10, JUSTIN.s11, JUSTIN.s12],
      [JUSTIN.s13, JUSTIN.s14, JUSTIN.s15],
      [JUSTIN.s16, JUSTIN.s17, JUSTIN.s18],
      [JUSTIN.s19, JUSTIN.s20, JUSTIN.s21],
    ],
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
      src: RBR.v1,
    },
  },
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
    stills: [[BRYAN.s5, BRYAN.s2], [BRYAN.s3], [BRYAN.s4]],
    video: {
      src: BRYAN.v1,
      poster: BRYAN.s5,
      fullFilmUrl: "https://www.youtube.com/watch?v=0b-aA5Mncac",
    },
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
    coverDesktop: [Q4.s6, Q4.s2, Q4.s5],
    stills: [[Q4.s1], [Q4.s4], [Q4.s3], [Q4.s6, Q4.s2, Q4.s5]],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
