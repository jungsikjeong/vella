import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { getCartItems, removeCartItem } from '../../../_actions/auth';

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
  justify-content: space-between;
  button {
    color: #1b1b1b;
    background: 0 0;
    border: none;
    padding: 0%;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
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

const MobileCartPage = ({ user, isAuthenticated }) => {
  const dispatch = useDispatch();

  const onRemoveCart = (id) => {
    dispatch(removeCartItem(id));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }
  return (
    <Container>
      <PageTitle>
        <h2>CART</h2>
      </PageTitle>

      <Wrapper>
        {user && user.cart && user.cart.length !== 0 ? (
          <>
            {user.cart.map((cart) => (
              <Contents key={cart.id}>
                <Link to={`/product/${cart.id}`}>
                  <Image>
                    <img
                      src={`http://localhost:5000/${cart.images[0]}`}
                      alt=''
                    />
                  </Image>
                </Link>

                <TextWrap>
                  <ProductTitle>
                    <strong>{cart.title}</strong>

                    <button onClick={() => onRemoveCart(cart.id)}>X</button>
                  </ProductTitle>

                  <ProductPrice>
                    <strong>{cart.price}</strong>
                    <div className='product-count'>{cart.quantity}</div>
                  </ProductPrice>
                </TextWrap>
              </Contents>
            ))}

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
