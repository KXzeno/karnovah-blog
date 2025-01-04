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
      let matches: RegExpStringIterator<RegExpExecArray> = content?.matchAll(LuaRgx.Reserved);
      if (matches) {
        let carrier: React.ReactElement[] = [];
        let fragmented: string[] = content.split(LuaRgx.Reserved);
        for (let match of matches) {
          while (fragmented[0].length !== 0) {
            carrier.push(<>{fragmented.shift()}</>);
            fragmented.shift();
          }
          carrier.push(<span key={fragmented.length} className='text-purple-400'>{match[0]}</span>);
          fragmented.shift();
          matches.drop(1);
        }
        while (fragmented.length !== 0) {
          carrier.push(<>{fragmented.shift()}</>);
        }
        console.log(carrier);
        let newNode: React.ReactNode = 
          <code className='text-inherit font-dosis'> {...carrier}</code>
          termChildren.push(<span className='px-2 select-none'>{i + 1}</span>);
          termChildren.push(newNode);
          continue;
      }
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

