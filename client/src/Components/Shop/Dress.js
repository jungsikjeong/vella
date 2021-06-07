import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Categories from './Common/Categories';
import Responsive from './Common/Responsiv';

const Container = styled(Responsive)``;

const CategoryWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`;

const ThisCategory = styled.div`
  margin: 0.5rem 0 1rem;

  h2 {
    font-weight: 700;
    font-size: 0.8rem;
    text-align: center;
    text-transform: uppercase;
    color: #333;
  }
`;

const Dress = () => {
  return (
    <Container>
      <CategoryWrapper>
        <ThisCategory>
          <h2>Dress</h2>
        </ThisCategory>
        {/* 카테고리들 */}
        <Categories />
      </CategoryWrapper>
    </Container>
  );
};

export default Dress;
