import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  color: #555555;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <h3>올바른 경로로 다시 시도해주세요.</h3>
    </NotFoundContainer>
  );
};

export default NotFound;
