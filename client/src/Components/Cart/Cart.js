import React from 'react';
import { useMediaQuery } from 'react-responsive';

//Components
import Footer from '../Footer/Footer';
import MobileCartPage from './sections/MobileCartPage';
import PcCartPage from './sections/PcCartPage';

const Cart = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {isMobile ? <MobileCartPage /> : <PcCartPage />}
      <Footer />
    </>
  );
};

export default Cart;
