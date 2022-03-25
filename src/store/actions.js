import { 
  ACTION_CHANGE_SHOW,
  ACTION_CHANGE_SLIDER,
  ACTION_CHANGE_CITY_AUTOCOMPLETE,
  ACTION_CHANGE_POINT_AUTOCOMPLETE,
  ACTION_CHANGE_POINT_MAP,
  ACTION_CHANGE_CITY,
  ACTION_CHANGE_POINT,
  ACTION_CHANGE_FOCUS,
  ACTION_CHANGE_FOCUS_LIST,
  ACTION_CHANGE_STEP,
  ACTION_CHANGE_LIST_FINAL_POINT,
  ACTION_CHANGE_STATUS_STEP1,
  ACTION_CHANGE_ORDER_DATA,
  ACTION_CHANGE_TILES,
  ACTION_CHANGE_CATEGORY_LIST,
  ACTION_CHANGE_CATEGORY_FILTER,
  ACTION_CHANGE_CAR,
  ACTION_CHANGE_COLOR_LIST,
  ACTION_CHANGE_COLOR,
  ACTION_CHANGE_START_DATE,
  ACTION_CHANGE_END_DATE,
  ACTION_CHANGE_RATE,
  ACTION_CHANGE_RATE_LIST,
  ACTION_CHANGE_FULL_TANK,
  ACTION_CHANGE_CHILD_CHAIR,
  ACTION_CHANGE_RIGHT_WHEEL,
  ACTION_CHANGE_ORDER_INFORMATION,
  ACTION_CHANGE_MODAL_WINDOW,
  ACTION_CHANGE_TITLE_PRICE,
} from "./type";

export function changeHeadHiding(newStatus) {
  return {
    type: ACTION_CHANGE_SHOW,
    payload: newStatus
  };
};

export function changeSlider(newStatus) {
  if (newStatus >= 5) {
    return {
      type: ACTION_CHANGE_SLIDER,
      payload: 1
    };
  } else if (newStatus <= 0) {
    return {
      type: ACTION_CHANGE_SLIDER,
      payload: 4
    };
  } else {
    return {
      type: ACTION_CHANGE_SLIDER,
      payload: newStatus
    };
  };
};

export function changeCityAutocomplete(newStatus) {
  return {
    type: ACTION_CHANGE_CITY_AUTOCOMPLETE,
    payload: newStatus
  };
};

export function changePointAutocomplete(newStatus) {
  return {
    type: ACTION_CHANGE_POINT_AUTOCOMPLETE,
    payload: newStatus
  };
};

export function changePointMap(newStatus) {
  return {
    type: ACTION_CHANGE_POINT_MAP,
    payload: newStatus
  };
};

export function changeCity(newStatus) {
  return {
    type: ACTION_CHANGE_CITY,
    payload: newStatus
  };
};

export function changePoint(newStatus) {
  return {
    type: ACTION_CHANGE_POINT,
    payload: newStatus
  };
};

export function changeFocus(newStatus) {
  return {
    type: ACTION_CHANGE_FOCUS,
    payload: newStatus
  };
};

export function changeFocusList(newStatus) {
  return {
    type: ACTION_CHANGE_FOCUS_LIST,
    payload: newStatus
  };
};

export function changeStep(newStatus) {
  if (newStatus >= 6) {
    return {
      type: ACTION_CHANGE_STEP,
      payload: 5
    };
  } else if (newStatus <= 0) {
    return {
      type: ACTION_CHANGE_STEP,
      payload: 1
    };
  } else {
    return {
      type: ACTION_CHANGE_STEP,
      payload: newStatus
    };
  };
};

export function changeListFinalPoint(newStatus) {
  return {
    type: ACTION_CHANGE_LIST_FINAL_POINT,
    payload: newStatus
  };
};

export function changeStatusStep1(newStatus) {
  return {
    type: ACTION_CHANGE_STATUS_STEP1,
    payload: newStatus
  };
};

export function changeOrderData(newStatus) {
  return {
    type: ACTION_CHANGE_ORDER_DATA,
    payload: newStatus
  };
};

export function changeTiles(newStatus) {
  return {
    type: ACTION_CHANGE_TILES,
    payload: newStatus
  };
};

export function changeCategoryList(newStatus) {
  return {
    type: ACTION_CHANGE_CATEGORY_LIST,
    payload: newStatus
  };
};

export function changeCategoryFilter(newStatus) {
  return {
    type: ACTION_CHANGE_CATEGORY_FILTER,
    payload: newStatus
  };
};

export function changeCar(newStatus) {
  return {
    type: ACTION_CHANGE_CAR,
    payload: newStatus
  };
};

export function changeColorList(newStatus) {
  return {
    type: ACTION_CHANGE_COLOR_LIST,
    payload: newStatus
  };
};

export function changeColor(newStatus) {
  return {
    type: ACTION_CHANGE_COLOR,
    payload: newStatus
  };
};

export function changeStartDate(newStatus) {
  return {
    type: ACTION_CHANGE_START_DATE,
    payload: newStatus
  };
};

export function changeEndDate(newStatus) {
  return {
    type: ACTION_CHANGE_END_DATE,
    payload: newStatus
  };
};

export function changeRate(newStatus) {
  return {
    type: ACTION_CHANGE_RATE,
    payload: newStatus
  };
};

export function changeRateList(newStatus) {
  return {
    type: ACTION_CHANGE_RATE_LIST,
    payload: newStatus
  };
};

export function changeFullTank(newStatus) {
  return {
    type: ACTION_CHANGE_FULL_TANK,
    payload: newStatus
  };
};

export function changeChildChair(newStatus) {
  return {
    type: ACTION_CHANGE_CHILD_CHAIR,
    payload: newStatus
  };
};

export function changeRightWheel(newStatus) {
  return {
    type: ACTION_CHANGE_RIGHT_WHEEL,
    payload: newStatus
  };
};

export function changeOrderInformation(newStatus) {
  return {
    type: ACTION_CHANGE_ORDER_INFORMATION,
    payload: newStatus
  };
};

export function changeModalWindow(newStatus) {
  return {
    type: ACTION_CHANGE_MODAL_WINDOW,
    payload: newStatus
  };
};

export function changeTitlePrice(newStatus) {
  return {
    type: ACTION_CHANGE_TITLE_PRICE,
    payload: newStatus
  };
};
