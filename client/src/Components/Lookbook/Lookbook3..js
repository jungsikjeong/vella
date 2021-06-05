import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { imgArray3 } from './sections/imageArray3';

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
  }
`;

const Element = styled.div`
  margin-bottom: 0.5rem;

  @media (min-width: 800px) {
    width: 100%;
    height: 500px;
    transition: all 350ms ease;
    cursor: pointer;
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

  &.span2 {
    @media (min-width: 800px) {
      grid-column: span 2;
    }
  }
`;

const Lookbook3 = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  const [Toggle, setToggle] = useState(false);
  const [ImgSrc, setImgSrc] = useState(false);

  const onToggle = (imgSrc) => {
    // 모바일 환경일땐 작동안하게끔
    if (isMobile) {
      return setToggle(false);
    }
    setToggle(!Toggle);
    setImgSrc(imgSrc);
  };

  return (
    <Container>
      {/* Toggle = true면 룩북 디테일페이지가 나타남 */}

      <ActiveBox imgSrc={ImgSrc} Toggle={Toggle} onToggle={onToggle} />

      <Wrapper>
        {imgArray3.map((img, index) => (
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

export default Lookbook3;
