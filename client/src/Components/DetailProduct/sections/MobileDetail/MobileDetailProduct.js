import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart } from '../../../../_actions/auth';
import { clearProduct, readProduct } from '../../../../_actions/product';

//components
import Loading from '../../../Common/Loading';
import Footer from '../../../Footer/Footer';

const Container = styled.div`
  overflow-x: hidden;
`;

const Thumbnail = styled.div`
  min-height: 5rem;
  padding-bottom: 0.7rem;

  img {
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  padding: 0.7rem 0.7rem 0;

  .heading-area {
    h2 {
      font-size: 0.9rem;
      color: #2e2e2e;
      font-weight: 600;
    }
  }

  .product {
    margin-top: 0.65rem;
    font-size: 0.6rem;
    color: #555555;
    .product-description {
      line-height: 120%;
    }
  }
`;

const ProductImages = styled.div`
  padding: 0.7rem 1rem;
  img {
    max-width: 100%;
  }
`;

const ButtonWrap = styled.div`
  margin: 0.9rem auto;
  padding: 0 1.1rem;
  max-width: 100%;

  button {
    cursor: pointer;
    background: 0 0;
    outline: none;
    border: 1px solid #d5d5d5;
    width: 50%;
    margin: 0;
    height: 1.6rem;
    font-size: 11px;
    line-height: 32px;
  }
`;

const NotPost = styled.div`
  display: flex;
  padding: 5rem 0 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MobileDetailProduct = ({ match, user, history }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  // 카트 페이지로 가기전에 user로그인이 되어있는지 검사
  // 로그인 안되어있으면 경고알람 후, 로그인 페이지로 이동
  const onInspection = (user) => {
    if (!user || user === null) {
      alert('로그인이 필요합니다');
      return history.push('/login');
    }
    dispatch(addToCart(id));

    if (
      window.confirm(
        '장바구니에 상품이 담겼습니다. 장바구니를 확인하러 가시겠습니까?'
      ) === true
    ) {
      history.push(`/cart/${id}`);
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(readProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  // 에러 발생시
  if (product.error) {
    if (product.error.response && product.error.response.status === 404) {
      return <NotPost>존재하지 않는 포스트 입니다.</NotPost>;
    }
    return <NotPost>오류 발생!</NotPost>;
  }
  return (
    <>
      <Container>
        {product.loading ||
        product.product === null ||
        product.product.title === null ||
        product.product.description === null ||
        product.product.price === null ||
        product.product.images === null ? (
          <Loading />
        ) : (
          <>
            <Thumbnail>
              <img
                src={`http://localhost:5000/${product.product.images[0]}`}
                alt=''
              />
            </Thumbnail>

            <ProductInfo>
              <div className='heading-area'>
                <h2>{product.product.title}</h2>
              </div>

              <div className='product'>
                <span className='product-price'>{product.product.price}원</span>
                <br />
                <br />
                <p className='product-description'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.product.description,
                    }}
                  ></div>
                  <br />
                  <br />
                  Model is 159cm / 45kg
                  <br />
                  <br />* 실제 색상은 하단의 제품 단독샷과 가장 흡사합니다.
                </p>
              </div>
            </ProductInfo>
            <ButtonWrap>
              <button onClick={() => onInspection(user, id)}>
                Add to cart
              </button>
              <button>Buy</button>
            </ButtonWrap>

            <ProductImages>
              {product.product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/${image}`}
                  alt=''
                  key={index}
                />
              ))}
            </ProductImages>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default withRouter(MobileDetailProduct);
