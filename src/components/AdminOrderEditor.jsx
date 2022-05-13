import { React, useEffect, useState, forwardRef} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrderById } from './dataFunction/dataAdminOrder';
import SelectListCallBack from './SelectListCallBack';
import { getCityPoint } from './dataFunction/dataStep1';
import { getData } from './dataFunction/generalFunction';
import { putData } from './dataFunction/generalFunction';
import { addData } from './dataFunction/generalFunction';
import classNames from 'classnames';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { registerLocale } from  "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { deleteSubject } from './dataFunction/generalFunction';

function AdminOrderEditor(props) {
  const {
    login,
  } = props;

  registerLocale('ru', ru);
  
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [ errorCarId, setErrorCarId ] = useState(false);

  const [ city, setCity] = useState(null);
  const [ listCity, setListCity] = useState([]);
  const [ defaultCity, setDefaultCity] = useState();
  const [ alertCity, setAlertCity ] = useState();
  
  const [ point, setPoint] = useState(null);
  const [ listPoint, setListPoint] = useState([]);
  const [ defaultPoint, setDefaultPoint] = useState();
  const [ alertPoint, setAlertPoint ] = useState();

  const [ orderStatus, setOrderStatus] = useState(null);
  const [ listOrderStatus, setListOrderStatus] = useState([]);
  const [ defaultOrderStatus, setDefaultOrderStatus] = useState();
  const [ alertOrderStatus, setAlertOrderStatus ] = useState();
  
  const [ rate, setRate] = useState(null);
  const [ listRate, setListRate] = useState([]);
  const [ defaultRate, setDefaultRate] = useState();
  const [ alertRate, setAlertRate ] = useState();

  const [ car, setCar] = useState(null);
  const [ listCar, setListCar] = useState([]);
  const [ defaultCar, setDefaultCar] = useState();
  const [ alertCar, setAlertCar ] = useState();

  const [ color, setColor] = useState(null);
  const [ listColor, setListColor] = useState([]);
  const [ defaultColor, setDefaultColor] = useState();
  const [ alertColor, setAlertColor ] = useState();

  const [ startDate, changeStartDate] = useState();
  const [ endDate, changeEndDate] = useState();
  const [ alertDate, setAlertDate ] = useState();

  const [ fullTank, setFullTank ] = useState(false);
  const [ childChair, setChildChair ] = useState(false);
  const [ rightWheel, setRightWheel ] = useState(false);

  const [ price, setPrice ] = useState(null);
  const [ alertPrice, setAlertPrice ] = useState();

  // ------------------------------------------------------

  async function getDataOrder() {
    const inputCity = document.getElementById('admin-order-editor-city');
    const inputPoint = document.getElementById('admin-order-editor-point');
    const inputStatus = document.getElementById('admin-order-editor-status');
    const inputRate = document.getElementById('admin-order-editor-rate');
    const inputCar = document.getElementById('admin-order-editor-car');
    const inputColor = document.getElementById('admin-order-editor-color');
    const inputTank = document.getElementById('admin-page-tile-tank-editor');
    const inputChildChair = document.getElementById('admin-page-tile-childChair-editor');
    const inputRightWheel = document.getElementById('admin-page-tile-rightWheel-editor');
    const inputPrice = document.getElementById('editor-price-id');
    const newListCity = await getCityList();
    
    if (orderId === 'new') {
      setCity(null);
      setDefaultCity();
      setPoint(null);
      setDefaultPoint();
      setOrderStatus(null);
      setDefaultOrderStatus();
      setRate(null);
      setDefaultRate();
      setCar(null);
      setDefaultCar();
      setColor(null);
      setDefaultColor();
      changeStartDate();
      changeEndDate();
      setFullTank(false);
      setChildChair(false);
      setRightWheel(false);
      setPrice(null);
      inputCity.value = null;
      inputPoint.value = null;
      inputStatus.value = null;
      inputRate.value = null;
      inputCar.value = null;
      inputColor.value = null;
      inputPrice.value = null;
      inputTank.checked = 0;
      inputChildChair.checked = 0;
      inputRightWheel.checked = 0;
      changeEndDate(null);
      changeStartDate(null);
      return;
    };

    const data = await getOrderById(login.data.access_token, orderId);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    
    const returnData = data.data.data;

    for (let i in newListCity) {
      if (newListCity[i][1].id === returnData.cityId.id) {
        setDefaultCity([newListCity[i][1].name, newListCity[i][1]]);
        setCity(newListCity[i][1]);
      };
    };

    setDefaultPoint([returnData.pointId.name, returnData.pointId]);
    if (returnData.orderStatusId) {
      setDefaultOrderStatus([returnData.orderStatusId.name, returnData.orderStatusId]);
    };
    if (returnData.rateId) {
      setDefaultRate([`${returnData.rateId.rateTypeId.name} ${returnData.rateId.price}₽`, returnData.rateId]);
    };
    setDefaultCar([returnData.carId.name, returnData.carId]);
    setDefaultColor([returnData.color, returnData.color]);
    changeStartDate(new Date(returnData.dateFrom));
    changeEndDate(new Date(returnData.dateTo));
    setPrice(returnData.price);
    inputPrice.value = returnData.price;

    if (returnData.isFullTank) {
      inputTank.checked = 1;
      setFullTank(true);
    };
    if (returnData.isNeedChildChair) {
      inputChildChair.checked = 1;
      setChildChair(true);
    };
    if (returnData.isRightWheel) {
      inputRightWheel.checked = 1;
      setRightWheel(true);
    };
  };

  async function getCityList() {
    const data = await getCityPoint();
    const cityList = [];
    data.forEach((i) => cityList.push([i.name, i]));
    setListCity(cityList);
    return cityList;
  };

  async function getOrderStatusList() {
    const data = await getData('orderStatus');
    const orderStatusList = [];
    data.forEach((i) => orderStatusList.push([i.name, i]));
    setListOrderStatus(orderStatusList);
  };

  function changePointList() {
    if (city) {
      const pointList = [];
      for (let i in city.points) {
        const item = city.points[i];
        pointList.push([item.name, item]);
      };
      setListPoint(pointList);
    };
  };

  function checkPoint() {
    let count = 0;
    if (point) {
      for (let i in listPoint) {
        if (listPoint[i][1].id == point.id) {
          count = 1;
        };
      };
      if (count === 0) {
        setPoint(null);
        document.getElementById('admin-order-editor-point').value = '';
      };
    };
  };

  function changeColorList() {
    if (car) {
      const colorList = [];
      for (let i in car.colors) {
        const item = car.colors[i];
        colorList.push([item, item]);
      };
      setListColor(colorList);
    };
  };

  function checkColor() {
    let count = 0;
    if (car) {
      for (let i in car.colors) {
        if (car.colors[i] == color) {
          count = 1;
        };
      };
      if (count === 0) {
        setColor(null);
        document.getElementById('admin-order-editor-color').value = '';
      };
    };
  };

  async function getRate() {
    const data = await getData('rate');
    const rateList = [];
    data.forEach((i) => rateList.push([`${i.rateTypeId.name} ${i.price}₽`, i]));
    setListRate(rateList);
  };

  async function getCar() {
    const data = await getData('car', {'sort[name]': 1,});
    const carList = [];
    data.forEach((i) => carList.push([i.name, i]));
    setListCar(carList);
  };

  async function addCarById() {
    const carId = document.getElementById('editor-car-id').value;
    if (!carId) {
      setErrorCarId(true);
      return
    };
    const dataCar = await getData(`car/${carId}`);
    if (dataCar !== 'error') {
      document.getElementById('admin-order-editor-car').value = dataCar.name;
      setCar(dataCar);
      setErrorCarId(false);
    } else {
      setErrorCarId(true);
    };
  };

  function buildDateInput(date, setDate) {
    let placeholderClass = classNames({
      'step-3__placeholder': true,
      'step-3__placeholder_off': date != null,
    });

    let crossClass = classNames({
      'select__cross': true,
      'step-3__placeholder-cross_off': date == null,
    });

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button 
        className="step-3__example-custom-input" 
        onClick={onClick} 
        ref={ref}
        placeholder="Введите дату и время"
      >
        {value}
      </button>
    ));
    return (
      <div className='step-3__date-input-wrapped'>
        <p className={placeholderClass}> Введите дату и время</p>
        <DatePicker
          selected={date}
          onChange={(i) => setDate(i)}
          customInput={<ExampleCustomInput />}
          locale="ru"
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="Pp"
          placeholder="Введите дату и время"
        />
        <svg
          className={crossClass}
          id='select__cross-city'
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setDate(null);
          }}
        >
          <path
            d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
            fill="#121212"
          />
        </svg>
      </div>
    ); 
  };

  function getRentalPrice() {
    let periot = endDate.getTime() - startDate.getTime();
    let unit = rate.rateTypeId.unit;
    let rentalPrice;

    if (unit == 'мин') {
      rentalPrice = Math.floor(periot / 60000);
    } else {
      const [days, nameUnit] = unit.split(' ');
      if (unit == 'сутки') {
        rentalPrice = Math.ceil(periot / 86400000);
      } else if (nameUnit == 'дней') {
        rentalPrice = Math.ceil(periot / (86400000 * days));
      };
    };
    rentalPrice =  rentalPrice * rate.price;
    if (fullTank) rentalPrice = rentalPrice + 500;
    if (childChair) rentalPrice = rentalPrice + 200;
    if (rightWheel) rentalPrice = rentalPrice + 1600;
    if (rentalPrice < car.priceMin) rentalPrice = car.priceMin;
    return rentalPrice;
  };

  function getPrice() {
    const newPrice = getRentalPrice();
    document.getElementById('editor-price-id').value = newPrice;
    setPrice(newPrice);
  };
  
  async function deleteOrder() {
    const question =  window.confirm(`Удалить заказ ${orderId} ?`);
    if (question) {
      await deleteSubject(login.data.access_token, orderId, 'order');
      navigate('/admin/order');
    };
  };

  async function putDataOrder() {
    let checkField = true;
    const inputPrice = document.getElementById('editor-price-id');
    if (city) {
      setAlertCity(false);
    } else {
      setAlertCity(true);
      checkField = false;
    };
    if (point) {
      setAlertPoint(false);
    } else {
      setAlertPoint(true);
      checkField = false;
    };
    if (orderStatus) {
      setAlertOrderStatus(false);
    } else {
      setAlertOrderStatus(true);
      checkField = false;
    };
    if (rate) {
      setAlertRate(false);
    } else {
      setAlertRate(true);
      checkField = false;
    };
    if (car) {
      setAlertCar(false);
    } else {
      setAlertCar(true);
      checkField = false;
    };
    if (color) {
      setAlertColor(false);
    } else {
      setAlertColor(true);
      checkField = false;
    };
    if (startDate && endDate && startDate < endDate) {
      setAlertDate(false);
    } else {
      setAlertDate(true);
      checkField = false;
    };
    if (price) {
      if (price < car.priceMax) {
        setAlertPrice(false);
      } else {
        setAlertPrice(true);
        checkField = false;
      };
    } else {
      setAlertPrice(true);
      checkField = false;
    };

    if (checkField)  {
      const newData = {
      'orderStatusId': orderStatus,
      'cityId': city,
      'pointId': point,
      'carId': car.id,
      'color': color,
      'dateFrom': startDate.getTime(),
      'dateTo': endDate.getTime(),
      'rateId': rate.id,
      'price': inputPrice.value,
      'isFullTank': fullTank,
      'isNeedChildChair': childChair,
      'isRightWheel': rightWheel,
      };
      if (orderId === 'new') {
        await addData(login.data.access_token, 'order', newData);
        navigate('/admin/order');
      } else {
        await putData(login.data.access_token, 'order', orderId, newData);
        navigate('/admin/order');
      };
    }; 
  };

  function addListener() {
    const inputPrice = document.getElementById('editor-price-id');
    inputPrice.addEventListener('change', () => {
      setPrice(Number(inputPrice.value));
    });
  };

  function getMaxPrice() {
    if (car) {
      return car.priceMax;
    };
  };
  
  // ------------------------------------------------------

  const inputCarIdClass = classNames({
    'admin-login__input': true,
    'admin-login__input_editor': true,
    'admin-login__input_order-editor': true,
    'admin-login__input_error': errorCarId,
  });
  const inputCityClass = {
    'admin-page-editor__input_alert': alertCity,
  };
  const inputPointClass = {
    'admin-page-editor__input_alert': alertPoint,
  };
  const inputStatusClass = {
    'admin-page-editor__input_alert': alertOrderStatus,
  };
  const inputRateClass = {
    'admin-page-editor__input_alert': alertRate,
  };
  const inputCarClass = {
    'admin-page-editor__input_alert': alertCar,
    'admin-page-editor__input_car-id': true,
  };
  const inputColorClass = {
    'admin-page-editor__input_alert': alertColor,
  };
  const inputPriceClass = classNames({
    'admin-login__input admin-login__input_editor': true,
    'admin-page-editor__input_alert': alertPrice,
  });
  const titleAlertPriceClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertPrice,
  });
  const titleAlertDataClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertDate,
  });

  // ------------------------------------------------------
  
  useEffect(getDataOrder, []);
  useEffect(getOrderStatusList, []);
  useEffect(changePointList, [city]);
  useEffect(checkPoint, [listPoint]);
  useEffect(getRate, []);
  useEffect(getCar, []);
  useEffect(changeColorList, [car]);
  useEffect(checkColor, [listColor]);
  useEffect(addListener, []);
  

  return (
    <div className='admin-page-editor'>
      <p className='admin-page__main-title'>
        Редактирование заказа
      </p>
      <div className='admin-page__main-window admin-page__main-window_admin-page-editor'>
        <div className='admin-page-editor__main-window-content'>
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p'>Город:</p>
            <SelectListCallBack
              classNameProps={inputCityClass}
              listValue={listCity}
              collBack={setCity}
              placeholder='город'
              id='admin-order-editor-city'
              defaultValue={defaultCity}
            />
          </div>
          
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p'>Пункт:</p>
            <SelectListCallBack
              classNameProps={inputPointClass}
              listValue={listPoint}
              collBack={setPoint}
              placeholder='пункт'
              id='admin-order-editor-point'
              defaultValue={defaultPoint}
            />
          </div>
          
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p'>Статус:</p>
            <SelectListCallBack
              classNameProps={inputStatusClass}
              listValue={listOrderStatus}
              collBack={setOrderStatus}
              placeholder='статус'
              id='admin-order-editor-status'
              defaultValue={defaultOrderStatus}
            />
          </div>
          
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p'>Тариф:</p>
            <SelectListCallBack
              classNameProps={inputRateClass}
              listValue={listRate}
              collBack={setRate}
              placeholder='тариф'
              id='admin-order-editor-rate'
              defaultValue={defaultRate}
            />
          </div>

          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p admin-page-editor__input_car-id'>Автомобиль:</p>
            <SelectListCallBack
              classNameProps={inputCarClass}
              listValue={listCar}
              collBack={setCar}
              placeholder='автомобиль'
              id='admin-order-editor-car'
              defaultValue={defaultCar}
            />

            <input 
              type="text" 
              className={inputCarIdClass}
              id='editor-car-id'
              placeholder='вставьте id'
            />

            <button 
              className='admin-button admin-button_editor'
              onClick={addCarById}
            >
              <p className='admin-button__title'>Добавить по id</p>
            </button>
          </div>
          
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p'>Цвет:</p>
            <SelectListCallBack
              classNameProps={inputColorClass}
              listValue={listColor}
              collBack={setColor}
              placeholder='любой'
              id='admin-order-editor-color'
              defaultValue={defaultColor}
            />
          </div>

          <div className='admin-page-editor__button-container'>
            <p className='admin-page-editor__p-title'>Дополнительные услуги:</p>
            <div className='admin-page-tile__check-box-container'>
              <div className='radio-button__container'>
                <input
                  type='checkbox' 
                  className='radio-button__input'
                  id='admin-page-tile-tank-editor'
                  onChange={() => setFullTank(!fullTank)}
                />
                <label
                  className='radio-button__label admin-page-tile__button-label'
                  htmlFor='admin-page-tile-tank-editor'
                >
                  <div className='checkbox-button__point checkbox-button__point_admin'>
                    <svg
                      className='checkbox-button__check checkbox-button__check_admin'
                      viewBox="0 0 13 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                      />
                    </svg>
                  </div>
                  <p className='radio-button__title'>Полный бак</p>
                </label>
              </div>
            </div>

            <div className='admin-page-tile__check-box-container'>
              <div className='radio-button__container'>
                <input
                  type='checkbox' 
                  className='radio-button__input'
                  id='admin-page-tile-childChair-editor'
                  onChange={() => setChildChair(!childChair)}
                />
                <label
                  className='radio-button__label admin-page-tile__button-label'
                  htmlFor='admin-page-tile-childChair-editor'
                >
                  <div className='checkbox-button__point checkbox-button__point_admin'>
                    <svg
                      className='checkbox-button__check checkbox-button__check_admin'
                      viewBox="0 0 13 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                      />
                    </svg>
                  </div>
                  <p className='radio-button__title'>Детское кресло</p>
                </label>
              </div>
            </div>

            <div className='admin-page-tile__check-box-container'>
              <div className='radio-button__container'>
                <input
                  type='checkbox' 
                  className='radio-button__input'
                  id='admin-page-tile-rightWheel-editor'
                  onChange={() => setRightWheel(!rightWheel)}
                />
                <label
                  className='radio-button__label admin-page-tile__button-label'
                  htmlFor='admin-page-tile-rightWheel-editor'
                >
                  <div className='checkbox-button__point checkbox-button__point_admin'>
                    <svg
                      className='checkbox-button__check checkbox-button__check_admin'
                      viewBox="0 0 13 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.625 3.33333L0 5L4.875 10L13 1.66667L11.375 0L4.875 6.66667L1.625 3.33333Z"
                      />
                    </svg>
                  </div>
                  <p className='radio-button__title'>Правый руль</p>
                </label>
              </div>
            </div>
          </div>
          
          <div className='admin-page-editor__button-container'>
            <p className='admin-page-editor__p-title'>Даты аренды:</p>
              <div className='step-3__data-container-line'>
                <p className='step-3__data-title'>C</p> {buildDateInput(startDate, changeStartDate)}
              </div>
              <div className='step-3__data-container-line'>
                <p className='step-3__data-title'>По</p> {buildDateInput(endDate, changeEndDate)}
              </div>
              <p className={titleAlertDataClass}>Некорректная дата</p>
          </div>
          
          <div className='admin-page-editor__select-container'>
            <p className='admin-page-editor__p-price'>Цена:</p>
            <input 
              type="number" 
              className={inputPriceClass}
              id='editor-price-id'
              placeholder='цена'
            />
            <button 
              className='admin-button admin-button_editor'
              onClick={getPrice}
            >
              <p className='admin-button__title'>Расчет цены</p>
            </button>
          </div>
          <p className={titleAlertPriceClass}>Некорректная цена или цена превышает максимальную {getMaxPrice()}</p>
        </div>

        <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
          <div className='admin-page-editor__footer-button-container'>
            <button 
              className='admin-button admin-button_margin' 
              onClick={putDataOrder}
            >
              <p className='admin-button__title '>Сохранить</p>
            </button>
            <button 
              className='admin-button admin-button_gray'
              onClick={getDataOrder}
            >
              <p className='admin-button__title '>Отменить</p>
            </button>
          </div>
          
          <button 
            className='admin-button admin-button_red'
            onClick={deleteOrder}
          >
            <p className='admin-button__title '>Удалить</p>
          </button>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

export default connect(putStateToProps)(AdminOrderEditor);