import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navlinks } from "../constants";
import {  menu } from "../assets";
import logo from "../assets/logo.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { setAlert } from "../store";

const navlist = [
  {
    name: "Square",
    link: "/square",
  },
  //   {
  //     name: "LP",
  //     link: "/lp",
  //   },
  {
    name: "Earn",
    link: "/earn",
  },
//   {
//     name: "Millionaire",
//     link: "/millionaire",
//   },
  {
    name: "Market",
    link: "/market",
  },

  //   {
  //     name: "NFT",
  //     link: "/nft",
  //   },
  //   {
  //     name: "DAO",
  //     link: "/dao",
  //   },
];

const Icon = ({ styles, name, isActive, disabled, handleClick }) => (
  <p
    className="font-rajdhani font-bold text-white  text-3xl  cursor-pointer hover:border-b-2  border-b-[#7749E7] "
    onClick={handleClick}
  >
    {name}
  </p>
);
const TopBar = () => {
  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <div className="flex md:flex-row flex-col justify-between px-4 pt-1">
      <img
        src={logo}
        alt="logo"
        className="w-[15%] md:flex hidden cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="md:flex hidden items-center gap-14 ml-[30px] ">
        {navlinks.map((link) => (
          <Icon
            key={link.name}
            {...link}
            // isActive={isActive}
            handleClick={() => {
              if (!link.disabled && link.name!=="Market") {
                // setIsActive(link.name);
                navigate(link.link);
              }else{
                setAlert("Coming soon")
              }
            }}
          />
        ))}
      </div>

      <div className="md:flex hidden items-center ">
        {/* 登录按钮 */}
        <ConnectButton />
      </div>
      {/* 手机 */}
      <div className="md:hidden flex justify-between items-center relative">
        <img src={logo} alt="logo" className="w-[50%]" />

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary  ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700  rounded-xl  `}
        >
          <ul className="mb-4 font-rajdhani font-bold text-white text-lg">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4  `}
                onClick={() => {
                  // setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px]`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4 mb-6">
            {/* 登录按钮 */}
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
