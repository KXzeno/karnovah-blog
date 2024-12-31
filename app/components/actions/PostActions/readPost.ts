'use server';

import { prisma } from "@/prisma";

interface Match {
  [key: number]: any;
  position: number;
  renewed: string[] | string;
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
    if (!(i !== words.length - 1 && word.match(/\b(?:of|is|at|on|with|if)\b/) !== null)) {
      let firstLetter = words[i][0].toUpperCase();
      let otherLetters = word.slice(1, word.length);
      titleBuilder.push(`${firstLetter}${otherLetters}`);
      continue;
    } else {
      titleBuilder.push(word);
    }
  }

  /** @description
   * Inception for tedious logic-reversing URL validation. 
   *
   * @type {Match} - an object holding "apostrophy possibilities"
   * 
   * Stores all possibilities relative to final indexes of char 's'
   */
  let matches: Array<Match> = [];
  title = titleBuilder.reduce((accumulator, currVal, i) => {
    if (i === 1) {
      if (accumulator.length > 2 && accumulator.at(accumulator.length - 1) === 's') {
        matches.push({ position: i - 1, renewed: `${accumulator}\'`});
        matches.push({ position: i - 1, renewed: `${accumulator.replace(/s$/, '\'$&')}`});
      }
      if (currVal.length > 2 && currVal.at(currVal.length - 1) === 's') {
        matches.push({ position: i - 1, renewed: `${currVal}\'`});
        matches.push({ position: i - 1, renewed: `${currVal.replace(/s$/, '\'$&')}`});
      }
    } else {
      if (currVal.length > 2 && currVal.at(currVal.length - 1) === 's') {
        matches.push({ position: i - 1, renewed: `${currVal}\'`});
        matches.push({ position: i - 1, renewed: `${currVal.replace(/s$/, '\'$&')}`});
      }
    }
    return `${accumulator} ${currVal}`;
  });
  try {
    let queriedPost;
    queriedPost = await prisma.post.findUnique({ 
      include: {
        sections: true,
      },
      where: {
        title: title
      }
    });
    if (!(queriedPost === null)) {
      return queriedPost;
      /** @description
       * For optimal query indexing, a unique ID is preferred. Though, 
       * this is highly susceptible to tedious logic as it requires to 
       * predict, or decrypt rather, the original form of the post title because:
       *
       * 1. States do not persist from Feed RFC to Post RFC
       * 2. The Link RFC containing the href has isolated logic which beautifies
       * the URL with lower+dash-casing
       * 3. Due to logic isolation from (2), this overcomplicated control
       * flow is designed to handle [not all] reversifying logic computed within
       * the Feed RFC
       *
       * TODO: BE A BETTER FULLSTACK
       *   - Use map transformations or index expressions
       *       @see {@link https://www.postgresql.org/docs/current/indexes-expressional.html}
       *            {@link https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance}
       *   - Streamline read operations by utilizing context or shared states and 
       *     Nextjs catch all route segments
       */
    } else if (matches.length > 0) {
      // Iteration to replace a word with an apostrophy possibility
      for (let i = 0; i < matches.length; i++) {
        let match = matches[i];
        let nextQuery = title.split(/\s/).fill(match.renewed as string, match.position, match.position + 1).join(' ');
        queriedPost = await prisma.post.findUnique({ 
          include: {
            sections: true,
          },
          where: {
            title: nextQuery,
          }
        });
        // Improper logic to identify just comma placements
        if (!(queriedPost === null)) {
          return queriedPost;
        } else {
          queriedPost = await prisma.post.findUnique({ 
            include: {
              sections: true,
            },
            where: {
              title: (nextQuery ?? title).split(/\s/).join(', '),
            }
          });
          if (!(queriedPost === null)) {
            return queriedPost;
          }
        }
      }
      // Handle iteration with no apostrophy possibility
    } else {
      let titleFrags = title.split(/\s/);
      let newTitle: string;
      for (let i = 0; i < titleFrags.length; i++) {
        const DEC = titleFrags[i].charCodeAt(0);
        let NEXT_DEC;
        if (i <= titleFrags.length - 2) {
          NEXT_DEC = titleFrags[i + 1].charCodeAt(0);
        } else {
          // TODO: Implement better checks for NEXT_DEC
          NEXT_DEC = 97;
        }
        if ((DEC >= 65 && DEC <= 90 && i !== titleFrags.length - 1) && (NEXT_DEC >= 97 && NEXT_DEC <= 122)) {
          titleFrags[i + 1] = titleFrags[i + 1].concat(',');
        }
        newTitle = titleFrags.join(' ');
        if (i === titleFrags.length - 2) {
          queriedPost = await prisma.post.findMany({ 
            include: {
              sections: true,
            },
            where: {
              title: {
                contains: newTitle,
                mode: 'insensitive'
              }
            }
          });
          if (!(queriedPost === null)) {
            return queriedPost[0];
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

