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

const ProductList = styled.ul`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductItem = styled.li`
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  text-align: center;
  padding: 0.4rem;
  font-size: 0.65rem;

  .title {
  }
  .price {
    padding: 0.4rem;
    font-size: 0.67rem;
    color: #333;
    opacity: 0.8;
  }
`;

const All = () => {
  return (
    <Container>
      <CategoryWrapper>
        <ThisCategory>
          <h2>ALL</h2>
        </ThisCategory>

        {/* 카테고리들 */}
        <Categories />
      </CategoryWrapper>

      <ProductList>
        <ProductItem>
          <Link to='#'>
            <img
              src='https://nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
              alt=''
            />

            <Description>
              <strong className='title'>GADI 밴드 셔링 미니 원피스</strong>
              <p className='price'>219,000원</p>
            </Description>
          </Link>
        </ProductItem>

        <ProductItem>
          <img
            src='https://nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
            alt=''
          />

          <Description>
            <strong className='title'>GADI 밴드 셔링 미니 원피스</strong>
            <p className='price'>219,000원</p>
          </Description>
        </ProductItem>

        <ProductItem>
          <img
            src='https://nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
            alt=''
          />

          <Description>
            <strong className='title'>GADI 밴드 셔링 미니 원피스</strong>
            <p className='price'>219,000원</p>
          </Description>
        </ProductItem>

        <ProductItem>
          <img
            src='https://nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
            alt=''
          />

          <Description>
            <strong className='title'>GADI 밴드 셔링 미니 원피스</strong>
            <p className='price'>219,000원</p>
          </Description>
        </ProductItem>
      </ProductList>
    </Container>
  );
};

export default All;
