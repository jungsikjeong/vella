import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ani = keyframes`
from{
  top:25px;
 }
 to{
  top:100%;
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

const Account = ({ DropdownOpen3 }) => {
  return (
    <SubMenuList className={DropdownOpen3 && 'DropdownOpen3'}>
      <SubMenuItem>
        <SLink to='#'>Login</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/join'>Join us</SLink>
      </SubMenuItem>
    </SubMenuList>
  );
};

export default Account;
