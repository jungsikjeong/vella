import axios from 'axios';
import {
  REVIEW_POST_SUCCESS,
  REVIEW_POST_FAILURE,
  CLEAR_REVIEW,
} from './types';

// 리뷰 작성
export const reviewPostUpload =
  ({ body, history }) =>
  async (dispatch) => {
    try {
      const { title, description } = body;

      const res = await axios.post('/api/reviews', {
        title,
        description,
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
