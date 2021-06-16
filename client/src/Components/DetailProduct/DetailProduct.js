import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileDetailProduct from './sections/MobileDetail/MobileDetailProduct';
import PcDetailProduct from './sections/PcDetail/PcDetailProduct';

const DetailProduct = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });
  return <>{isMobile ? <MobileDetailProduct /> : <PcDetailProduct />}</>;
};

export default DetailProduct;
