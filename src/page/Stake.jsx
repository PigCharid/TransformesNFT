import React, { useState } from "react";
// Import Swiper React components
import update from "../assets/update.png";
import cast from "../assets/cast.png";
import rest from "../assets/rest.png";
import { useAccount, useNetwork } from "wagmi";
import { useInterval } from "ahooks";
import {
  alreadyMint,
  fight,
  getFightReward,
  getTinfo,
  getxtsBalance,
  Trest,
} from "../Blockchain.Services";
import { setAlert, setGlobalState, truncate, useGlobalState } from "../store";
import { formatUnits } from "ethers/lib/utils.js";
import Tilt from "react-parallax-tilt";
import logo_a from "../assets/logo_a.png";
import { useNavigate } from "react-router-dom";
import {astral} from '../assets';

function formatCountdownTime(time) {
  let day = Math.floor(time / (60 * 60 * 24));
  let hours = Math.floor((time / (60 * 60)) % 24);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);
  return day + " D " + hours + " H " + minutes + " M " + seconds + " S ";
}

function getYMDHMS(timestamp) {
  let time = new Date(timestamp * 1000);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let hours = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + date + " " + hours + ":" + minute + ":" + second
  );
}
const Stake = () => {
  // 获取当前账户
  const { address } = useAccount();
  const [alreadyMinted, setAlreadyMinted] = useState(false);
  const [fightReward, setFightRewad] = useState(0);
  const [Tinfo] = useGlobalState("Tinfo");
  const [countdown, setCountdown] = useState(0);
  const [xtsBalance] = useGlobalState("xtsBalance");
  const { chain } = useNetwork();
  const navigate = useNavigate();
  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    getTinfo(address, alreadyMinted).then((res) => {
      setGlobalState("Tinfo", res);
    });
  }, 100);

  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    alreadyMint(address).then((res) => {
      setAlreadyMinted(res);
    });
  }, 100);

  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    getFightReward(address, alreadyMinted).then((res) => {
      setFightRewad(res);
    });
  }, 1000);
  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    getxtsBalance(address).then((res) => {
      setGlobalState("xtsBalance", res);
    });
  }, 100);

  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    if (
      parseInt(Tinfo?.timeOfLastFight) + 86400 >
        parseInt(Date.parse(new Date()) / 1000) &&
      Tinfo.fight === true
    ) {
      setCountdown(
        parseInt(Tinfo.timeOfLastFight) +
          86400 -
          parseInt(Date.parse(new Date()) / 1000)
      );
    }
  }, 1000);

  const handleFight = async () => {
    if(chain === undefined ){
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if (chain.id !== 56) {
      setAlert("Please switch the network to Goerli!", "red");
      return;
    }

    if (address === undefined) {
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if (!alreadyMinted) {
      setAlert("Please create your Transformers first!", "red");
      return;
    }
    if (Tinfo.fight) {
      setAlert("Already in battle!", "red");
      return;
    }
    setGlobalState("modal", "scale-0");
    setGlobalState("loading", {
      show: true,
      msg: "Battle...",
    });
    try {
      await fight(address);
      setAlert("Battle Success!", "green");
      window.location.reload();
    } catch (error) {
      setAlert("Battle Cancelled!", "red");
    }
  };
  const handleRest = async () => {
    if(chain === undefined ){
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if ( chain.id !== 56) {
      setAlert("Please switch the network to Goerli!", "red");
      return;
    }

    if (address === undefined) {
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if (!alreadyMinted) {
      setAlert("Please create your Transformers first!", "red");
      return;
    }
    if (!Tinfo.fight) {
      setAlert("Not in battle!", "red");
      return;
    }
    if (countdown > 0) {
      setAlert("The battle is not over!", "red");
      return;
    }

    setGlobalState("modal", "scale-0");
    setGlobalState("loading", {
      show: true,
      msg: "Rest...",
    });
    try {
      await Trest(address);
      setAlert("Rest Success!", "green");
      window.location.reload();
    } catch (error) {
      setAlert("Rest Cancelled", "red");
    }
  };
  const handleCast = () => {

    if(chain === undefined ){
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if (chain.id !== 56) {
      setAlert("Please switch the network to Goerli!", "red");
      return;
    }

    if (address === undefined) {
      setAlert("Pleace connect wallet!", "red");
      return;
    }
    if (!alreadyMinted) {
      setAlert("Please create your Transformers first!", "red");
      return;
    }
    if (Tinfo.fight) {
      setAlert("Need to end the battle to crafting your Transformers!", "red");
      return;
    }

    if (Tinfo.level > 2) {
      setAlert("Your Transformer is already at max level!", "red");
      return;
    }

    setGlobalState("castmodal", "scale-100");
  };
  return (
    <div className={` md:mt-[-56px]  xl:mt-[-60px] 2xl:mt-[-70px] mt-[-68px]  bg-cover bg-no-repeat bg-center bg-aa `}>
      <div className="flex flex-col  w-full min-h-screen justify-between  items-center">
        <div className="flex  md:flex-row flex-col w-[60%] md:mt-[180px] mt-[100px] justify-between items-center  2xl:mt-[260px]">
          <div className=" flex flex-wrap justify-center">
            <Tilt>
              <div className="relative sm:w-[260px] w-[220px] sm:h-[335px] h-[280px] z-0 transition-all font-rajdhani font-bold text-lg text-[#7749E7]">
                {chain ? (
                  chain.id === 56 ? (
                    Tinfo?.ID ? (
                      <img
                        src={`https://gateway.pinata.cloud/ipfs/QmeiHzF3aRYRMNAWmVyeM1cggdjFAW8vAwnbctZ52EL9qm/${Tinfo.ID}.png`}
                        alt="Transformers"
                        className="w-full h-full rounded-xl border-2 border-[#7749E7]"
                      />
                    ) : (
                      <div className=" flex flex-col items-center">
                        <img src={logo_a} alt="transformers_logo"></img>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold mt-6 cursor-pointer hover:shadow-xl  hover:shadow-[#7749E7]"
                          onClick={() => navigate("/")}
                        >
                          Go to Create
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center">
                      <img src={logo_a} alt="transformers_logo"></img>
                      <p>Please switch the network to BSC!</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={logo_a} alt="transformers_logo"></img>
                    <p>Please connect Wallet!</p>
                  </div>
                )}
              </div>
            </Tilt>
          </div>
          <div className="flex flex-col  md:w-[50%] w-full text-white font-rajdhani font-bold ">
            <div className="flex justify-between text-md mb-[5px]">
              <p>Name</p>
              <p>{alreadyMinted ? Tinfo?.name : "——"}</p>
            </div>
            <div className="flex justify-between text-md mb-[5px]">
              <p>NFT Number</p>
              <p>{alreadyMinted ? Tinfo?.ID : "——"}</p>
            </div>
            <div className="flex  justify-between  text-md mb-[5px]">
              <p>Master</p>
              <p>
                {alreadyMinted
                  ? truncate(Tinfo?.owner || "0x00", 4, 4, 11)
                  : "——"}
              </p>
            </div>
            <div className="flex  justify-between  text-md mb-[5px]">
              <p>Level</p>
              <p>{alreadyMinted ? Tinfo?.level : "——"}</p>
            </div>
            <div className="flex justify-between text-md mb-[5px]">
              <p>TotalBattleTime</p>
              <p>
                {alreadyMinted
                  ? Tinfo?.fight
                    ? formatCountdownTime(
                        Number(Tinfo?.timeOfTotalFight) +
                          (Date.parse(new Date()) / 1000 -
                            Tinfo?.timeOfLastFight)
                      )
                    : formatCountdownTime(Tinfo?.timeOfTotalFight)
                  : "——"}
              </p>
            </div>
            <div className="flex justify-between text-md mb-[5px]">
              <p>TotalClaimReward</p>
              <p>
                {chain
                  ? chain.id === 56
                    ? Tinfo
                      ?alreadyMint? `${formatUnits(
                         (Tinfo.totalReward)
                        )} xTRMF`:"——"
                      : "——"
                    : "——"
                  : "——"}
              </p>
            </div>
            <div className="flex justify-between  text-md mb-[5px]">
              <p>In Battle</p>
              <p>{alreadyMinted ? (Tinfo?.fight ? "True" : "False") : "——"}</p>
            </div>
            <div className="flex justify-between  text-md mb-[5px]">
              <p>Battle Reward</p>
              {chain
                ? chain.id === 56
                  ? fightReward
                    ? `${formatUnits(fightReward)} xTRMF`
                    : "——"
                  : "——"
                : "——"}
            </div>
            <div className="flex justify-between text-md mb-[5px]">
              <p>LastBattleTime</p>
              <p>
                {alreadyMinted && Tinfo
                  ? Tinfo.timeOfLastFight == 0
                    ? "——"
                    : getYMDHMS(Tinfo.timeOfLastFight)
                  : "——"}
              </p>
            </div>
            <div className="flex justify-between  text-md mb-[5px]">
              <p>Rest Countdown</p>
              <p>
                {alreadyMinted
                  ? countdown
                    ? formatCountdownTime(countdown)
                    : "0"
                  : "——"}
              </p>
            </div>
            <div className="flex justify-between  text-md mb-[5px]">
              <p>xTRMF Balance</p>
              <p>
                {chain
                  ? chain.id === 56
                    ? xtsBalance
                      ? `${formatUnits(xtsBalance)} xTRMF`
                      : "——"
                    : "——"
                  : "——"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col justify-center items-center mb-[10px] ">
            <p className="text-white font-rajdhani font-bold">Battle</p>
            <img
              src={update}
              alt="battle"
              className="w-[100px] cursor-pointer hover:border-2 border-[#7749E7] rounded-full"
              onClick={handleFight}
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-[10px] ">
            <p className="text-white font-rajdhani font-bold">Rest</p>
            <img
              src={rest}
              alt="rest"
              className="w-[100px] cursor-pointer hover:border-2 border-[#191919] rounded-full "
              onClick={handleRest}
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-[10px] ">
            <p className="text-white font-rajdhani font-bold">Crafting</p>
            <img
              src={cast}
              alt="crafting"
              className="w-[100px] cursor-pointer hover:border-2 border-[#93F2FA] rounded-full "
              onClick={handleCast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
