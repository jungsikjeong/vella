import React from 'react';
import { useMediaQuery } from 'react-responsive';

import AboutM from './sections/AboutM';
import AboutPC from './sections/AboutPC';

const About = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:800px)',
  });
  return <>{isMobile ? <AboutM /> : <AboutPC />}</>;
};

export default About;
