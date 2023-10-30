"use client";
import React from "react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxPerson } from "react-icons/rx";
import logo from "@/assets/assets/assets/images/res-logo.png";
import Image from "next/image";
import Link from "next/link";
import Model from "./Model";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { openModal } from "@/store/reduxstore";
import { RootState, storeDispatch } from "@/store/reduxstore";

function Header() {
  //defining states
  const isopen = useSelector((state: RootState) => state.FoodData.isOpen);
  const Cartdata = useSelector(
    (state: RootState) => state.FoodData.checkoutdata
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPath = usePathname();

  //helpers
  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/explorefoods", label: "Foods" },
    { path: "/checkout", label: "Checkout" },
    { path: "/contact", label: "Contact" },
  ];

  //functions
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    storeDispatch(openModal());
  };


  return (
    <>
      <div className="flex items-center justify-between px-9 sm:px-6   md:px-12 bg-slate-50 py-3">

         {/* header logo and logoname */}

        <div className="flex flex-col items-center">
          <Image className="h-10 w-10" src={logo} alt="Logo" />
          <p className="font-bold">Tasty Treat</p>
        </div>
                
        {/* Navigation links to other pages */}
        <div className="flex items-center space-x-8 justify-center max-[768px]:hidden">
          {navigationLinks.map((link, index) => (
            <ul key={index}>
              <Link
                href={link.path}
                className={`text-semibold ${
                  currentPath === link.path ? "text-red-600" : ""
                }`}
              >
                {link.label}
              </Link>
            </ul>
          ))}
        </div>

        {/* cart button,user logo and hamburger for small screens  */}
        <div className="flex">
          <div className="avatar indicator">
            <span className="indicator-item badge border-2 border-red-600 bg-red-600">
              {Cartdata.length > 0 ? Cartdata.length : 0}
            </span>
            <button className="">
              <AiOutlineShoppingCart size={25} onClick={handleOpenModal} />
            </button>
          </div>
          {isopen && <Model />}
          <button className="ml-4">
            <RxPerson size={25} />
          </button>
          {/* hamburger */}
          <button
            className={` min-[768px]:hidden  max-[768px]:visible ml-4  focus:outline-none transition-transform ${
              isOpen ? "transform rotate-90" : "transform rotate-0"
            }`}
            onClick={toggleMenu}
          >
            <GiHamburgerMenu size={25} />
          </button>
        </div>
      </div>
      {/* on clicking the hamburger the menue shows */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="flex items-center flex-col font-semibold bg-red-100 space-y-8 p-3 justify-center">
            {navigationLinks.map((link, index) => (
              <ul key={index}>
                <Link
                  href={link.path}
                  className={`text-semibold ${
                    currentPath === link.path ? "text-red-600" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
