import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  .current {
    border-bottom: 1px solid #333;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  li {
    width: 25%;
    padding: 0.4rem 0.75rem 0.4rem 0.75rem;
  }

  @media (min-width: 800px) {
    ul {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
    }
    li {
      width: 100%;
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

const Categories = ({ location: { pathname } }) => {
  return (
    <Container>
      <ul>
        <li>
          <SLink to='/product/all'>
            <span className={pathname === '/product/all' ? 'current' : 0}>
              ALL
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/top'>
            <span className={pathname === '/product/top' ? 'current' : 0}>
              Top
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/bottom'>
            <span className={pathname === '/product/bottom' ? 'current' : 0}>
              Bottom
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/dress'>
            <span className={pathname === '/product/dress' ? 'current' : 0}>
              Dress
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/outer'>
            <span className={pathname === '/product/outer' ? 'current' : 0}>
              Outer
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/promotion'>
            <span className={pathname === '/product/promotion' ? 'current' : 0}>
              PROMOTION
            </span>
          </SLink>
        </li>
        <li>
          <SLink to='/product/acc'>
            <span className={pathname === '/product/acc' ? 'current' : 0}>
              Acc
            </span>
          </SLink>
        </li>
      </ul>
    </Container>
  );
};

export default withRouter(Categories);
