import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  readProduct,
  clearProduct,
  productPostUpload,
} from '../../../../_actions/product';
import { withRouter } from 'react-router';
import { categories } from '../../../../utils/categories';

// components
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import EditFileUpload from './sections/EditFileUpload';

const { TextArea } = Input;

const Container = styled(Responsive)`
  .page-title {
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;
const SForm = styled(Form)`
  padding: 0 1rem;
`;

const ButtonWrap = styled.div`
  padding-bottom: 1rem;
`;

const SButton = styled(Button)`
  margin-left: 1rem;

  &.cancel-btb {
    :hover {
      color: red;
      border-color: red;
    }
  }
`;

const AdminEdit = ({ history, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);

  const [FormData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  const { title, description, price, category } = FormData;

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
      mounted.current = true;
    },
    [FormData]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const images = product.images;

      const body = {
        title,
        description,
        price,
        images,
        category,
        productId: product._id,
      };

      dispatch(productPostUpload({ body, history }));
    },
    [title, description, price, category, product, dispatch, history]
  );

  const onCancel = () => {
    dispatch(clearProduct());
    history.push('/admin/home');
  };

  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;

    if (product)
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.categories,
      });
  }, [product]);

  useEffect(() => {
    dispatch(readProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div> loading...</div>
      ) : (
        <>
          <AdminHeader />
          <Container>
            <h1 className='page-title'>쇼핑몰 상품 업로드</h1>
            <SForm onFinish={onSubmit}>
              {/* 파일 업로드 */}
              <EditFileUpload />
              <br />
              <select onChange={(e) => onChange(e)} name='category'>
                {categories.map((item) => (
                  <option
                    key={item.key}
                    value={item.key}
                    // 불러온 데이터의 카테고리 기본값 설정
                    selected={
                      category && category === item.key ? 'selected' : ''
                    }
                  >
                    {item.value}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <label>상품 이름</label>
              <Input onChange={(e) => onChange(e)} value={title} name='title' />
              <br />
              <br />
              <label>상품 설명</label>
              <TextArea
                onChange={(e) => onChange(e)}
                value={description}
                name='description'
              />
              <br />
              <br />
              <label>상품 가격($)</label>
              <Input
                type='number'
                onChange={(e) => onChange(e)}
                value={price}
                name='price'
              />
              <br />
            </SForm>
            <br />

            <ButtonWrap>
              <SButton type='submit' onClick={onSubmit}>
                확인
              </SButton>
              <SButton className='cancel-btb' onClick={onCancel}>
                취소
              </SButton>
            </ButtonWrap>
          </Container>
        </>
      )}
    </>
  );
};

export default withRouter(AdminEdit);
