import React from 'react';

type CodeBoxProps = {
  children: React.ReactNode;
  lang: Lang;
  fileName: string;
}

enum Lang {
  Vimscript = "VIMSCRIPT",
    Lua = "LUA",
    Powershell = "POWERSHELL",
}

  type LuaRgx = {
    Reserved: RegExp;
    Escaped?: RegExp;
    MethodInvocation?: RegExp;
    String?: RegExp;
    BaseVal?: RegExp;
    Paren?: RegExp;
    Braces?: RegExp;
    BinaryOp?: RegExp;
    Module?: RegExp;
  }

  const LuaRgx: LuaRgx = {
    Reserved: /\blocal\b|\bif\b|\bthen\b/g,
  }

  function mapChildren(children: React.ReactElement[]) {
    let termChildren: React.ReactElement[] = [];

    for (let i = 0; i < (children as React.ReactElement[]).length; i++) {
      let { children: content, className: classes }: { children: string, className: string } = children[i].props;
      // Create RegExp array of matches
      let matches: RegExpStringIterator<RegExpExecArray> = content?.matchAll(LuaRgx.Reserved);
      if (matches) {
        // Prepare final node transformation
        let carrier: React.ReactElement[] = [];
        // Split html content by match
        let fragmented: string[] = content.split(LuaRgx.Reserved);
        for (let match of matches) {
          // If index 0 contains content, append it to carrier node
          while (fragmented[0].length !== 0) {
            carrier.push(<>{fragmented.shift()}</>);
            fragmented.shift();
          }
          // If index 0 does not contain content, it is a keyword
          // Map it as a styled span element and append to carrier node
          carrier.push(<span key={fragmented.length} className='text-purple-400'>{match[0]}</span>);
          fragmented.shift();
          // Ensure iterable deletion
          matches.drop(1);
        }
        // Append all unchecked content to carrier node
        while (fragmented.length !== 0) {
          carrier.push(<>{fragmented.shift()}</>);
        }
        let newNode: React.ReactNode = <code className='text-inherit font-dosis'> {...carrier}</code>
        // Create auto-index on mapped node
        termChildren.push(<span className='px-2 select-none'>{i + 1}</span>);
        termChildren.push(newNode);
        continue;
      }
      // Create auto-index
      termChildren.push(<span className='px-2 select-none'>{i + 1}</span>);
      termChildren.push(children[i]);
    }
    return termChildren;
  }

  export default function CodeBox({ children, lang, fileName }: CodeBoxProps) {
    return (
      lang === Lang.Lua && 
        <div className='text-green-300 text-xs bg-[#000000] w-full border-2'>
          <div className='border-double border-b-2 p-[1.7px] pl-2 mb-4 -mt-4'>
            <span>{fileName}</span>
          </div>
          <div className='grid grid-cols-[max-content_1fr] p-0 text-[0.61rem]'>
            {mapChildren(children as React.ReactElement[])}
          </div>
        </div>
    )
  }

