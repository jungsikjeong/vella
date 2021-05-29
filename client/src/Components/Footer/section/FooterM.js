import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.footer`
  font-size: 0.55rem;
  line-height: 1.5em;
  color: #1b1b1b;
  border-top: 0px solid #c5c5c6;
  padding-top: 2rem;
`;

const Policy = styled.div`
  ul {
    text-align: center;
    font-size: 0;
    line-height: 0;
  }

  li {
    position: relative;
    display: inline-block;
    padding: 0 0.3rem 0 0.4rem;
    line-height: 13px;
    font-size: 0.55rem;
  }
`;

const Address = styled.address`
  p {
    text-align: center;
    padding: 1rem 0 0;
    line-height: 20px;
  }

  .copyright {
    text-align: center;
    line-height: 28px;
    color: #777777;
    font-size: 0.45rem;
    padding-bottom: 1rem;
  }
`;

const SLink = styled(Link)``;

const FooterM = () => {
  return (
    <Container>
      <Policy>
        <ul>
          <li>
            <SLink to='#'>이용약관</SLink>
          </li>

          <li>
            <SLink to='#'>개인정보 처리방침</SLink>
          </li>

          <li>
            <SLink to='#'>사이트 이용 안내</SLink>
          </li>
        </ul>
      </Policy>
      <Address>
        <p>
          <span>Company: J x Vella</span> | <span>CEO : Vella</span>
          <br />
          <span>Production day : [2021-05-29]</span>
          <br />
          <span>개인정보관리책임자 : 정중식</span>
          <br />
          <br />
          <span>
            허리도 가늘군 만지면 부러지리
            <br /> 301호 (고객센터)
          </span>
          <br />
          <br />
          <span>wndtlr1024@gmail.com</span>
          <br />
          <br />
          <span className='copyright'>
            Copyright© 2021 정중식. All Rights Reserved.
          </span>
        </p>
      </Address>
    </Container>
  );
};

export default FooterM;
