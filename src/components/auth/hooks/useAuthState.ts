import { useState, useEffect } from 'react';

interface AuthState {
  isLogin: boolean;
  toggleAuthState: () => void;
  resetState: () => void;
}

export function useAuthState(defaultToSignUp: boolean = false): AuthState {
  const [isLogin, setIsLogin] = useState(!defaultToSignUp);

  // Reset to default state when modal is opened/closed
  useEffect(() => {
    setIsLogin(!defaultToSignUp);
  }, [defaultToSignUp]);

  const toggleAuthState = () => setIsLogin(prev => !prev);
  const resetState = () => setIsLogin(!defaultToSignUp);

  return {
    isLogin,
    toggleAuthState,
    resetState
  };
}