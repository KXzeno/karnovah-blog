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
import { SinglyLinkedList } from '@U/SinglyLinkedList';

/**
 * Transform consumer semantics to HTML
 * @param {React.ReactNode[] | string} content - Array of Elements, pending string by default for manipulation
 * @returns {React.ReactNode[] | void} compiled ReactNodes or content transformation
 * @author Kx
 */
function semanticTransform(content: React.ReactNode[] | string): React.ReactNode[] | void {
  let frags = (content as string).split(/(?:\<([\w\s]+\W['"][\S\s]+?['"]|\S+)\>)/);
  // console.log(frags);
  // Implement lesser ver. of styling algorithm below
  if (frags.length > 1) {
    let newContent = new SinglyLinkedList<string | React.ReactNode>();
    for (let i = 2; i < frags.length; i += 4) {
      newContent.addLast(frags[i - 2]);
      let Style = frags[i - 1] as keyof JSX.IntrinsicElements;
      let optClass: { className: string | undefined } = { className: undefined };
      let optRef: { href: string | undefined, target: string | undefined } = { href: undefined, target: undefined };
      if (Style.search(/(?:\S+[\s])/) !== -1) {
        let classFields = Style.match(/(?<=className\=\')[\s\w\d\S]+(?=\')/);
        let hrefField = Style.match(/(?<=href\=\')[\w\s.:/\\\?]+(?=\')/);
        optClass.className = (classFields && classFields[0]) ?? undefined;
        optRef.href = (hrefField && hrefField[0]) ?? undefined;
        if (optRef.href) {
          let hrefTarget = Style.match(/(?<=target\=\')[\w\s.:/\\\?]+(?=\')/);
          optRef.target = (hrefTarget && hrefTarget[0]) ?? undefined;
        }
        Style = Style.replace(Style.substring(Style.search(/\s/)), '') as keyof JSX.IntrinsicElements;
      }
      newContent.addLast(<Style href={optRef.href} target={optRef.target} className={optClass.className}>{frags[i]}</Style>)
      if ((i + 4) > frags.length && i < frags.length - 1) {
        newContent.addLast(frags[frags.length - 1]);
      }
    }
    // Stream newContent to cache and reference by content
    let cache: React.ReactNode[] = [];
    while (!newContent.isEmpty()) {
      cache.push(<>{newContent.removeFirst()}</>);
    }
    return content = cache;
  } else {
    return content = [<>{content}</>];
  }
}

/**
 * Transform consumer paragraph semantics to HTML
 * @param {string} par - paragraph to split into multiple lines for parsing
 * @param {string | number} key - optional attribute for React to identify in virtual DOM
 * @returns {React.ReactNode | undefined} string-modified React node or undefined
 * @author Kx
 */
function semanticMultilineTransform(par: string): React.ReactNode | undefined {
  let newPar: React.ReactNode | undefined = undefined; 
  if (par.length > 0) {
    let enriched = new SinglyLinkedList<string | React.ReactNode>();
    /** Fixed using lazy delimiters on greedies 
     * Previously, character class `...[\S\s]+['"]` is greedy in that it matches
     * until the last ' or "
     * @see {@link https://www.rexegg.com/regex-quantifiers.php#lazytrap}
     * @see {@link https://www.rexegg.com/regex-quantifiers.php}
     */
    let enrich = par.split(/(?:\<(\S+\sclassName\W['"][\S\s]+?['"]|\S+)\>)/);
    if (enrich && enrich.length > 2) {
      for (let i = 2; i < enrich.length; i += 4) {
        /** @see {@link https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content}
         *  keyof creates a union type of a type's keys
         */
        let Style = enrich[i - 1] as keyof JSX.IntrinsicElements;
        // Compiler prefers undefined over null?
        let optClass: { className: string | undefined } = { className: undefined };
        enriched.addLast(enrich[i - 2]);
        // console.log(`${i}: ${enrich[i-2]}\n${i}: ${enrich[i-1]}\n${i}: ${enrich[i]}\n`);
        if (Style.search(/(?:\S+[\s])/) !== -1) {
          /** @description
           * (?:...|...) -> non-capturing group doesn't store
           * matched group to memory; also doesn't "capture" the pattern
           * which is also non-captured by default without the capture
           * group syntax (...). Capturing is required to be recognized
           * in JS operations such as `.split`, where (x) will be stored
           * in between split elements. I suppose you can insert capture
           * groups in a non-capture group. Word is the whole regexp is one
           * capture group, we transform it to matches which boils down to
           * the part we want to capture or just use the matches for expressions
           * @see {@link https://www.rexegg.com/regex-style.php}
           * Do word boundaries only work in character classes?
           * Second personally made unguided sorta-complex regexp
           * Wrapping `.+` in capture group causes two matches, is it able to override default? 
           */
          let searchIndex = Style.match(/(?:(?<=\S+[\b\S+][\W{1}|\=][\W{1}|"'{1}]))(.+)(?:\W{1}|[\"\']{1})/);
          optClass.className = (searchIndex && searchIndex[1]) ?? undefined;
          Style = Style.replace(Style.substring(Style.search(/\s/)), '') as keyof JSX.IntrinsicElements;
        }
        enriched.addLast(<Style className={optClass.className}>{enrich[i]}</Style>);
        if ((i + 4) > enrich.length && i < enrich.length - 1) {
          enriched.addLast(enrich[enrich.length - 1]);
        }
      }
    } else {
      enriched.addLast(enrich[0]);
    }
    let node: React.ReactNode[] = [];
    while (!enriched.isEmpty()) {
      node.push(<>{enriched.removeFirst()}</>);
    }
    return newPar = (<p>{[...node]}</p>);
  }
  // Undefined
  return newPar;
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
function project(sections: unknown[]): React.ReactNode {
  // Initialize return val
  let nodeG: React.ReactNode[] = [];
  // Iterate through section body
  for (let i = 0; i < sections.length; i++) {
    // Well-define 'header' using nullish coalescence  
    // @ts-expect-error
    let hdr = sections[i].header ?? sections[i].subheader;
    // If header, push as RFC; if subheader, push as RFC with prop
    // @ts-expect-error
    (hdr === sections[i].header) ?
      nodeG.push(<Section>{hdr}</Section>) :
      nodeG.push(<Section as='subsec'>{hdr}</Section>);
    // Flatten all paragraphs and map transform each to React nodes
    // @ts-expect-error
    let contents = sections[i].content.flatMap((par, index) => {
      // @ts-expect-error
      // Handle aside-first case
      if (sections[i].aside[0] && index + 1 === Number.parseInt(sections[i].aside[0].split(/\$/)[1])) {
        // @ts-expect-error
        let content: React.ReactNode[] | string = sections[i].content[index + 1];
        // @ts-expect-error
        let asideType: string = (sections[i].aside.shift() as string).split(/\$/)[0].toLowerCase();
        // @ts-expect-error
        sections[i].content[index + 1] = '';

        semanticTransform(content);
        let newPar = semanticMultilineTransform(par);

        return (
          <>
            {newPar ?? <p key={`${hdr}-${i}`}>{par}</p>}
            <div>
              <AddHeader 
                type={asideType}
                HeaderNote={
                  <HeaderNote>
                    <Warning 
                      type={asideType}/>
                  </HeaderNote>
                }>
                {...content as React.ReactNode[]}
              </AddHeader>
            </div>
          </>
        )
      }
      // Default
      return semanticMultilineTransform(par);
    });
    nodeG.push(<section key={`${hdr}-${i}`}>{[...contents]}</section>);
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
  let sections: Array<unknown> = post.sections;
  let primAside: { type: string | undefined, content: React.ReactNode[] | string | undefined };
  // @ts-expect-error
  if (sections[0].aside[0] && sections[0].content[0]) {
    // @ts-expect-error
    let content: React.ReactNode[] = semanticTransform(sections[0].content[0]);
    // @ts-expect-error
    sections[0].content.shift();
    primAside = {
      // @ts-expect-error
      type: sections[0].aside.shift(),
      content: [...content], 
    };
    /** Adjust index of next aside
     *
     * Cannot parse pattern ($&) as Number, returns NaN
     * @see {@link {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}}
     */
    // @ts-expect-error
    if (sections[0].aside[0]) {
      // @ts-expect-error
      sections[0].aside[0] = sections[0].aside[0].replace(/\d$/, `${sections[0].content.length - 1}`);
    }
  } else { 
    return;
  }

  return (
    <ArticleProvider>
      <Header>
        {post.title}
      </Header>
      <SubHeader
        AddHeader={ primAside &&
          <AddHeader
            type={`${primAside.type?.replace(/\$\d$/, '')}`}
            HeaderNote={
              <HeaderNote>
                <Warning type={`${primAside.type?.replace(/\$\d$/, '')}`}/>
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

