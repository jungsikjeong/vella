import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_CART_ITEMS,
  ADD_TO_CART,
  CART_FAILURE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  // localStorage.token은 회원가입 및 로그인 => 리듀서에서 로컬스토리지에 token을 담아서 얻게된다.
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ nickname, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ nickname, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());

      alert('환영합니다~');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        // 서버에서 오는 에러메시지가 array임

        errors.forEach((error) => alert(error.msg));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    // history.goBack();
  } catch (err) {
    console.error(err);
    const errors = err.response.data.errors;

    if (errors) {
      // 서버에서 오는 에러메시지가 array임

      errors.forEach((error) => alert(error.msg));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: { msg: err },
    });
  }
};

// 로그아웃
export const logout = () => async (dispatch) => {
  axios.defaults.headers.common['x-auth-token'] = '';

  dispatch({ type: LOGOUT });

  alert('로그아웃 되었습니다');
};

// 카트에 상품 담기
export const addToCart = (productId) => async (dispatch) => {
  try {
    let body = {
      productId,
    };
    const res = await axios.post('/api/users/addToCart', body);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_FAILURE,
    });
  }
};

// 카트에 담긴 상품 가져오기
export const getCartItems = (cartItems) => async (dispatch) => {
  try {
    console.log(cartItems);
    const res = await axios.get(`/api/posts/cart?id=${cartItems}`);

    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CART_FAILURE,
      payload: err,
    });
  }
};
