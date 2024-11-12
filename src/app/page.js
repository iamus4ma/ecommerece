"use client";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const Listings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedCategory = useSelector((state) => state?.category?.type);
  const searchQuery = useSelector((state) => state?.search?.query);
  console.log(searchQuery, "searchQuery");

  const getdata = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const productsData = await res.json();
      const filteredProducts = productsData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getCategorydata = async () => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      const productsData = await res.json();
      const filteredProducts = productsData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCategory) {
      getdata();
    } else {
      getCategorydata();
    }
  }, [selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" loading={loading} size={50} />
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="main container w-full">
        {products.length === 0 ? (
          <p className="text-center mt-8 text-gray-600 text-lg">
            No data found.
          </p>
        ) : (
          <div className="flex flex-wrap mt-16 mx-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
