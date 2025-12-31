import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { logo } from "../../utils/imagedata";
import SideMenu from "../SideMenu/SideMenu";

export const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black -mt-1"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <Link to={"/"}>
          <img src={logo} alt="Logo" className="h-[50px]" />
        </Link>

        <div
          className={`fixed top-[75px] -ml-7 bg-white -translate-x-[200%] transition-transform duration-300 ease-linear ${
            openSideMenu ? "translate-x-0" : ""
          }`}
        >
          <SideMenu activeMenu={activeMenu} />
        </div>
      </div>
    </>
  );
};
