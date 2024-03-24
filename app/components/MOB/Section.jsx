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

export const SectionContext = React.createContext();

export default React.memo(React.forwardRef(function Section({
  children,
  as: Section = 'sec',
  ...delegated
}, ref) {

  let id = React.useId();
  let [refIndex, setRefIndex] = React.useState(0);
  let [refs, setRefs] = React.useState({
    /** @function
  @generator
     * @returns {} cloned observer hooks
     */
    create() {
      let [onScreen, secRef] = useOnscreen();
      return { onScreen, secRef };
    },
  });

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
    return (Section === 'h5') ? null : id;
  }, [id]);

  let { onScreen, secRef } = refs.create();
  let catchRef = React.useRef(null);

  let generateRef = () => {
    if (Section !== 'h5' && Object.keys(refs).length  < 5 /* secRef.current?.tagName === 'H5' */) {
      setRefs(erst => ({
        ...erst, 
        [refIndex]: {
          'onScreen': onScreen,
          'secRef': secRef,
        },
      }));
      setRefIndex(erst => erst + 1);
    }
    console.log(refs);
  };

  let refCreate = React.useCallback(() => {
    // setRefIndex(prev => prev + 1);
    // console.log(refs);
    // return setRefs(erst => ({
    //   ...erst, 
    //   [refIndex]: {
    //     'onScreen': onScreen,
    //     'secRef': secRef,
    //   },
    // }));
    console.log(secRef.current);
  });

  if (onScreen && secRef.current.id) {
    console.log(secRef.current.id) 
  }

  // TODO: Use ToC dynamic styling which intercepts other ToC items when in same view
  return (
    <SectionContext.Provider
      value={{ refs, setRefs }}
    >
      <Section
        id={idInserter()}
        //ref={() => refInserter()}
        onLoad={() => console.log(generateRef)}
        ref={secRef}
        //ref={() => generateRef() ?? catchRef}
        //ref={refs[refIndex]?.secRef ?? secRef}
        className={onScreen && secRef.current.id && ''}
        {...delegated}
      >
        {children}
      </Section>
    </SectionContext.Provider>
  );
}));

