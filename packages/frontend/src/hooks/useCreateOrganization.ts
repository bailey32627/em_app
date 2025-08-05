import { API_BASE_URL } from "@em_app/shared";
import axios from 'axios';


export const useCreateOrganization = () => {
  const createOrganization = async ( name: string ) => {
    const response = await axios.post( `${API_BASE_URL}/api/organization/create/`, { name } );
    return response.data;
  }
  return { createOrganization };
}
