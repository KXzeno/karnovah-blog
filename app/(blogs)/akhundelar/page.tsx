import React from 'react';
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
// import ToC from '@M/ToC';

export const metadata: object = {
  title: "Akhundelar",
};

export default function Akhundelar(): React.ReactNode {

  return (
    <ArticleProvider>
      <Header>
        Akhundelar
      </Header>
      <SubHeader 
        AddHeader={
          <AddHeader
            HeaderNote={
              <HeaderNote>
                <Warning />
              </HeaderNote>
            }
          >
            This post is primarily made to find my way of dealing with <abbr title="Search Engine Optimization">SEO</abbr> and understanding my design system plus content flow.
          </AddHeader>
        }
      >
        We are all born with spears, but most are lead to think it is only gratifying when thrown.
      </SubHeader>
      <PrimaryContent>
        <Section>
          First
        </Section>
        <Section as="body">
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex euismod, varius diam sed, iaculis lectus. Curabitur vitae eros in odio pellentesque viverra vitae eget mi. Donec ultricies eros sapien, quis vehicula risus dignissim sit amet. Quisque interdum placerat dolor. Aliquam sem erat, tristique aliquet nibh id, convallis dictum neque. Cras mattis sed ligula vitae fermentum. Etiam convallis ipsum et felis mollis, ut pretium dolor laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse dignissim, mi eget elementum posuere, lorem justo bibendum nulla, et mattis erat tortor ac felis. Vestibulum eget vehicula velit. Aliquam scelerisque magna ac lobortis semper. Donec sed risus ligula.  </p>

          <p> Quisque ullamcorper enim in quam ullamcorper consectetur. Phasellus consequat nisl tortor, sit amet consectetur mi blandit tempor. Quisque aliquam nec lacus vel faucibus. In consequat, ante sit amet vulputate lobortis, lorem sapien suscipit mi, ut varius dolor mauris eu ante. Aliquam vel scelerisque ipsum. Nulla facilisi. Sed placerat ipsum tempus arcu sollicitudin, id aliquam ligula fringilla. Nam at dapibus urna, maximus feugiat urna. Donec sit amet odio quis nibh elementum lacinia. Donec ullamcorper volutpat erat, id consequat dui vulputate at. Praesent dolor nunc, egestas eu ex a, semper feugiat diam. Cras cursus ipsum massa, ut vehicula purus placerat quis.  </p>

          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque adipiscing commodo elit at imperdiet dui. In metus vulputate eu scelerisque felis imperdiet proin. Orci ac auctor augue mauris augue neque gravida in fermentum. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Metus vulputate eu scelerisque felis imperdiet. Erat velit scelerisque in dictum non consectetur a. Velit egestas dui id ornare. Enim sed faucibus turpis in. Mauris in aliquam sem fringilla.  </p>

          <p> Risus nec feugiat in fermentum posuere urna nec tincidunt. Sapien nec sagittis aliquam malesuada. Libero volutpat sed cras ornare arcu dui. Ultrices mi tempus imperdiet nulla malesuada. In est ante in nibh. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Interdum varius sit amet mattis vulputate enim nulla. Dui accumsan sit amet nulla facilisi morbi. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Nisi vitae suscipit tellus mauris. Lectus nulla at volutpat diam. Urna porttitor rhoncus dolor purus.  </p>

          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel ex euismod, varius diam sed, iaculis lectus. Curabitur vitae eros in odio pellentesque viverra vitae eget mi. Donec ultricies eros sapien, quis vehicula risus dignissim sit amet. Quisque interdum placerat dolor. Aliquam sem erat, tristique aliquet nibh id, convallis dictum neque. Cras mattis sed ligula vitae fermentum. Etiam convallis ipsum et felis mollis, ut pretium dolor laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse dignissim, mi eget elementum posuere, lorem justo bibendum nulla, et mattis erat tortor ac felis. Vestibulum eget vehicula velit. Aliquam scelerisque magna ac lobortis semper. Donec sed risus ligula.  </p>

          <p> Quisque ullamcorper enim in quam ullamcorper consectetur. Phasellus consequat nisl tortor, sit amet consectetur mi blandit tempor. Quisque aliquam nec lacus vel faucibus. In consequat, ante sit amet vulputate lobortis, lorem sapien suscipit mi, ut varius dolor mauris eu ante. Aliquam vel scelerisque ipsum. Nulla facilisi. Sed placerat ipsum tempus arcu sollicitudin, id aliquam ligula fringilla. Nam at dapibus urna, maximus feugiat urna. Donec sit amet odio quis nibh elementum lacinia. Donec ullamcorper volutpat erat, id consequat dui vulputate at. Praesent dolor nunc, egestas eu ex a, semper feugiat diam. Cras cursus ipsum massa, ut vehicula purus placerat quis.  </p>

          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque adipiscing commodo elit at imperdiet dui. In metus vulputate eu scelerisque felis imperdiet proin. Orci ac auctor augue mauris augue neque gravida in fermentum. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Metus vulputate eu scelerisque felis imperdiet. Erat velit scelerisque in dictum non consectetur a. Velit egestas dui id ornare. Enim sed faucibus turpis in. Mauris in aliquam sem fringilla.  </p>

          <p> Risus nec feugiat in fermentum posuere urna nec tincidunt. Sapien nec sagittis aliquam malesuada. Libero volutpat sed cras ornare arcu dui. Ultrices mi tempus imperdiet nulla malesuada. In est ante in nibh. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Interdum varius sit amet mattis vulputate enim nulla. Dui accumsan sit amet nulla facilisi morbi. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Nisi vitae suscipit tellus mauris. Lectus nulla at volutpat diam. Urna porttitor rhoncus dolor purus.  </p>
        </Section>
        <Section> 
          Second 
        </Section>
        <Section as="body">
          <p> Cras dictum, nisi at posuere finibus, nulla lacus sollicitudin erat, vel vulputate sapien purus ac lorem. Quisque ac elit mattis tellus pharetra viverra. Proin blandit turpis facilisis metus porttitor, vel suscipit ligula pellentesque. Quisque porttitor orci non ligula eleifend, vel lobortis enim faucibus. Praesent et metus sit amet massa varius volutpat. Nunc feugiat, risus et eleifend suscipit, odio nisl consectetur augue, nec iaculis metus tellus ac lacus. Donec nec arcu nisl. Aenean felis diam, sollicitudin non sem id, viverra tristique purus. Nulla sit amet lectus tempus, suscipit dolor at, finibus eros.  </p>

          <p> Fusce volutpat consequat enim at consequat. Nam dui quam, condimentum sit amet consequat sed, fringilla et turpis. Praesent sed sagittis enim. Etiam vel nunc sem. Aenean massa velit, pulvinar ut ullamcorper nec, porttitor a dui. Ut varius blandit viverra. Etiam sodales sed mi vitae eleifend.  </p> <p> Ac auctor augue mauris augue neque gravida. Cursus vitae congue mauris rhoncus. Hendrerit dolor magna eget est lorem ipsum. Est velit egestas dui id ornare arcu. Leo urna molestie at elementum eu facilisis sed odio. Tristique senectus et netus et. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Dictum at tempor commodo ullamcorper a lacus vestibulum. Aenean sed adipiscing diam donec adipiscing. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Elementum integer enim neque volutpat. At tellus at urna condimentum mattis pellentesque id nibh tortor. Ut diam quam nulla porttitor massa id neque aliquam. Dolor sit amet consectetur adipiscing elit. Volutpat est velit egestas dui. Placerat duis ultricies lacus sed turpis. Et tortor consequat id porta nibh venenatis. Tincidunt praesent semper feugiat nibh. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Scelerisque mauris pellentesque pulvinar pellentesque habitant.  </p>

          <p> Ornare massa eget egestas purus viverra accumsan in nisl nisi. Fusce id velit ut tortor pretium viverra. Molestie at elementum eu facilisis sed. Sit amet facilisis magna etiam tempor orci eu lobortis elementum. Et netus et malesuada fames. Felis bibendum ut tristique et egestas quis ipsum. Duis at tellus at urna. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing bibendum est ultricies integer quis. Morbi tempus iaculis urna id volutpat. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.  </p>

      </Section>
        <Section as="subsec"> Third </Section>
          <Section as="body">
          <p> Quisque ullamcorper enim in quam ullamcorper consectetur. Phasellus consequat nisl tortor, sit amet consectetur mi blandit tempor. Quisque aliquam nec lacus vel faucibus. In consequat, ante sit amet vulputate lobortis, lorem sapien suscipit mi, ut varius dolor mauris eu ante. Aliquam vel scelerisque ipsum. Nulla facilisi. Sed placerat ipsum tempus arcu sollicitudin, id aliquam ligula fringilla. Nam at dapibus urna, maximus feugiat urna. Donec sit amet odio quis nibh elementum lacinia. Donec ullamcorper volutpat erat, id consequat dui vulputate at. Praesent dolor nunc, egestas eu ex a, semper feugiat diam. Cras cursus ipsum massa, ut vehicula purus placerat quis.  </p>

          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque adipiscing commodo elit at imperdiet dui. In metus vulputate eu scelerisque felis imperdiet proin. Orci ac auctor augue mauris augue neque gravida in fermentum. Scelerisque viverra mauris in aliquam sem fringilla ut morbi. Metus vulputate eu scelerisque felis imperdiet. Erat velit scelerisque in dictum non consectetur a. Velit egestas dui id ornare. Enim sed faucibus turpis in. Mauris in aliquam sem fringilla.  </p>

          <p> Risus nec feugiat in fermentum posuere urna nec tincidunt. Sapien nec sagittis aliquam malesuada. Libero volutpat sed cras ornare arcu dui. Ultrices mi tempus imperdiet nulla malesuada. In est ante in nibh. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Interdum varius sit amet mattis vulputate enim nulla. Dui accumsan sit amet nulla facilisi morbi. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Nisi vitae suscipit tellus mauris. Lectus nulla at volutpat diam. Urna porttitor rhoncus dolor purus.  </p>
          </Section>
    </PrimaryContent>
    </ArticleProvider>
  );
}
