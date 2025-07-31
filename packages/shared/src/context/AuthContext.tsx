import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { tokenStorage } from '../storage/tokenStorage';

interface User {
  id: number;
  username: string;
  fullname: string;
  organization: string;
  is_organization_admin: boolean;
  is_division_admin: boolean;
  is_facility_admin: boolean;
  member_divisions: string[];
  member_facilities: string[];
  admin_divisions: string[];
  admin_facilities: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const setAxiosAuth = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const parseJWT = (token: string): { exp: number } | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      return null;
    }
  };

  const scheduleRefresh = (access: string) => {
    const payload = parseJWT(access);
    if (payload?.exp) {
      const expiresIn = payload.exp * 1000 - Date.now();
      const refreshTime = expiresIn - 60 * 1000; // Refresh 1 minute before expiry

      if (refreshTimeout) clearTimeout(refreshTimeout);
      if (refreshTime > 0) {
        refreshTimeout = setTimeout(() => {
          refreshAccessToken();
        }, refreshTime);
      }
    }
  };

  const saveTokens = async (access: string, refresh: string) => {
    await tokenStorage.saveTokens(access, refresh);
    setAxiosAuth(access);
    scheduleRefresh(access);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refresh = await tokenStorage.getRefreshToken();
    if (!refresh) {
      await logout();
      return null;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/token/refresh/`, { refresh });
      const { access } = res.data;
      await saveTokens(access, refresh);
      return access;
    } catch (err) {
      console.warn('Refresh token expired or invalid:', err);
      await logout();
      return null;
    }
  };

  const loadUser = async () => {
    try {
      const access = await tokenStorage.getAccessToken();
      if (access) {
        setAxiosAuth(access);
        const res = await axios.get(`${API_BASE_URL}/api/user/`);
        if (isMounted.current) {
          setUser(res.data);
          scheduleRefresh(access);
        }
      }
    } catch (err) {
      console.warn('Failed to load user:', err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await axios.post(`${API_BASE_URL}/api/login/`, { username, password });
    const { access, refresh } = res.data;
    await saveTokens(access, refresh);
    await loadUser();
  };

  const logout = async () => {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    await tokenStorage.clearTokens();
    delete axios.defaults.headers.common['Authorization'];
    if (isMounted.current) {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    loadUser();

    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes('/login') &&
          !originalRequest.url.includes('/token/refresh')
        ) {
          originalRequest._retry = true;
          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      isMounted.current = false;
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
