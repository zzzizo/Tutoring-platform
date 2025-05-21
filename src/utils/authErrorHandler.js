/**
 * Handles Firebase authentication error codes and returns user-friendly messages
 * @param {Error} error - The error object from Firebase
 * @returns {string} A user-friendly error message
 */
export const handleAuthError = (error) => {
  const errorCode = error.code;
  
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or try logging in.';
    
    case 'auth/invalid-email':
      return 'The email address is not valid. Please check and try again.';
    
    case 'auth/weak-password':
      return 'The password is too weak. Please use a stronger password.';
    
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or sign up.';
    
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    
    default:
      console.error('Auth error:', error);
      return 'An error occurred during authentication. Please try again.';
  }
};