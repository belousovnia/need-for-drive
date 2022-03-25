import { getData } from "./generalFunction";

export async function getCar() {
  let data = await getData('car');
  let carList = [];

  for (let i in data) {

    let newItem = {
      ...data[i]
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

