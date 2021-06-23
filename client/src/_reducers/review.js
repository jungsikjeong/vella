import {
  REVIEW_POST_SUCCESS,
  REVIEW_POST_FAILURE,
  CLEAR_REVIEW,
} from '../_actions/types';

const initialState = {
  loading: true,
  review: null,
  reviews: [],
  error: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REVIEW_POST_SUCCESS:
      // case PRODUCT_READ:
      return {
        ...state,
        review: payload,
        loading: false,
        error: '',
      };

    case CLEAR_REVIEW:
      return {
        ...state,
        review: null,
        reviews: [],
        loading: false,
        error: '',
      };

    case REVIEW_POST_FAILURE:
      return {
        ...state,
        error: payload,
        review: null,
        reviews: [],
        loading: false,
      };
    default:
      return state;
  }
}
