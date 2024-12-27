import React from 'react';
import { ArrowRight } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface HeroContentProps {
  user: User | null;
}

export default function HeroContent({ user }: HeroContentProps) {
  const handleGetStarted = () => {
    const authButton = document.querySelector('[data-auth-trigger]') as HTMLElement;
    if (authButton) {
      authButton.click();
    }
  };

  return (
    <div className="relative z-20 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl text-gray-100 mb-8 drop-shadow">
            Personalized fashion recommendations based on your unique body type and preferences.
          </p>
          <button 
            onClick={user ? undefined : handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full 
                     hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-xl
                     shadow-lg"
          >
            {user ? 'View Recommendations' : 'Get Started'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}