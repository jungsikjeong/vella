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

  &.DropdownOpen1 {
    animation: ${ani} 0.5s;
    direction: block;
    opacity: 1;
    visibility: visible;
  }
`;

const SubMenuItem = styled.li`
  padding: 0.2rem 0;
  /* background-color: rgba(245, 245, 245, 0.95); */
  display: block;
  white-space: nowrap;
  line-height: 15px;
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

const Lookbook = ({ DropdownOpen1 }) => {
  return (
    <SubMenuList className={DropdownOpen1 && 'DropdownOpen1'}>
      <SubMenuItem>
        <SLink to='#'>Release 3</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='#'>Release 2</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='#'>Release 1</SLink>
      </SubMenuItem>
    </SubMenuList>
  );
};

export default Lookbook;
