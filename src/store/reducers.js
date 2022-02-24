import Slider from "../components/Slider";
import { ACTION_CHANGE_SHOW } from "./type";
import { ACTION_CHANGE_SLIDER } from "./type";

const initialState = {
  headHiding: false,
  slider: 1,
};

export const rootReduser = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_SHOW:
      return {...state, headHiding: action.payload};
    case ACTION_CHANGE_SLIDER:
      return {...state, slider: action.payload};
  }
  return state;
};