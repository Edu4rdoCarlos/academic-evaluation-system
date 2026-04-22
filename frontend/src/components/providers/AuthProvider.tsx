'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = 'sistema_provas_token';

function decodeJwtPayload(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (stored) {
        const decoded = decodeJwtPayload(stored);
        if (decoded) {
          setToken(stored);
          setUser(decoded);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
    }
    setLoading(false);
  }, []);

  function login(jwt: string) {
    const decoded = decodeJwtPayload(jwt);
    if (!decoded) return;
    localStorage.setItem(TOKEN_KEY, jwt);
    setToken(jwt);
    setUser(decoded);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
