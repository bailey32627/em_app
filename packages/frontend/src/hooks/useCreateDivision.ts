import { API_BASE_URL } from "@em_app/shared";
import axios from 'axios';

export const useCreateDivision = () => {
  const createDivision = async ( name: string ) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/divisions/create/`,
      { name }
    );
    return response.data;
  }
  return { createDivision };
}
