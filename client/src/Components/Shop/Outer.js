import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import Helmet from 'react-helmet';

import Categories from './sections/Categories';
import Responsive from '../Common/Responsive';
import Footer from '../Footer/Footer';

import test from '../Common/test.json';

gsap.registerPlugin(ScrollTrigger);

const Container = styled(Responsive)``;

const CategoryWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`;

const ProductList = styled.ul`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductItem = styled.li`
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  text-align: center;
  padding: 0.4rem;
  font-size: 0.65rem;

  .title {
  }
  .price {
    padding: 0.4rem;
    font-size: 0.67rem;
    color: #333;
    opacity: 0.8;
  }
`;

const Outer = () => {
  // 6개씩 렌더링 되도록
  // 초기값은 6개
  const [Result, setResult] = useState(test.slice(0, 6));
  const [ItemIndex, setItemIndex] = useState(0);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const onInfiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    let sum = scrollTop + clientHeight;

    if (Math.floor(sum) === scrollHeight) {
      setItemIndex(ItemIndex + 6);
      setResult(Result.concat(test.slice(ItemIndex + 6, ItemIndex + 12)));
    }
  }, [ItemIndex, Result]);

  useEffect(() => {
    window.addEventListener('scroll', onInfiniteScroll, true);
    return () => window.removeEventListener('scroll', onInfiniteScroll, true);
  }, [onInfiniteScroll]);

  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          transform: 'translateY(20px)',
          //   autoAlpha: 0,
        },
        {
          duration: 1,
          opacity: 1,
          transform: 'translateY(0px)',
          ease: 'none',
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [Result]);

  // 상품들 집어넣음
  const contentsAddToRefs = (el) => {
    if (isMobile) return;
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <Container>
      <CategoryWrapper>
        <Helmet>
          <title>Vella | Shop</title>
        </Helmet>
        {/* 카테고리들 */}
        <Categories />
      </CategoryWrapper>

      <ProductList>
        {Result.map((item, index) => (
          <ProductItem key={index} ref={contentsAddToRefs}>
            <Link to='#'>
              <img src={item.src} alt='' />

              <Description>
                <strong className='title'>{item.title}</strong>
                <p className='price'>{item.price}</p>
              </Description>
            </Link>
          </ProductItem>
        ))}
      </ProductList>
      <Footer />
    </Container>
  );
};

export default Outer;
