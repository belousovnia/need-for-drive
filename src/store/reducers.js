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

const initialState = {
  headHiding: false,
  slider: 1,
  cityAutocomplete: [],
  pointAutocomplete: [],
  pointMap: [],
  city: '',
  point: '',
  focus: ["59.935119", "30.349339"],
  focusList: [],
  step: 1,
  address: '',
  statusStep1: false,
  orderData: {},
  tiles: [
    <div className="step-2__loading" key="step-2__loading-1"></div>
  ],
  categoryList: [],
  categoryFilter: 'Все модели',
  car: undefined,
};

export const rootReduser = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_SHOW:
      return {...state, headHiding: action.payload};
    case ACTION_CHANGE_SLIDER:
      return {...state, slider: action.payload};
    case ACTION_CHANGE_CITY_AUTOCOMPLETE:
      return {...state, cityAutocomplete: action.payload};
    case ACTION_CHANGE_POINT_AUTOCOMPLETE:
      return {...state, pointAutocomplete: action.payload};
    case ACTION_CHANGE_POINT_MAP:
      return {...state, pointMap: action.payload};
    case ACTION_CHANGE_CITY:
      return {...state, city: action.payload};
    case ACTION_CHANGE_POINT:
      return {...state, point: action.payload};
    case ACTION_CHANGE_FOCUS:
      return {...state, focus: action.payload};
    case ACTION_CHANGE_FOCUS_LIST:
      return {...state, focusList: action.payload};
    case ACTION_CHANGE_STEP:
      return {...state, step: action.payload};
    case ACTION_CHANGE_LIST_FINAL_POINT:
      return {...state, listFinalPoint: action.payload};  
    case ACTION_CHANGE_STATUS_STEP1:
      return {...state, statusStep1: action.payload};
    case ACTION_CHANGE_ORDER_DATA: 
      return {...state, orderData: action.payload}
    case ACTION_CHANGE_TILES: 
      return {...state, tiles: action.payload}
    case ACTION_CHANGE_CATEGORY_LIST: 
      return {...state, categoryList: action.payload}
    case ACTION_CHANGE_CATEGORY_FILTER: 
      return {...state, categoryFilter: action.payload}
    case ACTION_CHANGE_CAR: 
      return {...state, car: action.payload}    
    };
  return state;
};

