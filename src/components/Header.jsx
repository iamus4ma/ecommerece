"use client";
import { clearCategory, setCategory } from "@/app/redux/slices/categorySlice";
import { setSearchQuery } from "@/app/redux/slices/searchSlice";
import Link from "next/link";
import React, { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);
  const [activeTab, setActiveTab] = useState();

  const uniqueItemIds = new Set(cartItems.map((item) => item.id));
  const badge = uniqueItemIds.size;

  const searchCategory = (e) => {
    const categoryName =
      e.target.innerText === "Electronic"
        ? "electronics"
        : e.target.innerText === "Mens Fashion"
        ? "men's clothing"
        : e.target.innerText === "Women's Fashion"
        ? "women's clothing"
        : e.target.innerText === "Jewelery"
        ? "jewelery"
        : "";
    dispatch(setCategory(categoryName));
    setActiveTab(categoryName);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogoClick = (e) => {
    dispatch(clearCategory());
    setActiveTab("");
  };

  return (
    <div className="flex justify-center">
      <div className="main container md:max-w-[1200px] ">
        <div className="flex md:justify-between justify-center gap-4 md:gap-0 items-center p-4">
          <div className="ss">
            <Link href="/">
              <h1
                onClick={handleLogoClick}
                className="md:text-[24px] text-[16px] font-semibold font "
              >
                Ecommerence
              </h1>
            </Link>
          </div>
          <div className="flex justify-between md:gap-12 gap-2 items-center">
            <div>
              <ul className="md:flex gap-5  hidden">
                <Link href="/">
                  <li
                    onClick={searchCategory}
                    className="cursor-pointer hover:font-semibold"
                    style={{
                      fontWeight: activeTab === "electronics" ? "bold" : "",
                    }}
                  >
                    Electronic
                  </li>
                </Link>
                <Link href="/">
                  <li
                    onClick={searchCategory}
                    className="cursor-pointer hover:font-semibold"
                    style={{
                      fontWeight: activeTab === "men's clothing" ? "bold" : "",
                    }}
                  >
                    Mens Fashion
                  </li>
                </Link>
                <Link href="/">
                  <li
                    onClick={searchCategory}
                    className="cursor-pointer hover:font-semibold"
                    style={{
                      fontWeight:
                        activeTab === "women's clothing" ? "bold" : "",
                    }}
                  >
                    Women's Fashion
                  </li>
                </Link>
                <Link href="/">
                  <li
                    onClick={searchCategory}
                    className="cursor-pointer hover:font-semibold"
                    style={{
                      fontWeight: activeTab === "jewelery" ? "bold" : "",
                    }}
                  >
                    Jewelery
                  </li>
                </Link>
              </ul>
            </div>
            <form className="bg-white p-3 border rounded-xl flex items-center">
              <input
                className="bg-transparent focus:outline-none md:w-full w-20"
                type="text"
                placeholder="Search by product name..."
                onChange={handleSearchChange}
              />
              <FaSearch className="text-gray-500" />
            </form>
          </div>
          <Link href="/cart">
            <div className="bg-black rounded-xl py-2 px-3">
              <h1 className="text-[#fff] flex items-center">
                {badge}
                <span className="ml-2">
                  <FaShoppingCart className="" />
                </span>
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
