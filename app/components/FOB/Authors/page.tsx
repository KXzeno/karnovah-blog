import React from 'react';
import AUTHOR_LIST from './authorList';

export default function Author({ user }: { user: string }): React.ReactNode {
  return (
    <div id="author-profile">
      <div id="author-name">
        <div id="author-level">
        </div>
      </div>
    </div>
  );
}
