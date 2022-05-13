import { React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getSimpleData,
  putData,
  addData,
  deleteSubject,
} from './dataFunction/generalFunction';
import { useNavigate } from 'react-router-dom';

function AdminRateTypeEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { rateTypeId } = useParams();

  const [ name, setName ] = useState(null);
  const [ unit, setUnit ] = useState(null);
  const [ alertName, setAlerName ] = useState(false);
  const [ alertUnit, setAlerUnit ] = useState(false);

  // --------------------------------------------------------
  
  async function getDataRateType() {
    const inputName = document.getElementById('admin-table-editor__input-name');
    const inputUnit = document.getElementById('admin-table-editor__input-unit');

    if (rateTypeId === 'new') {
      setName(null);
      setUnit(null);
      inputName.value = null;
      inputUnit.value = null;
      return;
    };
    
    const data = await getSimpleData(`rateType/${rateTypeId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setName(item.name);
    inputName.value = item.name;
    setUnit(item.unit);
    inputUnit.value = item.unit;
  };

  async function deleteRateType() {
    const question =  window.confirm(`Удалить тип тарифа?`);
    if (question) {
      await deleteSubject(login.data.access_token, rateTypeId, 'rateType');
      navigate('/admin/rate-type');
    };
  };

  async function putRateType() {
    let checkField = true
    if (name) {
      setAlerName(false);
    } else {
      setAlerName(true);
      checkField = false;
    };
    if (unit) {
      setAlerUnit(false);
    } else {
      setAlerUnit(true);
      checkField = false;
    };
    if (checkField) {
      let putDataRateType = {
        'name': name,
        'unit': unit,
      };

      setAlerName(false);
      setAlerUnit(false);
  
      if (rateTypeId === 'new') {
        addData(login.data.access_token, 'rateType', putDataRateType);
      } else {
        putData(login.data.access_token, 'rateType', rateTypeId, putDataRateType);
      };
  
      navigate('/admin/rate-type');
    };
  };

  function addListener() {
    const inputUnit = document.getElementById('admin-table-editor__input-unit');
    inputUnit.addEventListener('change', () => {
      setUnit(inputUnit.value);
    });
    const inputName = document.getElementById('admin-table-editor__input-name');
    inputName.addEventListener('change', () => {
      setName(inputName.value);
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
  
  const inputUnitClass = classNames({
    'admin-page-editor__input': true,
    'admin-page-editor__input_alert': alertUnit,
  });
  const titleAlertUnitClass = classNames({
    'admin-page-editor__input-title-alert': true,
    'off': !alertUnit,
  });
      
  // --------------------------------------------------------

  useEffect(getDataRateType, []);
  useEffect(addListener, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_editor'>
        <p className='admin-page__main-title'>
          Редактирование типа тарифа
        </p>
        <div className='admin-page__main-window admin-page__main-window_admin-page-editor'>
          <div className='admin-page-editor__main-window-content'>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>Название </p>
              <input 
                type="text" 
                id='admin-table-editor__input-name'  
                className={inputNameClass}
              />
              <p className={titleAlertNameClass}>необходимо ввести название</p>
            </div>
            <div className='admin-page-editor__input-conteiner'>
              <p className='admin-page-editor__input-title'>
                Продолжительность
              </p>
              <input 
                type="text" 
                id='admin-table-editor__input-unit'  
                className={inputUnitClass}
              />
              <p className={titleAlertUnitClass}>необходимо указать продолжительность</p>
            </div>
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putRateType}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataRateType}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deleteRateType}
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

export default connect(putStateToProps, putActionToProps)(AdminRateTypeEditor);