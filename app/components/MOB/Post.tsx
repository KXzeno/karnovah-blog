import React from 'react';
import { notFound } from 'next/navigation';
import { Warning } from '@M/Icons';
import ArticleProvider, { 
  Header,
  SubHeader,
  AddHeader,
  HeaderNote,
  PrimaryContent,
} from '@P/ArticleProvider';
import Section from '@M/Section';
import { readPost } from '@A/PostActions';
import { SinglyLinkedList } from '../../../utils/SinglyLinkedList';

interface Section {
  section_id: number;
  header: string | null;
  postId: number;
  subheader: string | null;
  content: string[];
  img: string[];
  aside: string[];
}

/**
 * O(n) execution for mapping queried Post data to elements,
 * each iteration handles an array property using flatmap which 
 * potentially performs up to O(n(log(n)))
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap}
 * @param {Section[]} sections - property descriptor of queried data
 * @returns {React.ReactNode} A spreaded array of React nodes
 * @author Kx
 */
function project(sections: Section[]): React.ReactNode {
  // Initialize return val
  let nodeG: React.ReactNode[] = [];
  // Iterate through section body
  for (let i = 0; i < sections.length; i++) {
    // TODO: Handle case of multiple aside elements
    // Well-define 'header' using nullish coalescence  
    let hdr = sections[i].header ?? sections[i].subheader;
    // If header, push as RFC; if subheader, push as RFC with prop
    (hdr === sections[i].header) ?
      nodeG.push(<Section>{hdr}</Section>) :
      nodeG.push(<Section as='subsec'>{hdr}</Section>);
    // Flatten all paragraphs and map transform each to React nodes
    let contents = sections[i].content.flatMap((par, i) => (<p key={i}>{par}</p>));
    nodeG.push(<section key={hdr}>{[...contents]}</section>);
  }
  /** Return spread of React node array,
   * @privateRemarks
   * I'd venture that this works due to the nature of expression-only inputs within the children of the
   * React node. Since expressions produce a value, the virtual DOM is left with only one concern: organizing
   * the real DOM. Spreading is an expression that its elements, if from an array literal, are placed to 
   * "where they are expected," and as form the totaltypescript article, the React node expects anything renderable, 
   * including React elements and nodes. Primitives also work possibly due to "1 evaluates to 1" logic.
   * @see {@link https://www.totaltypescript.com/jsx-element-vs-react-reactnode#reactreactnode}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax}
   */
  return [...nodeG];
}

export default async function Post({ param }: { param: string }): Promise<React.AwaitedReactNode> {
  let post = await readPost(param);
  if (post === null || post === undefined) notFound();
  // LOCAL: @ts-expect-error
  let sections: Array<Section> = post.sections;
  let primAside: { type: string | undefined, content: string | undefined };
  if (sections[0].aside[0] && sections[0].content[0]) {
    primAside = {
      type: sections[0].aside.shift(),
      content: sections[0].content.shift(), 
    };
  } else { return; }

  return (
    <ArticleProvider>
      <Header>
        {post.title}
      </Header>
      <SubHeader
        AddHeader={
          <AddHeader
            HeaderNote={
              <HeaderNote>
                <Warning />
              </HeaderNote>
            }
          >
            {primAside.content}
          </AddHeader>
        }
      >
        {/* LOCAL: @ts-expect-error */}
        {post.subtitle}
      </SubHeader>
      <PrimaryContent>
        {project(sections)}
      </PrimaryContent>
    </ArticleProvider>
  );
}

