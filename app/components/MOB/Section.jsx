"use client";
import React from 'react';

import useOnscreen from '@H/useOnscreen';

const h7 = Symbol.for('k');
const h8 = Symbol('k');
const h9 = Symbol('f');
const h10 = Symbol.keyFor(h8);

const VALID_SECTIONS = {
  'sec': 'h3',
  'subsec': 'h4', 
  'body': 'h5',
  [h7]: 'x',
};

VALID_SECTIONS[h8] = 'z';

export default React.memo(React.forwardRef(function Section({
  children,
  as: Section = 'sec',
  ...delegated
}, ref) {

  let [isCurrent, secRef] = useOnscreen();
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
    if (Section === 'h5') {
      return;
    }

    return id;
  });
  // TODO: Use ToC dynamic styling which intercepts other ToC items when in same view
  return (
    <Section
      id={idInserter()}
      ref={secRef}
      {...delegated}
    >
      {children}
    </Section>
  );
}));

