import { getData } from "./generalFunction";

//  Получает данные с сервера и формирует массив из данных
// городов со свойством points в котором находятся данные 
// всех пунктов выдачи в этом городе.
export async function getCityPoint() {
  let dataCity = await getData('city');
  let dataPoint = await getData('point');
  let newData = [];

  for (let city in dataCity) {
    let points = [];
    for (let point in dataPoint) {
      if (dataPoint[point].cityId == undefined) continue;
      if (dataCity[city].id == dataPoint[point].cityId.id) {
        points.push(dataPoint[point]);
      };
    };
    
    if (points.length !== 0){
      let item = {
        points: {...points},
        ...dataCity[city]
      };
      newData.push(item);  
    };
  };

  return newData;
};