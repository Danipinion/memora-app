import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).min(1, { message: 'Email tidak boleh kosong!' }),
  password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password tidak boleh kosong!' }),
});

export const registerSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(1, { message: 'Username tidak boleh kosong!' }),
  email: z.string({ required_error: 'Email is required' }).min(1, { message: 'Email tidak boleh kosong!' }),
  password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password tidak boleh kosong!' }),
  confirmPassword: z.string({ required_error: 'Confirm your password first' }).min(1, { message: 'Konfirmasi password tidak boleh kosong!' }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password tidak sesuai!',
      path: ['confirmPassword'], 
    });
  }
});
