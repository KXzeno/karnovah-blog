import React from 'react';

export default function TableOfContents() {
  let [tocList, setTocList] = React.useState({});
  let [elemNodes, setElemNodes] = React.useState({});
  let [isProxy, setIsProxy] = React.useState(false);
  let [arrData, setArrData] = React.useState([]);
  let [tocIndex, setTocIndex] = React.useState(0);

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

  let indexer = React.useCallback(async (o, prop) => {
     prop[1] = await `${prop[1]}\n${Object.keys(o).indexOf(prop[0])}`
  }, []);

  React.useEffect(() => {
    +(async (obj) => {
      for (let entry of Object.entries(obj)) {
        /* setArrData prev + 1 === length each render */
        //entry[1] = `${entry[1].substring(0, index)}\n${Object.keys(obj).indexOf(entry[0])}`;
        //entry[1] = `${entry[1]}\n${Object.keys(obj).indexOf(entry[0])}`;
        indexer(obj, entry);
        //console.log(entry);
        await setArrData(erst => [...erst, entry]);
        //arr.push(entry);
      }
    })(tocList, tocIndex);

    return async () => {
      await setArrData(erst => erst.splice(tocList.length));
    };
  }, [tocList, setArrData, indexer]);

  let data = React.useMemo(() => {
    if (arrData.length > Object.keys(tocList).length) {
      arrData.splice(Object.keys(tocList).length);
    }

      //console.log(`tocList: ${Object.keys(tocList)}, arrData: ${arrData}`);

    return (
      //console.log(arrData),
      arrData./*splice(Object.keys(tocList).length).*/map((prop) => {
        return (
        <span 
          key={`#${prop[1]}-${prop[0]}`} 
          data-index={prop[1].substring(prop[1].indexOf('\n')).trimStart()} 
          name={`${prop[0]}`}>
          <a 
            href={`#${prop[0]}`} 
            rel="noreferrer"> {/*target="_blank"*/}
            {`${prop[1].substring(0, prop[1].indexOf('\n'))}`}
          </a>
        </span>
        );
      })
    );
  }, [arrData, tocList]);

  return (
    <>
      {data}
    </>
  );
}

