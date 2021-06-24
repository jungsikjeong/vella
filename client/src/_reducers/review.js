import {
  REVIEW_POST_SUCCESS,
  REVIEW_POST_FAILURE,
  CLEAR_REVIEW,
  GET_ALL_REVIEWS,
  GET_ALL_REVIEWS_FAILURE,
  REVIEW_READ,
  REVIEW_READ_FAILURE,
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
    case REVIEW_READ:
      return {
        ...state,
        review: payload,
        loading: false,
        error: '',
      };

    case GET_ALL_REVIEWS:
      return {
        ...state,
        reviews: payload,
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
    case GET_ALL_REVIEWS_FAILURE:
    case REVIEW_READ_FAILURE:
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
