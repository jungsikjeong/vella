import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Loading from '../Common/Loading';

//Components
import Footer from '../Footer/Footer';
import MobileCartPage from './sections/MobileCartPage';
import PcCartPage from './sections/PcCartPage';

const Cart = () => {
  const { user, isAuthenticated, loading } = useSelector(({ auth }) => ({
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
  }));

  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isMobile ? (
            <MobileCartPage
              user={user && user}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <PcCartPage user={user && user} isAuthenticated={isAuthenticated} />
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Cart;
