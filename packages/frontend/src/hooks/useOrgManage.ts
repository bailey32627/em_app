import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@em_app/shared';


export const useOrgManage = () => {
  const [ data, setData ] = useState(null);

  useEffect( () => {
    axios.get( `${API_BASE_URL}/api/organization/manage/`)
    .then( res => setData( res.data ))
    .catch( console.error );
  },[]);

  return data;
};
