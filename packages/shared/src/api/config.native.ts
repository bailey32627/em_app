import { Platform } from 'react-native';

const LOCAL_IP = '10.33.218.8';

export const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:8000'
  : `http://${LOCAL_IP}:8000`;
