import { MENU_TOGGLE } from './types';

export const menuToggle = () => (dispatch) => {
  dispatch({
    type: MENU_TOGGLE,
  });
};
