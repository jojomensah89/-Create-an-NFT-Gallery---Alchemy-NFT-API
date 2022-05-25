
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from './components/nftCard'

const Home= () => {
  const [wallet,setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const fetchNFTs = async() =>{
    let nfts;
    console.log("fetching nfts");
    const api_key= "9ex_ZGUo0QKtkWchDBeXyyOfnzPKEqmY"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    if(!collection.length){
      var requestOptions = {
        method: 'GET'
      };
     
      const fetchURL = `${baseURL}?owner=${wallet}`;
      
      nfts = await fetch(fetchURL, requestOptions).then(data =>data.json())

    }else{
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data =>data.json())

    }
    if(nfts){
      console.log(nfts)
      setNFTs(nfts.ownedNfts)
    }

  }

  const fetchNFTsForCollection = async () => {
    if (collection.length){
      var requestOptions = {
        method: 'GET'
      };
     
      const api_key= "9ex_ZGUo0QKtkWchDBeXyyOfnzPKEqmY"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL, requestOptions).then(data =>data.json())
    if(nfts){
      console.log("NFTs in collection",nfts)
      setNFTs(nfts.nfts)
    }
   
  }
  }

 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type="text" className="" placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type="text" className="" placeholder="Add your collection address"></input>
        <label className="text-gray-600 " htmlFor=""><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type="checkbox" />Fetch for Coollection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          ( ) => {
            if (fetchNFTsForCollection){
              fetchNFTsForCollection()
             
            } else fetchNFTs()
          }
        }>Lets go</button>

      </div>
      <div  className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return(
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
