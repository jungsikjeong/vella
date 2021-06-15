import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div``;

const LeftScreen = styled.div`
  position: fixed;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .heading-area {
    font-size: 0.9rem;
    color: #2e2e2e;
    font-weight: 600;
  }

  .product {
    margin-top: 0.65rem;
    text-align: center;
    font-size: 0.6rem;

    .product-price {
      color: #000000;
    }

    .product-description {
      color: #555555;
      line-height: 120%;
    }
  }
`;

const CenterScreen = styled.div`
  width: 40%;
  height: 100%;
  margin-left: 30%;

  img {
    max-width: 100%;
  }
`;

const RightScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 30%;
  height: 100%;
  margin-left: 70%;

  button {
    background: 0 0;
    border: none;
    color: #555555;
    font-size: 0.8rem;
    padding: 1rem;
    cursor: pointer;

    span {
      position: relative;
      ::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        background: black;
        display: block;
        margin: auto;
        margin-top: 0.2rem;
        transition: width 0.5s ease, background-color 0.5s ease;
      }
      :hover::after {
        width: 100%;
      }
    }
  }
`;

const DetailProduct = () => {
  return (
    <Container>
      <Wrapper>
        <LeftScreen>
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
        </LeftScreen>

        <RightScreen>
          <div className='btn-wrap'>
            <button>
              <span>Buy</span>
            </button>
            <button>
              <span>Add to cart</span>
            </button>
          </div>
        </RightScreen>

        <CenterScreen>
          <img
            src='https://nueahmik.com/web/product/big/202103/3ab927ab6a00f07b72b4caca600ba9e4.jpg'
            alt=''
          />

          <img
            src='https://nueahmik.com/web/upload/NNEditor/20210327/GADI.JPG'
            alt=''
          />
        </CenterScreen>
      </Wrapper>
    </Container>
  );
};

export default DetailProduct;
