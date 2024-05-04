import React from 'react';
import { readFile } from 'fs/promises';
import { motion } from 'framer-motion';
import './Feed.css';
 
interface postData {
  title: string,
  abstract: string,
  date: string,
  author: string,
}

function FeedCard({ title, abstract, date, author }: postData) {
    return (
      <div
        className="min-h-16 w-64 mx-auto border-2" 
      >
        <div id="hero-title">
          {title}
        </div>
        <div id="hero-abstract">
          {abstract}
        </div>
        <div id="hero-date">
          {date}
        </div>
        <div id="hero-author">
          {author}
        </div>
      </div>
    );
  }

interface Home {
  children: React.ReactNode;
}

async function getFile(filePath: string) {
    try {
      let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
      let content = JSON.parse(data)
      return content;
    } catch (err) {
        console.error(err);
    }
}

export default async function Feed() {
let post = await getFile('(blogs)/akhundelar/akhundelar.json');

  return (
      <>
        <div className="grid grid-cols-[77%_max(23%)] size-full border-2">
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
