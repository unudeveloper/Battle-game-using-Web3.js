import { MainLayout } from '../components/Layout/MainLayout'
import styled from 'styled-components'
import { COLORS, SIZES, FONTS, SPACING } from '../styles'
import { SectionContainer } from '../components/shared/SectionContainer'
import { Paragraph } from '../components/shared/Paragraph'
import { HeaderText } from '../components/shared/HeaderText'
import { SubHeading } from '../components/shared/SubHeading'

const HomeSectionContainer = styled(SectionContainer)`
  text-align: left;
  padding: ${SPACING.medium} ${SPACING.medium} ${SPACING.large};
  margin: ${SPACING.primary} 0;
`


const TextContainer = styled.div`
  margin: 0;
`

const EmphasisText = styled.span`
  all: revert;
  font-family: ${FONTS.heading};
  font-weight: 900;
`

const UnorderedList = styled.ul`
  revert: all;
  margin: 0;
  padding: 0;
  font-family: co-text, sans-serif;
  list-style: none;
`

const LineItem = styled.li`
  margin: ${SPACING.primary} 0;
  font-size: ${SIZES.paragraph};
  line-height: 1.6rem;
  &:before {
    content: '> ';
    color: ${COLORS.redPink};
    font-weight: bold;
  }
`

export const HomeView = () => {
  return (
    <MainLayout>
      <>
        <HomeSectionContainer>
          <HeaderText>Welcome</HeaderText>
          <TextContainer>
            <Paragraph>
              <EmphasisText>Blockchain Battle Arena </EmphasisText>
              is a battle game for your NFT characters. We have included a small
              sample NFT collection with some exciting innovations beyond that
              of the ERC721 NFT standard that is used by most profile picture
              NFT collectibles today.
            </Paragraph>
            <SubHeading>What's different about our NFTs?</SubHeading>
            <Paragraph>
              Though if you mint a sample NFT it will show up on the testnets
              OpenSea marketplace without seeming too different from other NFTs,
              underneath the hood they have a few key differences:
            </Paragraph>
          </TextContainer>
          <UnorderedList>
            <LineItem>
              Accessories are separate NFTs that can be equipped on a character
              NFT
            </LineItem>
            <LineItem>
              The child/accesory NFTs can be attached to another NFT as long as
              you are the owner or they can be listed on OpenSea in their own
              right. Transferring or selling an accessory NFT will detach it
              from its parent NFT.
            </LineItem>
            <LineItem>
              This parent NFT can store positioning metadata onchain for all
              accessory NFTs, thus allowing more flexibility in sharing
              accessories between different styles of NFT collections
            </LineItem>
            <LineItem>
              Finally, our proposal includes a method on the NFT smart contract
              to get the token URI for a background free version of the NFT
              character image, allowing drop in use in games or other web3
              applications
            </LineItem>
          </UnorderedList>
        </HomeSectionContainer>
        {/* <div className='home section'>
        <h1 className='main-heading'>Welcome</h1>
        <p>
          <span className='bcba'>Blockchain Battle Arena </span>
          is a battle game for your NFT characters. We have included a small
          sample NFT collection with some exciting innovations beyond that of
          the ERC721 NFT standard that is used by most profile picture NFT
          collectibles today.
        </p>
        <h3>What's different about our NFTs?</h3>
        <p>
          Though if you mint a sample NFT it will show up on the testnets
          OpenSea marketplace without seeming too different from other NFTs,
          underneath the hood they have a few key differences:
        </p>
        <ul>
          <li>
            Accessories are separate NFTs that can be equipped on a character
            NFT
          </li>
          <li>
            The child/accesory NFTs can be attached to another NFT as long as
            you are the owner or they can be listed on OpenSea in their own
            right. Transferring or selling an accessory NFT will detach it from
            its parent NFT.
          </li>
          <li>
            This parent NFT can store positioning metadata onchain for all
            accessory NFTs, thus allowing more flexibility in sharing
            accessories between different styles of NFT collections
          </li>
          <li>
            Finally, our proposal includes a method on the NFT smart contract to
            get the token URI for a background free version of the NFT character
            image, allowing drop in use in games or other web3 applications
          </li>
        </ul>
      </div> */}
      </>
    </MainLayout>
  )
}
