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

// Declare data structure to hold intermediate elements
let jsxLinkedList = new SinglyLinkedList<React.ReactNode>();

/**
 * Iterate over JSX List and output elements recursively
 * @param {SinglyLinkedList} list - Data structure to iterate
 * @returns {ReactNode} A react node to dynamically render in RFC
 * @author Kx
 */
function renderJSX(list: SinglyLinkedList<React.ReactNode>): React.ReactNode {
  if (list.getSize() === 0) return;
  let node = jsxLinkedList.removeFirst();
  return (<>{node}{renderJSX(list)}</>);
}

/** {@inheritDoc renderJSX}
 * Iterate over queried db data recursively and compiles to
 * React elements using globally defined linked list
 * @param {Section[]} data - Individual content queried from database
 * @param {number} step - Trace identifier for indexing data
 * @returns {ReactNode} An element with embedded function calls to render other elements
 * @author Kx
 */
async function recurseData(data: Array<Section>, step?: number): Promise<React.AwaitedReactNode> {
  if (step === undefined) step = 0;
  if (step === data.length) {
    return (
      <>
        {renderJSX(jsxLinkedList)}
      </>
    );
  } else { step += 1; }
  let section = data[step - 1];
  if (section.header === null && section.subheader === null) {
    throw new Error('Data has no headers.');
  }
  // Nullish coalescence logic doesn't satisfy TS control flow?
  let [header, isSubHeader]: [string, boolean] = [(section.header ?? section.subheader) as string, !!section.subheader];
  let content = section.content;

  let headerNode = (isSubHeader === false) ?
    <Section>{header}</Section> : <Section as='subsec'>{header}</Section>;

  jsxLinkedList.addLast(headerNode)
  for (let i = 0; i < content.length; i++) {
    let contentNode = (<p>{content[i]}</p>);
    jsxLinkedList.addLast(contentNode);
  }
  return recurseData(data, step);
}

export default async function Test({ param }: { param: string }): Promise<React.AwaitedReactNode> {
  let post = await readPost(param);
  if (post === null || post === undefined) notFound();
  // LOCAL: @ts-expect-error
  let sections: Array<Section> = post.Section;

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
        {recurseData(sections)}
      </PrimaryContent>
    </ArticleProvider>
  );
}

