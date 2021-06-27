import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FiShoppingBag } from 'react-icons/fi';
import { FcMenu } from 'react-icons/fc';

import MobileMenu from './MobileMenu/MobileMenu';
import { menuToggle } from '../../../_actions/toggle';
import { logout } from '../../../_actions/auth';

const Container = styled.header`
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.current ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 2rem;
  background: #fff;
  z-index: 999;
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

  .cartWrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .user-cart-text {
      margin-right: 0.2rem;
      font-size: 0.7rem;
    }
  }
`;

const SLink = styled(Link)``;

const HeaderM = ({ pathname, user }) => {
  const dispatch = useDispatch();
  const MenuToggle = useSelector((state) => state.toggle.MenuToggle);

  //  모바일 메뉴 on & off 결정이벤트
  const MenuToggleHandler = () => {
    dispatch(menuToggle());
  };

  const onLogout = () => {
    dispatch(logout());
    MenuToggleHandler();
  };

  return (
    <Container
      current={
        pathname === '/admin' ||
        pathname === '/admin/home' ||
        pathname === '/admin/upload' ||
        pathname === '/admin/' ||
        pathname === '/admin/products' ||
        pathname === '/admin/reviews'
      }
    >
      {/* 메뉴 버튼클릭시 활성화 됨 */}
      <MobileMenu
        MenuToggle={MenuToggle}
        MenuToggleHandler={MenuToggleHandler}
        onLogout={onLogout}
        onClick={MenuToggleHandler}
        user={user}
      />

      <Logo>
        <SLink to='/'>
          <h1>VELLA</h1>
        </SLink>
      </Logo>

      <Menu>
        {user && (
          <div>
            <SLink to={`/cart/${user._id}`}>
              {/* 장바구니 아이콘 */}
              {user.cart && user.cart.length > 0 ? (
                <div className='cartWrap'>
                  <span className='user-cart-text'>{user.cart.length}</span>
                  <FiShoppingBag className='icons' />
                </div>
              ) : (
                <FiShoppingBag className='icons' />
              )}
            </SLink>
          </div>
        )}

        <div style={{ marginLeft: '.4rem' }}>
          {/* 메뉴 아이콘 */}
          <FcMenu className='icons' onClick={MenuToggleHandler} />
        </div>
      </Menu>
    </Container>
  );
};

export default HeaderM;
