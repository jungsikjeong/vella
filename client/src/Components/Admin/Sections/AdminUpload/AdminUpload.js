import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import FileUpload from './sections/FileUpload';

const { TextArea } = Input;

const Container = styled(Responsive)`
  .page-title {
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;
const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
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

const AdminUpload = () => {
  const [FormData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const { title, description, price } = FormData;

  const onChange = useCallback(
    (e) => {
      setFormData({ ...FormData, [e.target.name]: e.target.value });
    },
    [FormData]
  );
  return (
    <>
      <AdminHeader />
      <Container>
        <h1 className='page-title'>쇼핑몰 상품 업로드</h1>
        <SForm>
          {/* 파일 업로드 */}
          <FileUpload />

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
          <br />
        </SForm>
        <SButton>확인</SButton>
        <SButton className='cancel-btb'>취소</SButton>
      </Container>
    </>
  );
};

export default AdminUpload;
