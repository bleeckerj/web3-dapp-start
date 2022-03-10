import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Triplets from '../../Triplets.abi.json';

import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';

const contractAddress = '0x9fcEF82DAe1a4144cc327237eDb9aC928D1eC1Df';

const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// get the end user
const signer = provider.getSigner();
console.log(signer);
// get the smart contract
const contract = new ethers.Contract(contractAddress, Triplets, signer);
console.log(contract);
let promises = [];
let uriPrefix = await contract.uriPrefix()
let tripletsJSON = [];
let tripletsJSON_O = new Map();
console.log(uriPrefix);

for (let i = 1; i <= 30; i++) {
  let result = uriPrefix.replace("ipfs://", "https://ipfs.io/ipfs/")+i+".json";
  //console.log(result);
  promises.push(
  fetch(result)
     .then(res => res.json())
     .then(json => { 
          //console.log(json.image)
          var jsonObj = JSON.parse(JSON.stringify(json));
          var jsonStr = JSON.stringify(jsonObj, null, 2);
          // const buf = Buffer.from(jsonStr);
          // fs.writeFileSync('Triplets_'+i+'.json', buf);
          tripletsJSON.push(json);
          tripletsJSON_O.set(String(i), json);
          return json;
     })
  );
}


// Promises.all goes through all the promises
await Promise.all(promises).then((values) => {
  //console.log(values);
});

for(let i = 1; i <= tripletsJSON_O.size; i++) {
  //console.log(tripletsJSON_O.get(i));
}

function Home() {

  // const [totalMinted, setTotalMinted] = useState(0);
  // useEffect(() => {
  //   getCount();
  // }, []);

  // const getCount = async () => {
  //   const count = await contract.count();
  //   console.log(parseInt(count));
  //   setTotalMinted(parseInt(count));
  // };
  return (
    
  <div><WalletBalance />
    <Row>
      {Array.apply(0, Array(4)).map(function (_, i) {
        return <Col><LumberImage wtf={`${i+1}`}  foo="Hello"/></Col>;
      })}
  </Row>
  <Row>
      {Array.apply(0, Array(4)).map(function (_, i) {
        return <Col><LumberImage wtf={`${i+5}`}  foo="Hello"/></Col>;
      })}
  </Row>
    </div>
    );

  // return (
  //   <div>
  //     <WalletBalance />

  //     <h1>Fired Guys NFT Collection</h1>
  //     <div className="container">
  //       <div className="row">
  //         {Array(totalMinted + 1)
  //           .fill(0)
  //           .map((_, i) => (
  //             <div key={i} className="col-sm">
  //               <NFTImage tokenId={i} getCount={getCount} />
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // );
}

function LumberImage({wtf, foo}) {
  //console.log(wtf);
  const ipfs_url = tripletsJSON_O.get(wtf).image;
  //console.log(ipfs_url);
  let result = ipfs_url.replace("ipfs://", "https://ipfs.io/ipfs/");


  return(
<div className="card" style={{ width: '18rem' }}>
       <img className="card-img-top" src={true ? result : 'img/placeholder.png'}></img>
       <div className="card-body">
         <h5 className="card-title">ID #{wtf}</h5>
         <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
       {/* {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )} */}
      </div>
     </div>


  )

    return (<div>{result}</div>);
  }
// function NFTImage({ tokenId, getCount }) {
//   const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
//   const metadataURI = `${contentId}/${tokenId}.json`;
//   const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
// //   const imageURI = `img/${tokenId}.png`;

//   const [isMinted, setIsMinted] = useState(false);
//   useEffect(() => {
//     getMintedStatus();
//   }, [isMinted]);

//   const getMintedStatus = async () => {
//     const result = await contract.isContentOwned(metadataURI);
//     console.log(result)
//     setIsMinted(result);
//   };

   const mintToken = async () => {
//     const connection = contract.connect(signer);
//     const addr = connection.address;
//     const result = await contract.payToMint(addr, metadataURI, {
//       value: ethers.utils.parseEther('0.05'),
//     });

//     await result.wait();
//     getMintedStatus();
//     getCount();
   };

//   async function getURI() {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri);
//   }
//   return (
//     <div className="card" style={{ width: '18rem' }}>
//       <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
//       <div className="card-body">
//         <h5 className="card-title">ID #{tokenId}</h5>
//         {!isMinted ? (
//           <button className="btn btn-primary" onClick={mintToken}>
//             Mint
//           </button>
//         ) : (
//           <button className="btn btn-secondary" onClick={getURI}>
//             Taken! Show URI
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

export default Home;
