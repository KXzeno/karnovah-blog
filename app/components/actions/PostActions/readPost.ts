'use server';

import prisma from '../../../prisma/neon-db';

export async function altReadPost(title: string) {
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
        Section: true,
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

