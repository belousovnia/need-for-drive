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

function AdminCityEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { cityId } = useParams();

  const [ name, setName ] = useState(null);
  const [ alertName, setAlerName ] = useState(false);

  // --------------------------------------------------------
  
  async function getDataCity() {
    const inputName = document.getElementById('admin-table-editor__input-name');

    if (cityId === 'new') {
      setName(null);
      inputName.value = null;
      return;
    };
    
    const data = await getSimpleData(`city/${cityId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setName(item.name);
    inputName.value = item.name;
  };

  async function deleteCity() {
    const question =  window.confirm(`Удалить город?`);
    if (question) {
      await deleteSubject(login.data.access_token, cityId, 'city');
      navigate('/admin/city');
    };
  };

  async function putCity() {
    if (name) {
      let putDataCity = {
        'name': name,
      };

      setAlerName(false);
  
      if (cityId === 'new') {
        addData(login.data.access_token, 'city', putDataCity);
      } else {
        putData(login.data.access_token, 'city', cityId, putDataCity);
      };
  
      navigate('/admin/city');
    } else {
      setAlerName(true);
    };
  };

  function addListener() {
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
      
  // --------------------------------------------------------

  useEffect(getDataCity, []);
  useEffect(addListener, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped'>
        <p className='admin-page__main-title'>
          Редактирование города
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
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putCity}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataCity}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deleteCity}
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

export default connect(putStateToProps, putActionToProps)(AdminCityEditor);