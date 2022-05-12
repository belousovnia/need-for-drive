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

function AdminRateEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { rateId } = useParams();

  const [ price, setPrice ] = useState(null);
  const [ alertPrice, setAlerPrice ] = useState(false);
  const [ alertType, setAlerType ] = useState(false);

  const [ type, setType ] = useState(null);
  const [ listType, setListType] = useState([]);
  const [ defaultType, setDefaultType] = useState();

  // --------------------------------------------------------
  
  async function getDataRate() {
    const inputPrice = document.getElementById('admin-table-editor__input-price');
    const select = document.getElementById('admin-page-editor__input-type');

    if (rateId === 'new') {
      setPrice(null);
      setType(null);
      inputPrice.value = null;
      select.value = null;
      return;
    };
    
    const data = await getSimpleData(`rate/${rateId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setPrice(item.price);
    inputPrice.value = item.price;
    setType(item.rateTypeId);
    setDefaultType([item.rateTypeId.name, item.rateTypeId]);
  };
  
  async function getListType() {
    const data = await getData('rateType');
    const list = [];
    data.forEach((i) => list.push([i.name, i]));
    setListType(list);
  };

  async function deleteRate() {
    const question =  window.confirm(`Удалить тариф?`);
    if (question) {
      await deleteSubject(login.data.access_token, rateId, 'rate');
      navigate('/admin/rate');
    };
  };

  async function putRate() {
    let checkField = true
    if (price) {
      setAlerPrice(false);
    } else {
      setAlerPrice(true);
      checkField = false;
    };
    if (type) {
      setAlerType(false);
    } else {
      setAlerType(true);
      checkField = false;
    };
    if (checkField) {
      let putDataRate = {
        'price': price,
        'rateTypeId': type,
      };

      setAlerPrice(false);
      setAlerType(false);
  
      if (rateId === 'new') {
        addData(login.data.access_token, 'rate', putDataRate);
      } else {
        putData(login.data.access_token, 'rate', rateId, putDataRate);
      };
  
      navigate('/admin/rate');
    };
  };

  function addListener() {
    const inputPrice = document.getElementById('admin-table-editor__input-price');
    inputPrice.addEventListener('change', () => {
      setPrice(inputPrice.value);
    });
  };

  // --------------------------------------------------------

  const inputPriceClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertPrice,
  });
  const titleAlertPriceClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertPrice,
  });
  const titleAlertTypeClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertType,
  });
      
  // --------------------------------------------------------

  useEffect(getDataRate, []);
  useEffect(addListener, []);
  useEffect(getListType, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_editor'>
        <p className='admin-page__main-title'>
          Редактирование тарифа
        </p>
        <div className='admin-page__main-window admin-page__main-window_admin-page-editor'>
          <div className='admin-page-editor__main-window-content'>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>Стоимость </p>
              <input 
                type="number" 
                id='admin-table-editor__input-price'  
                className={inputPriceClass}
              />
              <p className={titleAlertPriceClass}>необходимо ввести цену</p>
            </div>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>
                Тип тарифа
              </p>
              <SelectListCallBack
                  placeholder='выберите тип'
                  listValue={listType}
                  collBack={setType}
                  id='admin-page-editor__input-type'
                  defaultValue={defaultType}
                />
              <p className={titleAlertTypeClass}>необходимо указать тип тарифа</p>
            </div>
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putRate}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataRate}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deleteRate}
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

export default connect(putStateToProps, putActionToProps)(AdminRateEditor);