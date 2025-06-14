
import React, { useState } from 'react';
import { Calendar, Menu, X, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">BookMzansi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/settings') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/settings" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                isActive('/settings') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <div className="pt-2">
              <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
