import * as SecureStore from 'expo-secure-store';
import { TokenStorage } from './tokenStorage.types';

export const tokenStorage: TokenStorage = {
  async getAccessToken() {
    return await SecureStore.getItemAsync('access_token');
  },
  async getRefreshToken() {
    return await SecureStore.getItemAsync('refresh_token');
  },
  async saveTokens(access: string, refresh: string) {
    await SecureStore.setItemAsync('access_token', access);
    await SecureStore.setItemAsync('refresh_token', refresh);
  },
  async clearTokens() {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
  }
};
