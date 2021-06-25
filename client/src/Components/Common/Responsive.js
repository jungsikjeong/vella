import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 5rem 0 0;
  width: 1024px;
  margin: 0 auto; /* 중앙 정렬 */
  /* 최대 width가 1024px 즉 1024px 이하인 경우에 적용 */
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
