'use client';
import React from 'react';

type CodeBoxProps = {
  children: React.ReactNode;
  lang: Lang | string;
  fileName: string;
}

export enum Lang {
  VIM = "Vimscript",
  LUA = "Lua",
  PWSH = "Powershell",
  TS = "TypeScript",
  TSX = "TypeScriptReact",
}

interface LuaRgx {
  Reserved: RegExp;
  Escaped?: RegExp;
  MethodInvocation?: RegExp;
  String: RegExp;
  BaseVal?: RegExp;
  Paren: RegExp; // Do
  Braces: RegExp;
  BinaryOp: RegExp; 
  Delimiter: RegExp;
  Module?: RegExp;
  Identifier: RegExp;
}

interface TypeScriptRgx {
  // Add return, if, and other keywords
  Null: RegExp,
  Comment: RegExp,
  Import: RegExp,
  TypeImport: RegExp,
  KeywordOp: RegExp,
  Keywords: RegExp,
  ArrowExp: RegExp,
  Variable: RegExp,
  Function: RegExp,
  Promise: RegExp,
  Destructured: RegExp,
  JSXTags: RegExp,
  JSXIdentifier: RegExp,
  JSXAttribute: RegExp,
  JSXRefVal: RegExp,
  InlineTypeClass: RegExp,
  InlineType: RegExp,
  InlinePredefinedType: RegExp,
  ParameterizedType: RegExp,
  TypeUnion: RegExp,
  AsKeyword: RegExp,
  Interface: RegExp,
  InterfaceIdentifier: RegExp,
} 

type VolatileMarks = {
  mark: string;
  start: number;
  end: number;
};

const RgxPatterns: {
  [key: string]: LuaRgx | TypeScriptRgx
} = {
  [Lang.LUA]: {
      Reserved: /\blocal\b|\bif\b|\bthen\b|function\b|end(?=\,|$)/g,
      Identifier: /(?<=\blocal\s)([\w]+\b)|\b[\w]+\d?(?=\.)|[\w]+(?=[\s]*\=)/g,
      BinaryOp: /\B\+\B|\d\+\+|\+\+\d|\B\=\B/g,
      Paren: /(\()(\))|((?=.*\))\()|((?<=\(.*)\))|\($|^\)|\((?=\{)|\)$/g,
      // String: /(?<=\').+(?=\')/g,
      String: /(?:\'|\").+(?:\'|\")/g,
      Braces: /[\{\}\[\]]/g,
      Delimiter: /\.|\,/g,
    },
  [Lang.TSX]: {
      Null: /(?<=\(|\=\s|\s\:\s)null(?=\)?)/g,
      Promise: /Promise(?=\<)/g,
      Comment: /(\/\/\s.+)|(\/\*\*)|(\*\s.+)|(\*\/)/g,
      Interface: /^[\s]*interface\b/g,
      InterfaceIdentifier: /^[\s]*(?:interface\s)([\w]+)/g,
      Destructured: /(?<=\{)[\s\,]+?(\w)+[\s\,]+?(?=\}\s\=|\}\:)|(?<=\(\s*|\{\s*)([\w]+?)(?=\sas|\s*\)\|\s*\})|(?<=as\s)([\w^\'\"\s]+)(?=\;|\s*\}|\s*\))|(?<=(?:const|let)\s[\w]+\s\{\s|(?:\=\s)\{\s[\w\s\,]+?)[\w]+(?=\,)*/g,
      InlineTypeClass: /(?<=\w\:\s)[\w]+|(?<=(?:type\s)\{\s)[\w]+(?=\,)*|(?<=\,\s)[\w]+(?=[\w\,\s^\"\']+?\})|(?<=\)\:\s)([\w]+)(?=\.*)/g,
      InlinePredefinedType: /(?<=\<(?:[\w\s\|]+)?)(null)(?=(?:[\w\s\|]+)?\>)/g,
      InlineType: /(?<=\:\s[\w]+\.)[\w]+(?!\;)/g,
      ParameterizedType: /(?<=\w\<)([A-Z]{1}[\w]+)/g,
      TypeUnion: /(?<=\w\<[\w\s]+?)(\|)(?=(?:[\w\s]+?)\>)/g,
      Import: /import\b|export\b|from\b/g,
      KeywordOp: /\bin\b/g,
      Keywords: /new\b|await\b|async\b|typeof\b/g,
      AsKeyword: /(?<=\{|\(|\=)(?:\s?[\w]+?\s)(as)(?=\s\w)/g,
      ArrowExp: /(?<=\)\s|\w\s)(\=\>)/g,
      Variable: /const\b|let\b/g,
      Function: /function\b/g,
      String: /(?:\'|\").+?(?:\'|\")/g,
      Identifier: /(?<!\/|\:\s)\b[\w]+\d?(?!\.\")(?=\.)|[\w]+(?=[\s]*\=)|(?<=\(|\{)([\w]+?)(?=\)|\})|([\w]+)(?=\:\s\w)|(?<=import\s)([\w]+)(?=\sfrom)|(?<=typeof\s)[\w]+|(?<=\()([\w]+)(?=\s\!\=\=)|(?<=\!\=\=\s)([\w]+)(?=\))/g,
      BinaryOp: /\B\+\B|\d\+\+|\+\+\d|\B\=\B[^\>]|(?<=\w)\=(?=\(|\{|\'|\")|(?<=\s)\:|\?(?=\s|$)|!!|\!(?=\.)|\!\=\=/g,
      Paren: /(\()(\))|((?=.*\))\()|((?<=\(.*)\))|\($|^\)|\((?=\{)|\)|((?<=\})\))$/g,
      Braces: /[\{\}\[\]]/g,
      Delimiter: /(?<=\w|\)|\])(?<!\")(\.)(?![\w]+\"|\")|\,/g,
      TypeImport: /(?<=import\s)(type)/g,
      JSXTags: /\<(?=\w|\/)|\>$|(?<=\<)\/|\/\>$/g,
      JSXIdentifier: /(?<=\<|\<\/)[\w]+(?=\>|\s[^\|])/g,
      JSXAttribute: /(?<=\s)[\w]+(?=\=)(?!\>)/g,
      JSXRefVal: /(?<=\=\(|\=\{)[\w\s\,]+?(?=\)|\})/g
    },
    [Lang.TS]: {
      Null: /(?<=\(|\=\s|\s\:\s)null(?=\)?)/g,
      Promise: /Promise(?=\<)/g,
      Comment: /(\/\/\s.+)|(\/\*\*)|(\*\s.+)|(\*\/)/g,
      Interface: /^[\s]*interface\b/g,
      InterfaceIdentifier: /^[\s]*(?:interface\s)([\w]+)/g,
      Destructured: /(?<=\{)[\s\,]+?(\w)+[\s\,]+?(?=\}\s\=|\}\:)|(?<=\(\s*|\{\s*)([\w]+?)(?=\sas|\s*\)\|\s*\})|(?<=as\s)([\w^\'\"\s]+)(?=\;|\s*\}|\s*\))|(?<=(?:const|let)\s[\w]+\s\{\s|(?:\=\s)\{\s[\w\s\,]+?)[\w]+(?=\,)*/g,
      InlineTypeClass: /(?<=\w\:\s)[\w]+|(?<=(?:type\s)\{\s)[\w]+(?=\,)*|(?<=\,\s)[\w]+(?=[\w\,\s^\"\']+?\})|(?<=\)\:\s)([\w]+)(?=\.*)/g,
      InlinePredefinedType: /(?<=\<(?:[\w\s\|]+)?)(null)(?=(?:[\w\s\|]+)?\>)/g,
      InlineType: /(?<=\:\s[\w]+\.)[\w]+(?!\;)/g,
      ParameterizedType: /(?<=\w\<)([A-Z]{1}[\w]+)/g,
      TypeUnion: /(?<=\w\<[\w\s]+?)(\|)(?=(?:[\w\s]+?)\>)/g,
      Import: /import\b|export\b|from\b/g,
      KeywordOp: /\bin\b/g,
      Keywords: /new\b|await\b|async\b|typeof\b/g,
      AsKeyword: /(?<=\{|\(|\=)(?:\s?[\w]+?\s)(as)(?=\s\w)/g,
      ArrowExp: /(?<=\)\s|\w\s)(\=\>)/g,
      Variable: /const\b|let\b/g,
      Function: /function\b/g,
      String: /(?:\'|\").+?(?:\'|\")/g,
      Identifier: /(?<!\/|\:\s)\b[\w]+\d?(?!\.\")(?=\.)|[\w]+(?=[\s]*\=)|(?<=\(|\{)([\w]+?)(?=\)|\})|([\w]+)(?=\:\s\w)|(?<=import\s)([\w]+)(?=\sfrom)|(?<=typeof\s)[\w]+|(?<=\()([\w]+)(?=\s\!\=\=)|(?<=\!\=\=\s)([\w]+)(?=\))/g,
      BinaryOp: /\B\+\B|\d\+\+|\+\+\d|\B\=\B[^\>]|(?<=\w)\=(?=\(|\{|\'|\")|(?<=\s)\:|\?(?=\s|$)|!!|\!(?=\.)|\!\=\=/g,
      Paren: /(\()(\))|((?=.*\))\()|((?<=\(.*)\))|\($|^\)|\((?=\{)|\)|((?<=\})\))$/g,
      Braces: /[\{\}\[\]]/g,
      Delimiter: /(?<=\w|\)|\])(?<!\")(\.)(?![\w]+\"|\")|\,/g,
      TypeImport: /(?<=import\s)(type)/g,
      JSXTags: /\<(?=\w|\/)|\>$|(?<=\<)\/|\/\>$/g,
      JSXIdentifier: /(?<=\<|\<\/)[\w]+(?=\>|\s[^\|])/g,
      JSXAttribute: /(?<=\s)[\w]+(?=\=)(?!\>)/g,
      JSXRefVal: /(?<=\=\(|\=\{)[\w\s\,]+?(?=\)|\})/g
    }
  }

  function getLangPatterns(lang: Lang | keyof typeof Lang) {
    const langOrNull = lang in Lang ? Lang[lang as keyof typeof Lang] : null;
    if (langOrNull === null) {
      throw new Error('Lang isn\'t an enum member.');
    }
    return Object.entries(RgxPatterns[langOrNull]);
  }

  function getRangeDisjoint(marks: Array<VolatileMarks>) {
    // Sort marks to avoid reference-based initializition conflict
    marks = marks.sort((mark1, mark2) => mark1.start - mark2.start);
    // console.log(marks);
    let disjoints: Array<[number, number]> = [];
    for (let i = 0; i < marks.length; i++) {
      if (i === 0) {
        // console.log('PASSED');
        if (marks[i].start !== 0) {
          disjoints.push([0, marks[0].start]);
          // Ensure rest of string on lines with 1 mark
        }
        if (marks.length === 1) {
          // console.log('PASSED AGAIN');
          disjoints.push([marks[i].end + 1, Number.MAX_SAFE_INTEGER]);
          return disjoints;
        }
        continue;
      }
      if (marks[i - 1].end + 1 !== marks[i].start && marks[i - 1].end !== marks[i].start) {
        disjoints.push([marks[i - 1].end, marks[i].start - 1]);
      }

      if (i === marks.length - 1) {
        disjoints.push([marks[i].end + 1, Number.MAX_SAFE_INTEGER]);
      }
    }
    // Ensure rest of string
    // console.log(`Range Disjoints: ${disjoints}`);
    return disjoints;
  }

  function mapChildren(children: React.ReactElement[], lang: Lang): React.ReactNode {
    let termChildren: React.ReactElement[] = [];
    let volatileMarks: VolatileMarks[] = [];
    for (let i = 0; i < children.length; i++) {
      let props = children[i].props as unknown as { children: string, className: string, 'data-tab'?: string };
      let { children: content, className: classes }: { children: string, className: string } = props;
      let tabs: string | null = props['data-tab'] || null;
      if (tabs) {
        let stop = typeof tabs === 'number' ? tabs : Number.parseInt(tabs) * 4;
        tabs = '';
        while (tabs.length !== stop) {
          tabs = tabs.replace(/(.*)/, " $1");
        }
      }

      const patterns = getLangPatterns(lang);

      let recentIndex = 0;
      let recentId;
      for (let [id, rgx] of patterns) {
        let matches: RegExpStringIterator<RegExpExecArray> | null;
        // New line
        if (content == null) {
          matches = null;
        } else {
          // Create RegExp array of matches if valid
          matches = content.matchAll(rgx);
        }

        if (id ==='Identifier') {
          if (content && content.length > 0) {
            // Dont repeat on JSX
            if (content.trimStart().at(0) === '\<') {
              continue;
            }
          }
        }

        if (content && matches) {
          for (let match of matches) {
            if (content.at(match.index - 2) === '\:') {
              switch (match[0]) {
                // Don't repeat on type annotations
                case 'Promise': {
                  if (id === 'InlineTypeClass') {
                    continue;
                  }
                }
                break;
              }
            }

            // Don't repeat on predefined values (null)
            if (match[0].includes('null') && id === 'Identifier') {
              continue;
            }

            // Don't repeat on keywords in parameterized types
            if (match[0].includes('typeof') && id === 'JSXIdentifier') {
              continue;
            }

            // Adjust index when matches include non-capturing groups
            if (match[0] && match[1] && match[0].length !== match[1].length) {
              volatileMarks.push({ mark: id, start: match.index + (match[0].length - match[1].length), end: match.index + match['0'].length });
            } else {
              volatileMarks.push({ mark: id, start: match.index, end: match.index + match['0'].length });
            }
            recentIndex = volatileMarks[volatileMarks.length - 1].end;
            recentId = volatileMarks[volatileMarks.length - 1].mark;
          }
        }
      }

      termChildren.push(<span key={`index-${i + 1}`} className='code-line-index'>{i + 1}</span>);
      if (volatileMarks.length > 0) {
        // console.log(volatileMarks);
        let disjoints = getRangeDisjoint(volatileMarks);
        // console.log(disjoints);
        let totalElem: number = volatileMarks.length + disjoints.length;
        let mins: number[] = [];

        disjoints.forEach(disjoint => mins.push(disjoint[0]));
        volatileMarks.forEach(mark => mins.push(mark.start));

        // console.log(`UNSORTED MINS: ${mins}`);
        mins.sort((p, n) => p - n);

        let volatileNodes: React.ReactElement[] = [];
        // Check previously used range for \s validation
        let lbRange: [[number, number]] = [[0, 0]];

        for (let i = 0; i < totalElem; i++) {
          let pendingAugment: boolean = !disjoints.some(range => range[0] === mins[0]);
          // console.log('DISJOINTS: ' + disjoints);
          if (pendingAugment) {
            // console.log(`${i}, this element should be augmented.`);
            let targetMark = volatileMarks.find(marked => marked.start === mins[0]);
            // console.log("MINS: " + mins);
            // console.log("VOLATILE: ", volatileMarks);
            // console.log("TARGET: " + targetMark);
            if (!targetMark) {
              return;
            }

            // \s|\w
            if (lbRange[0][1] !== targetMark.start) {
              let char: string = content.charAt(lbRange[0][1]);
              volatileNodes.push(<>{char}</>);
            }

            volatileNodes.push(
              <span className={`${targetMark.mark.toLowerCase()}`}>
                {`${content.substring(targetMark.start, targetMark.end)}`}
              </span>
            );
            if (targetMark.mark.toLowerCase() === 'comment') {
              break;
            }
            // console.log(`Last used: [${lbRange[0][0]}, ${lbRange[0][1]}]`);
            lbRange[0] = [targetMark.start, targetMark.end];
          } else {
            // console.log(`Last used: [${lbRange[0][0]}, ${lbRange[0][1]}]`);
            // console.log(`${i}, this element should be unfiltered.`);
            let targetDisjointed = disjoints.find(disjointed => disjointed[0] === mins[0]);

            if (!targetDisjointed) {
              return;
            }

            // \s | \w
            if (lbRange[0][1] !== targetDisjointed[0]) {
              let char: string = content.charAt(lbRange[0][1]);
              volatileNodes.push(<>{char}</>);
            }
            volatileNodes.push(
              <>
                {content.substring(targetDisjointed[0], targetDisjointed[1])}
              </>
            );
            lbRange[0] = [targetDisjointed[0], targetDisjointed[1]];
          }
          mins.shift();
        }
        termChildren.push(<code key={`line-${i + 1}`}>{tabs}{...volatileNodes}</code>);
        volatileNodes = [];
      } else {
        termChildren.push(<code key={`line-${i + 1}`}>{tabs}{content}</code>);
      }
      volatileMarks = [];
    }
    return termChildren;
  }

  interface ReducerState {
    code: string;
  }

  interface ReducerAction {
    type: 'code';
    courier?: {
      code: string;
    }
  }

  function reducer(state: ReducerState, action: ReducerAction): ReducerState {
    switch (action.type) {
      case 'code': {
        if (action.courier && action.courier.code) {
          if (state.code.length === 0) {
            return { code: action.courier.code };
          }
          return { code: `${state.code}\n${action.courier.code}` };
        } 
      }
      default: return { code: state.code };
    }
  }

  let initialState: ReducerState = {
    code: '',
  };

  export default function CodeBox({ children, lang, fileName }: CodeBoxProps) {
    // React reducer hook, as of v19, now returns the types of ReactReducer, except the action is an array
    let [state, dispatch] = React.useReducer<ReducerState, [ReducerAction]>(reducer, initialState);

    React.useEffect(() => {
      // On mount, add code to state for blob + clipboard API
      (children as React.ReactNode as React.ReactElement[]).forEach(child => {
        let props = child.props as unknown as { children: string, className: string, 'data-tab'?: string };
        let content = props.children;
        if (Object.keys(props).includes('data-tab')) {
          // Suppress null exception post-predicate
          let stop = content.length + Number.parseInt(props['data-tab']!) * 4;
          while (content.length !== stop) {
            content = content.replace(/(.*)/, " $1");
          }
        }
        dispatch({
          type: 'code',
          courier: {
            code: content ?? '\r',
          }
        })
      });
    }, []);

    return (
      lang in Lang && 
        <div className='code-box'>
          <div className='file-type'>
            <span>{fileName}</span>
            <span>
              <button
                onClick={async (evt: React.SyntheticEvent) => {
                  let blob = new Blob([state.code], { type: 'text/plain' });
                  let data = [new ClipboardItem({ ['text/plain']: blob })];
                  await navigator.clipboard.write(data);
                }}>
                {"\u{1F4CB}"}
              </button>
            </span>
          </div>
          <div className='code-multiline'>
            {mapChildren(children as React.ReactElement[], lang as Lang)}
          </div>
        </div>
    )
  }

