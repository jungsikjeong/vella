import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FiShoppingBag } from 'react-icons/fi';
import { FcMenu } from 'react-icons/fc';

import MobileMenu from './MobileMenu/MobileMenu';

const Container = styled.header`
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  background: #fff;
  z-index: 200;
`;

const Logo = styled.div`
  h1 {
    padding: 1rem 0;
    font-size: 1.14rem;
    letter-spacing: 0.1rem;
    font-weight: bold;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;

  .icons {
    color: #89857a;
  }
`;

const SLink = styled(Link)``;

const HeaderM = () => {
  const [MenuToggle, setMenuToggle] = useState(false);

  //  모바일 메뉴 on & off 결정이벤트
  const MenuToggleHandler = () => {
    setMenuToggle(!MenuToggle);
  };

  return (
    <Container>
      {/* 메뉴 버튼클릭시 활성화 됨 */}
      <MobileMenu
        MenuToggle={MenuToggle}
        MenuToggleHandler={MenuToggleHandler}
        onClick={MenuToggleHandler}
      />

      <Logo>
        <SLink to='/'>
          <h1>VELLA</h1>
        </SLink>
      </Logo>

      <Menu>
        <div>
          <SLink to='#'>
            {/* 장바구니 아이콘 */}
            <FiShoppingBag className='icons' />
          </SLink>
        </div>
        <div style={{ marginLeft: '.4rem' }}>
          {/* 메뉴 아이콘 */}
          <FcMenu className='icons' onClick={MenuToggleHandler} />
        </div>
      </Menu>
    </Container>
  );
};

export default HeaderM;
