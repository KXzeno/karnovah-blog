"use client";
import React from 'react';

export default function TableOfContents() {
  let [tocList, setTocList] = React.useState({});
  let [elemNodes, setElemNodes] = React.useState({});
  let [isProxy, setIsProxy] = React.useState(false);

  /** @function
   * Callback hook which destructures DOM nodes
   * @generator
   * @param {string} id - Identifiers to link mapped data
   * @param {string} outerText - innerHTML of extracted elements
   * @fires tocList#set
   * @returns {Object} Parochial object used for hook setter functions
   * @author Kx
   */
  let newTocList = ({ id, outerText } = prop) => {
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
  };

  React.useEffect(() => {
    let elemNodesProxy = document.querySelectorAll("h3, h4");
    elemNodesProxy.forEach(({ id }) => {
      if (!!Object.values(elemNodes).find(({ id: linkId }) => linkId === id) === false) {
        console.error('Proxy Dismissed.')
      } else {
        setIsProxy(true);
        //console.log(elemNodesProxy);
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

  }, [tocList, elemNodes, isProxy]);

  let arr = [];
  +((obj) => {
    for (let entry of Object.entries(obj)) {
      arr.push(entry);
    }
  })(tocList);

  // +((obj) => {
  //   for (let prop in obj) {
  //     console.log('what: ', prop);
  //   }
  // })(tocList);

  console.log()

  return (
    <>
      {
        arr.map((prop) => {
          return (
            <span key={`#${prop[1]}-${prop[0]}`} name={`${prop[0]}`}>
              <a href={`#${prop[0]}`} rel="noreferrer"> {/*target="_blank"*/}
                {`${prop[1]}`}
              </a>
            </span>
          );
        })
      }
    </>
  );
}
