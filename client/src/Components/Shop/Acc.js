import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import Helmet from 'react-helmet';

import Categories from './sections/Categories';
import Responsive from '../Common/Responsive';
import Footer from '../Footer/Footer';

import test from '../Common/test.json';

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

const Acc = () => {
  // 6개씩 렌더링 되도록
  // 초기값은 6개
  const [Result, setResult] = useState(test.slice(0, 6));
  const [ItemIndex, setItemIndex] = useState(0);

  const revealRefs = useRef();

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
    gsap.from(revealRefs.current, {
      duration: 2.5,
      autoAlpha: 0,
      transform: 'translateY(20px)',
      ease: 'power4.inOut',
    });
  }, []);

  useEffect(() => {
    // 인피니티 스크롤로 데이터 새롭게 불러왔을때 작동하는 애니메이션
    gsap.from(revealRefs.current, {
      duration: 2.5,
      transform: 'translateY(20px)',
      ease: 'power4.inOut',
    });
  }, [Result]);

  return (
    <Container>
      <Helmet>
        <title>Vella | Shop</title>
      </Helmet>
      <CategoryWrapper>
        {/* 카테고리들 */}
        <Categories />
      </CategoryWrapper>

      <ProductList ref={revealRefs}>
        {Result.map((item, index) => (
          <ProductItem key={index}>
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

export default Acc;
