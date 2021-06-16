import React from 'react';
import styled from 'styled-components';
import Footer from '../../../Footer/Footer';

const Container = styled.div`
  overflow-x: hidden;
`;

const Thumbnail = styled.div`
  min-height: 5rem;
  padding-bottom: 0.7rem;

  img {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  padding: 0.7rem 0.7rem 0;

  .heading-area {
    h2 {
      font-size: 0.9rem;
      color: #2e2e2e;
      font-weight: 600;
    }
  }

  .product {
    margin-top: 0.65rem;
    font-size: 0.6rem;
    color: #555555;
    .product-description {
      line-height: 120%;
    }
  }
`;

const ProductImages = styled.div`
  padding: 0.7rem 1rem;
  img {
    max-width: 100%;
  }
`;

const ButtonWrap = styled.div`
  margin: 0.9rem auto;
  padding: 0 1.1rem;
  max-width: 100%;

  button {
    cursor: pointer;
    background: 0 0;
    outline: none;
    border: 1px solid #d5d5d5;
    width: 50%;
    margin: 0;
    height: 1.6rem;
    font-size: 11px;
    line-height: 32px;
  }
`;

const MobileDetailProduct = () => {
  return (
    <>
      <Container>
        <Thumbnail>
          <img
            src='https://m.nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
            alt=''
          />
        </Thumbnail>

        <ProductInfo>
          <div className='heading-area'>
            <h2>GADI 밴드 셔링 미니 원피스</h2>
          </div>

          <div className='product'>
            <span className='product-price'>219,000원</span>
            <br />
            <br />
            <p className='product-description'>
              모달,대나무 원단으로 몸에 착 감기는 촉감.
              <br />
              물결무늬처럼 재단된 하단 디테일.
              <br />
              <br />
              Model is 159cm / 45kg
              <br />
              <br />* 실제 색상은 하단의 제품 단독샷과 가장 흡사합니다.
            </p>
          </div>
        </ProductInfo>
        <ButtonWrap>
          <button>Add to cart</button>
          <button>Buy</button>
        </ButtonWrap>

        <ProductImages>
          <img
            src='https://m.nueahmik.com/web/upload/NNEditor/20210327/GADI.JPG'
            alt=''
          />
        </ProductImages>
      </Container>
      <Footer />
    </>
  );
};

export default MobileDetailProduct;
