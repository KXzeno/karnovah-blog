import React from 'react';
import { readFile } from 'fs/promises';
import { motion } from 'framer-motion';
 
interface postData {
  title: string,
  abstract: string,
  date: string,
}

function FeedCard({ title, abstract, date }: postData) {
    return (
      <div
        className="h-16 w-64 mx-auto"
      >
        <div>
          {title}
        </div>
        <div>
          {abstract}
        </div>
        <div>
          {date}
        </div>
      </div>
    );
  }

interface Home {
  children: React.ReactNode;
}

async function getFile(filePath) {
    try {
      let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
      let content = JSON.parse(data)
      return content;
    } catch (err) {
        console.error(err);
    }
}

export default async function Feed({
children,
}: Home): React.ReactElement {
let post = await getFile('(blogs)/akhundelar/akhundelar.json');

  return (
      <>
        <div className="grid grid-cols-[77%_max(23%)] size-full">
          <div className="feed-container h-screen">
            <FeedCard {...post}/>
          </div>
          <div className="right-margin">
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-2 text-center">
        </div>
      </>
    //</form>
  );
}
