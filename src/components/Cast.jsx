import { useGlobalState, setGlobalState, setAlert } from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

import { useAccount, useNetwork } from "wagmi";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useInterval } from "ahooks";
import { cast, getxtsAllowance, xtsApprove } from "../Blockchain.Services";

const Cast = () => {
  const { address } = useAccount();
  const [castmodal] = useGlobalState("castmodal");
  const [xtsBalance] =  useGlobalState("xtsBalance")
  const [needApprove, setNeedApprrove] = useState(true);
  const [validBalance, setValidBalance] = useState(false);
  const [validTime, setValidTime] = useState(false);
  const [Tinfo] = useGlobalState("Tinfo");
  const { chain } = useNetwork();


  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    getxtsAllowance(address).then((res) => {
      if (Tinfo?.level === "1" && Number(res) < parseUnits("500")) {
        setNeedApprrove(true);
        return;
      } else if (Tinfo.level === "2" &&  Number(res)  < parseUnits("1500")) {
        setNeedApprrove(true);
        return;
      } else {
        setNeedApprrove(false);
        return;
      }
    });
  }, 100);
  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    if(Tinfo?.level === "1" && Number(xtsBalance) >= parseUnits("500")){
      setValidBalance(true)
      return;
    }
    if(Tinfo?.level === "2" && Number(xtsBalance) >= parseUnits("1500")){
      setValidBalance(true)
      return;
    }
  }, 100);
  useInterval(() => {
    if (chain === undefined || chain.id !== 56) {
      return;
    }
    if(Tinfo?.level === "1" && Number(Tinfo?.timeOfTotalFight) >= 864000){
      setValidTime(true)
      return;
    }
    if(Tinfo?.level === "2" && Number(Tinfo?.timeOfTotalFight) >= 2160000){
      setValidTime(true)
      return;
    }
  }, 100);

  const handleApprove = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Approve...",
    });
    try {
      let fee;
      if(Tinfo.level==="1"){
        fee = parseUnits("500")
      }else(
        fee = parseUnits("1500")
      )
      await xtsApprove(
        address,
        fee
      );
      setAlert("Approve Success!", "green");
    } catch (error) {
      setAlert("Approve Cancelled", "red");
    }
  };

  const handleCast = async () => {

    setGlobalState("loading", {
      show: true,
      msg: "Cast...",
    });
    try {
      await cast(address);
      setAlert("Cast Success!", "green");
      window.location.reload();
    } catch (error) {
      setAlert("Cast Cancelled", "red");
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ${castmodal}`}
    >
      <div className="bg-[#151c25] shadow-lg shadow-[#7749E7] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 ">
        <div className="flex flex-row justify-end items-center">
          <button
            type="button"
            onClick={() => setGlobalState("castmodal", "scale-0")}
            className="border-0 bg-transparent focus:outline-none"
          >
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <img src={logo} alt="logo" className="mb-[10px]" />
        <div className="flex flex-col w-full justify-center text-white font-rajdhani font-bold ">
          <div className="flex justify-between text-md mb-[5px]">
            <p>Name</p>
            <p>{Tinfo?Tinfo?.name:""}</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Level</p>
            <p>{Tinfo?Tinfo?.level:""}</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Fee</p>
            <div className="flex gap-6 ">
              <p>
                {Tinfo?.level === "1"
                  ? "500"
                  : Tinfo?.level === "2"
                  ? "1500"
                  : "——"}{" "}
                xTRMF
              </p>
              { needApprove? (
                <button
                  type="button"
                  className=" px-3 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold  cursor-pointer"
                  onClick={handleApprove}
                >
                  approve
                </button>
              ) : (
                ""
              )}
            </div>
            
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>xTRMF Balance</p>
            <p>{xtsBalance?formatUnits?.(xtsBalance):""}xTRMF</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Time requirement</p>
            <p> {Tinfo?.level === "1"
                  ? "10 D"
                  : Tinfo?.level === "2"
                  ? "25 D"
                  : "——"}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={needApprove||!validBalance||!validTime}
            type="button"
            className=" px-3 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold cursor-pointer py-1 mt-3"
            onClick={handleCast}
          >
            {
              needApprove?"Please Approve":validBalance?validTime?"Cast Now":"Need More Battle":"Insufficent xts Balance"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cast;
