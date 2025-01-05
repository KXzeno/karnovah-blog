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
    String?: RegExp; // Do
    BaseVal?: RegExp;
    Paren?: RegExp; // Do
    Braces?: RegExp; // Do
    BinaryOp: RegExp; 
    Module?: RegExp;
    Identifier: RegExp;
  }

  type VolatileMarks = {
    mark: string;
    start: number;
    end: number;
  };

  const LuaRgx: LuaRgx = {
    Reserved: /\blocal\b|\bif\b|\bthen\b/g,
    Identifier: /(?<=\blocal\s)([\w]+\b)|\b[\w]+\d?(?=\.)/g,
    BinaryOp: /\B\+\B|\d\+\+|\+\+\d|\B\=\B/g,
    Braces: /((?=.*\))\()|((?<=\(.*)\))/g,
  }

  function getRangeDisjoint(marks: Array<VolatileMarks>) {
    // Sort marks to avoid reference-based initializition cohflict
    marks = marks.sort((mark1, mark2) => mark1.start - mark2.start);
    console.log(marks);
    let disjoints: Array<[number, number]> = [];
    for (let i = 0; i < marks.length; i++) {
      if (i === 0) {
        if (marks[i].start !== 0) {
          disjoints.push([0, marks[0].start]);
          continue;
        }
        continue;
      }
      if (!(marks[i - 1].end + 1 === marks[i].start)) {
        console.log([marks[i - 1].end, marks[i].start - 1]);
        disjoints.push([marks[i - 1].end, marks[i].start - 1]);
      }

      if (i === marks.length - 1) {
        disjoints.push([marks[i].end + 1, Number.MAX_SAFE_INTEGER]);
      }
    }
    // console.log(`Range Disjoints: ${disjoints}`);
    return disjoints;
  }

  function mapChildren(children: React.ReactElement[]): React.ReactNode {
    let termChildren: React.ReactElement[] = [];
    let volatileMarks: VolatileMarks[] = [];
    for (let i = 0; i < (children as React.ReactElement[]).length; i++) {
      let { children: content, className: classes }: { children: string, className: string } = children[i].props;
      let luaRgxProps = Object.entries(LuaRgx);
      for (let [id, rgx] of luaRgxProps) {
        // if (rgx !== LuaRgx.Reserved) {
        //   continue;
        // }
        let matches: RegExpStringIterator<RegExpExecArray> | null;
        // New line
        if (content == null) {
          matches = null;
        } else {
          // Create RegExp array of matches if valid
          matches = content.matchAll(rgx);
        }

        if (content && matches) {
          for (let match of matches) {
            volatileMarks.push({ mark: id, start: match.index, end: match.index + match['0'].length });
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
          // console.log(`Last used: [${lbRange[0][0]}, ${lbRange[0][1]}]`);
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
        termChildren.push(<code key={`line-${i + 1}`}>{...volatileNodes}</code>);
        volatileNodes = [];
      } else {
        termChildren.push(<code key={`line-${i + 1}`}>{content}</code>);
      }
      volatileMarks = [];
    }
    return termChildren;
  }

  export default function CodeBox({ children, lang, fileName }: CodeBoxProps) {
    return (
      lang === Lang.Lua && 
        <div className='code-box'>
          <div className='file-type'>
            <span>{fileName}</span>
          </div>
          <div className='code-multiline'>
            {mapChildren(children as React.ReactElement[])}
          </div>
        </div>
    )
  }

