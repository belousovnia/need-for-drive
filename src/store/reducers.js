import { ACTION_CHANGE_SHOW } from "./type";

const initialState = {
  headHiding: false
};

export const rootReduser = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_SHOW:
      return {...state, headHiding: action.payload}
  }
  return state;
};