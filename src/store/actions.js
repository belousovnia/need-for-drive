import { ACTION_CHANGE_SHOW } from "./type";
import { ACTION_CHANGE_SLIDER } from "./type";

export function changeHeadHiding(newStatus) {
  console.log(newStatus);
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
    }
  } else if (newStatus <= 0) {
    return {
      type: ACTION_CHANGE_SLIDER,
      payload: 4
    }
  } else {
    return {
      type: ACTION_CHANGE_SLIDER,
      payload: newStatus
    }
  };
};
