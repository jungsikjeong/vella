import React from 'react';
import styled from 'styled-components';
import Responsive from '../../../Common/Responsive';
import AdminHeader from '../AdminHeader/AdminHeader';
import FileUpload from './sections/FileUpload';

const Container = styled(Responsive)`
  .page-title {
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

const AdminUpload = () => {
  return (
    <>
      <AdminHeader />
      <Container>
        <h1 className='page-title'>쇼핑몰 상품 업로드</h1>

        {/* 파일 업로드 */}
        <FileUpload />
      </Container>
    </>
  );
};

export default AdminUpload;
