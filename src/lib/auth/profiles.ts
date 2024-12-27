import { supabase } from '../supabase';
import { SignUpData } from './types';

export const createUserProfile = async (userId: string, data: SignUpData) => {
  return await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: data.fullName,
      email: data.email,
      measurements: {
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        age: parseInt(data.age)
      },
      skin_tone: data.skinTone,
    }, {
      onConflict: 'id'
    });
};