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

interface Section {
  section_id: number;
  header: string | null;
  postId: number;
  subheader: string | null;
  content: string[];
  img: string[];
  aside: string[];
}

async function recurseData(data: Array<Section>, step?: number) {
  if (step === undefined) step = 0;
  if (step === data.length) {
    return;
  } else { step += 1; }
  let section = data[step - 1];
  let header = section.header ?? section.subheader;
  console.log(header);

  return recurseData(data, step);

}

export default async function Test({ param }: { param: string }): Promise<React.AwaitedReactNode> {
  let post = await readPost(param);
  if (post === null || post === undefined) notFound();
  let sections: Array<Section> = post.Section;
  // for (let i = 0; i < sections.length; i++) {
  //   let { header, subheader, content } = sections[i];
  //   console.log(header, subheader, content);
  // }
   recurseData(sections);

  return (
    <ArticleProvider>
      <Header>
        {post.title}
      </Header>
      <SubHeader>
        {post.description}
      </SubHeader>


      <PrimaryContent>
        <Section>
          {'erm'}
        </Section>
        <Section as="body">
          <p>{'test'}</p>
        </Section>
        <Section as="body">
          <p>{'test'}</p>
        </Section>
      </PrimaryContent>
    </ArticleProvider>
  );
}

