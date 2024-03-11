import React from 'react';

export default function useClickListener() {
  const [mouseClick, setMouseClick] = React.useState(false);

  React.useEffect(() =>
    function handleMouseClick() {
      setMouseClick((isClick) => !isClick);


      window.addEventListener('click', handleMouseClick);

      return () => {
        window.removeEventListener('click', handleMouseClick);
      };
    }, []);

  return mouseClick;
}
