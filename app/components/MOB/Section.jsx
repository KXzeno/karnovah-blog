"use client";
import React from 'react';

const h7 = Symbol.for('k');
const h8 = Symbol('k');
const h9 = Symbol('f');
const h10 = Symbol.keyFor(h8);

const VALID_SECTIONS = {
  'sec': 'h4',
  'subsec': 'h5', 
  'body': 'h6',
  [h7]: 'x',
};

VALID_SECTIONS[h8] = 'z';

export default function Section({
  children,
  as: Section = 'sec',
  ...delegated
}) {
  let id = React.useId();

  if (!Object.keys(VALID_SECTIONS).includes(Section)) {
    throw new Error(`Unrecognized section: ${Section}. Expected: ${VALID_SECTIONS}`);
  };

  Section = Object.getOwnPropertyDescriptor(VALID_SECTIONS, Section).value;

  /**
   * Handles optional id delivery to component
   * @returns {string} header tags 5 or 6
   * @author Kx
   */
  let idInserter = React.useCallback(() => {
    if (Section === 'h6') {
      return;
    }

    return id;
  });

  return (
    <Section
      id={idInserter()}
      {...delegated}
    >
      {children}
    </Section>
  );
}

