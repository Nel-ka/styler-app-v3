import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuthState } from './hooks/useAuthState';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultToSignUp?: boolean;
}

export default function AuthModal({ isOpen, onClose, defaultToSignUp = false }: AuthModalProps) {
  const { isLogin, toggleAuthState, resetState } = useAuthState(defaultToSignUp);
  const { user } = useAuth();

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  // Reset form state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  if (!isOpen) return null;

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 text-center">
            {isLogin ? 'Sign in to your account' : 'Join Styler for personalized fashion'}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-4 text-center">
          <button
            onClick={toggleAuthState}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}