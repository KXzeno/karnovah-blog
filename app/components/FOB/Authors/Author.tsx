import React from 'react';
import { readFile } from 'fs/promises';
import AUTHOR_LIST from './authorList';

async function getFile(filePath: string) {
    try {
      let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
      let content = JSON.parse(data)
      return content;
    } catch (err) {
        console.error(err);
    }
}

export default function Author({ user }: { user: string }): React.ReactNode {
  let fileData = getFile('components/FOB/Authors/Author');

  return (
    <div id="author-profile">
      <div id="author-name">
        <div id="author-level">
        </div>
      </div>
    </div>
  );
}
