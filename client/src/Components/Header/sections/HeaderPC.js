import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lookbook from './SubMenuPC/Lookbook';
import Shop from './SubMenuPC/Shop';
import Account from './SubMenuPC/Account';
import Search from './Search/Search';

gsap.registerPlugin(ScrollTrigger);

const Header = styled.header`
  width: 100%;
  height: 3.5rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  display: ${(props) => (props.current ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 100;

  .menu-hover {
    position: relative;
  }
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
  }
`;

const Logo = styled.div`
  width: 33.33333333333333%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: -0.1rem;
  font-size: 1.7rem;
  .space {
    margin-right: 0.5rem;
  }
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

export const sections = [
  {
    title: 'V',
  },
  {
    title: 'I',
  },
  {
    title: 'N',
  },
  {
    title: 'T',
  },
  {
    title: 'A',
  },
  {
    title: 'G',
  },
  {
    title: 'E',
    className: 'space',
  },

  {
    title: 'V',
  },

  {
    title: 'E',
  },

  {
    title: 'L',
  },
  {
    title: 'L',
  },
  {
    title: 'A',
  },
];

const HeaderPC = ({ pathname }) => {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const [IsHovering, setIsHovering] = useState({
    DropdownOpen1: false,
    DropdownOpen2: false,
    DropdownOpen3: false,
  });

  const [OpenSearch, setOpenSearch] = useState(false);

  // 메뉴에 마우스 가져다댈시 서브메뉴 활성화
  const onMouseHover = (id) => {
    setIsHovering({ [id]: true });
  };
  // 메뉴에서 마우스 떠날시 서브메뉴 비활성화
  const onMouseLeave = (id) => {
    setIsHovering({ [id]: false });
  };

  // Search 메뉴 클릭시 검색창 활성화
  const onOpenSearch = () => {
    setOpenSearch((OpenSearch) => !OpenSearch);
  };

  // div들 집어넣음
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  useEffect(() => {
    //텍스트 모션
    revealRefs.current.forEach((el, index) => {
      gsap.from(el, {
        autoAlpha: 0,
        delay: Math.random() * 1,
        ease: 'power3.easeInOut',
      });
    });
  }, []);
  return (
    <>
      <Search onOpenSearch={onOpenSearch} OpenSearch={OpenSearch} />
      <Header
        current={
          pathname === '/admin' ||
          pathname === '/admin/upload' ||
          pathname === '/admin/' ||
          pathname === '/admin/products' ||
          pathname === '/admin/review'
        }
      >
        <LeftMenu>
          <ul>
            <li>
              <SLink to='/about'>About</SLink>
            </li>
            <li
              className='item menu-hover'
              onMouseEnter={() => onMouseHover('DropdownOpen1')}
              onMouseLeave={() => onMouseLeave('DropdownOpen1')}
            >
              <SLink to='#'>Lookbook</SLink>

              {/* 서브메뉴 */}
              <Lookbook DropdownOpen1={IsHovering.DropdownOpen1} />
            </li>

            <li
              className='menu-hover'
              onMouseEnter={() => onMouseHover('DropdownOpen2')}
              onMouseLeave={() => onMouseLeave('DropdownOpen2')}
            >
              <SLink to='#'>Shop</SLink>
              {/* 서브메뉴 */}
              <Shop DropdownOpen2={IsHovering.DropdownOpen2} />
            </li>
          </ul>
        </LeftMenu>

        <Logo>
          {sections.map((title, index) => (
            <div
              ref={addToRefs}
              key={index}
              className={title.className && 'space'}
            >
              <Link to='/'>{title.title}</Link>
            </div>
          ))}
        </Logo>

        <RightMenu>
          <ul>
            <li
              className='menu-hover'
              onMouseEnter={() => onMouseHover('DropdownOpen3')}
              onMouseLeave={() => onMouseLeave('DropdownOpen3')}
            >
              <SLink to='#'>Account</SLink>
              {/* 서브메뉴 */}
              <Account DropdownOpen3={IsHovering.DropdownOpen3} />
            </li>

            <li className='item'>
              <SLink to='/contact'>Contact</SLink>
            </li>

            <li onClick={onOpenSearch}>
              <SLink to='#'>Search</SLink>
            </li>
          </ul>
        </RightMenu>
      </Header>
    </>
  );
};

export default HeaderPC;
