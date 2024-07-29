import React from 'react';


interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  choice: number | null;
}

export default function useOnscreen(elementRef: React.MutableRefObject<HTMLElement | null>, data?: Post[]) {
  const [isOnscreen, setIsOnscreen] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsOnscreen(entry.isIntersecting);
    });
    const currentRef = elementRef.current;
    observer.observe(currentRef);
    return () => {
      observer.disconnect();
    };
  }, [elementRef.current, data]);
  return isOnscreen; 
}
