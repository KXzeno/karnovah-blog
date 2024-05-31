import React from 'react';
import Link from 'next/link';
import { readFile } from 'fs/promises';
import { motion } from 'framer-motion';
import Author from '@F/authors';
import './Feed.css';
 
interface postData {
  title: string,
  abstract: string,
  date: string,
  author: string,
}

function FeedCard({ title, abstract, date }: postData) {
    return (
      <div
        id="feed-ctr"
      >
        <div id="hero-title">
          <Link href={`./posts/${title}`}>{title}</Link>
        </div>
        <div id="hero-abstract">
          {abstract}
        </div>
        <Author user='kx' date={date}/>
        <div id="hero-author">
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
