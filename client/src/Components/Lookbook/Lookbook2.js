import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { imgArray2 } from './sections/imageArray2';
import Helmet from 'react-helmet';

import ActiveBox from './sections/ActiveBox';
import Footer from '../Footer/Footer';

const Container = styled.div`
  padding-top: 2rem;
  overflow: hidden;

  @media (min-width: 800px) {
    width: 100%;
    margin: 0 auto;
    padding: 5rem 0px 0;
  }
`;

const Wrapper = styled.div`
  @media (min-width: 800px) {
    width: 100%;
    padding: 0 5rem;
    /* width: 1018px; */
    /* min-width: 460px; */
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    div:nth-child(16) {
      /* display: none; */
      grid-column: 2/4;
    }

    div:nth-child(18) {
      /* display: none; */
      grid-column: 1/2;
    }
  }
`;

const Element = styled.div`
  margin-bottom: 0.5rem;

  @media (min-width: 800px) {
    width: 100%;
    height: 500px;
    transition: all 350ms ease;
    cursor: pointer;
    &.span2 {
      grid-column: span 2;
    }

    &.grid-right {
      grid-column: 2/4;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  img {
    width: 100%;
    @media (min-width: 800px) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ScrollUp = styled.div`
  position: fixed;
  z-index: 2147483647;
  display: none;
  bottom: 15%;
  right: 2%;
  color: #000;
  font-size: 1.1rem;
  font-family: verdana;
  letter-spacing: 1px;
  border-radius: 2px;
  opacity: 0.9;
  padding: 0.2rem 0.2rem 0.1rem 0.3rem;
  cursor: pointer;
  transition: 200ms linear;

  &.scrollBtn {
    display: block;
  }
`;

const Lookbook2 = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  const SectionRef = useRef();

  const [Toggle, setToggle] = useState(false);
  const [ImgSrc, setImgSrc] = useState(false);
  const [ScrollBtn, setScrollBtn] = useState(false);

  const onToggle = (imgSrc) => {
    // 모바일 환경일땐 작동안하게끔
    if (isMobile) {
      return setToggle(false);
    }
    setToggle(!Toggle);
    setImgSrc(imgSrc);
  };

  const onScrollTo = () => {
    window.scrollTo({
      top: SectionRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollHandler = useCallback(() => {
    const { pageYOffset } = window;
    setScrollBtn(pageYOffset > 500);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  return (
    <Container ref={SectionRef}>
      <Helmet>
        <title>Vella | Lookbook2</title>
      </Helmet>
      {isMobile ? (
        ''
      ) : (
        <ScrollUp onClick={onScrollTo} className={ScrollBtn && 'scrollBtn'}>
          ^
        </ScrollUp>
      )}
      {/* Toggle = true면 룩북 디테일페이지가 나타남 */}
      <ActiveBox imgSrc={ImgSrc} Toggle={Toggle} onToggle={onToggle} />

      <Wrapper>
        {imgArray2.map((img, index) => (
          <Element
            onClick={(e) => onToggle(img.src)}
            className={img.className && 'span2'}
            key={index}
          >
            <img src={img.src} alt='' />
          </Element>
        ))}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Lookbook2;
