import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { productPostUpload } from '../../../../_actions/product';
import { withRouter } from 'react-router';
import { categories } from '../../../../utils/categories';
import { clearProduct } from '../../../../_actions/product';
//Components
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import FileUpload from './sections/FileUpload';
import AskModal from '../../../Common/AskModal/AskModal';

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

const AdminUpload = ({ history }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [FormData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [Modal, setModal] = useState(false);
  const [Category, setCategory] = useState(1);

  const { title, description, price } = FormData;

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    },
    [FormData]
  );

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !description || !price || !product.images || !Category) {
        alert('빈 칸을 모두 채워주세요');
        return;
      }
      if (!product.images) {
        alert('이미지를 업로드해주세요');
        return;
      }

      const images = product.images;

      const body = {
        title,
        description,
        price,
        images,
        category: Category,
      };

      dispatch(productPostUpload({ body, history }));
    },
    [title, description, price, dispatch, product.images, history, Category]
  );

  const onRemoveClick = () => {
    setModal(true);
  };

  // 모달창에서 확인 누르면 데이터 사라지고 관리자 홈 화면으로 이동
  const onConfirm = () => {
    setModal(false);
    dispatch(clearProduct());
    history.push('/admin/home');
  };

  // 모달창에서 취소 누르면 다시 업로드페이지로 돌아감
  const onCancel = () => {
    setModal(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  return (
    <>
      <AdminHeader />
      <Container>
        <AskModal
          title={'취소하시겠습니까?'}
          description={'작성했던 데이터들이 삭제될 수 있습니다.'}
          visible={Modal}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
        <h1 className='page-title'>쇼핑몰 상품 업로드</h1>
        <SForm onFinish={onSubmit}>
          {/* 파일 업로드 */}
          <FileUpload />
          <br />
          <select onChange={onCategoryChange}>
            {categories.map((item) => (
              <option key={item.key} value={item.key}>
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
          <label>상품 가격(₩)</label>
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
          <SButton className='cancel-btb' onClick={onRemoveClick}>
            취소
          </SButton>
        </ButtonWrap>
      </Container>
    </>
  );
};

export default withRouter(AdminUpload);
