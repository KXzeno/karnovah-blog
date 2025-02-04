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
import CodeBox from './CodeBox';

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
      let Style = frags[i - 1] as keyof React.JSX.IntrinsicElements;
      let optClass: { className: string | undefined } = { className: undefined };
      let optRef: { href: string | undefined, target: string | undefined } = { href: undefined, target: undefined };
      if (Style.search(/(?:\S+[\s])/) !== -1) {
        let classFields = Style.match(/(?<=className\=\')[\s\w\d\S]+(?=\')/);
        let hrefField = Style.match(/(?<=href\=\')[:/.\s\w\%\_\&\=\d\?\-\#]+(?=\')/);
        optClass.className = (classFields && classFields[0]) ?? undefined;
        optRef.href = (hrefField && hrefField[0]) ?? undefined;
        if (optRef.href) {
          let hrefTarget = Style.match(/(?<=target\=\')[\w\s.:/\\\?]+(?=\')/);
          optRef.target = (hrefTarget && hrefTarget[0]) ?? undefined;
        }
        Style = Style.replace(Style.substring(Style.search(/\s/)), '') as keyof React.JSX.IntrinsicElements;
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
 * @param {{ boolean?, (number? | string?) }} options - optional attribute for React to identify in virtual DOM
 * @returns {React.ReactNode | undefined} string-modified React node or undefined
 * @author Kx
 */
function semanticMultilineTransform(par: string, options?: { fragmented?: boolean, key?: number | string }): React.ReactNode | undefined {
  let newPar: React.ReactNode | undefined = undefined; 
  if (par.length > 0) {
    let enriched = new SinglyLinkedList<string | React.ReactNode>();
    /** Fixed using lazy delimiters on greedies 
     * Previously, character class `...[\S\s]+['"]` is greedy in that it matches
     * until the last ' or "
     * @see {@link https://www.rexegg.com/regex-quantifiers.php#lazytrap}
     * @see {@link https://www.rexegg.com/regex-quantifiers.php}
     */
    let enrich = par.split(/(?:\<([\S\s]+?)\>)/);
    if (enrich && enrich.length > 2) {
      for (let i = 2; i < enrich.length; i += 4) {
        /** @see {@link https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content}
         *  keyof creates a union type of a type's keys
         */
        let Style = enrich[i - 1] as keyof React.JSX.IntrinsicElements;
        // console.log(Style);
        // Compiler prefers undefined over null?
        let classFields = Style.match(/(?<=className\=\')[\s\w\d\S]+(?=\')/);
        let hrefField = Style.match(/(?<=href\=\')[:/.\s\w\%\_\&\=\d\?\-\#]+(?=\')/);
        let optClass: { className: string | undefined } = { className: undefined };
        let optRef: { href: string | undefined, target: string | undefined } = { href: undefined, target: undefined };
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
          optClass.className = (classFields && classFields[0]) ?? undefined;
          optRef.href = (hrefField && hrefField[0]) ?? undefined;
          Style = Style.replace(Style.substring(Style.search(/\s/)), '') as keyof React.JSX.IntrinsicElements;
        }
        enriched.addLast(<Style href={optRef.href} target={optRef.target} className={optClass.className}>{enrich[i]}</Style>);
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
    if (options && options.fragmented) {
      return newPar = (<>{[...node]}</>);
    } else {
      return newPar = (<p key={options && options.key}>{[...node]}</p>);
    }
  }
  // Undefined
  return newPar;
}

function insertAside(outerIndex: number, innerIndex: number, sections: NonNullable<Awaited<ReturnType<typeof readPost>>>["sections"], par: string, hdr: string, insertPar?: boolean): { sections: NonNullable<Awaited<ReturnType<typeof readPost>>>["sections"], volatileNode: React.ReactNode } {
  let content: React.ReactNode[] | string = sections[outerIndex].content[innerIndex + 1];
  let asideType: string = (sections[innerIndex].aside.shift() as string)?.split(/\$/)[0].toLowerCase();
  semanticTransform(content);
  let newPar = semanticMultilineTransform(par);
  sections[innerIndex].content[outerIndex + 1] = '';
  return { sections, volatileNode: (
    <>
      {insertPar && (newPar ?? <p key={`${hdr}-${innerIndex}`}>{par}</p>)}
      <div>
        <AddHeader 
          key={`${innerIndex}-${hdr}`}
          type={asideType}
          HeaderNote={
            <HeaderNote>
              <Warning 
                type={asideType}/>
            </HeaderNote>
          }
        >
          {typeof content !== 'string' ? (content as string[]).map((preNode, i) => {
            return semanticMultilineTransform(preNode, { fragmented: true, key: i })
          }): semanticMultilineTransform(content, { fragmented: true, key: innerIndex })}
        </AddHeader>
      </div>
    </>
  )}
}

function insertCodeBlock(params: Parameters<typeof insertAside>): ReturnType<typeof insertAside> | undefined {
  let [outerIndex, innerIndex, sections, par, insertPar] = params;
  let codeIndex = Number.parseInt(sections[outerIndex].code[0].split(/(?<=\$)([\d]+)$/)[1]);
  // Handle location at end of section
  let shift = sections[outerIndex].content.length - 1 === innerIndex && codeIndex === sections[outerIndex].content.length + 1 ? --codeIndex : null;
  // console.log(shift);
  if (innerIndex === codeIndex - 1 || shift) {
    let codeCache: string[] | React.ReactElement[] | React.ReactNode = [];
    // Attempt codeIndex recovery after temporary exception handling
    let match: RegExp = new RegExp(`(?<=\\$)(${shift ? shift + 1 : codeIndex})$`);
    // TODO: CREATE FILE NAME API
    let fileName;
    let lang = sections[outerIndex].code[0].match(/(.+(?=\$))/)![0];
    sections[outerIndex].code.shift();
    while (sections[outerIndex].code[0] && sections[outerIndex].code[0].match(match)) {
      (codeCache as string[]).push(sections[outerIndex].code.shift()!.replace(/\$[\d]+$/, ''));
    }
    codeCache = (codeCache as string[]).map((line, lineIndex) => {
      if (line.match(/(?:^\\{1,2})/)) {
        if (line.match(/(?:^\\{2})/)) {
          return <code key={`${codeIndex}-${lineIndex}`}></code>;
        } else if (line.match(/(?:^\\{1}\d+)/)) {
          let tabs = line.match(/(?<=\\)(\d+)/)![0];
          let newLine = line.replace(/^([\\]+[\d]+\b)/, '').trimStart();
          return <code key={`${codeIndex}-${lineIndex}`} data-tab={tabs}>{`${newLine}`}</code>
        }
      }
      return <code key={`${codeIndex}-${lineIndex}`}>{`${line}`}</code>
    });
    let newPar = semanticMultilineTransform(par);
    // FIXME: Refer to l97; create dynamic filename...
    return {sections, volatileNode: (
      <>
        {insertPar && newPar}
        <CodeBox key={`codebox-${codeIndex}`} fileName={fileName ?? 'init.lua'} lang={lang.toUpperCase()}>{codeCache as React.ReactNode}</CodeBox>
      </>
    )}
  }
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
function project(sections: NonNullable<Awaited<ReturnType<typeof readPost>>>["sections"]): React.ReactNode {
  let nodeG: React.ReactNode[] = [];
  // Iterate through section body
  for (let i = 0; i < sections.length; i++) {
    // Well-define 'header' using nullish coalescence  
    let hdr = sections[i].header ?? sections[i].subheader;
    // If header, push as RFC; if subheader, push as RFC with prop
    (hdr === sections[i].header) ?
      nodeG.push(<Section>{hdr}</Section>) :
      nodeG.push(<Section as='subsec'>{hdr}</Section>);
    // Flatten all paragraphs and map transform each to React nodes
    let contents = sections[i].content.flatMap((par, index) => {
      // TODO: Don't terminate mutation on aside or codeblock, as for now prioritize aside
      let volatileNode: React.ReactElement[] = [];
      let lastCode = sections[i].code[sections[i].code.length - 1];
      let lfIndex: number = 0;
      if (lastCode) {
        lfIndex = Number.parseInt(lastCode.match(/(?<=\$)([\d]+)$/)![1]) - 1;
        lfIndex < 0 ? 0 : lfIndex;
      }
      // Handle aside-first case
      let asideIndex: number | null = null;
      if (sections[i].aside[0]) {
        asideIndex = Number.parseInt(sections[i].aside[0].split(/\$/)[1]) ;
      }

      // console.log(`Index: ${index} as ${typeof index}\nlfIndex: ${lfIndex} as ${typeof lfIndex}\nasideIndex: ${asideIndex} as ${typeof asideIndex}`);

      if (asideIndex && (index === asideIndex - 1)) {
        let asideInserter; 
        if (asideIndex < lfIndex || lfIndex === 0 || !lfIndex) {
          asideInserter = insertAside(i, index, sections, par, hdr as string, true);
          sections = asideInserter.sections;
          volatileNode.push(asideInserter.volatileNode as React.ReactElement);
        } else {
          asideInserter = insertAside(i, index, sections, par, hdr as string);
          sections = asideInserter.sections;
          if (sections[i].code.length > 0) {
            let codeInserter;
            if (!asideIndex || (asideIndex && lfIndex > asideIndex)) {
              codeInserter = insertCodeBlock([i, index, sections, par, hdr as string, true]);
            } else {
              codeInserter = insertCodeBlock([i, index, sections, par, hdr as string]);
            }
            if (codeInserter) {
              sections = codeInserter.sections;
              volatileNode.push(codeInserter.volatileNode as React.ReactElement);
            }
            volatileNode.push(asideInserter.volatileNode as React.ReactElement);
          }
        }
      }

      if (sections[i].code.length > 0 && lfIndex && asideIndex && lfIndex < asideIndex || (lfIndex && !asideIndex)) {
        let codeInserter = insertCodeBlock([i, index, sections, par, hdr as string, true]);
        if (codeInserter) {
          sections = codeInserter.sections;
          volatileNode.push(codeInserter.volatileNode as React.ReactElement);
        }
      }


      if (volatileNode.length > 0) {
        return [...volatileNode];
      } else {
        // Default
        return semanticMultilineTransform(par);
      }
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

export default async function Post({ post }: { post: Awaited<ReturnType<typeof readPost>> }): Promise<React.ReactNode> {
  // console.log('Passed-0');
  if (post === null || post === undefined) notFound();
  // console.log('Passed-1');
  let sections = post.sections;
  let primAside: { type: string | undefined, content: React.ReactNode[] | string | undefined };
  console.log(sections[0].aside[0]);
  console.log(sections[0].content[0]);
  if (sections[0].aside[0] && sections[0].content[0]) {
    // console.log('Passed-2');
    let content: React.ReactNode[] = semanticTransform(sections[0].content[0]) as React.ReactNode[];
    sections[0].content.shift();
    primAside = {
      type: sections[0].aside.shift(),
      content: [...content], 
    };
    /** Adjust index of next aside
     *
     * Cannot parse pattern ($&) as Number, returns NaN
     * @see {@link {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace}}
     */
    if (sections[0].aside[0]) {
      sections[0].aside[0] = sections[0].aside[0].replace(/\d$/, `${sections[0].content.length - 1}`);
    }
  } else { 
    notFound();
  }

  let elements = (
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
        {post.subtitle}
      </SubHeader>
      <PrimaryContent>
        {project(sections)}
      </PrimaryContent>
    </ArticleProvider>
  );

  return elements;
}


