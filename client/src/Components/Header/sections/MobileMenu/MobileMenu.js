import React, { useState } from 'react';
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

  .look-submenu {
    display: flex;
    flex-direction: column;

    a {
      padding-left: 0.5rem;
      font-size: 0.5rem;
      font-weight: 100;
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

const MobileMenu = ({
  MenuToggle,
  MenuToggleHandler,
  isAuthenticated,
  onLogout,
}) => {
  const [LookMenuToggle, setLookMenuToggle] = useState(false);

  const onLookMenuToggle = () => {
    setLookMenuToggle(!LookMenuToggle);
  };

  return (
    <Container className={MenuToggle && 'MenuToggle'}>
      <CloseBtn>
        <GrClose onClick={MenuToggleHandler} />
      </CloseBtn>

      {isAuthenticated ? (
        <SIGN_SIGNUP_CART>
          <li>
            <SLink to='#' onClick={onLogout}>
              Logout
            </SLink>
          </li>
          <li>
            <SLink to='#' onClick={MenuToggleHandler}>
              My Profile
            </SLink>
          </li>
          <li>
            <SLink to='#' onClick={MenuToggleHandler}>
              Cart
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
          <li>
            <SLink to='#' onClick={MenuToggleHandler}>
              Cart
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
          <SLink to='#' onClick={MenuToggleHandler}>
            Shop
          </SLink>
        </li>
        <li>
          <SLink to='#' onClick={MenuToggleHandler}>
            Account
          </SLink>
        </li>
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
