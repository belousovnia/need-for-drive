import { getData } from "./generalFunction";

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

