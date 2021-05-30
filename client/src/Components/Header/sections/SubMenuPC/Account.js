import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubMenuList = styled.ul`
  position: absolute;
  top: 370%;
  left: 0;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;

  /* display: none; */
`;

const SubMenuItem = styled.li`
  white-space: nowrap;
  line-height: 15px;
  margin: 0.2rem 0rem;
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

const Account = () => {
  return (
    <SubMenuList>
      <SubMenuItem>
        <SLink to='#'>Login</SLink>
      </SubMenuItem>
      <SubMenuItem>
        <SLink to='#'>Join us</SLink>
      </SubMenuItem>
    </SubMenuList>
  );
};

export default Account;
