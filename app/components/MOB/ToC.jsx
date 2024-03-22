"use client";
import React from 'react';

export default function TableOfContents() {
  let [tocList, setTocList] = React.useState({});
  let [elemNodes, setElemNodes] = React.useState(document.querySelectorAll("h4, h5"));
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

  let elemNodesProxy = React.useMemo(() => {
    return Object.values(document.querySelectorAll("h4, h5"));
  }, [elemNodes]);

//  let populateList = React.useCallback(() => {
//
//  });

  React.useEffect(() => {
    /* Object vs NodeList Object --> !=
     *console.log(Object.getOwnPropertyNames(elemNodesProxy) === Object.getOwnPropertyNames(elemNodes))
     */
    //TODO: Use array state and push in key/vals and compare those too.
    // Abort on second render if state === tocList props
    elemNodesProxy.forEach(({ id }) => {
      if (Object.values(elemNodes).find(({ id: linkId }) => linkId === id) === undefined) {
        setIsProxy(false);
        return;
      }
      setIsProxy(true);
      console.log('Proxy Nodes in Sync.');
    });

    setElemNodes(erst => ({ ...erst, ...elemNodesProxy }));
    let elems = elemNodesProxy.values();
    for (const value of elems) {
      let altered = newTocList(value);
      console.log("Altered:", altered)
      setTocList(erst => ({ ...erst, ...altered }));
      console.log("tocList:", tocList);
    }

  }, []);

  return (
    <>
    </>
  )
}
