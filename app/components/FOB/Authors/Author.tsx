import React from 'react';
import { readFile } from 'fs/promises';
import Image from 'next/image';
import './Authors.css';

async function getFile(filePath: string) {
  try {
    let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
    let content = JSON.parse(data)
    return content;
  } catch (err) {
    console.error(err);
  }
}

export default async function Author({ user, date }: { user: string, date: string }): Promise<React.AwaitedReactNode> {
  let authors = await getFile('components/FOB/Authors/authorList.json');
  if (!user || !authors) {
    throw new Error('Invalid user');
  }
  console.log(authors[user]);

  return (
    <div id="author-profile">
      <span id="publish-date">{`${date}`}</span>
      <div id="author-name">
          <span>{`${user}`}</span>
          <Image src={`/${user}.png`} alt='author-img' width='32' height='32'/>
      </div>
    </div>
  );
}
