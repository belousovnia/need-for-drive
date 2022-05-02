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
    const response = await axios.get('https://api-factory.simbirsoft1.com/api/db/order', { headers, params });
    return response;
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
    const response = await axios.get(`https://api-factory.simbirsoft1.com/api/db/order/${id}`, { headers });
    return response;
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
    const response = await axios.put(`https://api-factory.simbirsoft1.com/api/db/order/${id}`, putData, { headers });
    console.log(response);
    return response;
  } catch (error){
    return 'error';
  };
};