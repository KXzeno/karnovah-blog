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

  function mapChildren(children: React.ReactElement[]) {
    let termChildren: React.ReactElement[] = [];

    for (let i = 0; i < (children as React.ReactElement[]).length; i++) {
      termChildren.push(<span className='px-2 select-none'>{i + 1}</span>);
      termChildren.push(children[i]);
    }
    return termChildren;
  }

  export default function CodeBox({ children, lang, fileName }: CodeBoxProps) {
    return (
      lang === Lang.Lua && 
        <div className='text-green-300 text-xs bg-[#000000] w-full text-white border-2'>
          <div className='border-double border-b-2 p-[1.7px] pl-2 mb-4 -mt-4'>
            <span>{fileName}</span>
          </div>
          <div className='grid grid-cols-[max-content_1fr] p-0 text-[0.61rem]'>
            {mapChildren(children as React.ReactElement[])}
          </div>
        </div>
    )
  }

