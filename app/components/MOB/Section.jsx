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

    /**
     * Click handler for toc elements to properly display new highlight
     * @param {object} target - Destructured element from event object
     * @author Kx
     */
    let handleClick = ({ target: { parentElement: element } }) => {
      let index = element.getAttribute('data-index');
      NodesList.getList.forEach((e) => {
        e === NodesList.getList[index] 
          ? e.setAttribute('class', 'curr-head')
          : e.toggleAttribute('class');
      });
    };

    if (!NodesList.collection) {
      Object.defineProperties(NodesList, {
        // HTML Collection of ToC items
        collection: {
          value: document.querySelectorAll('[name$=":"]')
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
              if (node.getAttribute('name') === secRef.current.id) {
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

            if (/*onScreen && */secRef.current.id) {
              this.collection.forEach((node) => {
                node.firstElementChild.addEventListener('click', handleClick);
                node === target && node.setAttribute('class', 'curr-head');
                !onScreen && target?.getAttribute('name') && target.toggleAttribute('class');
                node.getAttribute('class') && this.activeStack.push(node); 
              });

              for (let val of this.collection.values()) {

                if (this.activeStack.length > 1) {
                  this.activeStack.length != 1 
                    && val.getAttribute('class')
                    && this.activeStack.pop() 
                    && val.toggleAttribute('class');
                }

                let index = this.activeStack.length === 0
                  && secRef.current.id === val.getAttribute('name')
                  && val.getAttribute('data-index');
                index && NodesList.getList[index - 1]?.setAttribute('class', 'curr-head');

              }
            }
          },
          enumerable: true,
        },
      });
    }
    let [nodes, targetNode] = [NodesList.getList, NodesList.retrieve()];
    NodesList.smartObserve(targetNode);
    return () => nodes.forEach((node) => {
      node.removeEventListener('click', handleClick);
    });

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
