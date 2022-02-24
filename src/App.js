import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import LineBurger from './components/LineBurger';
import Cross from './components/Cross';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeHeadHiding } from './store/actions';
import IconsSocialMedia from './components/IconsSocialMedia';
import Homepage from './components/Homepage';

function App(props) {
  const { headHiding, changeHeadHiding } = props;
  const checkHeadHiding = headHiding ? 'header__active' : '';
  const checkLanguageHiding = headHiding ? '' : 'language_active';
  
  function buttonBurgerSwitch() {
    if (headHiding) {
      return (
        <button
          className='button-burger'
          onClick={() => changeHeadHiding(!props.headHiding)}
        >
          <Cross/>
        </button>   
      )
    } else {
      return (
        <button
          className='button-burger'
          onClick={() => changeHeadHiding(!props.headHiding)}
        >
          <LineBurger/>
          <LineBurger/>
          <LineBurger/>
        </button>
      )
    };
  }; 

  return (
      <div className='app'>
        {buttonBurgerSwitch()}
            
        <button className={`language ${checkLanguageHiding}`} > 
          Eng
        </button>
        <div className='header__container-button-background'/>

        <header className={`header ${checkHeadHiding}`}>
          

          <div className='header__left-block'>
            <div className='header__content'>
              <a href="" className='header__link'>ПАРКОВКА</a>
              <a href="" className='header__link'>СТРАХОВКА</a>
              <a href="" className='header__link'>БЕНЗИН</a>
              <a href="" className='header__link'>ОБСЛУЖИВАНИЕ</a>
              <IconsSocialMedia/>
            </div>
          </div>
          <div className='header__transparent-block'/>  
      </header>

      <div className='content'>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </div>
    </div>

  );
};

const putStateToProps = (state) => {
  return {
    headHiding: state.headHiding,
  };
};

const putActionToProps = (dispatch) => {
  return {
    changeHeadHiding: bindActionCreators(changeHeadHiding, dispatch),
  };
};

const WrappedAppComponent 
  = connect(putStateToProps, putActionToProps)(App);

export default connect(putStateToProps, putActionToProps)(WrappedAppComponent);
