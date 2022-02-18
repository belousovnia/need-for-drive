import { ACTION_CHANGE_SHOW } from "./type";

export const changeHeadHiding = (newStatus) => {
  console.log(newStatus);
  return {
    type: ACTION_CHANGE_SHOW,
    payload: newStatus
  };
};