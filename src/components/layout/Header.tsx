import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import ProfileDropdown from './ProfileDropdown';
import { useAuthModal } from '../auth/hooks/useAuthModal';

export default function Header() {
  const { user, signOut } = useAuth();
  const { isOpen, open, close } = useAuthModal();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
              Styler
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/new-arrivals" 
                className={`${isActive('/new-arrivals') ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900`}
              >
                New Arrivals
              </Link>
              <Link 
                to="/style-guide"
                className={`${isActive('/style-guide') ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900`}
              >
                Style Guide
              </Link>
              <Link 
                to="/about"
                className={`${isActive('/about') ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900`}
              >
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search styles..."
                className="bg-transparent border-none focus:outline-none ml-2 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <ProfileDropdown user={user} onSignOut={signOut} />
              ) : (
                <button 
                  data-auth-trigger
                  onClick={open}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isOpen} 
        onClose={close}
        defaultToSignUp={false}
      />
    </header>
  );
}