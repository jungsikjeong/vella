import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';
import { clearReview, readReview, removeReview } from '../../_actions/review';
import styled from 'styled-components';

import Loading from '../Common/Loading';
import Responsive from '../Common/Responsive';
import Footer from '../Footer/Footer';

const Container = styled(Responsive)`
  text-align: center;

  h2 {
    @media (min-width: 800px) {
      padding-top: 3.5rem;
    }
  }
`;

const Wrapper = styled.div``;

const ProductWrap = styled.div`
  margin: 0.75rem 0;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #e8e8e8;
  }

  .innerBox {
    width: 100%;
    display: flex;
    @media (min-width: 800px) {
      align-items: center;
    }

    .imageWrap {
      padding: 0.7rem;
      @media (min-width: 800px) {
        padding: 1rem;
      }

      img {
        max-width: 5rem;
      }
    }

    .product {
      width: 100%;
      text-align: left;

      h3 {
        font-weight: 600;
        font-size: 0.8rem;
        margin: 1rem 0 0.2rem 0;
        color: #2e2e2e;
      }

      .price {
        font-size: 0.7rem;
        color: #000;
        font-weight: 400;
        padding-bottom: 0.65rem;
        @media (min-width: 800px) {
          border-bottom: 1px solid #e8e8e8;
        }
      }
    }
  }
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  @media (min-width: 800px) {
    font-size: 0.7rem;
  }
  .post-inner {
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  padding: 0.9rem 0;
  border-top: 1px solid #e8e8e8;

  @media (min-width: 800px) {
    padding: 0.5rem 0;
    border: 1px solid #e8e8e8;
    border-left: 0;
    border-right: 0;
  }
  .title {
    padding: 0 3.6rem 0 1rem;
    @media (min-width: 800px) {
      border-right: 1px solid #e8e8e8;
    }
  }

  .title-contents {
    font-weight: bold;
    padding: 0 0.5rem;
    @media (min-width: 800px) {
      font-weight: 400;
    }
  }
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.2rem 0 0.3rem 0;
  border-bottom: 1px solid #e8e8e8;
  border-left: none;
  border-right: none;
  color: #757575;

  @media (min-width: 800px) {
    color: #000000;
    padding: 0.5rem 0;
  }

  .writer {
    @media (min-width: 800px) {
      border-right: 1px solid #e8e8e8;
    }
    padding: 0 2.8rem 0 1rem;
  }

  .writer-contents {
    padding: 0 0 0 0.5rem;
    .writer-text {
      margin-right: 0.5rem;
      padding-right: 0.5rem;
      border-right: 1px solid #e8e8e8;
    }
  }
`;

const Contents = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 0.8rem 0.5rem;
  font-weight: 400;
  text-align: left;
  font-size: 0.6rem;
  @media (min-width: 800px) {
    font-size: 0.7rem;
    padding: 2rem 1rem;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  padding: 0 0.5rem;
  .button-right {
    margin-left: auto;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 3rem;
  margin-top: 0.5rem;
  border: 1px solid #bbb;
  padding: 0.3rem 0.5rem;
  color: #4a4a4a;
  background: 0 0;
  font-size: 0.75rem;
  color: #000;
`;

const DetailReview = ({ history, match }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });
  const { review, loading } = useSelector(({ review }) => ({
    review: review.review,
    loading: review.loading,
  }));

  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  const { id } = match.params;

  const onRemove = (id) => {
    dispatch(removeReview(id));
  };

  useEffect(() => {
    dispatch(readReview(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearReview());
    };
  }, [dispatch]);

  return (
    <>
      <Container>
        <h2>Review</h2>

        {loading || !review || review === null ? (
          <Loading />
        ) : (
          <Wrapper>
            <ProductWrap key={review._id}>
              <div className='innerBox'>
                <div className='imageWrap'>
                  <img
                    src={`http://localhost:5000/${review.images[0]}`}
                    alt=''
                  />
                </div>

                <div className='product'>
                  <h3>GADI 밴드 셔링 미니 원피스</h3>
                  <p className='price'>219,000원</p>
                  <Link to={`/product/${review.productId}`}>
                    <Button>view</Button>
                  </Link>
                </div>
              </div>
            </ProductWrap>

            <PostWrap>
              <div className='post-inner'>
                <Title>
                  {!isMobile && <div className='title'>제목</div>}
                  <div className='title-contents'>{review.title}</div>
                </Title>

                {isMobile ? (
                  <Writer>
                    <div className='writer-contents'>
                      <span className='writer-text'>
                        {review.user.nickname}
                      </span>
                      <span className='writer-text'>
                        {review.date.substring(0, 10)}
                      </span>
                      <span className='writer-text'>조회 {review.views}</span>
                    </div>
                  </Writer>
                ) : (
                  <Writer>
                    <div className='writer'>작성자</div>
                    <div className='writer-contents'>
                      {review.user.nickname}
                    </div>
                  </Writer>
                )}
              </div>

              <Contents>
                <p
                  className='contents-text'
                  dangerouslySetInnerHTML={{
                    __html: review.description,
                  }}
                ></p>
              </Contents>
              <ButtonWrap>
                <Button onClick={() => history.goBack()}>목록</Button>

                {user && user !== null && user._id === review.user._id && (
                  <div className='button-right'>
                    <Link to={`/review/edit/${id}`}>
                      <Button>수정</Button>
                    </Link>
                    <Button
                      onClick={() => onRemove({ history, id })}
                      style={{ marginLeft: '.5rem' }}
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </ButtonWrap>
            </PostWrap>
          </Wrapper>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default withRouter(DetailReview);
