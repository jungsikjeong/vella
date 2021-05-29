import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../Footer/Footer';

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 15px;
`;

const MainImage = styled.div`
  img {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efeeec;
  padding: 0 1rem;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
  }

  img:nth-child(1),
  img:nth-child(7) {
    width: 80%;
    margin: 2rem 0;
  }
  img:nth-child(2),
  img:nth-child(7),
  img:nth-child(8) {
    width: 80%;
  }
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const Home = () => {
  return (
    <>
      <Container>
        <MainImage>
          <img
            src='https://cdn.imweb.me/thumbnail/20201020/ca50972584bae.png'
            alt=' '
          />
        </MainImage>

        <ImageContainer>
          {/* New Items */}
          <SLink to='#'>
            <img
              src='https://m.nueahmik.com/web/upload/main_page/2021ss/M1.jpg'
              alt=''
            />
          </SLink>

          <img
            src='https://m.nueahmik.com/web/upload/main_page/2021ss/M2.jpg'
            alt=''
          />

          <img
            src='https://m.nueahmik.com/web/upload/main_page/2021ss/M3.jpg'
            alt=''
          />
          <img
            src='https://m.nueahmik.com/web/upload/main_page/2021ss/3.jpg'
            alt=''
          />

          {/* 원피스 카테고리로 이동 */}
          <SLink to='#'>
            <img
              src='https://m.nueahmik.com/web/upload/main_page/2021ss/4.jpg'
              alt=''
            />
          </SLink>

          <img
            src='	https://m.nueahmik.com/web/upload/main_page/2021ss/M4.jpg'
            alt=''
          />

          <img
            src='https://m.nueahmik.com/web/upload/main_page/2021ss/6.jpg'
            alt=''
          />
          <br />
          <img
            src='https://m.nueahmik.com/web/upload/main_page/2021ss/7.jpg'
            alt=''
          />

          <img
            src='	https://m.nueahmik.com/web/upload/main_page/2021ss/9.jpg'
            alt=''
          />
        </ImageContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
