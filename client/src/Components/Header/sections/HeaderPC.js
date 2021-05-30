import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Lookbook from './SubMenuPC/Lookbook';
import Shop from './SubMenuPC/Shop';
import Account from './SubMenuPC/Account';

const Header = styled.header`
  width: 100%;
  height: 3.5rem;
  background-color: #efeeec;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 100;
`;

const LeftMenu = styled.div`
  width: 33.33333333333333%;
  height: 100%;
  padding-left: 1.2rem;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .item {
      margin: 0px 0.8rem;
    }

    .test {
      position: relative;
    }
  }
`;

const Logo = styled.h1`
  width: 33.33333333333333%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: -0.1rem;
  font-size: 1.7rem;
`;

const RightMenu = styled.div`
  width: 33.33333333333333%;
  height: 100%;
  padding-right: 1.2rem;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .item {
      margin: 0px 0.8rem;
    }

    .test {
      position: relative;
    }
  }
`;

const SLink = styled(Link)`
  color: #222;
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
`;

const HeaderPC = () => {
  return (
    <Header>
      <LeftMenu>
        <ul>
          <li>
            <SLink to='#'>About</SLink>
          </li>
          <li className='item test '>
            <SLink to='#'>Lookbook</SLink>
            {/* 서브메뉴 */}
            <Lookbook />
          </li>
          <li className='test '>
            <SLink to='#'>Shop</SLink>
            {/* 서브메뉴 */}
            <Shop />
          </li>
        </ul>
      </LeftMenu>

      <Logo>
        <Link to='/'>VINTAGE VELLA</Link>
      </Logo>

      <RightMenu>
        <ul>
          <li className='test'>
            <SLink to='#'>Account</SLink>
            {/* 서브메뉴 */}
            <Account />
          </li>
          <li className='item'>
            <SLink to='#'>Contact</SLink>
          </li>

          <li>
            <SLink to='#'>Search</SLink>
          </li>
        </ul>
      </RightMenu>
    </Header>
  );
};

export default HeaderPC;
