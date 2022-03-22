import React from 'react';
import LineBurger from './svg/LineBurger';
import Cross from './svg/Cross';
import IconsSocialMedia from './svg/IconsSocialMedia';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeHeadHiding } from '../store/actions';

function Header(props) {
  const { headHiding, changeHeadHiding } = props;
  const checkHeadHiding = headHiding ? 'header__active' : '';
  const checkLanguageHiding = headHiding ? '' : 'language_active';

  let modifierLeftBlock;
  let modifierTransparentBlock;

  if (props.type == 'order') {
    modifierLeftBlock = 'header__left-block_order';
    modifierTransparentBlock = 'header__transparent-block_order';
  } else {
    modifierLeftBlock = '';
    modifierTransparentBlock = '';
  }

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
    <>
      {buttonBurgerSwitch()}
            
      <button className={`language ${checkLanguageHiding}`} > 
        Eng
      </button>
      <div className='header__container-button-background'/>

      <header className={`header ${checkHeadHiding}`}>
        <div className={`header__left-block ${modifierLeftBlock}`}>
          <div className='header__content'>
            <a href="" className='header__link'>ПАРКОВКА</a>
            <a href="" className='header__link'>СТРАХОВКА</a>
            <a href="" className='header__link'>БЕНЗИН</a>
            <a href="" className='header__link'>ОБСЛУЖИВАНИЕ</a>
            <IconsSocialMedia/>
          </div>
        </div>
        <div className={`header__transparent-block ${modifierTransparentBlock}`}/>  
      </header>
    </>
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

const WrappedHeaderComponent 
  = connect(putStateToProps, putActionToProps)(Header);

  export default connect(putStateToProps, putActionToProps)(WrappedHeaderComponent);