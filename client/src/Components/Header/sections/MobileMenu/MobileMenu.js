import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
0%{
  opacity: 0;
}
100%{
  opacity: 1;
}
`;

const Container = styled.div`
  z-index: 999;
  background-color: rgb(255, 255, 255);
  padding: 1rem 1rem 1.5rem 0px;
  margin: 0px;
  width: 75%;
  height: 100%;
  position: fixed;
  top: 0;
  right: -100%;
  transition: all 0.5s ease 0s;

  &.MenuToggle {
    right: 0;
  }
`;

const CloseBtn = styled.div`
  max-width: 100%;
  height: 1.75rem;
  text-align: right;
  font-size: 0.8rem;
  padding-right: 1rem;
`;

const SIGN_SIGNUP_CART = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 0.5rem;
  text-align: right;
`;

const NavMenu = styled.ul`
  text-align: right;
  margin: 1rem 0;
  line-height: 0.5rem;
  text-align: right;

  .look-submenu {
    display: flex;
    flex-direction: column;
    li {
      &:nth-child(1) {
        animation: 0.5s ease 0s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(2) {
        animation: 0.5s ease 0.0833333s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(3) {
        animation: 0.5s ease 0.166667s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(4) {
        animation: 0.5s ease 0.25s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(5) {
        animation: 0.5s ease 0.333333s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(6) {
        animation: 0.5s ease 0.416667s 1 normal forwards running ${fadeIn};
      }
      &:nth-child(7) {
        animation: 0.5s ease 0.5s 1 normal forwards running ${fadeIn};
      }
    }
    a {
      padding-left: 0.5rem;
      font-size: 0.5rem;
      font-weight: 100;
      color: #333;
      opacity: 0.8;
    }
  }
`;

const SLink = styled(Link)`
  color: #222 !important;
  display: inline-block;
  padding: 0.9em 1.6em 0.9em 0;
  font-weight: bold;
  font-size: 0.6rem;
`;

const MobileMenu = ({ MenuToggle, MenuToggleHandler, onLogout, user }) => {
  const [LookMenuToggle, setLookMenuToggle] = useState(false);
  const [ShopMenuToggle, setShopMenuToggle] = useState(false);

  const onLookMenuToggle = () => {
    setLookMenuToggle(!LookMenuToggle);
  };

  const onShopMenuToggle = () => {
    setShopMenuToggle(!ShopMenuToggle);
  };

  return (
    <Container className={MenuToggle && 'MenuToggle'}>
      <CloseBtn>
        <GrClose onClick={MenuToggleHandler} />
      </CloseBtn>

      {user ? (
        <SIGN_SIGNUP_CART>
          <li>
            <SLink to='#' onClick={onLogout}>
              Logout
            </SLink>
          </li>
          <li>
            <SLink to={`/cart/${user._id}`} onClick={MenuToggleHandler}>
              {user.cart.length > 0 ? `Cart(${user.cart.length})` : 'Cart'}
            </SLink>
          </li>
        </SIGN_SIGNUP_CART>
      ) : (
        <SIGN_SIGNUP_CART>
          <li>
            <SLink to='/login' onClick={MenuToggleHandler}>
              Login
            </SLink>
          </li>
          <li>
            <SLink to='/join' onClick={MenuToggleHandler}>
              Join us
            </SLink>
          </li>
        </SIGN_SIGNUP_CART>
      )}

      <br />
      <br />

      <NavMenu>
        <li>
          <SLink to='/about' onClick={MenuToggleHandler}>
            About
          </SLink>
        </li>
        <li onClick={onLookMenuToggle}>
          <SLink to='#'>Lookbooks</SLink>
        </li>
        {LookMenuToggle && (
          <ul className='look-submenu'>
            <li>
              <SLink to='/lookbook1' onClick={MenuToggleHandler}>
                Release 1
              </SLink>
            </li>
            <li>
              <SLink to='/lookbook2' onClick={MenuToggleHandler}>
                Release 2
              </SLink>
            </li>
            <li>
              <SLink to='/lookbook3' onClick={MenuToggleHandler}>
                Release 3
              </SLink>
            </li>
          </ul>
        )}
        <li>
          <SLink to='#' onClick={onShopMenuToggle}>
            Shop
          </SLink>
        </li>
        {ShopMenuToggle && (
          <ul className='look-submenu'>
            <li>
              <SLink to='/product/all' onClick={MenuToggleHandler}>
                ALL
              </SLink>
            </li>
            <li>
              <SLink to='/product/top' onClick={MenuToggleHandler}>
                Top
              </SLink>
            </li>
            <li>
              <SLink to='/product/bottom' onClick={MenuToggleHandler}>
                Bottom
              </SLink>
            </li>
            <li>
              <SLink to='/product/dress' onClick={MenuToggleHandler}>
                Dress
              </SLink>
            </li>
            <li>
              <SLink to='/product/outer' onClick={MenuToggleHandler}>
                Outer
              </SLink>
            </li>
            <li>
              <SLink to='/product/promotion' onClick={MenuToggleHandler}>
                Promotion
              </SLink>
            </li>
            <li>
              <SLink to='/product/acc' onClick={MenuToggleHandler}>
                Acc
              </SLink>
            </li>
          </ul>
        )}

        <li>
          <SLink to='/contact' onClick={MenuToggleHandler}>
            Contact
          </SLink>
        </li>
      </NavMenu>
    </Container>
  );
};

export default MobileMenu;
