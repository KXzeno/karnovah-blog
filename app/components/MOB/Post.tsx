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
      if (sections[i].aside[0] && index + 1 === Number.parseInt(sections[i].aside[0].split(/\$/)[1])) {
        // @ts-expect-error
        let content: React.ReactNode[] | string = sections[i].content[index + 1];
        // @ts-expect-error
        let asideType: string = (sections[i].aside.shift() as string).split(/\$/)[0].toLowerCase();
        // @ts-expect-error
        sections[i].content[index + 1] = '';
        let frags = (content as string).split(/(?:\<(\S+)\>)/);
        // Implement lesser ver. of styling algorithm below
        if (frags.length > 1) {
          let newContent = new SinglyLinkedList<string | React.ReactNode>();
          for (let i = 2; i < frags.length; i += 4) {
            newContent.addLast(frags[i - 2]);
            let Style = frags[i - 1] as keyof JSX.IntrinsicElements;
            newContent.addLast(<Style>{frags[i]}</Style>)
            if ((i + 4) > frags.length && i < frags.length - 1) {
              newContent.addLast(frags[frags.length - 1]);
            }
          }
          let final: React.ReactNode[] = [];
          while (!newContent.isEmpty()) {
            final.push(<>{newContent.removeFirst()}</>);
          }
          content = final;
        } else {
          content = [<>{content}</>];
        }
        return (
          <>
            <p key={i}>{par}</p>
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
       */
      if (par.length > 0) {
        // TODO: Handle bold font and migrate algorithm logic to function for reusability and adaptability
        let enriched = new SinglyLinkedList<string | React.ReactNode>();
        let enrich = par.split(/(?:\<(\S+)\>)/);
        if (enrich && enrich.length > 2) {
          for (let i = 2; i < enrich.length; i += 4) {
            /** @see {@link https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#handbook-content}
             *  keyof creates a union type of a type's keys
             */
            let Style = enrich[i - 1] as keyof JSX.IntrinsicElements;
            enriched.addLast(enrich[i - 2]);
            enriched.addLast(<Style>{enrich[i]}</Style>);
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
        return (<p key={i}>{[...node]}</p>);
      }
    });
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
  let sections: Array<unknown> = post.sections;
  let primAside: { type: string | undefined, content: React.ReactNode[] | string | undefined };
  // @ts-expect-error
  if (sections[0].aside[0] && sections[0].content[0]) {
    // @ts-expect-error
    let content: React.ReactNode[] | string = sections[0].content[0];
    // @ts-expect-error
    sections[0].content.shift();
    let frags = (content as string).split(/(?:\<(\S+)\>)/);
    let newContent = new SinglyLinkedList<React.ReactNode | string>();
    if (frags.length > 1) {
      for (let i = 2; i < frags.length; i += 4) {
        newContent.addLast(frags[i - 2]);
        let Style = frags[i - 1] as keyof JSX.IntrinsicElements;
        newContent.addLast(<Style>{frags[i]}</Style>);
        if (i < frags.length - 1 && (i + 4) > frags.length) {
          newContent.addLast(frags[frags.length - 1]);
        }
      }
      let cache: React.ReactNode[] = [];
      while (!newContent.isEmpty()) {
        cache.push(<>{newContent.removeFirst()}</>);
      }
      content = cache;
    } else {
      content = [<>{frags[0]}</>];
    }

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
                <Warning type={`${primAside.type}`}/>
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

