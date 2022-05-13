import { React, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SelectListCallBack from './SelectListCallBack';
import { 
  getData, 
  getSimpleData,
  putData,
  addData,
  deleteSubject,
} from './dataFunction/generalFunction';
import { useNavigate } from 'react-router-dom';

function AdminCarEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { carId } = useParams();

  const [ image, setImage ] = useState(null);
  const [ newImage, setNewImage ] = useState(null);
  const [ name, setName ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ number, setNumber ] = useState(null);
  const [ priceMax, setPriceMax ] = useState(null);
  const [ priceMin, setPriceMin ] = useState(null);

  const [ category, setCategory] = useState(null);
  const [ listCategory, setListCategory] = useState([]);
  const [ defaultCategory, setDefaultCategory] = useState();

  const [ colorList, setColorList ] = useState([]);
  const [ colorListItem, setColorListItem ] = useState();

  const [ tank, setTank ] = useState();

  const [ alertName, setAlerName ] = useState(false);
  const [ alertNumber, setAlertNumber ] = useState(false);
  const [ alertPrice, setAlertPrice ] = useState(false);
  const [ alertCategory, setAlertCategory ] = useState(false);
  const [ alertColorList, setAlertColorList ] = useState(false);
  const [ alertTank, setAlertTank ] = useState(false);

  // ------------------------------------------------------

  const countNewId = useRef(0)

  function getId() {
    countNewId.current++
    return countNewId.current
  };
  
  async function getDataCar() {
    const inputImg = document.getElementById('admin-table-editor__input-image-car');
    const titleImg = document.getElementById('admin-table-editor__label-title');
    inputImg.value = null;
    titleImg.innerText = 'Выберите файл...';

    const inputDescription = document.getElementById('admin-table-editor__card-car-textarea');
    const inputNumber = document.getElementById('admin-page-editor__input-number');
    const inputPriceMin = document.getElementById('admin-page-editor__input-price-min');
    const inputName = document.getElementById('admin-page-editor__input-name');
    const inputPriceMax = document.getElementById('admin-page-editor__input-price-max');
    const inputTank = document.getElementById('admin-page-editor__input-tank');
    const selectCategory = document.getElementById('admin-page-editor__input-price-category');

    if (carId === 'new') {
      setImage(null);
      setNewImage(null);
      setName(null);
      setNumber(null);
      setDescription(null);
      setPriceMin(null);
      setPriceMax(null);
      setCategory(null);
      setColorList([])
      setColorListItem();
      setTank(null);
      setListCategory([]);
      getListCategory();
      inputName.value = null;
      inputDescription.value = null;
      inputNumber.value = null;
      inputPriceMin.value = null;
      inputPriceMax.value = null;
      inputTank.value = null;
      selectCategory.value = null;
      return;
    };

    const data = await getSimpleData(`car/${carId}`)
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setImage(item.thumbnail.path);
    setName(item.name);
    inputName.value = item.name;
    setDefaultCategory([item.categoryId.name, item.categoryId])
    setColorList(item.colors)
    setDescription(item.description);
    inputDescription.value = item.description;
    setNumber(item.number);
    inputNumber.value = item.number;
    setPriceMin(item.priceMin);
    inputPriceMin.value = item.priceMin;
    setPriceMax(item.priceMax);
    inputPriceMax.value = item.priceMax;
    setTank(item.tank);
    inputTank.value = item.tank;
  };

  async function getListCategory() {
    const data = await getData('category');
    const list = [];
    data.forEach((i) => list.push([i.name, i]));
    setListCategory(list);
  };

  async function uploadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewImage({
        path: reader.result,
        size: file.size,
        originalname: file.name,
        mimetype: file.type,
      });
    };
  };

  function addListener() {
    const inputImg = document.getElementById('admin-table-editor__input-image-car');
    const titleImg = document.getElementById('admin-table-editor__label-title');
    inputImg.addEventListener('change', (i) => {
      if (inputImg.files) { 
        titleImg.innerText = inputImg.files[0].name;
        setImage(window.URL.createObjectURL(inputImg.files[0]));
        uploadImage(inputImg.files[0]);
      } else {
        titleImg.innerText = 'Выберите файл...';
      };
    });

    const inputDescription = document.getElementById('admin-table-editor__card-car-textarea');
    inputDescription.addEventListener('change', () => {
      setDescription(inputDescription.value);
    });

    const inputName = document.getElementById('admin-page-editor__input-name');
    inputName.addEventListener('change', () => {
      setName(inputName.value);
    });

    const inputNumber = document.getElementById('admin-page-editor__input-number');
    inputNumber.addEventListener('change', () => {
      setNumber(inputNumber.value);
    });

    const inputPriceMin = document.getElementById('admin-page-editor__input-price-min');
    inputPriceMin.addEventListener('change', () => {
      setPriceMin(inputPriceMin.value);
    });

    const inputPriceMax = document.getElementById('admin-page-editor__input-price-max');
    inputPriceMax.addEventListener('change', () => {
      setPriceMax(inputPriceMax.value);
    });

    const inputTank = document.getElementById('admin-page-editor__input-tank');
    inputTank.addEventListener('change', () => {
      setTank(inputTank.value);
    });
  };

  function checkCategory() {
    if (category) return category.name
  };
  
  function callBackPlusColor() {
    const input = document.getElementById('admin-page-editor__input-color');
    setColorList([...colorList, input.value]);
    input.value = '';
  };

  function colorDeleteCallBack(pos) {
    const newColorList = colorList;
    newColorList.splice(pos, 1);
    setColorList([...newColorList]);
  };

  function buildColorItem() {
    const listItem = [];
    for (let i in colorList) {
      const item = 
      <div 
        className='admin-page-editor__color-item' 
        key={`item-${getId()}`}
      >
        <button 
          className='admin-page-editor__color-item-delete'
          onClick={() => colorDeleteCallBack(i)}
        >
          -
        </button>
        <p className='admin-page-editor__color-item-name'>
          {colorList[i]}
        </p>
      </div>
      listItem.push(item);
    };
    setColorListItem(listItem);
  };

  async function putCar() {
    let checkField = true
    if (name) {
      setAlerName(false);
    } else {
      setAlerName(true);
      checkField = false;
    };
    if (number) {
      setAlertNumber(false);
    } else {
      setAlertNumber(true);
      checkField = false;
    };
    if (priceMax && priceMin && Number(priceMax) >= Number(priceMin)) {
      setAlertPrice(false);
    } else {
      setAlertPrice(true);
      checkField = false;
    };
    if (tank && 100 >= tank && tank >= 0) {
      setAlertTank(false);
    } else {
      setAlertTank(true);
      checkField = false;
    };
    if (category) {
      setAlertCategory(false);
    } else {
      setAlertCategory(true);
      checkField = false;
    };
    if (colorList.length  >= 1) {
      setAlertColorList(false);
    } else {
      setAlertColorList(true);
      checkField = false;
    };

    if (checkField) {
      let putDataCar = {
        'categoryId': category,
        'name': name,
        'description': description,
        'colors': colorList,
        'number': number,
        'priceMax': priceMax,
        'priceMin': priceMin,
        'tank': tank,
      };
  
      if (newImage) {
        putDataCar = {
          ...putDataCar,
          'thumbnail': newImage
        };
      };
  
      if (carId === 'new') {
        addData(login.data.access_token, 'car', putDataCar);
      } else {
        putData(login.data.access_token, 'car', carId, putDataCar);
      };
  
      navigate('/admin/car');
    };
  };

  async function deleteCar() {
    const question =  window.confirm(`Удалить заказ ${carId} ?`);
    if (question) {
      await deleteSubject(login.data.access_token, carId, 'car');
      navigate('/admin/car');
    };
  };

  // ------------------------------------------------------

  const inputNameClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertName,
  });
  const titleAlertNameClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertName,
  });
  const inputNumberClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertNumber,
  });
  const titleAlertNumberClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertNumber,
  });
  const inputPriceClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertPrice,
  });
  const titleAlertPriceClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertPrice,
  });
  const inputTankClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertTank,
  });
  const titleAlertTankClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertTank,
  });
  const inputCategoryClass = classNames({
    'selection-list_admin-page-editor': true,
    'admin-page-editor__input_alert': alertCategory,
  });
  const titleAlertCategoryClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertCategory,
  });
  const inputColorClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertColorList,
  });
  const titleAlertColorClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertColorList,
  });


  // ------------------------------------------------------
  
  useEffect(getDataCar, []);
  useEffect(addListener, []);
  useEffect(getListCategory, []);
  useEffect(buildColorItem, [colorList]);

  // ------------------------------------------------------

  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_editor'>
        <p className='admin-page__main-title'>
          Редактирование автомобиля
        </p>

        <div className='admin-table-editor__content-container'>
          <div className='admin-table-editor__card-car'>

            <div className='admin-table-editor__card-car-container'>
              <img
                className='admin-table-editor__card-car-img' 
                src={image}
                onError={(i) => {
                  i.target.src = require('../media/car.jpg')
                }}
              />
              <p className='admin-table-editor__card-car-name'>
                {name}
              </p>
              <p className='admin-table-editor__card-car-category'>
                {checkCategory()}
              </p>
              <div className='admin-table-editor__input-container'>
                <input 
                  className='admin-table-editor__input-image-car'
                  type="file" 
                  name='image' 
                  id='admin-table-editor__input-image-car'
                  accept='.png,.img'
                />
                <label 
                  className="admin-table-editor__label-wrapper"   
                  htmlFor="admin-table-editor__input-image-car"
                >
                  <div 
                    className="admin-table-editor__label-title"
                    id='admin-table-editor__label-title'
                  >Выберите файл...</div>
                  <div 
                    className="admin-table-editor__label-button"
                  >Обзор</div>
                </label>
              </div>
            </div>
            <p className='admin-table-editor__card-car-textarea-title'>
              Описание
            </p>
            <textarea
              id="admin-table-editor__card-car-textarea" 
              className='admin-table-editor__card-car-textarea'
              wrap='soft'
            ></textarea>
          </div>

          <div className='admin-page__main-window admin-page__main-window_admin-page-editor-car'>

            <div className='admin-page-editor__main-window-content'>

              <div className='admin-page-editor__input-conteiner'>
                <p className='admin-page-editor__input-title'>Модель </p>
                <input 
                  type="text" 
                  id='admin-page-editor__input-name'  
                  className={inputNameClass}
                />
                <p className={titleAlertNameClass}>необходимо ввести имя</p>
              </div>

              <div className='admin-page-editor__input-conteiner admin-page-editor__input-conteiner_little'>
                <p className='admin-page-editor__input-title'>Номер </p>
                <input 
                  type="text" 
                  id='admin-page-editor__input-number'  
                  className={inputNumberClass}
                />
                <p className={titleAlertNumberClass}>необходимо ввести номер</p>
              </div>

              <div className='admin-page-editor__input-conteiner admin-page-editor__input-conteiner_little'>
                <p className='admin-page-editor__input-title'>Минимальная цена </p>
                <input 
                  type="number" 
                  id='admin-page-editor__input-price-min'  
                  className={inputPriceClass}
                />
              </div>

              <div className='admin-page-editor__input-conteiner admin-page-editor__input-conteiner_little'>
                <p className='admin-page-editor__input-title'>Максимальная цена </p>
                <input 
                  type="number" 
                  id='admin-page-editor__input-price-max'  
                  className={inputPriceClass}
                />
                <p className={titleAlertPriceClass}>необходимо указать цену (минимальная не может быть больше максимальной)</p>
              </div>

              <div className='admin-page-editor__input-conteiner admin-page-editor__input-conteiner_little'>
                <p className='admin-page-editor__input-title'>Топлива </p>
                <input 
                  type="number" 
                  id='admin-page-editor__input-tank'  
                  className={inputTankClass}
                  min='0'
                  max='100'
                />
                <p className={titleAlertTankClass}>необходимо указать количество топлива (от 0 до 100%)</p>
              </div>

              <div className='admin-page-editor__input-conteiner'>
                <p className='admin-page-editor__input-title'>Тип автомобиля</p>
                <SelectListCallBack
                  classNameProps={inputCategoryClass}
                  placeholder='выберите категорию'
                  listValue={listCategory}
                  collBack={setCategory}
                  id='admin-page-editor__input-price-category'
                  defaultValue={defaultCategory}
                />
                <p className={titleAlertCategoryClass}>необходимо выбрать тип</p>
              </div>

              <div className='admin-page-editor__input-conteiner'>
                <p className='admin-page-editor__input-title'>Доступные цвета</p>
                <div className='admin-page-editor__input-button-conteiner'>
                <input 
                  type="text" 
                  id='admin-page-editor__input-color'  
                  className={inputColorClass}
                  placeholder='добавить цвет'
                />
                <button 
                  className='admin-page-editor__button-plus'
                  onClick={callBackPlusColor}
                >+</button>
                </div>
                <p className={titleAlertColorClass}>необходимо указать хотя бы один доступный цвет</p>
                {colorListItem}
              </div>

            </div>

            <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
              <div className='admin-page-editor__footer-button-container'>
                <button 
                  className='admin-button admin-button_margin' 
                  onClick={putCar}
                >
                  <p className='admin-button__title '>Сохранить</p>
                </button>
                <button 
                  className='admin-button admin-button_gray'
                  onClick={getDataCar}
                >
                  <p className='admin-button__title '>Отменить</p>
                </button>
              </div>
              
              <button 
                className='admin-button admin-button_red'
                onClick={deleteCar}
              >
                <p className='admin-button__title '>Удалить</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const putStateToProps = (state) => {
  return {...state};
};

const putActionToProps = (dispatch) => {
  return {};
};

export default connect(putStateToProps, putActionToProps)(AdminCarEditor);