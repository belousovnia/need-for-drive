import { getData } from "./generalFunction";
import { secretMap } from "./secret";

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

export async function getGeocoderPoint(data) {
  let responseData = [];
  data = await data;

  for (let city in data){
    for (let item in data[city].points){
      const dataItem = data[city].points[item];
      let address =`${data[city].name}, ${dataItem.address}`;
      try {
        let newItem = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${secretMap}&geocode=${address}&format=json`).then((response) => {
          return response.json();
        });
        responseData.push({
          'geocoderData': newItem.response.GeoObjectCollection.featureMember[0].GeoObject,
          'mainData': dataItem,
        });
      } catch (err){
        console.log('Ошибка запроса геокодирования');
      };
    };
  };
  return responseData;
};
