import axios from 'axios';
import { secret } from './secret';
import { token } from './secret';

export async function postLogin(username, password) {
  
  const dataAdmin = {
    username,
    password,
  };

  const headers = { 
    'X-Api-Factory-Application-Id': secret,
    'Authorization': `Basic ${token}`,
  };
   
  try {
    const response = await axios.post('https://api-factory.simbirsoft1.com/api/auth/login', dataAdmin, {headers});
    return response
  } catch {
    return 'error'
  };
};
