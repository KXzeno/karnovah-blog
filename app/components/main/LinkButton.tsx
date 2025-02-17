import React from 'react';

interface FCProps {
  href: string,
  children: React.ReactNode,
  className: string | undefined,
}

export default function LinkButton({ 
  href, 
  children, 
  className,
  ...delegated 
}: FCProps) {
  const Tag = typeof href === 'string'
    ? 'a'
    : 'button';

  return (
    <Tag
      href={href}
      className={className}
    >
      {children}
    </Tag>
  );
}
