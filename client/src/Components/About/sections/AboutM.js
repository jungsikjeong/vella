import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import image11 from '../../../assets/about-image/11.jpg';
import Footer from '../../Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Section = styled.section`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  position: relative;
  font-family: 'Quicksand', sans-serif;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  img {
    width: 100%;
    max-width: 100%;
  }

  /* 마법의 코드 */
  background-attachment: fixed;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AboutBox = styled.div`
  color: #fff;
  overflow: hidden;
  height: 100%;
  position: absolute;
  top: -20%;
  left: 35%;
  text-align: left;
  font-weight: bold;
  font-family: 'Gaegu', cursive;

  .about-title {
    margin-bottom: 1rem;
    font-size: 3.5rem;
  }

  .about-desc {
    padding: 1.3rem;
    margin-top: 2rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const AboutM = () => {
  const oneRef = useRef();
  const contentsRefs = useRef([]);
  contentsRefs.current = [];

  useEffect(() => {
    gsap.from(oneRef.current, {
      autoAlpha: 0,
      ease: 'none',
      delay: 1,
    });

    contentsRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
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
  }, []);

  // about-contents들 집어넣음
  const contentsAddToRefs = (el) => {
    if (el && !contentsRefs.current.includes(el)) {
      contentsRefs.current.push(el);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Section bgUrl={image11}>
          {/* <img src={image11} alt='' /> */}
          <AboutBox style={{ paddingTop: '15rem' }} ref={oneRef}>
            <p className='about-title'>For Your Conscious Closet.</p>

            <p className='about-desc'>Sustainable Supply, Selling Ethically.</p>
          </AboutBox>
        </Section>

        <Section bgUrl={image11}>
          <AboutBox style={{ paddingTop: '10rem' }} ref={contentsAddToRefs}>
            <p className='about-title'>About Us</p>

            <p className='about-desc'>
              Vella는 지속 가능한 패션을 중점으로 생각하며 쾌적한 옷을
              수입해옵니다.
            </p>
          </AboutBox>
        </Section>

        <Section bgUrl={image11}>
          <AboutBox style={{ paddingTop: '10rem' }} ref={contentsAddToRefs}>
            <p className='about-title'>For Conscious Women</p>

            <p className='about-desc'>
              Vella는 전반적으로 가심비(가격 대비 성능 + 심리적 만족도)를
              높여드립니다.
            </p>
          </AboutBox>
        </Section>

        <Section bgUrl={image11}>
          <AboutBox style={{ paddingTop: '10rem' }} ref={contentsAddToRefs}>
            <p className='about-title'>Loved Clothes Last</p>

            <p className='about-desc'>
              ‘가장 지속 가능한 옷은 이미 내가 가지고 있는 옷입니다’
              <br />
              <br />
              옷을 사랑하고 지속가능패션을 실천하는 분들을 응원합니다.
              <br />
              수선이 필요한 분들께 맞춤 리페어 옵션을 제공합니다.
            </p>
          </AboutBox>
        </Section>
        <Footer />
      </Wrapper>
    </Container>
  );
};

export default AboutM;
