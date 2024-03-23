"use client";
import React from 'react';

export default function TableOfContents() {
  let [tocList, setTocList] = React.useState({});
  let [elemNodes, setElemNodes] = React.useState({});
  let [isProxy, setIsProxy] = React.useState(false);

  /**
   * Callback hook which destructures DOM nodes
   * @param {string} id - Identifiers to link mapped data
   * @param {string} outerText - innerHTML of extracted elements
   * @returns {Object} Parochial object used for hook setter functions
   * @author Kx
   */
  let newTocList = React.useCallback(({ id, outerText } = prop) => {
    let tempObj = {};

    // Could also work with Object.assign()
    Object.defineProperties(tempObj, {
      [id]: { 
        value: outerText,
        writable: false,
        enumerable: true,
        configurable: false,
      },
    });

    return tempObj;
  });

  React.useEffect(() => {
    let elemNodesProxy = document.querySelectorAll("h4, h5");

    elemNodesProxy.forEach(({ id }) => {
      if (!!Object.values(elemNodes).find(({ id: linkId }) => linkId === id) === false) {
        console.error('Proxy Dismissed.')
      } else {
        setIsProxy(true);
        console.log('Proxy in Sync.');
      }
    });

    if (isProxy === false) {
      setElemNodes(erst => ({ ...erst, ...elemNodesProxy }));

      let elems = elemNodesProxy.values();

      for (const value of elems) {
        let altered = newTocList(value);
        // console.log("Altered:", altered)
        setTocList(erst => ({ ...erst, ...altered }));
        // console.log("tocList:", tocList);
      }

    }

    return () => {
      elemNodesProxy = null;
      console.log('Cleanup Successful');
    };

  }, [tocList]);

  let arr = [];
  +function showData(obj) {
    for (let entry of Object.entries(obj)) {
      arr.push(entry);
    }
  }(tocList);

  return (
    <>
      {
        arr.map((prop) => {
          return (
            <span>
              <a href={`#${prop[1]}-${prop[0]}`}>
                {`${prop[1]}`}
              </a>
            </span>
          );
        })
      }
    </>
  );
}

