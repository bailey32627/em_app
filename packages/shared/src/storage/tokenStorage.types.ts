export interface TokenStorage {
  getAccessToken(): Promise< string | null >;
  getRefreshToken(): Promise< string | null >;
  saveTokens( access: string, refresh: string ): Promise<void>;
  clearTokens(): Promise< void >;
}
