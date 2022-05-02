import { secret } from './secret'
import axios from 'axios';

//  Получает данные с сервера, принимает конец ссылки 
// на нужный запрос в виде строки. Пример 'city'.
export async function getData(address, paramsData = {}){
  const headers = { 
    'X-Api-Factory-Application-Id': secret,
  };

  const params = {
    ...paramsData,
  };

  try {
    const response = await axios.get(`https://api-factory.simbirsoft1.com/api/db/${address}`, { headers, params });
    return response.data.data;
  } catch (error){
    return 'error';
  };
};

export async function deleteSubject(authorization, id, type) {
  const token = `Bearer ${authorization}`;

  const headers = { 
    'X-Api-Factory-Application-Id': secret,
    'Authorization': token,
  };
  
  try {
    const response = await axios.delete(`https://api-factory.simbirsoft1.com/api/db/${type}/${id}`, { headers });
    console.log(response);
    return response;
  } catch (error){
    return 'error';
  };
};

// Принимает строку и возвращает строку с пробелами через каждые 3 символа с конца.
export function prettify(num) {
  let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
};

// Принимает число миллисекунд или объект типа Date возвращает дату в формате "26.02.2022 9:00"
export function getDate(params) {
  const date = new Date(params);
  let mount = date.getMonth() + 1;
  let day = date.getDate();
  let minutes = date.getMinutes();

  if (mount <= 9) mount = '0' + mount;
  if (day <= 9) day = '0' + day;
  if (minutes <= 9) minutes = '0' + minutes;

  let strDate = `${day}.${mount}.${date.getFullYear()} ${date.getHours()}:${minutes}`
  return strDate
};