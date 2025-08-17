import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('cj_user');
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('cj_token') || '');

  useEffect(() => {
    if (user) localStorage.setItem('cj_user', JSON.stringify(user));
    else localStorage.removeItem('cj_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('cj_token', token);
    else localStorage.removeItem('cj_token');
  }, [token]);

  const login = (u, t) => {
    setUser(u);
    setToken(t); // ✅ Persist token for API access
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
