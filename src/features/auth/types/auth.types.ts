import { z } from "zod";
import { 
  forgotPasswordSchema, 
  loginSchema, 
  resetPasswordSchema, 
  updatePasswordSchema, 
  updateProfileSchema, 
  verifyEmailSchema 
} from "../schemas/auth.schema";

export type Role = "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: Role;
  isActive: boolean;
  isVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  user: User;
}

export type LoginRequest = z.infer<typeof loginSchema>;

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;

export type UpdateProfileResponse = Pick<LoginResponse, "user">;

export type UpdatePasswordRequest = Omit<z.infer<typeof updatePasswordSchema>, "confirmPassword">;

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordRequest = Omit<z.infer<typeof resetPasswordSchema>, "confirmPassword">;

export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: "light" | "dark";
  hasHydrated: boolean;
  patchUser: (partial: Partial<User>) => void;
  setUser: (user: User) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}