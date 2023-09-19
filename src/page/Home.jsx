import React, { useEffect, useState } from "react";
import { heroImg } from "../assets";
import CustomInput from "../components/CustomInput";
import styles from "../styles";
import { setGlobalState, setAlert } from "../store";
import { useAccount, useNetwork } from "wagmi";
import { useInterval, useMount } from "ahooks";
import { alreadyMint } from "../Blockchain.Services";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // 获取当前账户
  const { address } = useAccount();
  const [transformersName, setTransformersName] = useState("");
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const navigate = useNavigate();
  const {chain,chains} = useNetwork()
  useInterval(() => {
    alreadyMint(address).then((res) => {
      setAlreadyMinted(res);
    });
  },100);
  
  const handleCreate = () => {
    if(chain===undefined){
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if(chain.id!==56 ){
      setAlert("Please switch the network to Goerli!", "red");
      return;
    }
    if (address === undefined) {
      
    }
    if (transformersName == "") {
      setAlert("Please enter your Transformers name!", "red");
      return;
    }
    setGlobalState("modal", "scale-100");
  };

  useInterval(() => {
    setGlobalState("tname", transformersName);
  }, 100);

  return (
    <div className="min-h-screen flex xl:flex-row flex-col ">
      <div className="w-full flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className="flex font-rajdhani font-bold text-white sm:text-6xl text-4xl head-text">
              Welcome to Transformers <br /> a Web3 NFT Card Game !
            </h1>
          </div>

          <p className="font-rajdhani font-normal text-[24px] text-siteWhite my-10">
            Connect your wallet to start playing <br /> the ultimate Web3
            transformers !
          </p>

          <div className="flex flex-col">
            <CustomInput
              label="Name"
              placeHolder="Enter your transformers name"
              value={transformersName}
              handleValueChange={setTransformersName}
            />
            <div className="flex flex-row gap-[20px]">
              <button
                disabled = {alreadyMinted}
                type="button"
                className="px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold mt-6 cursor-pointer hover:shadow-xl  hover:shadow-[#7749E7]"
                onClick={handleCreate}
              >
                {
                  alreadyMinted? "Already Create":" Create Now"
                }
               
              </button>
              <button
                disabled = {!alreadyMinted}
                type="button"
                className={`px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold mt-6 cursor-pointer ${!alreadyMinted && "hidden"} hover:shadow-xl  hover:shadow-[#7749E7]`}
                onClick={()=>navigate("/b&c")}
              >
                Go to Battle&Crafting
              </button>
            </div>
          </div>
        </div>

        <p className="font-rajdhani font-medium text-base text-white">
          Made with 💜 by Transformers Team!
        </p>
      </div>

      <div className="w-full flex flex-1">
        <img
          src={heroImg}
          alt="hero-img"
          className="w-full min-h-screen object-cover mt-[-56px] z-[-1] 2xl:mt-[-70px]"
        />
      </div>
    </div>
  );
};

export default Home;
