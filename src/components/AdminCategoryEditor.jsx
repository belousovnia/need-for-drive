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

function AdminCategoryEditor(props) {
  const {
    login,
  } = props;

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [ name, setName ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ alertName, setAlerName ] = useState(false);

  // --------------------------------------------------------
  
  async function getDataCategory() {
    const inputName = document.getElementById('admin-table-editor__input-name');
    const inputDescription = document.getElementById('admin-table-editor__catrgory-textarea');

    if (categoryId === 'new') {
      setName(null);
      setDescription(null);
      inputName.value = null;
      inputDescription.value = null;
      return;
    };
    
    const data = await getSimpleData(`category/${categoryId}`);
    if (data.response) {
      navigate(`/admin/error/${data.response.status}`)
    };
    const item = data.data.data;
    setName(item.name);
    inputName.value = item.name;
    setDescription(item.description);
    inputDescription.value = item.description;
  };

  async function deleteCategory() {
    const question =  window.confirm(`Удалить Категорию?`);
    if (question) {
      await deleteSubject(login.data.access_token, categoryId, 'category');
      navigate('/admin/category');
    };
  };

  async function putCategory() {
    if (name) {
      let putDataCategory = {
        'name': name,
        'description': description,
      };

      setAlerName(false);
  
      if (categoryId === 'new') {
        addData(login.data.access_token, 'category', putDataCategory);
      } else {
        putData(login.data.access_token, 'category', categoryId, putDataCategory);
      };
  
      navigate('/admin/category');
    } else {
      setAlerName(true);
    };
  };

  function addListener() {
    const inputDescription = document.getElementById('admin-table-editor__catrgory-textarea');
    inputDescription.addEventListener('change', () => {
      setDescription(inputDescription.value);
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
      
  // --------------------------------------------------------

  useEffect(getDataCategory, []);
  useEffect(addListener, []);

  // --------------------------------------------------------
  return (
    <div className='admin-table-editor'>
      <div className='admin-page-table__wrapped admin-page-table__wrapped_editor'>
        <p className='admin-page__main-title'>
          Редактирование категории
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
                Описание
              </p>
              <textarea
                id="admin-table-editor__catrgory-textarea" 
                className='admin-table-editor__textarea'
                wrap='soft'
              ></textarea>
            </div>
          </div>
          <div className='admin-page__main-window-footer admin-page__main-window-footer_editor'>
            <div className='admin-page-editor__footer-button-container'>
              <button 
                className='admin-button admin-button_margin' 
                onClick={putCategory}
              >
                <p className='admin-button__title '>Сохранить</p>
              </button>
              <button 
                className='admin-button admin-button_gray'
                onClick={getDataCategory}
              >
                <p className='admin-button__title '>Отменить</p>
              </button>
            </div>
            
            <button 
              className='admin-button admin-button_red'
              onClick={deleteCategory}
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

export default connect(putStateToProps, putActionToProps)(AdminCategoryEditor);