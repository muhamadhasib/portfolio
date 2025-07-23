import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authData, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  useEffect(() => {
    if (authData && typeof authData === 'object' && 'authenticated' in authData && 'userId' in authData) {
      if (authData.authenticated && authData.userId) {
        setUser({ id: authData.userId as number, username: 'admin' });
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [authData]);

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Login failed');
      }
      return data;
    },
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Logout failed');
      }
      return data;
    },
    onSuccess: () => {
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Registration failed');
      }
      return data;
    },
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const register = async (username: string, password: string) => {
    await registerMutation.mutateAsync({ username, password });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
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