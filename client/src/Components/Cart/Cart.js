import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

//Components
import Footer from '../Footer/Footer';
import MobileCartPage from './sections/MobileCartPage';
import PcCartPage from './sections/PcCartPage';

const Cart = () => {
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {isMobile ? (
        <MobileCartPage user={user && user} />
      ) : (
        <PcCartPage user={user && user} />
      )}
      <Footer />
    </>
  );
};

export default Cart;
