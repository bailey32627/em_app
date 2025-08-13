import { API_BASE_URL } from "@em_app/shared";
import axios from 'axios';

export const useDeleteDivision = () => {
  const deleteDivision = async ( id: number ) => {
    const response = await axios.delete(
      `${API_BASE_URL}/api/divisions/${id}/delete/`,
    );
    return response.data ?? { message: "Division deleted" };
  }
  return { deleteDivision };
}
