import api from "@/lib/api/axios";
import { ApiResponse } from "@/utils/types";
import authEndpoints from "../constants/auth.endpoints";
import {
  AuthTokens,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
  VerifyEmailRequest,
} from "../types/auth.types";

export const authApi = {
  login: (payload: LoginRequest) => api.post<ApiResponse<LoginResponse>>(authEndpoints.login, payload).then((res) => res.data.data),
  logout: () => api.post(authEndpoints.logout).then((res) => res.data),
  refreshToken: () => api.post<ApiResponse<AuthTokens>>(authEndpoints.refreshToken).then((res) => res.data.data),
  updateProfile: (payload: UpdateProfileRequest) => api.put<ApiResponse<UpdateProfileResponse>>(authEndpoints.updateProfile, payload).then((res) => res.data.data.user),
  updatePassword: (payload: UpdatePasswordRequest) =>api.put(authEndpoints.updatePassword, payload).then((res) => res.data),
  sendVerificationEmail: () =>api.get(authEndpoints.sendVerificationEmail).then((res) => res.data),
  verifyEmail: (payload: VerifyEmailRequest) =>api.post(authEndpoints.verifyEmail, payload).then((res) => res.data),
  
  forgotPassword: (payload: ForgotPasswordRequest) => api.post(authEndpoints.forgotPassword, payload).then((res) => res.data),
  resetPassword: (payload: ResetPasswordRequest) => api.post(authEndpoints.resetPassword, payload).then((res) => res.data),
};