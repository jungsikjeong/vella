import React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

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
`;

const SLink = styled(Link)`
  color: #222 !important;
  display: block;
  padding: 0.9em 1.6em 0.9em 0;
  font-weight: 600;
  font-size: 0.6rem;
`;

const MobileMenu = ({ MenuToggle, MenuToggleHandler }) => {
  return (
    <Container className={MenuToggle && 'MenuToggle'}>
      <CloseBtn onClick={MenuToggleHandler}>
        <GrClose />
      </CloseBtn>

      <SIGN_SIGNUP_CART>
        <li>
          <SLink to='#'>Login</SLink>
        </li>
        <li>
          <SLink to='#'>Join us</SLink>
        </li>
        <li>
          <SLink to='#'>Cart</SLink>
        </li>
      </SIGN_SIGNUP_CART>

      <br />
      <br />

      <NavMenu>
        <li>
          <SLink to='#'>About</SLink>
        </li>
        <li>
          <SLink to='#'>Lookbooks</SLink>
        </li>
        <li>
          <SLink to='#'>Shop</SLink>
        </li>
        <li>
          <SLink to='#'>Account</SLink>
        </li>
        <li>
          <SLink to='#'>Contact</SLink>
        </li>
      </NavMenu>
    </Container>
  );
};

export default MobileMenu;
