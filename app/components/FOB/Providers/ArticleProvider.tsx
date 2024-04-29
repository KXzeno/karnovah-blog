'use client';
import React from 'react';

import Nav from '@M/Nav';
import Footer from '@M/Footer';
import { Warning } from '@M/Icons';
import ToC from '@M/ToC';

// TODO: Refactor to TSX
export const ArticleContext = React.createContext({});

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

export function Header({ children }: { children: React.ReactNode }) {
  return <h1 id="header">{children}</h1>
}

export function RightMargin({ children }: {children: React.ReactNode }) {
  return (
    <div className="right-margin">
      {children}
    </div>
  );
}

// AddHeader passes compiler checks if typed 'React.ReactPortal' --> explore
export function SubHeader({ children, AddHeader }: {children: React.ReactNode, AddHeader: React.ReactNode }) {
  return (
    <hgroup className="sub-heading">
      <div>
        <h2>{children}</h2>
      </div>
      {AddHeader}
    </hgroup>
  );
}

export function AddHeader({ children, HeaderNote }: {children: React.ReactNode, HeaderNote: React.ReactNode }) {
  return (
    <aside className="add-header">
      <p>{children}</p>
      {HeaderNote}
    </aside>
  );
}

export function HeaderNote({ children }: {children: React.ReactNode }) {
  return (
    <div className="header-note">
      {children}
    </div>
  );
}

export function PrimaryContent({ children }: {children: React.ReactNode }) {
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
