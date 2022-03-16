import { secret } from './secret'

//  Получает данные с сервера, принимает конец ссылки 
// на нужный запрос в виде строки. Пример 'city'.
export async function getData(address){
  let data = await fetch(`https://api-factory.simbirsoft1.com/api/db/${address}`, {
    headers: {
      'X-Api-Factory-Application-Id': secret,
    }
  }).then((response) => {
    return response.json();
  });
  
  return data.data;
};

// Принимает строку и возвращает строку с пробелами через каждые 3 символа с конца.
export function prettify(num) {
  let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
};