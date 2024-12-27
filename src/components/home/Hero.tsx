import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <HeroImage />
      <HeroContent user={user} />
    </section>
  );
}