import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useNavigate() {
  const { user } = useAuth();

  const navigateToSignup = useCallback(() => {
    // If there's no user, trigger the auth modal
    if (!user) {
      const authTrigger = document.getElementById('auth-modal-trigger');
      if (authTrigger) {
        authTrigger.click();
      }
    }
  }, [user]);

  return {
    navigateToSignup
  };
}