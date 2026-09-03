const baseUrl = "/auth";

const authEndpoints = {
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`,
  refreshToken: `${baseUrl}/refresh-tokens`,
  updateProfile: `${baseUrl}/update-profile`,
  updatePassword: `${baseUrl}/update-password`,
  sendVerificationEmail: `${baseUrl}/send-email-verification-mail`,
  verifyEmail: `${baseUrl}/verify-email`,

  forgotPassword: `${baseUrl}/forgot-password`,
  resetPassword: `${baseUrl}/reset-password`,
} as const;

export default authEndpoints;