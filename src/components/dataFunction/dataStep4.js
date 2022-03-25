import { getData } from "./generalFunction";
import { secret } from "./secret";

export async function pushOrder(pushData) {
  let data = await fetch(`https://api-factory.simbirsoft1.com/api/db/order`, {
    method: 'POST',
    headers: {
      'X-Api-Factory-Application-Id': secret,
    },
    body: JSON.stringify(pushData),
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