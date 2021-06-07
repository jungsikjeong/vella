import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mainImage from '../../../assets/main-image/main-image.png';
import mainImage2 from '../../../assets/main-image/main-image2.jpg';
import mainImage3 from '../../../assets/main-image/main-image3.jpg';
import mainImage4 from '../../../assets/main-image/main-image4.jpg';
import mainImage5 from '../../../assets/main-image/main-image5.jpg';
import mainImage6 from '../../../assets/main-image/main-image6.jpg';
import mainImage7 from '../../../assets/main-image/main-image7.jpg';
import mainImage8 from '../../../assets/main-image/main-image8.jpg';
import mainImage9 from '../../../assets/main-image/main-image9.jpg';
import mainImage10 from '../../../assets/main-image/main-image10.jpg';

import Footer from '../../Footer/Footer';

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

const HomeM = () => {
  return (
    <>
      <Container>
        <MainImage>
          <img src={mainImage} alt=' ' />
        </MainImage>

        <ImageContainer>
          {/* New Items */}
          <SLink to='/product/all'>
            <img src={mainImage2} alt='' />
          </SLink>

          <img src={mainImage3} alt='' />

          <img src={mainImage4} alt='' />
          <img src={mainImage5} alt='' />

          {/* 원피스 카테고리로 이동 */}
          <SLink to='/product/dress'>
            <img src={mainImage6} alt='' />
          </SLink>

          <img src={mainImage7} alt='' />

          <img src={mainImage8} alt='' />
          <br />
          <img src={mainImage9} alt='' />

          <img src={mainImage10} alt='' />
        </ImageContainer>
      </Container>
      <Footer />
    </>
  );
};

export default HomeM;
