import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  register: (userData: User, token: string) => void;
  logout: () => void;
  toggleSaveScheme: (schemeId: string) => void;
  isSavedScheme: (schemeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('jansahay_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('jansahay_token');
  });

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('jansahay_user', JSON.stringify(userData));
    localStorage.setItem('jansahay_token', authToken);
  };

  const register = (userData: User, authToken: string) => {
    login(userData, authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jansahay_user');
    localStorage.removeItem('jansahay_token');
  };

  const toggleSaveScheme = (schemeId: string) => {
    if (!user) return;
    const currentSaved = user.savedSchemes || [];
    const isSaved = currentSaved.includes(schemeId);
    const updatedSaved = isSaved
      ? currentSaved.filter((id) => id !== schemeId)
      : [...currentSaved, schemeId];

    const updatedUser = { ...user, savedSchemes: updatedSaved };
    setUser(updatedUser);
    localStorage.setItem('jansahay_user', JSON.stringify(updatedUser));
  };

  const isSavedScheme = (schemeId: string): boolean => {
    return user?.savedSchemes?.includes(schemeId) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        toggleSaveScheme,
        isSavedScheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
