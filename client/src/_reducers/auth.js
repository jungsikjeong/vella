import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_TO_CART,
  GET_CART_ITEMS,
  CART_FAILURE,
} from '../_actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  pageLogin: false,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: '',
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case ADD_TO_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload,
        },
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload,
        },
        error: '',
      };

    case CART_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          cart: '',
        },
        error: payload,
      };

    default:
      return state;
  }
}
