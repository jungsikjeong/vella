import React from 'react';
import styled from 'styled-components';
// components
import Responsive from '../../../Common/Responsive';

const Container = styled(Responsive)`
  padding: 2rem 0 0;
`;

const AdminHome = () => {
  return <Container>관리자 메인 페이지</Container>;
};

export default AdminHome;
