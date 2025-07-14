import SecureStorage from 'react-secure-storage';
import { TokenStorage } from './tokenStorage.types';

export const tokenStorage: TokenStorage = {
  async getAccessToken() {
    return SecureStorage.getItem('access_token') as string | null;
  },
  async getRefreshToken() {
    return SecureStorage.getItem('refresh_token') as string | null;
  },
  async saveTokens(access: string, refresh: string) {
    SecureStorage.setItem('access_token', access);
    SecureStorage.setItem('refresh_token', refresh);
  },
  async clearTokens() {
    SecureStorage.removeItem('access_token');
    SecureStorage.removeItem('refresh_token');
  }
};
