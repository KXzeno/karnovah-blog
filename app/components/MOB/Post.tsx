import React from 'react';
import { notFound } from 'next/navigation';
import { Warning } from '@M/Icons';
import '../../posts/pages.css';
import ArticleProvider, { 
  Header,
  SubHeader,
  AddHeader,
  HeaderNote,
  PrimaryContent,
} from '@P/ArticleProvider';
import Section from '@M/Section';
import './../../posts/pages.css';
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
  let nodeG: React.ReactNode[] = [];
  for (let i = 0; i < sections.length; i++) {
    let hdr = sections[i].header ?? sections[i].subheader;
    (hdr === sections[i].header) ?
      nodeG.push(<Section>{hdr}</Section>) :
      nodeG.push(<Section as='subsec'>{hdr}</Section>);
    let contents = sections[i].content.flatMap((par) => (<p>{par}</p>));
    nodeG.push(<section>{[...contents]}</section>);
  }
  return [...nodeG];
}

export default async function Post({ param }: { param: string }): Promise<React.AwaitedReactNode> {
  let post = await readPost(param);
  if (post === null || post === undefined) notFound();
  // LOCAL: @ts-expect-error
  let sections: Array<Section> = post.sections;

  return (
    <ArticleProvider>
      <Header>
        {post.title}
      </Header>
      <SubHeader>
        {/* LOCAL: @ts-expect-error */}
        {post.description}
      </SubHeader>
      <PrimaryContent>
        {project(sections)}
      </PrimaryContent>
    </ArticleProvider>
  );
}

