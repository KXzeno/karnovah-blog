import React from 'react';
import Link from 'next/link';

/* Local Imports */
import ObjectArray from './MyArray';

export default function TableOfContents(): React.ReactNode {
  let [tocList, setTocList] = React.useState<object>({});
  let [elemNodes, setElemNodes] = React.useState<object>({});
  let [isProxy, setIsProxy] = React.useState<boolean>(false);
  let [arrData, setArrData] = React.useState<Array<string | string[]>>([]);
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
  let newTocList = (element: HTMLElement) => {
    // Alternative destructuring
    // { target: { id, outerText } }: { target: HTMLElement }
    // OR let { target } = e; let { id, outerText } = target as HTMLElement;
    let tempObj: object = {};

    if (!element.id || !element.outerText) { return };
    // Could also work with Object.assign()
    Object.defineProperties(tempObj, {
      [`${element.id}-${element.tagName}`]: { 
        value: element.outerText,
        writable: false,
        enumerable: true,
        configurable: false,
      },
    });
    return tempObj;
  };

  React.useEffect(() => {
    let elemNodesProxy: NodeList | null = document.querySelectorAll("h3, h4");
    if (Object.keys(tocList).length === elemNodesProxy.length) {
      return;
    }
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
        let altered: object | undefined = newTocList(value);
        // console.log("Altered:", altered)
        setTocList(erst => ({ ...erst, ...altered }));
        // console.log("tocList:", tocList);
      }
    }
    //console.log(tocList);
    return () => {
      elemNodesProxy = null;
      //console.log('Cleanup Successful');
    };

  }, [tocList, isProxy, elemNodes]);

  let indexer = React.useCallback((o: object, prop: Array<object | string>) => {
    prop[1] = `${prop[1]}\n${Object.keys(o).indexOf(prop[0] as string)}`
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
    })(tocList);

    return () => {
      setArrData(erst => erst.splice(Object.keys(tocList).length));
    };
  }, [tocList, setArrData, indexer]);

  let data = React.useMemo(() => {
    // if (arrData.length > Object.keys(tocList).length) {
    //   arrData.splice(Object.keys(tocList).length);
    // }

    //console.log(`tocList: ${Object.keys(tocList)}, arrData: ${arrData}`);
    return (
      //console.log(arrData),
      arrData./*splice(Object.keys(tocList).length).*/map((prop) => {
        const id = prop[0].slice(0, prop[0].length - 3);
        const tag = prop[0].slice(prop[0].length - 2)

        return (
          <span 
            key={`#${prop[1]}-${prop[0]}`} 
            data-index={prop[1].substring(prop[1].indexOf('\n')).trimStart()} 
            data-name={`${id}-*`}
            className={tag === 'H4' ? 'subheader' : undefined}
          >
            {/*<Link></Link>*/}
            <a 
              href={`#${id}`} 
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
