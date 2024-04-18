import React from 'react';

interface FCProps {
  level?: number,
  title: string,
  children: React.ReactNode | string
}

export default function SectionWithHeading({
  level,
  title,
  children,
}: FCProps) {
  if (
    typeof level !== 'number' ||
    level < 1 ||
    level > 6
  ) {
    throw new Error(
      `Unrecognized heading level: ${level}`
    );
  }
  /** @remarks 
   *
   *  Cannot explicitly type HeadingTag, must use type assertion.
   *  keyof makes a union type of the props within an object or class,
   *  which in this case is IntrinsicElements which includes all HTML
   *  Elements e.g., div, span, section, etc.
   */
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <section>
      <HeadingTag>{title}</HeadingTag>
      {children}
    </section>
  );
}


