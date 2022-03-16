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


