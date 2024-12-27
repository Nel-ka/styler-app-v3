import React from 'react';
import { Settings, LogOut, UserCircle } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { useDropdown } from './hooks/useDropdown';

interface ProfileDropdownProps {
  user: User;
  onSignOut: () => void;
}

export default function ProfileDropdown({ user, onSignOut }: ProfileDropdownProps) {
  const { isOpen, toggle, dropdownRef } = useDropdown();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggle}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <UserCircle className="w-6 h-6 text-gray-600" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <UserCircle className="w-5 h-5 mr-3" />
            Profile
          </a>
          <a
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
          <button
            onClick={onSignOut}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}