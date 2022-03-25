import { getData } from "./generalFunction";
import { secret } from "./secret";

export async function pushOrder(pushData) {
  let data = await fetch(`https://api-factory.simbirsoft1.com/api/db/order`, {
    method: 'POST',
    headers: {
      'X-Api-Factory-Application-Id': secret,
    },
    body: JSON.stringify({
      "orderStatusId": '5e26a191099b810b946c5d89',
      "cityId": {},
      "pointId": {},
      "carId": {},
      "color": "string",
      "dateFrom": 0,
      "dateTo": 0,
      "rateId": {},
      "price": 0,
      "isFullTank": true,
      "isNeedChildChair": true,
      "isRightWheel": true
    }),
  }).then((response) => {
    console.log(response);
    return response.json();
  });

  console.log(data.data);
};

export async function getOrderData() {
  const data = await getData('orderStatus');
  console.log(data);
};