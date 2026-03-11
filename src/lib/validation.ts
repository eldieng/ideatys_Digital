import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000),
  consent: z.literal(true, { message: "Vous devez accepter la politique de confidentialité" }),
  honeypot: z.string().max(0).optional(),
});

export const candidatureSchema = z.object({
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .min(10, "Numéro de téléphone invalide")
    .max(20),
  position: z.string().min(1, "Veuillez sélectionner un poste"),
  experience: z.string().min(1, "Veuillez sélectionner votre niveau"),
  motivation: z
    .string()
    .min(50, "Le message doit contenir au moins 50 caractères")
    .max(5000),
  portfolioUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  consent: z.literal(true, { message: "Vous devez accepter la politique de confidentialité" }),
  honeypot: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type CandidatureFormValues = z.infer<typeof candidatureSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
