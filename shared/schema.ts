import { z } from "zod";

// Base types for data models
export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface Newsletter {
  id: number;
  email: string;
  createdAt: Date;
}

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export const insertNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
