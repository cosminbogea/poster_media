export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  secondaryDescription?: string;
  date: string;
  location: string;
  stills: string[][];
  video?: {
    src: string;
    poster?: string;
    fullFilmUrl?: string;
  };
}

export interface AboutData {
  title: string;
  text: string[];
  bottomTitle?: string;
  bottomText?: string[];
}
