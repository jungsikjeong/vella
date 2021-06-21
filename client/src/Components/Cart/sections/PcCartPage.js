import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getCartItems } from '../../../_actions/auth';

//Components
import Responsive from '../../Common/Responsive';
import UserCardBlock from './UserCartBlock';

const Container = styled(Responsive)`
  height: 100%;
  height: 100vh;
`;

const PageTitle = styled.div`
  min-height: 1.5rem;
  margin: 2rem 0 2rem;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 0 auto;

  .not-product {
    margin: 2.5rem 0;
    text-align: center;
    font-weight: bold;
    color: #707070;
    font-size: 0.75rem;
  }
`;

const Total = styled.div`
  display: flex;
  padding: 1.5rem 1.6rem 0.7rem 0rem;
  font-size: 1.15rem;

  h2 {
    font-weight: bold;
  }

  .total-num {
    font-weight: 400;
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
const PcCartPage = ({ user }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let cartItems = [];
  //   if (!user || !user.cart || user.cart === null) return;

  //   if (user && user.cart) {
  //     if (user.cart.length > 0) {
  //       user.cart.forEach((item) => {
  //         cartItems.push(item.id);

  //         dispatch(getCartItems(cartItems));
  //       });
  //     }
  //   }
  // }, [user, user.cart, dispatch]);

  useEffect(() => {
    dispatch(getCartItems('60ceed2d38a2cd56b0dae279'));
  }, [dispatch]);
  return (
    <>
      <Container>
        <PageTitle>
          <h2>CART</h2>
        </PageTitle>

        <Wrapper>
          {user && user.cart && user.cart.length !== 0 ? (
            <>
              <UserCardBlock />

              <Total>
                <h2>Total Amount:&nbsp;</h2>
                <div className='total-num'> 19,200원</div>
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
    </>
  );
};

export default PcCartPage;
