import React from 'react';
import Nav from '@M/Nav';
import Footer from '@M/Footer';
import Feed from '@F/Feed';

interface HomeProps {
  children: React.ReactNode;
}

export default function Home(
): React.ReactElement {

  return (
    <React.Fragment>
      <Nav />
      <Feed />
      <Footer />
    </React.Fragment>
  );
}
