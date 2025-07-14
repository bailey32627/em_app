const LOCAL_IP = '10.33.218.8';

export const API_BASE_URL = typeof window !== 'undefined'
  ? 'http://localhost:8000'
  : `http://${LOCAL_IP}:8000`;
