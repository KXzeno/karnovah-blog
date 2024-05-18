import React from 'react';
import { readFile } from 'fs/promises';

  async function getFile(filePath: string) {
    try {
      let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
      let content = JSON.parse(data)
      return content;
    } catch (err) {
      console.error(err);
    }
  }

  export default async function Author({ user }: { user: string }): Promise<React.AwaitedReactNode> {
  let authors = await getFile('components/FOB/Authors/authorList.json');
  if (!user || !authors) {
    throw new Error('Invalid user');
  }
  console.log(authors[user]);

  return (
    <div id="author-profile">
      <div id="author-name">
        {`${user}`}
        <div id="author-level">
        </div>
      </div>
    </div>
  );
}
