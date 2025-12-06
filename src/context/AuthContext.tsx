import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shoessyte_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login
    const users = JSON.parse(localStorage.getItem('shoessyte_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const loggedUser = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(loggedUser);
      localStorage.setItem('shoessyte_user', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('shoessyte_users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('shoessyte_users', JSON.stringify(users));

    const loggedUser = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(loggedUser);
    localStorage.setItem('shoessyte_user', JSON.stringify(loggedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shoessyte_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
