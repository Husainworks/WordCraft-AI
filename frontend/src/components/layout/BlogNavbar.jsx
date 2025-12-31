import React, { useContext, useState } from "react";
import { logo } from "../../utils/imagedata";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { BLOG_NAVBAR_DATA } from "../../utils/data";
import SideMenu from "../SideMenu/SideMenu";
import { UserContext } from "../../context/userContext";
import { ProfileInfoCard } from "../Cards/ProfileInfoCard";
import { AuthModal } from "../Auth/AuthModal";
import { SearchBarPopup } from "../Loader/SearchBarPopup";

const BlogNavbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { user, setOpenAuthForm } = useContext(UserContext);
  const location = useLocation();

  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/tag/React") return "ReactJS";
    if (path === "/tag/Next.js") return "NextJS";
    return null;
  };

  const activeMenuLabel = getActiveMenu();

  return (
    <>
      <div className="bg-white border-b border border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          <div className="flex gap-5">
            <button
              className="block md:hidden text-black -mt-1"
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
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {BLOG_NAVBAR_DATA.map((item) => {
              return (
                <Link key={item.id} to={item.path}>
                  <li
                    className={`text-[15px] font-medium list-none relative group cursor-pointer ${
                      activeMenuLabel === item.label
                        ? "text-sky-500"
                        : "text-black"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] bg-sky-500 transition-all duration-300 origin-left ${
                        activeMenuLabel === item.label
                          ? "scale-x-100"
                          : "scale-x-0"
                      } group-hover:scale-x-100`}
                    ></span>
                  </li>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <button
              className="hover:text-sky-500 cursor-pointer"
              onClick={() => setOpenSearchBar(true)}
            >
              <LuSearch className="text-[22px]" />
            </button>

            {!user ? (
              <button
                className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs md:text-sm font-semibold text-white px-5 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200"
                onClick={() => setOpenAuthForm(true)}
              >
                Login/Signup
              </button>
            ) : (
              <div className="hidden md:block">
                <ProfileInfoCard />
              </div>
            )}
          </div>

          <div
            className={`fixed top-[75px] -ml-7 bg-white -translate-x-[200%] transition-transform duration-300 ease-linear ${
              openSideMenu ? "translate-x-0" : ""
            }`}
          >
            <SideMenu isBlogMenu setOpenSideMenu={setOpenSideMenu} />
          </div>
        </div>
      </div>

      <AuthModal />
      <SearchBarPopup isOpen={openSearchBar} setIsOpen={setOpenSearchBar} />
    </>
  );
};

export default BlogNavbar;
