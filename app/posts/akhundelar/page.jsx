import React from 'react';
import Nav from '@M/Nav';
import Footer from '@M/Footer';
import { Warning } from '@M/Icons';
import '../pages.css';
import ArticleProvider, { 
  Header,
  SubHeader,
  AddHeader,
  HeaderNote,
  PrimaryContent,
  RightMargin,
} from '@P/ArticleProvider';
import Section from '@M/Section';
import ToC from '@M/ToC';

export const metadata = {
  title: "Akhundelar",
};

//TODO: Refactor

export default function Akhundelar() {

  return (
    <ArticleProvider
      RightMargin={
        <>
          <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span> <span> Test </span>
        </>
      }
    >
      <Header>
          <ToC />
        Akhundelar
      </Header>
      <SubHeader 
        AddHeader={
          <AddHeader>
            This post is primarily made to find my way of dealing with <abbr title="Search Engine Optimization">SEO</abbr> and understanding my design system plus content flow.
            <HeaderNote>
              <Warning />
            </HeaderNote>
          </AddHeader>
        }
      >
        We are all born with spears, but most are lead to think it is only gratifying when thrown.
      </SubHeader>
      <PrimaryContent>
        <Section>
          Ok Ok Ok Ok Ok
        </Section>
        <Section as="subsec">
          Ok Ok
        </Section>
        <Section as="body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex euismod, varius diam sed, iaculis lectus. Curabitur vitae eros in odio pellentesque viverra vitae eget mi. Donec ultricies eros sapien, quis vehicula risus dignissim sit amet. Quisque interdum placerat dolor. Aliquam sem erat, tristique aliquet nibh id, convallis dictum neque. Cras mattis sed ligula vitae fermentum. Etiam convallis ipsum et felis mollis, ut pretium dolor laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse dignissim, mi eget elementum posuere, lorem justo bibendum nulla, et mattis erat tortor ac felis. Vestibulum eget vehicula velit. Aliquam scelerisque magna ac lobortis semper. Donec sed risus ligula.
        </Section>
        <Section as="body">
          Quisque ullamcorper enim in quam ullamcorper consectetur. Phasellus consequat nisl tortor, sit amet consectetur mi blandit tempor. Quisque aliquam nec lacus vel faucibus. In consequat, ante sit amet vulputate lobortis, lorem sapien suscipit mi, ut varius dolor mauris eu ante. Aliquam vel scelerisque ipsum. Nulla facilisi. Sed placerat ipsum tempus arcu sollicitudin, id aliquam ligula fringilla. Nam at dapibus urna, maximus feugiat urna. Donec sit amet odio quis nibh elementum lacinia. Donec ullamcorper volutpat erat, id consequat dui vulputate at. Praesent dolor nunc, egestas eu ex a, semper feugiat diam. Cras cursus ipsum massa, ut vehicula purus placerat quis.
        </Section>
        <Section>Bruh Bruh</Section>
        <Section as="subsec">Bruh</Section>
        <Section as="body">
          Cras dictum, nisi at posuere finibus, nulla lacus sollicitudin erat, vel vulputate sapien purus ac lorem. Quisque ac elit mattis tellus pharetra viverra. Proin blandit turpis facilisis metus porttitor, vel suscipit ligula pellentesque. Quisque porttitor orci non ligula eleifend, vel lobortis enim faucibus. Praesent et metus sit amet massa varius volutpat. Nunc feugiat, risus et eleifend suscipit, odio nisl consectetur augue, nec iaculis metus tellus ac lacus. Donec nec arcu nisl. Aenean felis diam, sollicitudin non sem id, viverra tristique purus. Nulla sit amet lectus tempus, suscipit dolor at, finibus eros.
        </Section>
        <Section as="body">
          Fusce volutpat consequat enim at consequat. Nam dui quam, condimentum sit amet consequat sed, fringilla et turpis. Praesent sed sagittis enim. Etiam vel nunc sem. Aenean massa velit, pulvinar ut ullamcorper nec, porttitor a dui. Ut varius blandit viverra. Etiam sodales sed mi vitae eleifend.
        </Section>
      </PrimaryContent>
    </ArticleProvider>
  );
}
