// xGorilla
async function main() {
  // const xTransformersToken = await ethers.getContractFactory("xTransformersToken");
  // console.log("Deploying xTransformersToken...");
  // const _xTransformersToken = await xTransformersToken.deploy("XTR","XTR");
  // console.log("xTransformersToken deployed to:", _xTransformersToken.address);

  const TransformersNFT = await ethers.getContractFactory("TransformersNFT");
  console.log("Deploying TransformersNFT...");
  // const _TransformersNFT = await TransformersNFT.deploy("TransformersNFT","TransformersNFT",_xTransformersToken.address,"https://gateway.pinata.cloud/ipfs/QmdrNnEZEztJXtCK9QfYxZvK8WsV88Khm3w4kgkvSFNMAG/");
  const _TransformersNFT = await TransformersNFT.deploy("TransformersNFT","TransformersNFT","0xf397c357e32Ad554087c43d5fc6e5D4aa279a550","https://gateway.pinata.cloud/ipfs/QmdrNnEZEztJXtCK9QfYxZvK8WsV88Khm3w4kgkvSFNMAG/");
  console.log("TransformersNFT deployed to:", _TransformersNFT.address);

}

// 这里也可以简化为 main()，后面的都省略也可以
main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });