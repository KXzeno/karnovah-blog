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

export default React.memo(function Section({
  children,
  as: Section = 'sec',
  ...delegated
}) {

  let id = React.useId();
  let [refIndex, setRefIndex] = React.useState(0);
  let [refs, setRefs] = React.useState({
    /** @function
  @generator
     * @returns {} cloned observer hooks
     */
    create() {
      return {};
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
  }, [id, Section]);

  //let { onScreen, secRef } = refs.create();
  let [onScreen, secRef ] = useOnscreen();
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

let Overlord = {
  getName(name) {
    this.element = document.getElementsByName(name)[0];
    return this;
  },

  getClass(className) {
    this.element = document.getElementsByClassName(className); 
    return this.element;
  },

  isUnary(className) {
    this.element = document.getElementsByClassName(className);
    return this.element.length > 1;
  },

  setClass(className) {
    this.element?.setAttribute('class', className);
    return this;
  },

  rmClass(className) {
    this.element?.removeAttribute('class', className);
    return this;
  },
  // TODO: Fix no attr when fast scroll up
  // Assign classes to the H4 anchors
  // Use ref instead of document
  isolateClass(ref, className) {
    this.element = document.getElementsByClassName(className);

    let elem = ref.current;
    console.log('test: ', ref.current?.id);
    let length = this.element.length;

    if (length > 1) {
      for (let i = 0; i < length - 1 ; i++) {
        // let [curr, interceptor] = [Number(this.element.item(i).getAttribute('name').at(2)), 0];
        let [curr, interceptor] = [Number(this.element.item(i).getAttribute('name').at(2)), 0];
        console.log(curr, this.element.item(i)?.getAttribute('class'), this.element.item(i+1)?.getAttribute('class'));
        (this.element.item(i).getAttribute('class') 
          === undefined)
          ? (() => {
            this.element.item(i + 1)?.removeAttribute('class', className);
        })()
          : (() => {
            this.element.item(i)?.removeAttribute('class', className);;
          })();
      }
    }
  }
}

let selectorToggle = 'curr-head';

function seekOnScreen(target) {
  let rank = (onScreen && secRef.current?.id) 
    ? 1
    : !!(onScreen === false && !!secRef.current?.id === true) 
      ? 2 
      : 3;

  return rank;
}

switch (seekOnScreen(secRef, selectorToggle)) {
  case 1:
    Overlord.getName(secRef.current?.id).setClass(selectorToggle);
    break;
  case 2:
    Overlord.getName(secRef.current?.id).rmClass(selectorToggle);
    break;
  case 3:
    Overlord.isolateClass(secRef, selectorToggle);
    break;
  default:
    console.error(`Error, ref: ${secRef}`);
}

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
});

