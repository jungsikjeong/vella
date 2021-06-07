import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Categories from './Common/Categories';
import Responsive from './Common/Responsiv';

import test from './Common/test.json';

gsap.registerPlugin(ScrollTrigger);

const ani = keyframes`
0% {
    opacity: 0;
    transform: translateY(20px);
}

100% {
    opacity: 1;
    transform: translateY(0);
}
`;

const Container = styled(Responsive)``;

const CategoryWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`;

const ThisCategory = styled.div`
  margin: 0.5rem 0 1rem;

  h2 {
    font-weight: 700;
    font-size: 0.8rem;
    text-align: center;
    text-transform: uppercase;
    color: #333;
  }
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

const All = () => {
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
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <Container>
      <CategoryWrapper>
        <ThisCategory>
          <h2>ALL</h2>
        </ThisCategory>

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
    </Container>
  );
};

export default All;
