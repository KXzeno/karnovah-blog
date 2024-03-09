import React from 'react';

export default function LinkButton({ 
  href, 
  children, 
  className,
  ...delegated 
}) {
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
