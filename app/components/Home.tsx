import React from 'react';
import Nav from '@M/Nav';
import Footer from '@M/Footer';
import Landing from '@M/Landing';

interface HomeProps {
  children: React.ReactNode;
}

export default function Home(
): React.ReactElement {

  return (
    <React.Fragment>
      <Landing />
    </React.Fragment>
  );
}
