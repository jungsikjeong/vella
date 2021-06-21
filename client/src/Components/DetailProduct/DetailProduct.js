import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import MobileDetailProduct from './sections/MobileDetail/MobileDetailProduct';
import PcDetailProduct from './sections/PcDetail/PcDetailProduct';

const DetailProduct = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.user }));
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });
  return (
    <>
      {isMobile ? (
        <MobileDetailProduct user={user} />
      ) : (
        <PcDetailProduct user={user} />
      )}
    </>
  );
};

export default DetailProduct;
