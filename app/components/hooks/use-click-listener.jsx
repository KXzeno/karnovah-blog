import React from 'react';

export default function useClickListener() {
  const [mouseClick, setMouseClick] = React.useState(false);

  React.useEffect(() => {
    function handlePointerDown() {
      setMouseClick((isClick) => !isClick);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    //console.log("Event fired");

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      //console.log("Event closed");
    };
  }, []);

  return [mouseClick, setMouseClick];
}
