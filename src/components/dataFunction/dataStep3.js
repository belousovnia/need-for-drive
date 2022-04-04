import { getData } from "./generalFunction";

export async function getRate() {
  let data = await getData('rate');
  let newData = [];

  for (let i in data) {
    if (data[i].rateTypeId != undefined) {
      newData.push(data[i]);
    };
  };

  return newData;
};