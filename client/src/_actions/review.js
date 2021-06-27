import axios from 'axios';
import {
  REVIEW_POST_SUCCESS,
  REVIEW_POST_FAILURE,
  CLEAR_REVIEW,
  GET_ALL_REVIEWS,
  GET_ALL_REVIEWS_FAILURE,
  REVIEW_READ,
  REVIEW_READ_FAILURE,
} from './types';

// 리뷰 작성
export const reviewPostUpload =
  ({ body, history }) =>
  async (dispatch) => {
    try {
      const { title, description, productId } = body;

      const res = await axios.post('/api/reviews', {
        title,
        description,
        productId,
      });

      dispatch({
        type: REVIEW_POST_SUCCESS,
        payload: res.data,
      });

      alert('리뷰 작성 완료');

      dispatch({ type: CLEAR_REVIEW });
      // 리뷰 모음 페이지로 이동
      history.push('/reviews');
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(err.response.data.errors);

      if (errors) {
        // 서버에서 오는 에러메시지가 array임
        errors.forEach((error) => alert(error.msg));
      }
      dispatch({
        type: REVIEW_POST_FAILURE,
        payload: err,
      });
    }
  };

// 모든 리뷰 가져오기
export const getAllReviews = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/reviews');

    dispatch({
      type: GET_ALL_REVIEWS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    console.error(err);

    dispatch({
      type: GET_ALL_REVIEWS_FAILURE,
      payload: { msg: err },
    });
  }
};

// id로 해당 리뷰 가져오기
export const readReview = (reviewId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/reviews/${reviewId}`);

    dispatch({
      type: REVIEW_READ,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);

    if (err.response) {
      const errors = err.response.data.msg;

      if (errors) {
        alert(errors);
      }
    }
    dispatch({
      type: REVIEW_READ_FAILURE,
      payload: { msg: err },
    });
  }
};

// 특정 리뷰 지우기
export const removeReview = (history, id) => async (dispatch) => {
  try {
    await axios.delete(`/api/reviews/delete?id=${id}`);

    alert('상품 삭제 완료');

    history.goBack();
  } catch (err) {
    console.error(err);
    if (err.response) {
      const errors = err.response.data.msg;

      if (errors) {
        alert(errors);
      }
    }
    dispatch({
      type: REVIEW_POST_FAILURE,
      payload: { msg: err },
    });
  }
};

// 관리자- 리뷰 삭제
export const removeReviews = (ids) => async (dispatch) => {
  try {
    await axios.delete(`/api/reviews/delete?id=${ids.selectedRowKeys}`);

    // dispatch(getAllReviews());
    alert('상품 삭제 완료');
  } catch (err) {
    console.error(err);
    if (err.response) {
      const errors = err.response.data.msg;

      if (errors) {
        alert(errors);
      }
    }
    dispatch({
      type: REVIEW_POST_FAILURE,
      payload: { msg: err },
    });
  }
};

// CLEAR_REVIEW
export const clearReview = () => async (dispatch) => {
  dispatch({
    type: CLEAR_REVIEW,
  });
};
