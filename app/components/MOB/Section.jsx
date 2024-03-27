"use client";
import React from 'react';

import useOnscreen from '@H/useOnscreen';

// Make async component that toggles console methods
const h7 = Symbol.for('k');
const h8 = Symbol('k');
const h9 = Symbol('f');
const h10 = Symbol.keyFor(h8);

const VALID_SECTIONS = {
  'sec': 'h3',
  'subsec': 'h4', 
  'body': 'section',
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
  let [lastActiveIndex, setLastActiveindex] = React.useState(0);

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
    return (Section === 'section') ? null : id;
  }, [id, Section]);

  //let { onScreen, secRef } = refs.create();
  let [onScreen, secRef ] = useOnscreen();
  let catchRef = React.useRef(null);

  let generateRef = () => {
    if (Section !== 'section' && Object.keys(refs).length  < 5 /* secRef.current?.tagName === 'H5' */) {
      setRefs(erst => ({
        ...erst, 
        [refIndex]: {
          'onScreen': onScreen,
          'secRef': secRef,
        },
      }));
      setRefIndex(erst => erst + 1);
    }
    //console.log(refs);
  };

  React.useEffect(() => {
    // Can pass in prototype as an object to defineProps
    // E.g., String.prototype
    let NodesList = {}
    if (!NodesList.collection) {
      Object.defineProperties(NodesList, {
        collection: {
          value: document.querySelectorAll('[name$=":"]')
        },
        getList: {
          get: function() {
            return this.collection;
          }
        },
        setList: {
          set: function(collection) {
            this.collection = collection;
          }
        },
        smartObserve: {
          value: function(nodes) {
            nodes.forEach((node) => {
              node.setAttribute('class', 'curr-head');
            });
          },
          enumerable: true,
        },
      });
    }

    console.log(NodesList.smartObserve(NodesList.getList))
  });

React.useEffect(() => {
  function seekOnScreen(target) {
    !(!!(document.getElementsByClassName(target).length))
    let rank = (onScreen && secRef.current?.id) 
        ? 1
        : !!(!onScreen && secRef.current?.id) 
          ? 2 
          : 3;

    setLastActiveindex(Number(Overlord.isolateClass('right-margin', selectorToggle)));
    return rank;
  }

//  switch (seekOnScreen(selectorToggle)) {
//    case 1:
//      break;
//    case 2:
//      break;
//    default:
//      console.error(`Error, ref: ${secRef}`);
//  }
});

return (
  <Section
    id={idInserter()}
    ref={secRef}
    {...delegated}
  >
    {children}
  </Section>
)
});



/*
let Overlord = {
  getName(name) {
    this.element = document.getElementsByName(name)[0];
    return this;
  },

  getClass(className) {
    this.element = document.getElementsByClassName(className); 
    //console.log('when: ', this.element);
    return this.element;
  },

  isUnary(className) {
    this.element = document.getElementsByClassName(className);
    return this.element.length > 1;
  },

  setClass(className) {
    this.element?.setAttribute('class', className);
    //console.log(this.element)
    return this;
  },

  rmClass(className, target) {
    //this.element?.toggleAttribute('class');
    this.element?.removeAttribute('class', className);
    let nodeList = document.getElementsByClassName(target).item(0);
    let children = nodeList.children;
    children[lastActiveIndex - 1]?.setAttribute('class', className);
    return this;
  },

  isolateClass(className, target) {
    this.element = document.getElementsByClassName(className).item(0);
    this.activeElement = document.getElementsByClassName(target);
    let checkSequestered = this.activeElement.length > 1;
    let index = (this.activeElement.item(this.activeElement.length - 1)?.getAttribute('data-index'));

    if (checkSequestered) {
      for (let child of this.element.children) {
        if (child.getAttribute('data-index') === String(lastActiveIndex)) {
          //child.toggleAttribute('class');
          child.removeAttribute('class', className);
        }
      }
    }

    return index || 0;
  },
  resuscitate(target, className) {
    this.element = document.getElementsByClassName(target);
    if (lastActiveIndex === this.element.item(0).children.length - 1) {
     //return console.log('GO GO GO');
      console.log('RESUSCITATE!', (this.element.item(0).children[lastActiveIndex - 1]))
   }

    if (!!this.element.item(0).children[lastActiveIndex - 1]) {
      //console.log('RESUSCITATE!', (this.element.item(0).children[lastActiveIndex - 1]))
    }

    //console.log(this.element.item(0).children[lastActiveIndex]?.setAttribute('class', className));
  }

}
  // RM AND RESUSCITATE, DEAL WITH BACKWARDS INDEXING
let selectorToggle = 'curr-head';

React.useEffect(() => {
  function seekOnScreen(target) {
    !(!!(document.getElementsByClassName(target).length))
    let rank = (onScreen && secRef.current?.id) 
        ? 1
        : !!(!onScreen && secRef.current?.id) 
          ? 2 
          : 3;

    setLastActiveindex(Number(Overlord.isolateClass('right-margin', selectorToggle)));
    return rank;
  }

  switch (seekOnScreen(selectorToggle)) {
    case 1:
      // console.log('1', lastActiveIndex, onScreen);
      (1 < lastActiveIndex) 
        ? console.log('Broke')
        : Overlord.getName(secRef.current?.id).setClass(selectorToggle);
      break;
    case 2:
      // console.log('2', lastActiveIndex, onScreen);
      Overlord.getName(secRef.current?.id).rmClass(selectorToggle, 'right-margin');
      break;
    case 3:
      // console.log('3', lastActiveIndex, onScreen);
      Overlord.resuscitate('right-margin', selectorToggle);
      break;
    default:
      console.error(`Error, ref: ${secRef}`);
  }
});
*/
