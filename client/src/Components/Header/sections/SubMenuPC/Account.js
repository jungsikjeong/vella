import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../_actions/auth';

const ani = keyframes`
from{
  top:25px;
  opacity: .5;
}
to{
  top:100%;
  opacity: 1;
 }
`;

const SubMenuList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 2.8rem;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(255, 255, 255, 0.5);

  &.DropdownOpen3 {
    animation: ${ani} 0.5s;
    opacity: 1;
    visibility: visible;
  }
`;

const SubMenuItem = styled.li`
  white-space: nowrap;
  line-height: 15px;
  padding: 0.2rem 0;
  width: 100%;
  text-align: left;
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

const Account = ({ DropdownOpen3, user }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <>
      {isAuthenticated && user ? (
        <SubMenuList
          className={DropdownOpen3 && 'DropdownOpen3'}
          style={{ paddingTop: '3.8rem' }}
        >
          <SubMenuItem onClick={onLogout}>
            <SLink to='#'>Logout</SLink>
          </SubMenuItem>
          <SubMenuItem>
            {/* id는 user.id로 수정예정 */}
            <SLink to='/profile/:id'>Profile</SLink>
          </SubMenuItem>
          <SubMenuItem>
            <SLink to={`/cart/${user._id}`}>Cart</SLink>
          </SubMenuItem>
        </SubMenuList>
      ) : (
        <SubMenuList className={DropdownOpen3 && 'DropdownOpen3'}>
          <SubMenuItem>
            <SLink to='/login'>Login</SLink>
          </SubMenuItem>
          <SubMenuItem>
            <SLink to='/join'>Join us</SLink>
          </SubMenuItem>
        </SubMenuList>
      )}
    </>
  );
};

export default Account;
