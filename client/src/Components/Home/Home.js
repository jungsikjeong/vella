import React from 'react';
import { useMediaQuery } from 'react-responsive';

import HomeM from './sections/HomeM';
import HomePC from './sections/HomePC';

const Home = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });
  return <>{isMobile ? <HomeM /> : <HomePC />}</>;
};

export default Home;
