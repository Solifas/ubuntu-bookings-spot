
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'provider';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'client' | 'provider') => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: 'client' | 'provider') => {
    // Simulate API call - in real app this would call your backend
    console.log('Login attempt:', { email, password, userType });
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: userType === 'client' ? 'John Doe' : 'Sarah Business',
      email,
      type: userType
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
