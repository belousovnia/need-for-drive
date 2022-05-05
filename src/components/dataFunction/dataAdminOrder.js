import axios from 'axios';
import { secret } from './secret';

export async function getListOrder(authorization, page, paramsData = {}) {
  const token = `Bearer ${authorization}`;

  const headers = { 
    'X-Api-Factory-Application-Id': secret,
    'Authorization': token,
  };

  const params = {
    ...paramsData,
    page,
    'sort[createdAt]': -1,
    'limit': 20,
  };
  
  try {
    return await axios.get('https://api-factory.simbirsoft1.com/api/db/order', { headers, params });
  } catch (error){
    return 'error';
  };
};

export async function getOrderById(authorization, id) {
  const token = `Bearer ${authorization}`;

  const headers = { 
    'X-Api-Factory-Application-Id': secret,
    'Authorization': token,
  };

  try {
    return await axios.get(`https://api-factory.simbirsoft1.com/api/db/order/${id}`, { headers });
  } catch (error){
    return 'error';
  };
};

export async function putOrder(authorization, id, putData) {
  const token = `Bearer ${authorization}`;

  const headers = { 
    'X-Api-Factory-Application-Id': secret,
    'Authorization': token,
  };

  try {
    return await axios.put(`https://api-factory.simbirsoft1.com/api/db/order/${id}`, putData, { headers });
  } catch (error){
    return 'error';
  };
};