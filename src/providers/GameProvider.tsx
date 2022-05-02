import { useConnection } from './ConnectionProvider'
import { useLoading } from './LoadingProvider'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useContext, createContext, useEffect } from 'react'
import { useToast } from './ToastProvider'
import type { INft } from '../providers/types.d'

interface IGameContext {
  playerNfts: any[]
  fetchNfts: () => any
  selectedNft: Nullable<INft>
  handleSelection: (nft: INft) => void
  readyToLaunch: boolean
  launchGame: () => void
}

const defaultGameContext: IGameContext = {
  playerNfts: [],
  fetchNfts: () => {},
  selectedNft: null,
  handleSelection: (nft: INft) => {},
  readyToLaunch: false,
  launchGame: () => {},
}

const GameContext = createContext(defaultGameContext)

const GameProvider = ({ children }: IProps) => {
  const [readyToLaunch, setReadyToLaunch] = useState<boolean>(false)
  const [selectedNft, setSelectedNft] = useState<Nullable<INft>>(null)
  const [playerNfts, setPlayerNfts] = useState<any[]>([])
  const { startLoading, stopLoading } = useLoading()
  const { isConnected, account } = useConnection()
  const { triggerError } = useToast()
  const web3Api = useMoralisWeb3Api()

  const normalizeResponse = (result: any[]) => {
    return result?.map((item) => {
      const openseaAddress = `https://testnets.opensea.io/assets/${item.token_hash}/${item.token_id}`

      const metadata = JSON.parse(item.metadata)
      return {
        tokenId: item.token_id,
        contractType: item.contract_type,
        contractName: item.name,
        tokenAddress: item.token_address,
        tokenOwner: item.owner_of,
        amount: item.amount,
        symbol: item.symbol,
        tokenUri: item.token_uri,
        objectName: metadata.name,
        objecetDesc: metadata.description,
        objectImageUrl: metadata.url,
        objectType: metadata.object_type,
        openseaAddress,
      }
    })
  }

  const fetchNfts = async () => {
    try {
      startLoading('fetching nfts')
      const { result }: any =
        (await web3Api.account.getNFTs({
          chain: 'rinkeby',
          address: account || '',
          token_addresses: [process.env.REACT_APP_GAME_CONTRACT || ''],
        })) || []
      const nftData = normalizeResponse(result)
      console.log({ result })
      console.log({ nftData })
      setPlayerNfts(nftData)
      stopLoading()
    } catch (e) {
      console.error(e)
      triggerError('There was an error fetching your nfts!')
    }
  }

  const launchGame = () => {
    if (!readyToLaunch) {
      triggerError('you must select a player')
      return
    }
  }

  const handleSelection = (nft: INft) => {
    setSelectedNft(nft)
  }

  useEffect(() => {
    const hasSelected = Object.values(selectedNft || {}).length !== 0
    if (hasSelected) {
      setReadyToLaunch(true)
      return
    }
    setReadyToLaunch(false)
  }, [selectedNft])

  useEffect(() => {
    if (isConnected) {
      fetchNfts()
    }
  }, [isConnected]) // eslint-disable-line

  return (
    <GameContext.Provider
      value={{
        playerNfts,
        fetchNfts,
        selectedNft,
        handleSelection,
        readyToLaunch,
        launchGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
