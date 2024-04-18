'use client';
import React, {SetStateAction} from 'react';

export default function useClickListener() {
  const [mouseClick, setMouseClick]: [boolean, React.Dispatch<SetStateAction<boolean>>] = React.useState(false);

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

  return [mouseClick, setMouseClick] as const;
}
