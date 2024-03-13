import React from 'react';
import Nav from '@M/Nav';
import Footer from '@M/Footer';
import Feed from '@F/Feed';

export default function Home() {

  return (
    <React.Fragment>
      <Nav />
      <Feed />
      <Footer />
    </React.Fragment>
  );
}
