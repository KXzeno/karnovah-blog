import React from 'react';

export default function ListBox({ children }: React.ComponentProps<'div'>) {

  return (
    <ol className='list'>
      { children }
    </ol>
  )
}

