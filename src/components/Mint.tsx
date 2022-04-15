import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../game/constants";
import BattleArenaNFT from "../game/util/BattleArenaNFT.json";

import Header from "./Header";
import Navbar from "./Navbar";

export default function Mint() {
    const [mintContract, setMintContract] = useState<Contract>();
    const [lastTokenId, setLastTokenId] = useState<number>(0);
    const [lastIndex, setLastIndex] = useState<number>(0);

    const [isMinting, setIsMinting] = useState(false);
    const [isMintComplete, setIsMintComplete] = useState(false);
    
    const navigate = useNavigate();


    const ShowMintedNFT = () => {
        let imgUrl: string  = "";
        if (lastIndex !== 0) {
            switch (lastIndex) {
                case 1:
                    imgUrl = "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png";
                    break;
                case 2:
                    imgUrl = "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png";
                    break;
                case 3:
                    imgUrl = "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png";
                    break;
                case 4:
                    imgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png";
                    break;
                case 5:
                    imgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png";
                    break;
                case 6:
                    imgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png";
                    break;
            }
        }
        return <div>
            <img alt="Blockchain Battle Arena NFT" src={imgUrl} />
            <h2>Mint an accessory</h2>
    <p>Click on an accessory to mint it.</p>

            <div className="items-container">
                        <div className="accessory-image image" id="cigarette" onClick={mintAccessory(4)}></div>
                        <div className="accessory-image image" id="eyelenser" onClick={mintAccessory(5)}></div>
                        <div className="accessory-image image" id="hat" onClick={mintAccessory(6)}></div>

                    </div>
        </div>;
    };


    const mintCharacter = (characterIndex: number) => async () => {
        try {
            if (mintContract) {
                setIsMinting(true);
                console.log("started minting character NFT w/ index:", characterIndex);
                const mintTxn = await mintContract.mintCharacter(characterIndex);
                await mintTxn.wait();
                console.log("mintCharacter successful: ", mintTxn);
                setIsMinting(false);
            }
        } catch (error) {
            setIsMinting(false);
            console.warn("mintCharacter failed: ", error);
        }
    };

    const mintAccessory = (accessoryIndex: number) => async () => {
        try {
            if (lastTokenId === 0) throw new Error("Can't mint accessory without a character NFT first");
            if (mintContract) {
                setIsMinting(true);
                console.log("started minting accessory NFT w/ index:", accessoryIndex);
                const mintTxn = await mintContract.mintAccessoryWithDefaults(accessoryIndex, lastTokenId);
                await mintTxn.wait();
                console.log("mintAccessory successful: ", mintTxn);
                setIsMinting(false);
            }
        } catch (error) {
            setIsMinting(false);
            console.warn("mintAccessory failed: ", error);
        }
    };

    function getOpenSeaLink() {
        return !isMinting && <p>Click <a href={"https://testnets.opensea.io/assets/" + mintContract + lastTokenId} target="_blank" rel="noreferrer">here to view it on OpenSea</a>. It may take a minute or so to appear.</p>
    }

    function getGameLaunchButton() {
        return !isMinting && <button onClick={() => { navigate("/launch-game") }}>Launch Game</button>
    }

    useEffect(() => {

        const onCharacterMint = async (sender: string, tokenId: any, characterIndex: any) => {
            setIsMintComplete(true);
            setLastTokenId(tokenId.toNumber());
            setLastIndex(characterIndex.toNumber());
            console.log("onCharacterMint: ", sender, lastTokenId, lastIndex);

        };

        const { ethereum } = window as any;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const mintContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                BattleArenaNFT.abi,
                signer
            );

            setMintContract(mintContract);
            mintContract.on("CharacterNFTMinted", onCharacterMint);
        } else {
            throw new Error("No ethereum provider found");
        }
    }, [lastTokenId, lastIndex]);



    return (
        <>
            <main>
                <Header />
                <Navbar />
                <div className="logo">

                </div>
                <div className={isMinting ? "premint container minting" : "premint container"}>
                    <h1>Mint a character</h1>
                    <p>Click on a character to mint it. Minting is free and only costs gas payable with fake ETH on the Rinkeby testnet.</p>
                    <div className="items-container">
                        <div className="character-image image" id="character1" onClick={mintCharacter(1)}></div>
                        <div className="character-image image" id="character2" onClick={mintCharacter(1)}></div>
                        <div className="character-image image" id="character3" onClick={mintCharacter(3)}></div>

                    </div>
                    
                </div>
                <div className={isMinting ? "aftermint container minting" : "aftermint container"}>
                    {isMinting && (
                        <h1>Minting in progress...</h1>)}
                    {!isMinting && isMintComplete && (
                        <h1>Minting complete</h1>)}
                    {getOpenSeaLink()}
                    {isMintComplete && (<ShowMintedNFT />)}
                    {getGameLaunchButton()}
                </div>
            </main>
        </>
    );
}
