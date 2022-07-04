export const secret = '5e25c641099b810b946c5d5b';
export const clientSecret = '4cbcea96de';
export const secretMap = '5f6e7a79-975f-48f8-8438-b45713ff6a84';

// ----------------------------------------------

let range = (start, end) => [...Array(end - start).keys(), end - start].map(n => start + n);
let AZ = range(65, 90);   
let az = range(97, 122);  
let number = range(48, 57);
let allSymbol = AZ.concat(az).concat(number); 

export function generateString(length = 10){
  
  let str = '';
  
  for(let i = 0; i < length; i++){
    str += String.fromCharCode(allSymbol[Math.floor(Math.random() * allSymbol.length)]);
  }
  
  return str;
}

export const token = window.btoa(`${generateString()}:${clientSecret}`);