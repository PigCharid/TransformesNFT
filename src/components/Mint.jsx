import { useGlobalState, setGlobalState, truncate, setAlert } from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
//   import { deposit } from "../Blockchain.Services";
import { useAccount } from "wagmi";
import { parseUnits } from "ethers/lib/utils.js";
import CustomButton from "./CustomButton";
import { hasFreeMintRole, mint } from "../Blockchain.Services";
import { useInterval } from "ahooks";

const Deposit = () => {
  const { address } = useAccount();
  const [modal] = useGlobalState("modal");
  const [tname] = useGlobalState("tname");
  const [freeRole,setFreeRole] = useState(false);
  useInterval(()=>{
    hasFreeMintRole(address).then((res)=>{
      setFreeRole(res)
    })
  },100)



  const handleMint = async () => {
    setGlobalState("modal", "scale-0");
    setGlobalState("loading", {
      show: true,
      msg: "Mint...",
    });
    try {
      await mint(
        address,
        tname,
        freeRole
      );
      setAlert("Mint Success!", "green");
      window.location.reload();
    } catch (error) {
      setAlert("Mint Cancelled", "red");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-lg shadow-[#7749E7] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 ">
        <div className="flex flex-row justify-end items-center">
          <button
            type="button"
            onClick={() => setGlobalState("modal", "scale-0")}
            className="border-0 bg-transparent focus:outline-none"
          >
            <FaTimes className="text-gray-400" />
          </button>
        </div>

        <img src={logo} alt="logo" className="mb-[10px]" />
        <div className="flex flex-col w-full justify-center text-white font-rajdhani font-bold ">
          <div className="flex justify-between text-md mb-[5px]">
            <p>Name</p>
            <p>{tname}</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Master</p>
            <p> {truncate(address||"0x00", 4, 4, 11)}</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Level</p>
            <p>1</p>
          </div>
          <div className="flex  justify-between  text-md mb-[5px]">
            <p>Fee</p>
            <p>
              {
                freeRole?"Free Mint":"0.01 BNB"
              }
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <CustomButton
            title="Mint Now"
            handleClick={handleMint}
            restStyles="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Deposit;
