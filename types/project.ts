export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  secondaryDescription?: string;
  date: string;
  location: string;
  stills: string[][];
  coverMobile?: string;
  coverDesktop?: string[];
  video?: {
    src: string;
    poster?: string;
    fullFilmUrl?: string;
  };
  videos?: Array<{
    src: string;
    afterRow: number;
    interactive?: boolean;
    poster?: string;
    fullFilmUrl?: string;
  }>;
  videosOnly?: boolean;
}

export interface AboutData {
  title: string;
  text: string[];
  bottomTitle?: string;
  bottomText?: string[];
}
