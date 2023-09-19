import Web3 from "web3";
import { setAlert } from "./store";
import abis from "./contracts/abis";
import { TRANSFORMERS_ADDRESS, TT_ADDRESS } from "./constants";
import { parseUnits } from "ethers/lib/utils.js";
import { useNetwork } from "wagmi";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);


const getTNFTContract = async () => {
  const web3 = window.web3;
  const contract = new web3.eth.Contract(
    abis.TransformersNFT,
    TRANSFORMERS_ADDRESS
  );
  return contract;
};

const getERC20Contract = async () => {
  const web3 = window.web3;
  const contract = new web3.eth.Contract(abis.erc20, TT_ADDRESS);
  return contract;
};

const mint = async (address, name, freeRole) => {
  try {
 
    const contract = await getTNFTContract();
    if (freeRole) {
      await contract.methods.mint(name).send({ from: address });
    } else {
      await contract.methods
        .mint(name)
        .send({ from: address, value: parseUnits("0.01") });
    }
  } catch (error) {
    reportError(error);
  }
};
const alreadyMint = async (address) => {
  try {
    if (address === undefined) {
      return false;
    }
    const contract = await getTNFTContract();
    return await contract.methods.alreadyMint(address).call();
  } catch (error) {
    // reportError(error);
  }
};
const hasFreeMintRole = async (address) => {
  try {
    if (address === undefined) {
      return false;
    }
    const contract = await getTNFTContract();
    return await contract.methods
      .hasRole(
        "0x3e53b27a64443338f5e45001d35ae0ee79798d80c56e4ebc2e85ac39efb9cc84",
        address
      )
      .call();
  } catch (error) {
    // reportError(error);
  }
};

const getTinfo = async (address,alreadyMinted) => {
  try {
    if (address === undefined || alreadyMinted == false) {
      return "";
    }
    const contract = await getTNFTContract();
    return await contract.methods
      ._TransformerInfo(
        address
      )
      .call();
  } catch (error) {
    
    // reportError(error);
  }
};

const fight = async (address) =>{
  try{
    const contract = await getTNFTContract();
    await contract.methods.fight().send({ from: address });
  }catch(error){
    reportError(error);
  }
    
  
}

const getFightReward = async (address,alreadyMinted) => {
  try {
    if (address === undefined || alreadyMinted == false) {
      return 0;
    }
    const contract = await getTNFTContract();
    return await contract.methods
      .calculateRewards(
        address
      )
      .call();
  } catch (error) {
    // reportError(error);
  }
};
const Trest = async (address)=>{
  try{
    const contract = await getTNFTContract();
    await contract.methods.rest().send({ from: address });
  }catch(error){
    reportError(error);
  }
}


const getxtsBalance = async (address) => {
  try {
    if (address === undefined ) {
      return 0;
    }
    const contract = await getERC20Contract();
    return await contract.methods
      .balanceOf(
        address
      )
      .call();
  } catch (error) {
    // reportError(error);
  }
};

const cast = async (address)=>{
  try{
    const contract = await getTNFTContract();
    await contract.methods.cast().send({ from: address });
  }catch(error){
    reportError(error);
  }
}

const getxtsAllowance = async (address) => {
  try {
    if (address === undefined ) {
      return 0;
    }

    const contract = await getERC20Contract();
    return await contract.methods
      .allowance(
        address,
        TRANSFORMERS_ADDRESS
      )
      .call();
  } catch (error) {
  
    // reportError(error);
  }
};

const xtsApprove = async (address,fee)=>{
  try{
    const contract = await getERC20Contract();
    await contract.methods.approve(TRANSFORMERS_ADDRESS,fee).send({from:address})
  }catch(error){
    reportError(error);
  }
}

const getGorillaPledgeTimeGold = async (address) => {
  try {
    if (address === undefined) {
      return 0;
    }
    const contract = await getTNFTContract();
    return await contract.methods.pledgeTime(address).call();
  } catch (error) {
    return 0;
  }
};

const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object.");
  
};

export { mint, alreadyMint, hasFreeMintRole,getTinfo,getFightReward,fight,Trest,getxtsBalance,cast,getxtsAllowance,xtsApprove,getGorillaPledgeTimeGold };
