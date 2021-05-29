import React from 'react';
import { useMediaQuery } from 'react-responsive';

import HeaderM from './sections/HeaderM';
import HeaderPC from './sections/HeaderPC';

const Header = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });

  return <>{isMobile ? <HeaderM /> : <HeaderPC />}</>;
};

export default Header;
