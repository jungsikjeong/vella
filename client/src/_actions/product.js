import axios from 'axios';
import {
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAILURE,
  PRODUCT_POST_IMAGE_SUCCESS,
  PRODUCT_POST_IMAGE_FAILURE,
  CLEAR_PRODUCT,
} from './types';

// 게시글 이미지 업로드
export const productImagePost = (image) => async (dispatch) => {
  try {
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    const res = await axios.post('/api/posts/upload', image, config);

    dispatch({
      type: PRODUCT_POST_IMAGE_SUCCESS,
      payload: res.data.filePath,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_POST_IMAGE_FAILURE,
    });
  }
};

export const writePost =
  ({ body }) =>
  async (dispatch) => {
    try {
      const { text, image } = body;
      const res = await axios.post('/api/posts', { text, image });

      dispatch({
        type: PRODUCT_POST_SUCCESS,
        payload: res.data,
      });

      alert('상품 업로드 완료');

      dispatch({ type: CLEAR_PRODUCT });
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(err.response.data.errors);

      if (errors) {
        // 서버에서 오는 에러메시지가 array임

        errors.forEach((error) => alert(error.msg));
      }
      dispatch({
        type: PRODUCT_POST_FAILURE,
        payload: err,
      });
    }
  };

// // id로 게시글 가져오기
// export const readPost = (postId) => async (dispatch) => {
//   dispatch({ type: CLEAR_POST });
//   try {
//     const res = await axios.get(`/api/posts/${postId}`);

//     dispatch({
//       type: POST_READ,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.error(err);

//     dispatch({
//       type: POST_READ_FAILURE,
//       payload: { msg: err },
//     });
//   }
// };

// // 모든 게시글 가져오기
// export const getAllPosts = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/posts');

//     dispatch({
//       type: GET_ALL_POSTS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PRODUCT_POST_FAILURE,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// 특정 게시글 지우기
export const removePost = (postId, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({ type: CLEAR_PRODUCT });
    alert('상품 삭제 완료');

    history.push('/postlist');
  } catch (err) {
    dispatch({
      type: PRODUCT_POST_FAILURE,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: err },
    });
  }
};

// CLEAR_POST
export const clearPost = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
};