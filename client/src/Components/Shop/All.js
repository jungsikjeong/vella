import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const Categories = styled.div`
  ul {
    display: flex;
    justify-content: center;
  }
  li {
    padding: 0.4rem 0.75rem 0.4rem 0.75rem;

    .current {
      border-bottom: 1px solid #333;
    }
  }
`;

const SLink = styled(Link)`
  font-weight: 600;
  font-size: 0.6rem;
  text-align: center;
  text-transform: uppercase;
  padding: 0 0.65rem;
  color: #333;
`;

const All = () => {
  return (
    <Container>
      <CategoryWrapper>
        <ThisCategory>
          <h2>ALL</h2>
        </ThisCategory>
        <Categories>
          <ul>
            <li>
              <SLink to='/product/all'>
                <span className='current'>ALL</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/top'>
                <span>Top</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/bottom'>
                <span>Bottom</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/dress'>
                <span>Dress</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/outer'>
                <span>Outer</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/promotion'>
                <span>PROMOTION</span>
              </SLink>
            </li>
            <li>
              <SLink to='/product/acc'>
                <span>Acc</span>
              </SLink>
            </li>
          </ul>
        </Categories>
      </CategoryWrapper>
    </Container>
  );
};

export default All;
