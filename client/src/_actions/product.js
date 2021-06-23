import axios from 'axios';
import {
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAILURE,
  PRODUCT_POST_IMAGE_SUCCESS,
  PRODUCT_POST_IMAGE_FAILURE,
  CLEAR_PRODUCT,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_FAILURE,
  PRODUCT_READ,
  PRODUCT_READ_FAILURE,
  PRODUCT_IMAGE_REMOVE,
  EDIT_PRODUCT_IMAGE_REMOVE,
  EDIT_PRODUCT_POST_IMAGE_SUCCESS,
  EDIT_PRODUCT_POST_IMAGE_FAILURE,
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

// 게시글 Edit페이지 이미지 업로드
export const productImageEditPost = (image) => async (dispatch) => {
  try {
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    const res = await axios.post('/api/posts/upload', image, config);

    dispatch({
      type: EDIT_PRODUCT_POST_IMAGE_SUCCESS,
      payload: res.data.filePath,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: EDIT_PRODUCT_POST_IMAGE_FAILURE,
    });
  }
};

// 게시글 이미지 삭제 (로컬, 추후에 s3 삭제로 바뀔거임)
export const productImageRemove = (images, image) => async (dispatch) => {
  try {
    const currentIndex = images.indexOf(image);

    dispatch({
      type: PRODUCT_IMAGE_REMOVE,
      payload: currentIndex,
    });
  } catch (err) {
    console.error(err);
  }
};
// 편집페이지 게시글 이미지 삭제 (로컬,추후에 s3 삭제로 바뀔거임)
export const editProductImageRemove = (images, image) => async (dispatch) => {
  try {
    const currentIndex = images.indexOf(image);

    dispatch({
      type: EDIT_PRODUCT_IMAGE_REMOVE,
      payload: currentIndex,
    });
  } catch (err) {
    console.error(err);
  }
};

// 게시글 업로드
export const productPostUpload =
  ({ body, history }) =>
  async (dispatch) => {
    try {
      const { title, description, price, images, category } = body;

      const res = await axios.post('/api/posts', {
        title,
        description,
        price,
        images,
        categories: category,
      });

      dispatch({
        type: PRODUCT_POST_SUCCESS,
        payload: res.data,
      });

      alert('상품 업로드 완료');

      dispatch({ type: CLEAR_PRODUCT });
      // admin 메인 페이지로 이동
      history.push('/admin/home');
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

// 게시글 편집
export const productPostEdit =
  ({ body, id, history }) =>
  async (dispatch) => {
    try {
      // const { title, description, price, images, category, productId } = body;
      const { title, description, price, images, category } = body;

      const res = await axios.patch(`/api/posts/${id}`, {
        title,
        description,
        price,
        images,
        categories: category,
      });

      dispatch({
        type: PRODUCT_POST_SUCCESS,
        payload: res.data,
      });

      alert('상품 편집 완료');

      dispatch({ type: CLEAR_PRODUCT });
      // admin 메인 페이지로 이동
      history.push('/admin/home');
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

// id로  상품 가져오기
export const readProduct = (productId) => async (dispatch) => {
  // dispatch({ type: CLEAR_PRODUCT });

  try {
    const res = await axios.get(`/api/posts/${productId}`);

    dispatch({
      type: PRODUCT_READ,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    const errors = err.response.data.msg;

    if (errors) {
      alert(errors);
    }
    dispatch({
      type: PRODUCT_READ_FAILURE,
      payload: { msg: err },
    });
  }
};

// 모든 게시글 가져오기
export const getAllPosts =
  ({ body }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/posts/products', body);

      dispatch({
        type: GET_ALL_PRODUCT,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: GET_ALL_PRODUCT_FAILURE,
        payload: { msg: err },
      });
    }
  };

// 특정 게시글 지우기
export const removePost = (productIds) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/delete?id=${productIds.selectedRowKeys}`);

    dispatch(getAllPosts(''));
    alert('상품 삭제 완료');
  } catch (err) {
    console.error(err);
    const errors = err.response.data.msg;

    if (errors) {
      alert(errors);
    }
    dispatch({
      type: PRODUCT_POST_FAILURE,
      payload: { msg: err },
    });
  }
};

// 상품 검색
export const searchProduct =
  ({ body }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/posts/products', body);

      dispatch({
        type: GET_ALL_PRODUCT,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: GET_ALL_PRODUCT_FAILURE,
        payload: { msg: err },
      });
    }
  };

// CLEAR_PRODUCT
export const clearProduct = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
};
