'use client';
import React from 'react';
import Image from 'next/image';
import './about.css';

interface ReducerState {
  phrase: string;
}

interface ReducerAction {
  type: 'phrase';
  courier?: {
    phrase: string;
  }
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'phrase': {
      if (action.courier && action.courier.phrase === 'pro tempore') {
        return { phrase: 'for the time being' }
      } else { return { phrase: 'pro tempore' } }
    }
  }
}

let initialState: ReducerState = {
  phrase: 'pro tempore',
};

export default function About(): React.ReactNode {
  let [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <main>
      <picture>
        <Image id='insert' src='https://i.postimg.cc/fLZb7vHm/2024-08-03-00-40-14.png' alt='author-pfp' width={310} height={310} />
        <p>Kx</p>
        <div />
        <p>Aspiring Software Engineer, Science Fantasy Novelist, Self-help Author, and Fantasist—
          <button 
            type="button"
            onClick={(e) => dispatch({ type: 'phrase', courier: { phrase: (e.target as HTMLButtonElement).outerText } })}
          >
            <em>{`${state.phrase}`}</em>
          </button>
          .
        </p>
      </picture>
      <section>
        <div>
          <p>Indirect impact is my preferred medium of influence, and as much as I value the company of silence, having it as feedback renders my empathetic gestures a disservice. To that reason, I made this retreat to exposit uncontained thoughts and serve nascency to an upcoming enterprise.</p>
        </div>
      </section>
    </main>
  );
}
