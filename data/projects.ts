import { Project } from "@/types/project";

const JUSTIN = {
  s1: "https://res.cloudinary.com/djhods3my/image/upload/v1774705725/still-01_ves5rj.jpg",
  s2: "https://res.cloudinary.com/djhods3my/image/upload/v1774705725/still-02_hlywsw.jpg",
  s3: "https://res.cloudinary.com/djhods3my/image/upload/v1774705725/still-03_cbhq3y.jpg",
  s4: "https://res.cloudinary.com/djhods3my/image/upload/v1774705726/still-04_fdjnix.jpg",
  s5: "https://res.cloudinary.com/djhods3my/image/upload/v1774705726/still-05_jiqvud.jpg",
  s6: "https://res.cloudinary.com/djhods3my/image/upload/v1774705726/still-06_qiabqx.jpg",
  s7: "https://res.cloudinary.com/djhods3my/image/upload/v1774705726/still-07_zgmyjh.jpg",
  s8: "https://res.cloudinary.com/djhods3my/image/upload/v1774705727/still-08_asfcks.jpg",
  s9: "https://res.cloudinary.com/djhods3my/image/upload/v1774705727/still-09_himzxb.jpg",
  s10: "https://res.cloudinary.com/djhods3my/image/upload/v1774705727/still-10_ew3vxc.jpg",
  s11: "https://res.cloudinary.com/djhods3my/image/upload/v1774705727/still-11_b3uvyb.jpg",
  s12: "https://res.cloudinary.com/djhods3my/image/upload/v1774705727/still-12_pq5ldz.jpg",
  s13: "https://res.cloudinary.com/djhods3my/image/upload/v1774705728/still-13_juchmd.jpg",
  s14: "https://res.cloudinary.com/djhods3my/image/upload/v1774705729/still-14_cyyqgs.jpg",
  s15: "https://res.cloudinary.com/djhods3my/image/upload/v1774705731/still-15_nk6yqr.jpg",
  s16: "https://res.cloudinary.com/djhods3my/image/upload/v1774705731/still-16_aksdgn.jpg",
  s17: "https://res.cloudinary.com/djhods3my/image/upload/v1774705731/still-17_yparti.jpg",
  s18: "https://res.cloudinary.com/djhods3my/image/upload/v1774705732/still-18_ddkk2a.jpg",
  s19: "https://res.cloudinary.com/djhods3my/image/upload/v1774705731/still-19_mxe1rd.jpg",
  s20: "https://res.cloudinary.com/djhods3my/image/upload/v1774705731/still-20_anfwtr.jpg",
  s21: "https://res.cloudinary.com/djhods3my/image/upload/v1774705733/still-21_rlzjap.jpg",
};

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

const RBRDOCS = {
  c1: "https://res.cloudinary.com/djhods3my/image/upload/v1779638665/IMG_9387_wiuuor.jpg",
  c2: "https://res.cloudinary.com/djhods3my/image/upload/v1779638665/IMG_9429_wsoktv.jpg",
  c3: "https://res.cloudinary.com/djhods3my/image/upload/v1779638667/IMG_9763_qldjpm.jpg",
  v1: "https://res.cloudinary.com/djhods3my/video/upload/v1779638707/output2_q0ckwt.mp4",
  v2: "https://res.cloudinary.com/djhods3my/video/upload/v1779639271/output1_sne4aa.mp4",
  v3: "https://res.cloudinary.com/djhods3my/video/upload/v1779638703/output_jjjivr.mp4",
};

const SMADONNATA = {
  auds1:
    "https://res.cloudinary.com/djhods3my/image/upload/v1779637385/JSP04273_cckkms.jpg",
  auds2:
    "https://res.cloudinary.com/djhods3my/image/upload/v1779637386/JSP04284_feovyc.jpg",
  auds3:
    "https://res.cloudinary.com/djhods3my/image/upload/v1779637387/JSP04301_vq6jln.jpg",
  audv: "https://res.cloudinary.com/djhods3my/video/upload/v1779638131/output_d3omcp.mp4",
  sks1: "https://res.cloudinary.com/djhods3my/image/upload/v1779638203/JSP04343_ol38rb.jpg",
  sks2: "https://res.cloudinary.com/djhods3my/image/upload/v1779638204/JSP04358_elvyjv.jpg",
  sks3: "https://res.cloudinary.com/djhods3my/image/upload/v1779638229/JSP04383_pnjole.jpg",
  skv: "https://res.cloudinary.com/djhods3my/video/upload/v1779638233/output_yg1anb.mp4",
  vws1: "https://res.cloudinary.com/djhods3my/image/upload/v1779638297/JSP04395_ublgh5.jpg",
  vws2: "https://res.cloudinary.com/djhods3my/image/upload/v1779638298/JSP04401_jxcbln.jpg",
  vws3: "https://res.cloudinary.com/djhods3my/image/upload/v1779638299/JSP04421_iig5zq.jpg",
  vwv: "https://res.cloudinary.com/djhods3my/video/upload/v1779638303/output_gaghtv.mp4",
};

export const projects: Project[] = [
  {
    slug: "rbr-documentary-series",
    title: "RINASCITA BASKET RIMINI",
    subtitle: "Documentary Series",
    description:
      "A cinematic social-first documentary series exploring the human side of basketball through the voices, stories and passion surrounding Rinascita Basket Rimini.",
    secondaryDescription:
      "A documentary series created by Poster Media in collaboration with Rinascita Basket Rimini and Dole Italia to tell the story of basketball through the voices of the people who truly live it. From team leaders and rising young talents to lifelong supporters, each episode explores the human side of the sport: passion, sacrifice, identity and belonging. A cinematic social-first format designed to go beyond the court and capture the deep connection between Rimini, its basketball culture and its fans. Directed by Jacopo Semprini.",
    date: "2026",
    location: "Rimini, Italia",
    coverMobile: RBRDOCS.c1,
    coverDesktop: [RBRDOCS.c1, RBRDOCS.c2, RBRDOCS.c3],
    stills: [[RBRDOCS.c1, RBRDOCS.c2, RBRDOCS.c3]],
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
      src: "https://res.cloudinary.com/djhods3my/video/upload/v1771877626/output_xvhdky.mp4",
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
      src: "https://res.cloudinary.com/djhods3my/video/upload/v1771848716/output_tft0qd.mp4",
      poster:
        "https://res.cloudinary.com/djhods3my/image/upload/v1771881675/locandina0_sapy7q.webp",
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
    coverDesktop: [Q4.s6, Q4.s4, Q4.s5],
    stills: [[Q4.s1], [Q4.s2], [Q4.s3], [Q4.s6, Q4.s4, Q4.s5]],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
