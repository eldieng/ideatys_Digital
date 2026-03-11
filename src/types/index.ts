// Service types
export interface Service {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image?: string;
  problematic: string;
  solution: string;
  process: ProcessStep[];
  results: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// Project / Realisation types
export interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  images?: string[];
  context: string;
  solution: string;
  results: string[];
  technologies: string[];
  date: string;
}

// Team member
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

// Testimonial
export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  image?: string;
}

// Blog article
export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  image: string;
  readTime: number;
}

export type BlogCategory =
  | "seo"
  | "marketing-digital"
  | "branding"
  | "web"
  | "expertise";

// Contact form
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  consent: boolean;
}

// Candidature form
export interface CandidatureFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  motivation: string;
  cvFile: File | null;
  portfolioUrl?: string;
  portfolioFile?: File | null;
  consent: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Stats
export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

// Value
export interface Value {
  title: string;
  description: string;
  icon: string;
}
