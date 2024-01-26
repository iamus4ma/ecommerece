"use client";
import { addItem } from "@/app/redux/slices/cartSlice";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="md:max-w-xs max-w-full flex flex-col flex-1 justify-between bg-white shadow-md p-4 rounded-md mb-4 h-[500px] ">
      <Link href={`/${product.id}`}>
        <div className=" flex justify-center md:block mb-4 rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-[200px] h-[200px] "
          />
        </div>


        <h2 className="text-[14px] font-semibold mb-0 overflow-hidden line-clamp-2">
          {product.title}
        </h2>

        <p className="text-sm text-gray-600 mb-5">{product.category}</p>

        <p className="text-[12px] text-gray-800 mb-5 overflow-hidden line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-semibold mb-5">Price: ${product.price}</p>
      </Link>

      <button
        onClick={handleAddCart}
        className="bg-black w-full text-white flex items-center justify-center py-2 px-4 rounded-md"
      >
        Add to Cart
        <FaShoppingCart className="ml-2" />
      </button>
    </div>
  );
};

export default ProductCard;
