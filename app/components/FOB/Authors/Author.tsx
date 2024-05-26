import React from 'react';
import { readFile } from 'fs/promises';
import Image from 'next/image';

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
    <div id="author-profile" className="flex relative w-full">
      <span className="pr-3 self-end">{`${date}`}</span>
      <div id="author-name" className='absolute inline-flex right-0 bottom-0 place-self-end w-max pt-[8px]'>
          <span className="inline-block pr-3 align-text-bottom self-end">{`${user}`}</span>
          <Image className='float-right' src={`/${user}.png`} alt='author-img' width='32' height='32'/>
        <div id="author-level">
        </div>
      </div>
    </div>
  );
}
