import React from 'react';
import Link from 'next/link';

/* Local Imports */
import ObjectArray from './MyArray';

export default function TableOfContents(): React.ReactNode {
  let [tocList, setTocList] = React.useState<object>({});
  let [elemNodes, setElemNodes] = React.useState<object>({});
  let [isProxy, setIsProxy] = React.useState<boolean>(false);
  let [arrData, setArrData] = React.useState<Array<unknown>>([]);
  let [tocIndex, setTocIndex] = React.useState<number>(0);

  /** @function
   * Callback hook which destructures DOM nodes
   * @generator
   * @param {string} id - Identifiers to link mapped data
   * @param {string} outerText - innerHTML of extracted elements
   * @fires tocList#set
   * @returns {Object} Parochial object used for hook setter functions
   * @author Kx
   */
  let newTocList = ({ target: { id, outerText } }: { target: HTMLElement }) => {
    // Alternative destructuring
    // let { target } = e;
    // let { id, outerText } = target as HTMLElement;
    let tempObj: object = {};

    if (!id || !outerText) { return };
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
    let elemNodesProxy: NodeList = document.querySelectorAll("h3, h4");
    //console.log(elemNodesProxy);
    elemNodesProxy.forEach((node) => {
      // let values = Object.values(elemNodes);
      let values = new ObjectArray(Object.values(elemNodes));
      let parsedElem = values.locate((e) => e === (node as HTMLElement).id);
      if (!parsedElem) {
        //console.error('Proxy Dismissed.')
      } else {
        setIsProxy(true);
        //console.log(elemNodesProxy);
        //console.log('Proxy in Sync.');
      }
    });

    if (isProxy === false) {
      setElemNodes(erst => ({ ...erst, ...elemNodesProxy }));
      //console.log(elemNodes);
      let elems = new ObjectArray(Object.values(elemNodesProxy));

      for (const value of elems) {
        let altered: object = newTocList(value);
        // console.log("Altered:", altered)
        setTocList(erst => ({ ...erst, ...altered }));
        // console.log("tocList:", tocList);
      }
    }
    return () => {
      elemNodesProxy = null;
      //console.log('Cleanup Successful');
    };

  }, [tocList, elemNodes, isProxy]);

  // TODO: See React type for inference
  let indexer = React.useCallback((o, prop) => {
     prop[1] = `${prop[1]}\n${Object.keys(o).indexOf(prop[0])}`
  }, []);

  React.useEffect(() => {
    +((obj: object) => {
      for (let entry of Object.entries(obj)) {
        /* setArrData prev + 1 === length each render */
        //entry[1] = `${entry[1].substring(0, index)}\n${Object.keys(obj).indexOf(entry[0])}`;
        //entry[1] = `${entry[1]}\n${Object.keys(obj).indexOf(entry[0])}`;
        indexer(obj, entry);
        //console.log(entry);
        setArrData(erst => [...erst, entry]);
        //console.log(arrData);
        //arr.push(entry);
      }
    })(tocList, tocIndex);

    return () => {
      setArrData(erst => erst.splice(tocList.length));
    };
  }, [tocList, setArrData, indexer, tocIndex]);

  // TODO: See React type for inference
  let data = React.useMemo(() => {
   // if (arrData.length > Object.keys(tocList).length) {
   //   arrData.splice(Object.keys(tocList).length);
   // }

      //console.log(`tocList: ${Object.keys(tocList)}, arrData: ${arrData}`);
    return (
     //console.log(arrData),
      arrData./*splice(Object.keys(tocList).length).*/map((prop) => {
        return (
        <span 
          key={`#${prop[1]}-${prop[0]}`} 
          data-index={prop[1].substring(prop[1].indexOf('\n')).trimStart()} 
          name={`${prop[0]}-*`}>
          {/*<Link>*/}
          <a 
            href={`#${prop[0]}`} 
            rel="noreferrer"
          > {/*target="_blank"*/}
            {`${prop[1].substring(0, prop[1].indexOf('\n'))}`}
          </a>
            {/*</Link>*/}
        </span>
        );
      })
    );
  }, [arrData]);

  return (
    <nav id='toc-list'>
      {data}
    </nav>
  );
}

