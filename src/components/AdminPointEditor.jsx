import { React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getSimpleData,
  putData,
  getData,
  addData,
  deleteSubject,
} from './dataFunction/generalFunction';
import { useNavigate } from 'react-router-dom';
import SelectListCallBack from './SelectListCallBack';

function AdminPointEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { pointId } = useParams();

  const [ name, setName ] = useState(null);
  const [ alertName, setAlertName ] = useState(false);
  const [ address, setAddress ] = useState(null);
  const [ alertAddress, setAlertAddress ] = useState(false);
  const [ alertCity, setAlertCity ] = useState(false);

  const [ city, setCity ] = useState(null);
  const [ listCity, setListCity] = useState([]);
  const [ defaultCity, setDefaultCity] = useState();

  // --------------------------------------------------------
  
  async function getDataPoint() {
    const inputName = document.getElementById('admin-table-editor__input-name');
    const inputAddress = document.getElementById('admin-table-editor__input-address');
    const select = document.getElementById('admin-page-editor__input-city');

    if (pointId === 'new') {
      setName(null);
      setAddress(null);
      setCity(null);
      inputName.value = null;
      inputAddress.value = null;
      select.value = null;
      return;
    };
    
    const data = await getSimpleData(`point/${pointId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setName(item.name);
    setAddress(item.address);
    inputName.value = item.name;
    inputAddress.value = item.address;
    setCity(item.cityId.name);
    setDefaultCity([item.cityId.name, item.cityId]);
  };
  
  async function getListCity() {
    const data = await getData('city');
    const list = [];
    data.forEach((i) => list.push([i.name, i]));
    setListCity(list);
  };

  async function deletePoint() {
    const question =  window.confirm(`Удалить пункт?`);
    if (question) {
      await deleteSubject(login.data.access_token, pointId, 'point');
      navigate('/admin/point');
    };
  };

  async function putPoint() {
    let checkField = true
    if (name) {
      setAlertName(false);
    } else {
      setAlertName(true);
      checkField = false;
    };
    if (address) {
      setAlertAddress(false);
    } else {
      setAlertAddress(true);
      checkField = false;
    };
    if (city) {
      setAlertCity(false);
    } else {
      setAlertCity(true);
      checkField = false;
    };

    if (checkField) {
      let putDataPoint = {
        'name': name,
        'address': address,
        'cityId': city,
      };

      setAlertName(false);
      setAlertCity(false);
      setAlertAddress(false);
  
      if (pointId === 'new') {
        addData(login.data.access_token, 'point', putDataPoint);
      } else {
        putData(login.data.access_token, 'point', pointId, putDataPoint);
      };
  
      navigate('/admin/point');
    };
  };

  function addListener() {
    const inputName = document.getElementById('admin-table-editor__input-name');
    inputName.addEventListener('change', () => {
      setName(inputName.value);
    });
    const inputAddress = document.getElementById('admin-table-editor__input-address');
    inputAddress.addEventListener('change', () => {
      setAddress(inputAddress.value);
    });
  };

  // --------------------------------------------------------

  const inputNameClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertName,
  });
  const titleAlertNameClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertName,
  });
  const inputAddressClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertAddress,
  });
  const titleAlertAddressClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertAddress,
  });
  const titleAlertCityClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertCity,
  });
      
  // --------------------------------------------------------

  useEffect(getDataPoint, []);
  useEffect(addListener, []);
  useEffect(getListCity, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_editor'>
        <p className='admin-page__main-title'>
          Редактирование пункта
        </p>
        <div className='admin-page__main-window admin-page__main-window_admin-page-editor'>
          <div className='admin-page-editor__main-window-content'>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>
                Название
              </p>
              <input 
                type="text" 
                id='admin-table-editor__input-name'  
                className={inputNameClass}
              />
              <p className={titleAlertNameClass}>необходимо ввести название</p>
            </div>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>
                Адрес
              </p>
              <input 
                type="text" 
                id='admin-table-editor__input-address'  
                className={inputAddressClass}
              />
              <p className={titleAlertAddressClass}>необходимо ввести адрес</p>
            </div>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>
                Город
              </p>
              <SelectListCallBack
                  placeholder='город'
                  listValue={listCity}
                  collBack={setCity}
                  id='admin-page-editor__input-city'
                  defaultValue={defaultCity}
                />
              <p className={titleAlertCityClass}>необходимо указать город</p>
            </div>
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putPoint}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataPoint}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deletePoint}
            >
              <p className='admin-button__title '>Удалить</p>
            </button>

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

export default connect(putStateToProps, putActionToProps)(AdminPointEditor);