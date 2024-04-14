"use client";
import React from 'react';

import useOnscreen from '@H/useOnscreen';
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

interface Props {
  children: React.ReactNode,
  as: PropertyKey | string,
}

export default React.memo(function Section({
  children,
  as: Section = 'sec',
  ...delegated
}: Props) {

  let id = React.useId();
  let [elementStack, setElementStack] = React.useState([]);

  let [isListening, setIsListening] = React.useState(false);
  if (!Object.keys(VALID_SECTIONS).includes(Section as string)) {
    throw new Error(`Unrecognized section: ${String(Section)}. Expected: ${VALID_SECTIONS}`);
  };

  let descriptor = Object.getOwnPropertyDescriptor(VALID_SECTIONS, Section);
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
  let idInserter = React.useCallback(() => {
    return (Section === 'section') 
      ? null
      : secRef.current?.outerText.toLowerCase().split(' ').join('-');
  }, [id, Section]);

  let [onScreen, secRef] = useOnscreen();

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
    let NodesList = {}

    interface ClickEvent {
        target: {
            parentElement: HTMLElement,
        },
    }

    /**
     * Click handler for toc elements to properly display new highlight
     * @param {object} target - Destructured element from event object
     * @author Kx
     */
    let handleClick = ({ target: { parentElement: element } }: ClickEvent) => {
      let index = element.getAttribute('data-index');
      function toggleOnClick() {
        NodesList.getList.forEach((e) => {
          e === NodesList.getList[index] 
            ? e.setAttribute('class', 'curr-head')
            : e.removeAttribute('class', 'curr-head');
        });
      }
      setTimeout(toggleOnClick, 70);
      setIsListening(() => true);
      NodesList.setListener = true;
    }

    if (!NodesList.collection) {
      Object.defineProperties(NodesList, {
        // HTML Collection of ToC items
        collection: {
          value: document.querySelectorAll('[name$="-*"]')
        },
        /**
         * Getter
         * @function
         * @returns {NodeList | object} Returns collection prop
         * @author Kx
         */
        getList: {
          get: function() {
            return this.collection;
          },
          enumerable: true,
          configurable: false,
        },
        /**
         * Mutates collection
         * @deprecated - HTML Collections / NodeLists allow for inline mutation
         * @param {NodeList | object} nodes - A collection of nodes to mutate object
         * @author Kx
         */
        setList: {
          set: function(nodes) {
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
            let returnedNode;
            this.collection.forEach((node) => {
              if (node.getAttribute('name') === `${secRef.current.id}-*`) {
                return returnedNode = node;
              }
            });
            return returnedNode || null;
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
          value: function(target) {
            Object.defineProperty(NodesList, 'activeStack', {
              value: [],
              writable: true,
              enumerable: true,
            });

            // Executes only when observing element id exists
            if (/*onScreen && */secRef.current.id) {

              // Toggles highlight on all toc items
              this.collection.forEach((node) => {
                node === target && node.setAttribute('class', 'curr-head');
                // Toggle attribute on observer dismissal, ensures end node removal
                !onScreen && Number(target.getAttribute('data-index')) !== 0
                  && target.getAttribute('name') && target.toggleAttribute('class');
                node.getAttribute('class') && this.activeStack.push(node); 
              });

              // Detoggles previous node's classes
              for (let val of this.collection.values()) {
                if (this.activeStack.length > 1) {
                  this.activeStack.length != 1 
                    && val.getAttribute('class')
                    && this.activeStack.pop() 
                    && val.removeAttribute('class', 'curr-head');
                }

                // Highlights previous node when escaping last node
                let index = this.activeStack.length === 0
                  && `${secRef.current.id}-*` === val.getAttribute('name')
                  && val.getAttribute('data-index');
                index && NodesList.getList[index - 1]?.setAttribute('class', 'curr-head');
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
          get: function(boolean) {
            return this.listener;
          }
        },
      });
      NodesList.getList.forEach((node) => {
        !isListening && node.firstElementChild.addEventListener('click', handleClick, { once: true }); 
      });
    }

    let [nodes, targetNode] = [NodesList.getList, NodesList.retrieve()];
    NodesList.smartObserve(targetNode);
    //let end = performance.now();
    //console.log(`${end - start}`);
    return () => {
      if (isListening) {
        nodes.forEach((node) => {
          node.removeEventListener('click', handleClick);
        });
        //console.log('Event dismissed');
        setIsListening(() => false);
      }
      //console.log('Render discarded.');
    }
  }, [isListening, onScreen, isMobileLandscape]);

  React.useEffect(() => {
    let getNodes = new Promise((resolve, reject) => {
      let intervalId = setInterval(() => {
        let nodes = document.querySelectorAll('[data-index]');
        if (nodes.length > 0) {
          clearInterval(intervalId);
          resolve(nodes);
        }
      }, 100);
    });

    getNodes.then((nodes) => {
      document.querySelectorAll('[data-index]').forEach((child, i) => {
        i === 0 && child.setAttribute('class', 'curr-head');
      });
    }).catch((e) => {
      console.error(e);
    }).finally(() => {
    });
  }, []);

  React.useEffect(() => {
    let getElements = new Promise((resolve, reject) => {
      let elements = document.querySelectorAll('h3, h4');
      if (elements.length > 0) {
        resolve(elements) 
      }
    });

    getElements.then((elements) => {
      elements.forEach((element, i, list) => {
        if (elementStack.length !== list.length) {
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
  }, []);

  React.useEffect(() => {
    let nodes = document.querySelectorAll('[data-index]');
    isMobileLandscape && 
      +(() => {
        nodes.forEach((node, i, list) => {
          (node.getAttribute('class') === 'curr-head') 
            && (i === list.length - 1) 
            && list[0].setAttribute('class', 'curr-head');
        });
      })();

      let obj: any = {
        myMethod: function() {
          console.log('Hello Doodge!');
        }
      }

      obj.myMethod();

      function standaloneFunction() {
        console.log('Standalone function');
      }

      standaloneFunction();
/**
 * This is a description of the function.
 *
 * @param {number} x - The first number to add.
 * @param {number} y - The second number to add.
 * @returns {number} The sum of `x` and `y`.
 *
 * @example
 * // returns 3
 * add(1, 2);
 */
function add(x, y) {
  return x + y;
}


  }, [isMobileLandscape]);

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