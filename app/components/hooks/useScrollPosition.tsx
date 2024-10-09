import React from 'react';

export default function useScrollPosition() {
  let [pos, setPos] = React.useState<number>(0);
  React.useEffect(() => {
    setPos(window.scrollY);
  });

  return pos;
}
