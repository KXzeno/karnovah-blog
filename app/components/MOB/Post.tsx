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
function renderJSX(list: SinglyLinkedList<React.ReactNode>, opt?: { renderContent: boolean }): React.ReactNode {
  if (list.getSize() === 0) return;
  let nodeArr: React.ReactNode[] = [];
  if (opt && opt.renderContent === true) {
    let contentNode: React.ReactNode[] = [];

    // Separately handle recursion over section content
    while (list.getHead() !== null) {
      // Use type assertion to access react-dom props (node.type)
      let node: React.ReactNode = list.removeFirst() as React.ReactElement;
      let newHead: React.ReactNode = list.first() as React.ReactElement;
      if (newHead && typeof newHead.type === 'object' || list.getTail() === null) { 
        // Continues section head recursion
        return contentNode;
      }
      contentNode.push(node);
    }
    return;
  }

  // Separately handle recursion over section headers
  while (list.getHead() !== null) {
    let node: React.ReactNode = list.removeFirst() as React.ReactElement;
    // Dynamically wrap section tag around section children
    let isHeader = typeof node.type === 'object';

    if (!isHeader) {
      // Calls section content recursion
      node = <section>{renderJSX(list, { renderContent: true })}</section>;
    }

    nodeArr.push(node);
  }
  console.log(...nodeArr);
  return [...nodeArr];

  /** @deprecated
   *  Ternary recursion technique creates nested section
   *  elements, allowing zero mutation to control flow
   *  
   * return (!isHeader && isPrevHead) ? 
   *   (<section>{node}{renderJSX(list, isHeader)}</section>) :
   *   (<>{node}{renderJSX(list, isHeader)}</>); */
}

/** {@inheritDoc renderJSX}
 * Iterate over queried db data recursively and compiles
 * to React elements using globally defined linked list
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

  jsxLinkedList.addLast(headerNode);

  for (let i = 0; i < content.length; i++) {
    let contentNode = (<p>{content[i]}</p>);
    jsxLinkedList.addLast(contentNode);
  }

  return recurseData(data, step);
}

export default async function Post({ param }: { param: string }): Promise<React.AwaitedReactNode> {
  let post = await readPost(param);
  if (post === null || post === undefined) notFound();
  // LOCAL: @ts-expect-error
  console.log(post);
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
        {recurseData(sections)}
      </PrimaryContent>
    </ArticleProvider>
  );
}

