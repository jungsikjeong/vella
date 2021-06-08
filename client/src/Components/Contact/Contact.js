import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import image from '../../assets/contact-image/10.jpg';
import Helmet from 'react-helmet';
import { gsap } from 'gsap';

import Footer from '../Footer/Footer';

const Container = styled.div`
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
  }
`;

const Figure = styled.figure`
  padding: 0;
  margin-top: 0;
  margin-bottom: 3rem;
  text-align: right;
  width: 100%;

  @media (min-width: 800px) {
    padding: 4.75rem 0 3rem 0;
  }

  img {
    width: 100%;
    max-width: 100%;

    @media (min-width: 800px) {
    }
  }

  figcaption {
    padding-right: 1rem;

    a {
      font-size: 0.5rem;
      span {
        font-weight: bold;
      }
    }
  }
`;

const About = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 3rem;
  line-height: 1.4;
  text-align: left;

  @media (min-width: 800px) {
    text-align: center;
  }

  .about-title {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 10px;
    @media (min-width: 800px) {
      font-size: 1.5rem;
    }
  }

  .about-desc {
    font-size: 0.6rem;
    color: #333;
    @media (min-width: 800px) {
      font-size: 0.8rem;
    }
  }

  a {
    font-weight: bold;
    border-bottom: 1px solid #333;
  }
`;

const Contact = () => {
  const containerRef = useRef();

  useEffect(() => {
    gsap.from(containerRef.current, {
      autoAlpha: 0,
      ease: 'ease',
      delay: 0.8,
    });
  }, []);

  return (
    <Container ref={containerRef}>
      <Helmet>
        <title>Vella | Contact</title>
      </Helmet>
      <Figure>
        <img src={image} alt='' />
        &nbsp;
        <figcaption>
          <a href='https://www.instagram.com/go_baam/'>
            Photo by <span>고범석</span>
          </a>
        </figcaption>
        <About>
          <p className='about-title'>Contact Us</p>
          <p className='about-desc'>
            For general and product related inquiries:
            <br />
            wndtlr1024@gmail.com
            <br />
            <br />
            Follow us{' '}
            <a href='https://www.instagram.com/vintage.vella/'>@vella_</a>
            <br />
            <br />
            문의사항은 이메일 또는 DM으로 연락 주시기 바랍니다.
          </p>
        </About>
      </Figure>
      <Footer />
    </Container>
  );
};

export default Contact;
