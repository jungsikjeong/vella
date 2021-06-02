import { MENU_TOGGLE } from '../_actions/types';

const initialState = {
  MenuToggle: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MENU_TOGGLE:
      return {
        ...state,
        MenuToggle: !state.MenuToggle,
      };

    default:
      return state;
  }
}
