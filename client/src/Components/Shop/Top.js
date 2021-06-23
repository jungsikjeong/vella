import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../_actions/product';

// Components
import Categories from './sections/Categories';
import Responsive from '../Common/Responsive';
import Footer from '../Footer/Footer';
import Loading from '../Common/Loading';

const Container = styled(Responsive)`
  /* height: 100vh; */
`;

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

    @media (min-width: 800px) {
      max-width: 100%;
      width: 100%;
      height: 450px;
    }
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
    font-size: 0.6rem;
    color: #333;
    opacity: 0.8;
  }
`;

const NotProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin: 10rem 0;

  font-weight: bold;
  color: #707070;
  font-size: 0.75rem;
`;

const Top = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(({ product }) => ({
    products: product.products,
    loading: product.loading,
  }));

  // 6개씩 렌더링 되도록
  // 초기값은 6개
  const [Result, setResult] = useState();
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
      setResult(Result.concat(products.slice(ItemIndex + 6, ItemIndex + 12)));
    }
  }, [ItemIndex, Result, products]);

  useEffect(() => {
    window.addEventListener('scroll', onInfiniteScroll, true);
    return () => window.removeEventListener('scroll', onInfiniteScroll, true);
  }, [onInfiniteScroll]);

  useEffect(() => {
    gsap.from(revealRefs.current, {
      duration: 1,
      autoAlpha: 0,
      transform: 'translateY(20px)',
      ease: 'none',
    });
  }, []);

  useEffect(() => {
    // 인피니티 스크롤로 데이터 새롭게 불러왔을때 작동하는 애니메이션
    gsap.from(revealRefs.current, {
      duration: 1,
      transform: 'translateY(20px)',
      ease: 'none',
    });
  }, [Result]);

  useEffect(() => {
    const categoryNumber = '1';
    let body = {
      categoryNumber,
    };
    dispatch(getAllPosts({ body })).then((response) => {
      if (!response) return;
      setResult(response.slice(0, 6));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Container>
        <Helmet>
          <title>Vella | Shop</title>
        </Helmet>
        <CategoryWrapper>
          {/* 카테고리들 */}
          <Categories />
        </CategoryWrapper>
        {loading && <Loading />}
        {products && Result && Result.length !== 0 && Result !== null ? (
          <ProductList ref={revealRefs}>
            {Result.map((product) => (
              <ProductItem key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`http://localhost:5000/${product.images[0]}`}
                    alt=''
                  />

                  <Description>
                    <strong className='title'>{product.title}</strong>
                    <p className='price'>{product.price.toLocaleString()}원</p>
                  </Description>
                </Link>
              </ProductItem>
            ))}
          </ProductList>
        ) : (
          <NotProduct>등록된 상품이 없습니다.</NotProduct>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Top;
