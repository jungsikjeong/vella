import React from 'react';
import { useMediaQuery } from 'react-responsive';

import FooterM from './section/FooterM';
import FooterPc from './section/FooterPc';

const Footer = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return <>{isMobile ? <FooterM /> : <FooterPc />}</>;
};

export default Footer;
