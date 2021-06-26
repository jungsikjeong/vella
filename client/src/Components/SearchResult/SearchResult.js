import React from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

import Responsive from '../Common/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import Footer from '../Footer/Footer';
import Loading from '../Common/Loading';
import product from '../../_reducers/product';

const Container = styled(Responsive)`
  text-align: center;
  h2 {
    padding-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: -1px;
    @media (min-width: 800px) {
      padding-top: 3.5rem;
    }
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1022px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductItem = styled.li`
  margin-bottom: 1rem;

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

  .title {
    color: #000000;
    font-weight: bold;
    font-size: 1vw;
  }
  .price {
    padding: 0.4rem;
    font-size: 0.8vw;
    color: #333;
    opacity: 0.8;
  }
`;

const Page = styled.div`
  padding: 1rem;
  text-align: center;
`;

const SPagination = styled(Pagination)`
  li {
    border: none;

    &.ant-pagination-item-active a {
      color: #000000;
    }
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h2 {
    text-transform: none;
    font-size: 1.5rem;
    margin-bottom: 20rem;
    color: #555555;
  }
`;

const SearchResult = () => {
  const revealRefs = useRef();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(({ product }) => ({
    products: product.products,
    loading: product.loading,
    error: product.error,
  }));

  console.log(products);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          {products && products.length > 0 && (
            <>
              <h2>Search</h2>
              <ProductList ref={revealRefs}>
                <>
                  {products.map((product) => (
                    <ProductItem key={product._id}>
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={`http://localhost:5000/${product.images[0]}`}
                          alt=''
                        />

                        <Description>
                          <strong className='title'>{product.title}</strong>
                          <p className='price'>
                            {product.price.toLocaleString()}원
                          </p>
                        </Description>
                      </Link>
                    </ProductItem>
                  ))}
                </>
              </ProductList>
              <Page>
                <SPagination size='small' total={products.length} />
              </Page>
            </>
          )}
          {products && products.length === 0 && (
            <Message>
              <h2>Nothing found..</h2>
            </Message>
          )}
        </>
      )}

      <Footer />
    </Container>
  );
};

export default SearchResult;
