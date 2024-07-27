'use server';

import { prisma } from "@/prisma";

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
  posts: Post[]
}

export async function readPost(title: string) {
  if (title && typeof title === 'string') { title = title.toLowerCase() };

  // Weak implementation of title match.
  // Assumes that every letter of a word is capital
  // and ids are in dash-case
  let words: Array<string> = title.split(/-|\s/);
  let titleBuilder: Array<string> = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    // Handle cases where words should stay lowercased
    if (!(i!== words.length - 1 && word.match(/\b(?:of|is|at|on)\b/))) {
      let firstLetter = words[i][0].toUpperCase();
      let otherLetters = word.slice(1, word.length);
      titleBuilder.push(`${firstLetter}${otherLetters}`)
      continue;
    }
    titleBuilder.push(word);
  }

  title = titleBuilder[0];

  try {
    let db = await prisma.post.findUnique({ 
      include: {
        sections: true,
      },
      where: {
        title: title
      }
    });
    return db;
  } catch (error) {
    console.error(error);
  }
}

