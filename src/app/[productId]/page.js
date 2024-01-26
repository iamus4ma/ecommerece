"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import { ClipLoader } from "react-spinners";

const Product = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(true); 
  const params = useParams();

  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addItem(singleProduct));
  };

  const getdata = async () => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${params.productId}`
      );
      const productData = await res.json();
      setSingleProduct(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="main container md:max-w-[900px] ">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-white p-4 rounded-md md:mt-32 mt-2">
          <div>
            <Link href="/">
              <h1 className="mb-8 cursor-pointer">Back</h1>
            </Link>
            <div className="flex justify-center ">
              <img
                className="w-[300px] h-[300px] mb-4 rounded-md"
                src={singleProduct.image}
                alt={singleProduct.title}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between md:ml-14 ml-0 px-6 mt-[48px]">
            <div>
              <h2 className="text-xl font-semibold ">{singleProduct.title}</h2>

              <p className="text-sm text-gray-600 mt-10">Category</p>

              <p className="text-sm text-black-600 mt-2 mb-2">
                {singleProduct.category}
              </p>

              <p className="text-sm text-gray-800 mb-2 mt-10">
                {singleProduct.description}
              </p>
              <p className="text-sm text-gray-800 mb-2 mt-10">Price</p>

              <p className="text-xl font-bold mb-2 ">{`$${singleProduct.price}`}</p>
            </div>

            <button onClick={handleAddCart} className="bg-black text-white flex items-center justify-center py-2 px-4 rounded-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
