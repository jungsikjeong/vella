import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  productPostUpload,
  readProduct,
  clearProduct,
} from '../../../../_actions/product';
import { withRouter } from 'react-router';
import { categories } from '../../../../utils/categories';

// components
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import FileUpload from '../AdminUpload/sections/FileUpload';
import TimelineItem from 'antd/lib/timeline/TimelineItem';

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
  });
  const [Category, setCategory] = useState(1);
  const [Images, setImages] = useState([]);

  const { title, description, price } = FormData;

  const onUpdateImages = (newImages) => {
    setImages(newImages);
  };

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    },
    [FormData]
  );

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  //   const onSubmit = useCallback(
  //     (e) => {
  //       e.preventDefault();
  //       if (!title || !description || !price || !product.images || !Category) {
  //         alert('빈 칸을 모두 채워주세요');
  //       }

  //       const images = product.images;

  //       const body = {
  //         title,
  //         description,
  //         price,
  //         images,
  //         category: Category,
  //       };

  //       //   dispatch(productPostUpload({ body, history }));
  //     },
  //     [title, description, price, dispatch, product.images, history, Category]
  //   );

  const onCancel = () => {
    dispatch(clearProduct());
    history.push('/admin/home');
  };

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(readProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div> loading...</div>
      ) : (
        <>
          <AdminHeader />
          <Container>
            <h1 className='page-title'>쇼핑몰 상품 업로드</h1>
            <SForm onFinish={''}>
              {/* 파일 업로드 */}
              <FileUpload onUpdateImages={onUpdateImages} />
              <br />
              <select onChange={onCategoryChange}>
                {categories.map((item) => (
                  <option
                    key={item.key}
                    value={item.key}
                    // 불러온 데이터의 카테고리 기본값 설정
                    selected={
                      product &&
                      product.categories &&
                      product.categories === item.key
                        ? 'selected'
                        : ''
                    }
                  >
                    {item.value}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <label>상품 이름</label>
              <Input
                onChange={(e) => onChange(e)}
                value={title}
                name='title'
                placeholder={product && product.title}
              />
              <br />
              <br />
              <label>상품 설명</label>
              <TextArea
                onChange={(e) => onChange(e)}
                value={description}
                placeholder={product && product.description}
                name='description'
              />
              <br />
              <br />
              <label>상품 가격($)</label>
              <Input
                type='number'
                onChange={(e) => onChange(e)}
                value={price}
                placeholder={product && product.price}
                name='price'
              />
              <br />
            </SForm>
            <br />

            <ButtonWrap>
              <SButton type='submit' onClick={''}>
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
