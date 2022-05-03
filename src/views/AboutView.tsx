import { MainLayout } from '../components/Layout/MainLayout'
import { HeaderText } from '../components/shared/HeaderText'
import { SectionContainer } from '../components/shared/SectionContainer'
import { UnorderedList, ListItem } from '../components/shared/Lists'
import { SubHeading } from '../components/shared/SubHeading'
import { Paragraph } from '../components/shared/Paragraph'

export const AboutView = () => {
  return (
    <MainLayout>
      <SectionContainer>
        <HeaderText>About</HeaderText>
        <Paragraph>
          Blockchain Battle Arena is a battle game for your NFT characters.
        </Paragraph>
        <SubHeading>Contributors</SubHeading>
        <UnorderedList>
          <ListItem>StrictlyKappa</ListItem>
          <ListItem>Jovan Jester</ListItem>
          <ListItem>Rimraf</ListItem>
        </UnorderedList>
        <SubHeading>Tech Stack</SubHeading>
        <UnorderedList>
          <ListItem>React/TypeScript</ListItem>
          <ListItem>Kaboom game engine</ListItem>
          <ListItem>Solidity on Rinkeby</ListItem>
        </UnorderedList>
        <SubHeading>Coming Soon</SubHeading>
        <UnorderedList>
          <ListItem>Multiplayer</ListItem>
          <ListItem>Use your NFTs on the Ethereum mainnet</ListItem>
        </UnorderedList>
      </SectionContainer>
    </MainLayout>
  )
}
