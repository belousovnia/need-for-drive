import { ACTION_CHANGE_SHOW } from "./type";
import { ACTION_CHANGE_SLIDER } from "./type";
import { ACTION_CHANGE_CITY_AUTOCOMPLETE } from "./type";
import { ACTION_CHANGE_POINT_AUTOCOMPLETE } from "./type";

const initialState = {
  headHiding: false,
  slider: 1,
  cityAutocomplete: [],
  pointAutocomplete: [],
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
    };
  return state;
};