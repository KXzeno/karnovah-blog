import React from 'react';
import Link from 'next/link';
import { readFile } from 'fs/promises';
import { motion, LayoutGroup } from 'framer-motion';
import { Author } from '@/components';
import './Feed.css';
import { readPostAll } from '@A/PostActions';
 
interface postData {
  title: string,
  abstract: string,
  date: string,
  author: string,
}

// TODO: Query db and sort by recent
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

/** @deprecated
 * @param {string} filePath - path, relative to root, to json
 * @returns {object | undefined} parsed JSON on fulfilled, null on reject
 * @author Kx
 */
async function getFile(filePath: string): Promise<object | null> {
  try {
    let data = await readFile(`./app/${filePath}`, { encoding: 'utf8' });
    let content = JSON.parse(data)
    return content;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// TODO: Filter on query to avoid unnecessary fields

interface Post {
  post_id: number;
  title: string;
  createdAt: Date;
  published: boolean;
  subtitle: string;
  description: string;
  sections: Array<Section>;
  categories: Category[];
  choice: number | null,
}

interface Section {
  section_id: number;
  header: string | null;
  postId: number;
  subheader: string | null;
  content: string[];
  img: string[];
  aside: string[];
}

interface Category {
  category_id: number;
  name: string;
  posts: Post[];
}

export default async function Feed() {
  let data = await readPostAll({ field: 'createdAt', value: 'desc' }) as Post[];
  let posts: Array<Post> = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      // let pruned: Array<> = 
    }
  }
  return (
    <>
      <main className='home-page'>
        {data && data.map((post: Post) => {
          return (
            <section className='post-ctr' key={post.title}>
              <h1 className='post-title'>{post.title}</h1>
              <p className='post-desc'>{post.description}</p>
              <time className='post-date'>{post.createdAt.toISOString().split(/T/)[0]}</time>
            </section>
          );
        })}
      </main>
    </>
  );
}
