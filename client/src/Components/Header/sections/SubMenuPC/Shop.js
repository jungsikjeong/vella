import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;

  display: none;
  opacity: 0;
  visibility: hidden;

  &.DropdownOpen2 {
    animation: ${ani} 0.5s;
    direction: block;
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

const Shop = ({ DropdownOpen2 }) => {
  return (
    <SubMenuList className={DropdownOpen2 && 'DropdownOpen2'}>
      <SubMenuItem>
        <SLink to='/product/all'>ALL</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/top'>Top</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/bottom'>Bottom</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/dress'>Dress</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/outer'>Outer</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/promotion'>ProMotion</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='/product/acc'>Acc</SLink>
      </SubMenuItem>
    </SubMenuList>
  );
};

export default Shop;
