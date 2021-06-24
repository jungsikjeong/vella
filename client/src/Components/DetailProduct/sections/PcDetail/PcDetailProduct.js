import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addToCart } from '../../../../_actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearProduct, readProduct } from '../../../../_actions/product';
import { Link, withRouter } from 'react-router-dom';

//components
import Footer from '../../../Footer/Footer';
import Review from './Review';
import Loading from '../../../Common/Loading';

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div``;

const LeftScreen = styled.div`
  position: fixed;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  &.hide {
    display: none;
  }

  .heading-area {
    h2 {
      @media (max-width: 920px) {
        font-size: 0.75rem;
      }

      font-size: 0.9rem;
      color: #2e2e2e;
      font-weight: 600;
    }
  }

  .product {
    margin-top: 0.65rem;
    text-align: center;
    font-size: 0.6rem;

    .product-price {
      color: #000000;
    }

    .product-description {
      @media (max-width: 899px) {
        font-size: 0.5rem;
      }
      color: #555555;
      line-height: 120%;
    }
  }
`;

const CenterScreen = styled.div`
  padding: 4.5rem 0 0;
  width: 40%;
  height: 100%;
  text-align: center;
  margin-left: 30%;

  img {
    margin-top: 0.9rem;
    max-width: 100%;
  }
`;

const RightScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 30%;
  height: 100%;
  margin-left: 70%;
  opacity: 1;

  &.hide {
    display: none;
    opacity: 0;
  }

  button {
    background: 0 0;
    border: none;
    color: #555555;
    font-size: 0.8rem;
    padding: 1rem;
    cursor: pointer;

    span {
      position: relative;
      ::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        background: black;
        display: block;
        margin: auto;
        margin-top: 0.2rem;
        transition: width 0.5s ease, background-color 0.5s ease;
      }

      :hover::after {
        width: 100%;
      }
    }
  }
`;

const Bottom = styled.div`
  padding-top: 80px;
  margin: 0 auto;

  .not-review {
    text-align: center;
    padding: 1.5rem 0 1rem 0;
    color: rgba(33, 33, 33, 0.4);
    font-size: 0.55rem;
  }

  .product-review {
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .buttonWrap {
    font-size: 0.55rem;
    text-align: center;

    button {
      letter-spacing: 1px;
      margin: 0.2rem 0rem;
      padding: 0.15rem 0.5rem;
      background: 0 0;
      outline: none;
      border: 1px solid #bbb;
      cursor: pointer;
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

  .under {
    transform: rotate(180deg);
  }
`;

const NotPost = styled.div`
  display: flex;
  padding: 5rem 0 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PcDetailProduct = ({ match, user, history }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const currentRef = useRef();
  const SectionRef = useRef();

  const [Hide, setHide] = useState(false);
  const [ScrollBtn, setScrollBtn] = useState(false);

  const onScrollToTop = () => {
    window.scrollTo({
      top: SectionRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  const onScrollToUnder = () => {
    window.scrollTo({
      top: currentRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  // 스크롤 이벤트
  const onScrollHandler = useCallback(() => {
    const { pageYOffset } = window;
    setScrollBtn(pageYOffset > 500);
  }, []);

  // 스크롤이 바닥에 밀접해졌을때 이벤트발생, 양옆의 상품 설명글과 버튼을 없애준다.
  const onScrollEvent = useCallback(() => {
    setHide(false);
    onScrollHandler();

    if (currentRef.current === null || currentRef.current === undefined) {
      return;
    }
    // 현재 스크롤 위치, 뷰포트 높이, 해당 엘리먼트의 위치
    let scrollTop = document.documentElement.scrollTop;
    let viewportHeight = window.innerHeight;
    let offsetTop = currentRef.current.offsetTop;
    let elementHeight = currentRef.current.clientHeight;

    if (
      offsetTop < viewportHeight + scrollTop &&
      offsetTop > scrollTop - elementHeight
    ) {
      setHide(true);
    }
  }, [currentRef, onScrollHandler]);

  // 카트 페이지로 가기전에 user로그인이 되어있는지 검사
  // 로그인 안되어있으면 경고알람 후, 로그인 페이지로 이동
  const onInspection = (user) => {
    if (!user || user === null) {
      alert('로그인이 필요합니다');

      return history.push('/login');
    }
    dispatch(addToCart(id, history));
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollEvent, true);

    return () => window.removeEventListener('scroll', onScrollEvent, true);
  }, [onScrollEvent]);

  // 페이지에 들어왔을때 페이지의 데이터를 가져와줌
  useEffect(() => {
    dispatch(readProduct(id));
  }, [dispatch, id]);

  // 페이지 떠날시 리덕스 state를 비워줌
  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  // 에러 발생시
  if (product.error) {
    if (product.error.response && product.error.response.status === 404) {
      return <NotPost>존재하지 않는 상품 입니다.</NotPost>;
    }
    return <NotPost>오류 발생!</NotPost>;
  }

  return (
    <>
      <Container ref={SectionRef}>
        {product.loading ||
        product.product === null ||
        product.product.title === null ||
        product.product.description === null ||
        product.product.price === null ||
        product.product.images === null ? (
          <Loading />
        ) : (
          <Wrapper>
            <ScrollUp className={ScrollBtn && 'scrollBtn'}>
              <span onClick={onScrollToTop}>^</span> <br />
              <div className='under' onClick={onScrollToUnder}>
                ^
              </div>
            </ScrollUp>
            <LeftScreen className={Hide && 'hide'}>
              <div className='heading-area'>
                <h2>{product.product.title}</h2>
              </div>

              <div className='product'>
                <span className='product-price'>{product.product.price}원</span>
                <br />
                <br />

                <p className='product-description'>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.product.description,
                    }}
                  />
                  <br />
                  <br />
                  Model is 159cm / 45kg
                  <br />
                  <br />* 실제 색상은 하단의 제품 단독샷과 가장 흡사합니다.
                </p>
              </div>
            </LeftScreen>

            <RightScreen className={Hide && 'hide'}>
              <div className='btn-wrap'>
                <button>
                  <span>Buy</span>
                </button>
                <button>
                  <span onClick={() => onInspection(user, id)}>
                    Add to cart
                  </span>
                </button>
              </div>
            </RightScreen>

            <CenterScreen>
              {product.product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/${image}`}
                  alt=''
                  key={index}
                />
              ))}
            </CenterScreen>

            <Bottom ref={currentRef}>
              <div className='product-review'>
                <h3>review</h3>
              </div>

              {product.product === null ||
              product.product.reviews === null ||
              product.product.reviews.length === 0 ? (
                <>
                  <div className='not-review'>등록된 리뷰가 없습니다.</div>
                  <div className='buttonWrap'>
                    <Link to={`/product/review/${id}`}>
                      <button>write</button>
                    </Link>
                  </div>
                </>
              ) : (
                <Review id={id} reviews={product.product.reviews} />
              )}
            </Bottom>
          </Wrapper>
        )}
        <Footer />
      </Container>
    </>
  );
};

export default withRouter(PcDetailProduct);
