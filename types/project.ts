export type ImageWidth = "30" | "50" | "100";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  location: string;
  image: {
    src: string;
    alt: string;
    width: ImageWidth;
  };
}

export interface AboutData {
  title: string;
  text: string[];
  bottomTitle?: string;
  bottomText?: string[];
}
