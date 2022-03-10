// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//const { fetchJson } = require("ethers/lib/utils");
const hre = require("hardhat");
const fetch = require('node-fetch');
const fs = require('fs');


async function main() {
  // fetch('https://api.github.com/users/github')
  //   .then(res => res.json())
  //   .then(json => console.log(json));
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const FiredGuys = await hre.ethers.getContractFactory("FiredGuys");
  // const firedGuys = await FiredGuys.deploy();

  // await firedGuys.deployed();

  // console.log("FiredGuys NFT deployed to:", firedGuys.address);
  const tripletsAddress = "0x9fcEF82DAe1a4144cc327237eDb9aC928D1eC1Df";
  const provider = new ethers.providers.JsonRpcProvider();
  const fs = require('fs')
  const abi = JSON.parse(fs.readFileSync('./Triplets.abi.json', 'utf8'))
  //console.log(abi)
  const triplets = await hre.ethers.getContractAt(abi, tripletsAddress);
  //console.log(triplets);
  let cost = await triplets.cost();
  console.log(cost);
  let totalSupply = await triplets.totalSupply();
  // console.log(totalSupply);
  // console.log(triplets.tokenURI(10));
  let promises = [];
  let uriPrefix = await triplets.uriPrefix()
  let tripletsJSON = [];
  let tripletsJSON_O = new Map();

  // go through all of the things on IPFS
  // and store fetches as an array of Promises
  // each fetch pushes the resulting fetch onto an Array of
  // json files in the tripletsJSON array
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
            const buf = Buffer.from(jsonStr);
            fs.writeFileSync('Triplets_'+i+'.json', buf);
            tripletsJSON.push(json);
            tripletsJSON_O.set(i, json);
            return json;
       })
    );
  }

  // Promises.all goes through all the promises
  await Promise.all(promises).then((values) => {
    //console.log(values);
  });
  
  for(let i = 1; i <= tripletsJSON_O.size; i++) {
    console.log(tripletsJSON_O.get(i));
  }

  // tripletsJSON.sort().forEach(element => {
  //   console.log(element.image);
  // })

//   let i = 1;
//   tripletsJSON.forEach(element => {
// //    fs.writeFileSync("triplets.json", element.st);
//     //console.log(JSON.stringify(element));
//     var jsonObj = JSON.parse(JSON.stringify(element));
//     var jsonStr = JSON.stringify(jsonObj, null, 2);
//     const buf = Buffer.from(jsonStr);
//     fs.writeFileSync('Triplets_'+i+'.json', buf);
//     i++;
//     console.log(buf.length);
//   })
//  fs.writeFileSync('Triplets.json', tripletsJSON);


  // await Promise.all(promises)
  // .then(function handleResponse(data) {
  //   return fetch("nearfuturelaboratory.com")
  //   .then(response => {
  //     if (response.ok) {
  //       // console.log(response);
  //       // console.log(response.json().image);
  //       // return response.json();
  //     }
  //     throw new Error(responsestatusText);
  //   });
  //   })
  //   .catch(function handleError(error) {
  //     console.log("Error" + error);
  // });

  //console.log(tripletsJSON);




  // let uriPrefix = await triplets.uriPrefix().then(
  //   function(value) {
  //     for (let i = 1; i < 20; i++) {
  //     let result = value.replace("ipfs://", "https://ipfs.io/ipfs/")+i+".json";
  //     //console.log(result);
  //     promises.push(
  //     fetch(result)
  //        .then(res => res.json())
  //        .then(json => console.log(json.image))
  //     );
  //   }
    
  // }
  // )

  // for (let i = 1; i <= maxSupply; i++ ) {
  //   await triplets.tokenURI(i).then(
  //     function(value) {
  //       //console.log(value);
  //       let result = value.replace("ipfs://", "https://ipfs.io/ipfs/");
  //       console.log(i);
  //       fetch(result)
  //       .then(res => res.json())
  //       .then(json => console.log(json));
  //     }
  //   );
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
