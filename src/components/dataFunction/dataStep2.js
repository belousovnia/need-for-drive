import { getData } from "./generalFunction";
import { secretMap } from "./secret";

export async function getCar() {
  let data = await getData('car');
  let carList = [];
  console.log(data);

  for (let i in data) {
    let type = data[i].categoryId.name

    let newItem = {
      "category": type,
      "name": data[i].name,
      "priceMax": data[i].priceMax,
      "priceMin": data[i].priceMin,
      "colors": data[i].colors,
      "id": data[i].id,
      "imagePath": data[i].thumbnail.path,
      'number': data[i].number,
    };

    carList.push(newItem);
  };

  return carList;
};

export async function getCategory() {
  let data = await getData('category');
  let newdata = [];

  for (let item in data) {
    if ( data[item].name.toLowerCase()  != 'name' &&
    data[item].name != undefined ) {
      newdata.push(data[item]);
    };
  };

  return newdata;
};

