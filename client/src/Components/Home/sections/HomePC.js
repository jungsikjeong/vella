import React from 'react';
import styled from 'styled-components';

import Footer from '../../Footer/Footer';

const Container = styled.div`
  /* 임시 */
  /* padding-top: 10rem; */
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 15px;
`;

const MainImage = styled.div`
  width: 100%;
  /* height: 100vh; */

  img {
    width: 100%;
    height: 100%;
  }
`;

const HomePC = () => {
  return (
    <>
      <Container>
        <MainImage>
          <img
            src='https://nueahmik.com/web/upload/pc_web/main_index/2021landing-v2.jpg'
            alt=' '
          />
        </MainImage>
      </Container>
      <Footer />
    </>
  );
};

export default HomePC;
