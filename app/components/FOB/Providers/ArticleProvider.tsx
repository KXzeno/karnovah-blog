'use client';
import React from 'react';

import Nav from '@M/Nav';
import Footer from '@M/Footer';
import { Warning } from '@M/Icons';
import ToC from '@M/ToC';

// TODO: Refactor to TSX
export const ArticleContext = React.createContext(null);

type FCParams = {
  children: React.ReactNode,
}

export default function ArticleProvider({ 
  children, 
  ...delegated
}: FCParams) {

  return (
    <>
      <Nav />
      <ArticleContext.Provider 
        value={{
          // Header, SubHeader, AddHeader, HeaderNote, PrimaryContent, RightMargin
        }}
      >
        <main className="body-layout">
          <article className="post">
            {children}
          </article>
          <div className="right-margin">
            <ToC />
          </div>
        </main>
      </ArticleContext.Provider>
      <Footer />
    </>
  );
}

export function Header({ children }) {
  return <h1 id="header">{children}</h1>
}

export function RightMargin({ children }) {
  return (
    <div className="right-margin">
      {children}
    </div>
  );
}

export function SubHeader({ children, AddHeader }) {
  return (
    <hgroup className="sub-heading">
      <div>
        <h2>{children}</h2>
      </div>
      {AddHeader}
    </hgroup>
  );
}

export function AddHeader({ children, HeaderNote }) {
  return (
    <aside className="add-header">
      <p>{children}</p>
      {HeaderNote}
    </aside>
  );
}

export function HeaderNote({ children }) {
  return (
    <div className="header-note">
      {children}
    </div>
  );
}

export function PrimaryContent({ children }) {
  return (
    <div>
      <section className="primary-content">
        <div>
            {children}
        </div>
      </section>
    </div>
  );
}
