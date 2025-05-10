import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/updated-logo.svg"; // Adjust the path to your logo image
import { FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="z-50 flex items-center justify-between w-full h-full p-4 bg-navbg">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">
          <img src={Logo} alt="image" height={50} width={50} />
        </span>
        <h1 className="text-3xl font-normal text-[#66FFB4] font-traderealm">
          REALMFI
        </h1>
      </div>
      <div className="flex items-center pr-5 space-x-2">
        <div>
          <a
            href="https://x.com/realmfinance?s=21"
            className="text-lg text-white"
          >
            <BsTwitterX />
          </a>
        </div>
        <div>
          <a
            href="https://t.me/+6rVr6rsgtxQ5MzE0"
            className="text-xl text-white"
          >
            <FaTelegramPlane />
          </a>
        </div>
        <div>
          <Link
            to="/"
            className="px-8 py-2 font-bold bg-[#FFB800] hover:bg-[#FFB800]/90 text-black border-4 border-black rounded-lg transform hover:-translate-y-1 transition-transform duration-200 shadow-[0_6px_0_0_rgba(0,0,0,1)] hover:shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-[0_2px_0_0_rgba(0,0,0,1)] active:translate-y-1"
          >
            ENTER APP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
