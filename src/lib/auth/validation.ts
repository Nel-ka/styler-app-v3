import { SignUpData } from './types';

export const validateSignUpData = (data: SignUpData): string | null => {
  if (!data.email.includes('@')) {
    return 'Please enter a valid email address';
  }
  
  if (data.password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  const age = parseInt(data.age);
  if (isNaN(age) || age < 18 || age > 100) {
    return 'Age must be between 18 and 100';
  }

  const height = parseInt(data.height);
  if (isNaN(height) || height < 100 || height > 250) {
    return 'Height must be between 100 and 250 cm';
  }

  const weight = parseInt(data.weight);
  if (isNaN(weight) || weight < 30 || weight > 200) {
    return 'Weight must be between 30 and 200 kg';
  }

  return null;
};