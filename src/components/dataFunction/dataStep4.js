import { getData } from "./generalFunction";
import { secret } from "./secret";

export async function pushOrder(pushData) {

  const dataOrder = {
    'orderStatusId': {
      'id': "5e26a191099b810b946c5d89",
      'name': "Новые",
    },
    'cityId': {...pushData.point.cityId},
    'pointId': {
      'id': pushData.point.id,
      'address': pushData.point.address,
      'name': pushData.point.name,
    },
    'carId': pushData.car.id,
    'color': pushData.color,
    'dateFrom': pushData.startDate.getTime(),
    'dateTo': pushData.endDate.getTime(),
    'rateId': pushData.rate.id,
    'price': pushData.price,
    'isFullTank': pushData.fullTank,
    'isNeedChildChair': pushData.childChair,
    'isRightWheel': pushData.rightWheel,
  };
  
  let data = await fetch(`https://api-factory.simbirsoft1.com/api/db/order`, {
    method: 'POST',
    headers: {
      'X-Api-Factory-Application-Id': secret,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dataOrder),
  }).then((response) => {
    return response.json();
  });

  return data.data;
};

export async function getOrderData(idOrder) {
  const data = await getData(`order/${idOrder}`);
  return data;
};