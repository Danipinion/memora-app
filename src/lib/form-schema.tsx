import { z } from 'zod';

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "E-mail/Username is required!"),
  password: z
    .string()
    .min(1, "Password incorrect")
});

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(1, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Must contain at least one uppercase letter")
    .regex(/(?=.*[0-9])/, "Must contain at least one number")
    .regex(/(?=.*[!@#$%^&*])/, "Must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

