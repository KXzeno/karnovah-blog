import { Metadata } from 'next';

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex euismod, varius diam sed, iaculis lectus. Curabitur vitae eros in odio pellentesque viverra vitae eget mi. Donec ultricies eros sapien, quis vehicula risus dignissim sit amet. Quisque interdum placerat dolor. Aliquam sem erat, tristique aliquet nibh id, convallis dictum neque. Cras mattis sed ligula vitae fermentum. Etiam convallis ipsum et felis mollis, ut pretium dolor laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse dignissim, mi eget elementum posuere, lorem justo bibendum nulla, et mattis erat tortor ac felis. Vestibulum eget vehicula velit. Aliquam scelerisque magna ac lobortis semper. Donec sed risus ligula.

        Quisque ullamcorper enim in quam ullamcorper consectetur. Phasellus consequat nisl tortor, sit amet consectetur mi blandit tempor. Quisque aliquam nec lacus vel faucibus. In consequat, ante sit amet vulputate lobortis, lorem sapien suscipit mi, ut varius dolor mauris eu ante. Aliquam vel scelerisque ipsum. Nulla facilisi. Sed placerat ipsum tempus arcu sollicitudin, id aliquam ligula fringilla. Nam at dapibus urna, maximus feugiat urna. Donec sit amet odio quis nibh elementum lacinia. Donec ullamcorper volutpat erat, id consequat dui vulputate at. Praesent dolor nunc, egestas eu ex a, semper feugiat diam. Cras cursus ipsum massa, ut vehicula purus placerat quis.

        Cras dictum, nisi at posuere finibus, nulla lacus sollicitudin erat, vel vulputate sapien purus ac lorem. Quisque ac elit mattis tellus pharetra viverra. Proin blandit turpis facilisis metus porttitor, vel suscipit ligula pellentesque. Quisque porttitor orci non ligula eleifend, vel lobortis enim faucibus. Praesent et metus sit amet massa varius volutpat. Nunc feugiat, risus et eleifend suscipit, odio nisl consectetur augue, nec iaculis metus tellus ac lacus. Donec nec arcu nisl. Aenean felis diam, sollicitudin non sem id, viverra tristique purus. Nulla sit amet lectus tempus, suscipit dolor at, finibus eros.

        Fusce volutpat consequat enim at consequat. Nam dui quam, condimentum sit amet consequat sed, fringilla et turpis. Praesent sed sagittis enim. Etiam vel nunc sem. Aenean massa velit, pulvinar ut ullamcorper nec, porttitor a dui. Ut varius blandit viverra. Etiam sodales sed mi vitae eleifend.

        Integer non venenatis odio, in interdum nunc. In pharetra enim in lorem fermentum, eget posuere lectus blandit. Sed ornare lacinia lectus, laoreet interdum ante auctor non. Donec commodo accumsan lacinia. Aliquam felis nulla, sollicitudin non pharetra accumsan, pellentesque a velit. In a placerat enim, eleifend iaculis nisi. Etiam non velit euismod, semper arcu eget, lacinia ante. Vestibulum purus ipsum, auctor non eleifend id, rutrum at ex. Cras eget viverra sapien, quis maximus eros. Donec elementum dui vitae lectus eleifend, in auctor nibh malesuada. Donec facilisis maximus dolor sed euismod. Duis pretium nisl augue, eu elementum diam consectetur vel.

        Mauris euismod tellus vitae ipsum dignissim, vitae cursus odio sodales. Vestibulum sit amet mi est. Maecenas rhoncus at neque vel placerat. Ut elementum sem nulla, vel fermentum diam bibendum non. Etiam vel orci mi. Phasellus lobortis orci nulla, at sollicitudin nibh fermentum quis. Donec venenatis nec ligula et vulputate. Ut vel nibh tempor, maximus est sit amet, fringilla orci. Duis tempor venenatis faucibus. In maximus consectetur ipsum eget sodales. Curabitur elementum molestie arcu, id rhoncus libero eleifend pulvinar. Nullam aliquet, mauris non porta luctus, dolor diam ultrices nisi, at porta felis magna vel quam. Sed eu dui varius, eleifend risus non, accumsan nisl. Aliquam purus enim, volutpat sit amet quam eget, consectetur luctus sem.

        Fusce viverra auctor ullamcorper. Vestibulum tincidunt erat sit amet facilisis elementum. Ut mattis neque turpis, nec imperdiet orci facilisis vitae. Vivamus laoreet tincidunt libero, semper faucibus quam. Nam ac lacus quis risus consequat eleifend in sit amet nisi. Etiam suscipit augue ex, ultricies pellentesque ligula posuere vitae. Donec non lorem aliquam, interdum magna non, tincidunt metus. Fusce eget augue euismod, molestie felis cursus, facilisis metus. Mauris rhoncus, ante pharetra congue dictum, lectus nisi vulputate dui, at dignissim orci ipsum in nunc.

        Maecenas non tempus est, eget pellentesque augue. Proin iaculis ut enim sit amet congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus imperdiet porta dolor, vel eleifend ipsum aliquet vitae. Morbi feugiat, turpis pretium porttitor interdum, magna diam fringilla nisl, quis gravida turpis metus vitae dui. Praesent eleifend neque quis laoreet aliquam. Duis tempor tincidunt ligula, eget condimentum erat interdum at. Nullam vestibulum finibus est, quis hendrerit tortor tincidunt eu. Suspendisse ut sapien faucibus, molestie tellus at, lacinia elit. Duis interdum malesuada augue vitae pulvinar. Quisque viverra dictum urna eu consectetur. Fusce sodales viverra quam.

        In nisl ligula, dignissim eu ultricies vitae, egestas sit amet augue. Phasellus varius massa eros, ut ullamcorper nisi dapibus eget. Nulla rutrum lobortis neque a hendrerit. Nulla sed neque eget libero vehicula pulvinar at ut lorem. Pellentesque tristique, neque in facilisis iaculis, lorem sapien imperdiet ante, a mollis velit quam id elit. Duis orci tellus, euismod et arcu ac, vulputate iaculis nunc. Aliquam lacus sapien, interdum sed purus et, ultricies mollis enim. Vivamus ut quam id urna rhoncus condimentum nec in risus. In rhoncus vehicula libero eu accumsan. Nam sit amet ex id mi aliquet auctor. Sed condimentum justo sit amet condimentum pharetra. Proin ornare nulla non porta eleifend.

        Proin ac lacus tortor. Donec sit amet velit vel massa tincidunt mollis venenatis vitae ligula. Proin pretium erat quam, vel placerat orci efficitur quis. Nunc ullamcorper placerat arcu, id dignissim nisi scelerisque a. Sed molestie, justo et tincidunt consequat, leo ex dictum lectus, ac egestas augue risus id nulla. Aenean laoreet tincidunt malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id nisi eleifend, porttitor ante ut, fermentum turpis. Donec faucibus dolor et tortor maximus lobortis. Fusce scelerisque gravida euismod. Ut et luctus ipsum. Curabitur aliquet posuere dui quis gravida.
      </PrimaryContent>
    </ArticleProvider>
  );
}
