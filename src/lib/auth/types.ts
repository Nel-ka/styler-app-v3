export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  age: string;
  skinTone: string;
  height: string;
  weight: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  error: string | null;
  success?: boolean;
}