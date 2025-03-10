"use client";
import React from 'react';

import useAltOnscreen from '@H/useAltOnscreen';
import useDetectResize from '@H/useDetectResize';

const h7: symbol = Symbol.for('k');
// const h8: symbol = Symbol('k');
// const h9: symbol = Symbol('f');
// const h10: string | undefined = Symbol.keyFor(h8);

const VALID_SECTIONS: Object = {
  'sec': 'h3',
  'subsec': 'h4', 
  'body': 'section',
  [h7]: 'x',
};

interface ComponentProps {
  id?: string;
  ref: React.RefObject<HTMLElement> | any;
  children: React.ReactNode;
}

interface Props {
  children: React.ReactNode,
  as?: keyof React.JSX.IntrinsicElements |
   React.ComponentType<ComponentProps> | string,
  // string | PropertyKey 
}

export default React.memo(function Section({
  children,
  as: Section = 'sec',
  ...delegated
}: Props) {

  let [elementStack, setElementStack] = React.useState<Node[]>([]);

  let [onScreen, secRef] = useAltOnscreen();

  let [isListening, setIsListening] = React.useState(false);

  /** Check if valid type
   * @deprecated
   */
  if (!Object.keys(VALID_SECTIONS).includes(Section as string)) {
    throw new Error(`Unrecognized section: ${String(Section)}. Expected: ${VALID_SECTIONS}`);
  };
  

  let descriptor = Object.getOwnPropertyDescriptor(VALID_SECTIONS, Section as PropertyKey);
  if (descriptor) {
    Section = descriptor.value;
  } else {
    throw new Error(`Unrecognized section: ${String(Section)}. Expected one of the following: ${Object.keys(VALID_SECTIONS).join(', ')}`);
  }

  /**
   * Handles optional id delivery to component
   * @returns {string} header tags 5 or 6
   * @author Kx
   */
  let idInserter = React.useCallback((): string | null => {
    if (secRef.current && secRef.current.outerText) {
      return (Section === 'section') 
        ? null
        : secRef.current?.outerText.toLowerCase().split(/[\s\:]/).join('-');
    }
    return null;
  }, [Section, secRef]);

  let widthSym: symbol = Symbol.for('width');
  let bkpSym: symbol = Symbol.for('breakpointCrossed');

  let {
    [widthSym]: width,
    [bkpSym]: isBreak
  }: { [key in typeof widthSym | typeof bkpSym]: number | boolean } = useDetectResize();

  // Alternative destructuring
  // let [width, isMobile, breakpoint] = 
  //   [screen[Symbol.for('width')], 
  //   screen[Symbol.for('breakpointCrossed')], 
  //   screen.breakPoint];

  let isMobileLandscape = React.useMemo(() => !isBreak, [isBreak]);

  React.useEffect(() => {
    //let start = performance.now()
    // Can pass in prototype as an object to defineProps
    // E.g., String.prototype
    type htmlLC = {
      readonly collection?: HTMLCollection,
      getList?: HTMLCollection,
      setListener?: boolean,
      retrieve?: Function,
      smartObserve?: Function,
    }

    let elemCollection: htmlLC = {};
    /**
     * Click handler for toc elements to properly display new highlight
     * @param {object} event - Destructured element from event object
     * @author Kx
     */
    let handleClick = (event: Event) => {
      let { target } = event;
      let element = (target as HTMLElement).parentElement;
      if (!element) return;
      let index: string | null = element.getAttribute('data-index');
      function toggleOnClick() {
        if (elemCollection && elemCollection.getList) {
          let list: HTMLCollection = elemCollection.getList;
          for (let i = 0; i < list.length; i++) {
            let parsedElem: Element | null;
            let e: Element | null = list.item(i);
            if (index && e) {
              parsedElem = list.item(Number(index));
              e === parsedElem
                ? e.classList.add('curr-head')
                : e.classList.remove('curr-head');
            }
          }
        }
      } 
      setTimeout(toggleOnClick, 70);
      setIsListening(() => true);
      elemCollection.setListener = true;
    }
    if (!elemCollection.collection) {
      // Make Predicators
      let collection = document.getElementById('toc-list'); 
      if (!collection) return;
      Object.defineProperties(elemCollection, {
        // HTML Collection of ToC items
        collection: {
          value: collection.children,
          enumerable: true,
          configurable: false
        },
        /**
         * Getter
         * @function
         * @returns {NodeList | object} Returns collection prop
         * @author Kx
         */
        get getList(): PropertyDescriptor {
          return this.collection;
        },
        /**
         * Mutates collection
         * @deprecated - HTML Collections / NodeLists allow for inline mutation
         * @param {NodeList | object} nodes - A collection of nodes to mutate object
         * @author Kx
         */
        setList: {
          set: function(collection) {
            this.collection = collection;
          }
        },
        /**
         * Retrieves toc element linked with section ref
         * @function
         * @returns {Node | object} Toc node or null
         * @author Kx
         */
        retrieve: {
          value: function() {
            let returnedElement: Element | null = null;
            if (this.collection) {
              for (let i = 0; i < this.collection.length; i++) {
                let nameAttr = this.collection.item(i).getAttribute('data-name');
                if (secRef.current && nameAttr === `${secRef.current.id}-*`) {
                  return returnedElement = this.collection.item(i);
                }
              }
            }
            return returnedElement;
          },
          writable: false,
          enumerable: false,
          configurable: false,
        },
        /**
         * Handles dynamic class toggling across multiple observed sections
         * @function
         * @param {Node object} target - retrieved node used for collation
         * @author Kx
         */
        smartObserve: {
          value: function(target: Element) {
            Object.defineProperty(elemCollection, 'activeStack', {
              value: [],
              writable: true,
              enumerable: true,
            });

            // Executes only when observing element id exists
            if (/*onScreen && */secRef.current && secRef.current.id) {

              // Toggles highlight on all toc items
              for (let i = 0; i < this.collection.length; i++) {
                const e = this.collection.item(i);
                const targetClasses = target.getAttribute('class');

                if (e === target) {
                  // Transform classes to retain previous ones
                  const classes = e.getAttribute('class');
                  const newClasses = classes ? `${classes} curr-head` : 'curr-head';

                  e.setAttribute('class', newClasses);
                }
                // Toggle attribute on observer dismissal, ensures end e removal
                !onScreen && Number(target.getAttribute('data-index')) !== 0
                && target.getAttribute('data-name') 
                && target.setAttribute('class', targetClasses ? targetClasses.replace(/\s?curr-head/, '') : '');
                let attrContainsHeader: string | null | boolean = e.getAttribute('class');
                attrContainsHeader = attrContainsHeader ? (attrContainsHeader as string).includes('curr-head') : null;
                attrContainsHeader === true && this.activeStack.push(e); 
              }

              // Detoggles previous node's classes
              for (let i = 0; i < this.collection.length; i++) {
                let node = this.collection.item(i);
                // Transform classes to retain previous ones
                const classes = node.getAttribute('class');
                const newClasses = classes ? classes.replace(/\s?curr-head/, '') : '';

                if (this.activeStack.length > 1) {
                  let attrContainsHeader: string | null | boolean = node.getAttribute('class');
                  attrContainsHeader = attrContainsHeader ? (attrContainsHeader as string).includes('curr-head') : null;
                  this.activeStack.length != 1 
                  && attrContainsHeader === true
                  && this.activeStack.pop() 
                  && node.setAttribute('class', newClasses);
                }

                // Highlights previous node when escaping last node
                let targetElem = elemCollection.getList;

                const dataId = `${secRef.current.id}-*`;
                const dataName = node.getAttribute('data-name');
                const dataIndex = node.getAttribute('data-index');

                let index = this.activeStack.length === 0 
                && dataId == dataName 
                && dataIndex;

                if (targetElem && targetElem[index - 1]) {
                  let targetElemClasses: string | null | undefined = targetElem[index - 1].getAttribute('class');

                  targetElemClasses = targetElemClasses ? `${targetElemClasses} curr-head` : 'curr-head';
                  targetElem[index - 1].setAttribute('class', targetElemClasses);
                }

              }
            }
          },
          enumerable: true,
        },
        setListener: {
          set: function(boolean) {
            this.listener = boolean;
          }
        },
        getListener: {
          get: function() {
            return this.listener;
          }
        },
      });
      let list;
      if (elemCollection.getList) {
        list = elemCollection.getList;
      }
      list && (() => {
        for (let i = 0; i < list.length; i++) {
          let parsedElem: Element | null = list.item(i);
          if (!isListening && parsedElem?.firstElementChild) {
            parsedElem.addEventListener('click', handleClick, { once: true }); 
          }
        }})();
    }
    let [elements, targetElem]: [HTMLCollection | undefined, Element | undefined] = [undefined, undefined];
    if (elemCollection.retrieve !== undefined) {
      targetElem = elemCollection.retrieve();
    }

    if (elemCollection && elemCollection.getList && elemCollection.smartObserve) {
      elements = elemCollection.getList;
      elemCollection.smartObserve(targetElem); 
    }

    //let end = performance.now();
    //console.log(`${end - start}`);
    return () => {
      if (isListening && elements) {
        for (let i = 0; i < elements.length; i++) {
          let element = elements.item(i);
          if (element) {
            element.removeEventListener('click', handleClick);
          }
        }
        //console.log('Event dismissed');
        setIsListening(() => false);
      }
      //console.log('Render discarded.');
    }
  }, [isListening, onScreen, isMobileLandscape, secRef]);

  React.useEffect(() => {
    let getElements = new Promise<HTMLCollection>((resolve,) => {
      let intervalId = setInterval(() => {
        let [targetElem, children]: [HTMLElement | null, HTMLCollection | undefined] = [document.getElementById('toc-list'), undefined];
        if (targetElem) {
          children = targetElem.children;
        }
        if (children && children.length > 0) {
          clearInterval(intervalId);
          resolve(children);
        }
      }, 100);
    });

    getElements.then((elements) => {
      let child = elements.item(0);
      child && child.setAttribute('class', 'curr-head');
    }).catch((e) => {
      console.error(e);
    }).finally(() => {
    });
  }, []);

  React.useEffect(() => {
    let getElements = new Promise<NodeList>((resolve,) => {
      let elements = document.querySelectorAll('h3, h4');
      if (elements.length > 0) {
        resolve(elements) 
      }
    });

    getElements.then((elements) => {
      elements.forEach((element, i, list) => {
        if (elementStack && elementStack.length !== list.length) {
          setElementStack(prev => [...prev, element]);
          //console.log(list.length, elementStack.length);
        }
      });
    });

    return () => {
      let elementsLength = document.querySelectorAll('h3, h4').length;
      if (elementStack.length > elementsLength) {
        setElementStack(prev => prev.splice(elementsLength, prev.length - 1));
      }
    };
  }, [elementStack]);

  React.useEffect(() => {
    let nodes = document.querySelectorAll('[data-index]');
    isMobileLandscape && 
      +(() => {
      nodes.forEach((node, i, list) => {
        let classes: string | null | boolean = node.getAttribute('class');
        classes = classes ? classes.includes('curr-head') : null;
        classes !== null
        && classes === true 
        && (i === list.length - 1) 
        && list[0].setAttribute('class', `${node.getAttribute('class')} curr-head`);
      });
    })();
  }, [isMobileLandscape]);

  let id = idInserter();

  return (
    <Section
      // Object spreading as key value pairs is exclusive to React
      {...(id && { id })}
      ref={secRef}
      {...delegated}
    >
      {children}
    </Section>
  );
});
