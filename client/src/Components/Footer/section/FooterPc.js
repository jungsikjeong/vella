import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = styled.footer`
  padding: 3rem 2.5% 2rem 2.5%;
  color: #525252;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FooterWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;

  h2 {
    font-weight: 700;
    font-size: 0.575rem;
    line-height: 2.1em;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #222;
    margin-bottom: 1rem;
  }

  p,
  ul {
    color: #525252;
    text-align: center;
    font-size: 0.55rem;
    line-height: 18px;
  }

  a {
    color: #525252;
  }
`;

const SLink = styled(Link)`
  color: #333 !important;
  font-size: 0.65rem;
  font-weight: bold;
  line-height: 17px;
`;

const FooterPc = () => {
  return (
    <Footer>
      <FooterWrap>
        <Col>
          <h2>COMPANY</h2>
          <p>
            <span>Company: J x Vella</span> | <span>CEO : Vella</span>
            <br />
            <span>Production day : [2021-05-29]</span>
            <br />
            <span>개인정보관리책임자 : 정중식</span>
            <br />
            <span>
              허리도 가늘군 만지면 부러지리
              <br /> 301호 (고객센터)
            </span>
            <br />
            <span>wndtlr1024@gmail.com</span>
          </p>
        </Col>

        <Col>
          <h2>INFORMATION</h2>
          <p>
            <span>CS Center: 941024</span>
          </p>
        </Col>

        <Col>
          <h2>PRIVACY</h2>
          <ul>
            <li>
              <Link to='#'>About us</Link>
            </li>
            <li>
              <Link to='#'>이용약관</Link>
            </li>
            <li>
              <Link to='#'>개인정보 처리방침</Link>
            </li>
            <li>
              <Link to='#'>사이트 이용 안내</Link>
            </li>
          </ul>
        </Col>

        <Col>
          <h2>FOLLOW</h2>
          <span>
            <a href='https://www.instagram.com/wndtlr1024/'>Instagram</a>
          </span>
          <p style={{ paddingTop: '.5rem' }}>Copyright© 2021 정중식.</p>
        </Col>
      </FooterWrap>
    </Footer>
  );
};

export default FooterPc;
