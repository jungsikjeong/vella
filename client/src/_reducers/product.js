import {
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAILURE,
  PRODUCT_POST_IMAGE_SUCCESS,
  PRODUCT_POST_IMAGE_FAILURE,
  CLEAR_PRODUCT,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_FAILURE,
} from '../_actions/types';

const initialState = {
  loading: true,
  images: [],
  product: null,
  products: [],
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_POST_IMAGE_SUCCESS:
      return {
        ...state,
        images: [...state.images, payload],
        error: '',
      };

    case PRODUCT_POST_SUCCESS:
      // case POST_READ:
      return {
        ...state,
        product: payload,
        loading: false,
        error: '',
      };

    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        products: [],
        images: [],
        loading: false,
        error: '',
      };

    case PRODUCT_POST_FAILURE:
    case PRODUCT_POST_IMAGE_FAILURE:
    case GET_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        error: payload,
        products: [],
        loading: false,
      };

    case GET_ALL_PRODUCT:
      return {
        ...state,
        loading: false,
        products: payload,
        error: '',
      };

    default:
      return state;
  }
}
