

const authEndpoints = {
  login: "/auth/login",
  logout: "/auth/logout",
  refreshToken: "/auth/refresh-token",
  updateProfile: "/auth/profile",
  updatePassword: "/auth/password",
  sendVerificationEmail: "/auth/send-verification-email",
  verifyEmail: "/auth/verify-email",

  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
} as const;

export default authEndpoints;