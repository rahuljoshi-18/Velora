import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('velora_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const persistUser = (nextUser) => {
    localStorage.setItem('velora_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const login = async (formData) => {
    const { data } = await api.post('/auth/login', formData);
    persistUser(data);
    return data;
  };

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData);
    persistUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('velora_user');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
