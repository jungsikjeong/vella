import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//components
import Responsive from '../../Common/Responsive';

const Container = styled(Responsive)`
  height: 100%;
`;

const PageTitle = styled.div`
  font-size: 0.65rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 0.35rem 0.35rem 0;
  padding: 0 0 1.45rem;

  .not-product {
    padding: 1.5rem 0;
    color: #212530;
    font-size: 0.6rem;
    text-align: center;
  }
`;

const Contents = styled.div`
  display: flex;
  margin-top: 1.5rem;
  font-size: 0.65rem;
`;

const Image = styled.div`
  width: 4rem;
  margin-left: 0.5rem;

  img {
    width: 100%;
  }
`;

const TextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1rem 0;
`;

const ProductTitle = styled.div`
  display: flex;

  button {
    color: #1b1b1b;
    background: 0 0;
    border: none;
    margin-left: auto;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  .product-count {
    margin-left: auto;
  }
`;

const Total = styled.div`
  display: flex;
  padding: 0.7rem 1.6rem 0.7rem 0.7rem;
  font-size: 0.75rem;

  h2 {
    font-weight: bold;
  }

  .total-num {
    font-weight: 400;
    margin-left: auto;
  }
`;

const Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    cursor: pointer;
    background: 0 0;
    border: 1px solid #d5d5d5;
    padding: 0.5rem 3rem;
    font-size: 0.65rem;
    letter-spacing: 1px;
  }
`;

const MobileCartPage = () => {
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  return (
    <Container>
      <PageTitle>
        <h2>CART</h2>
      </PageTitle>

      <Wrapper>
        {user && user.cart && user.cart.length !== 0 ? (
          <>
            <Contents>
              <Image>
                <img
                  src='https://nueahmik.com/web/product/tiny/202010/7712cb38e7b68324c7c6284a80199322.jpg'
                  alt=''
                />
              </Image>

              <TextWrap>
                <ProductTitle>
                  <strong>VIIR 텐셀 옥스퍼드 랩 스커트</strong>

                  <button>X</button>
                </ProductTitle>

                <ProductPrice>
                  <strong>19200원</strong>
                  <div className='product-count'>1개</div>
                </ProductPrice>
              </TextWrap>
            </Contents>

            <Total>
              <h2>Total</h2>
              <div className='total-num'>19200원</div>
            </Total>

            <Submit>
              <button>Order</button>
            </Submit>
          </>
        ) : (
          <>
            <br />
            <p className='not-product'>장바구니가 비어 있습니다.</p>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default MobileCartPage;
