"use client";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

const Cart = () => {
  const [restructuredCartItems, setRestructuredCartItems] = useState([]);
  const [totalPriceOfEveryItem, setTotalPriceOfEveryItem] = useState(0);
  const cartItems = useSelector((state) => state?.cart?.items);

  useEffect(() => {
    const restructuredCartData = cartItems.reduce((acc, currentItem) => {
      const existingItemIndex = acc.findIndex(
        (item) => item.id === currentItem.id
      );

      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += 1;
        acc[existingItemIndex].totalPrice =
          acc[existingItemIndex].quantity * acc[existingItemIndex].price;
      } else {
        acc.push({
          ...currentItem,
          quantity: 1,
          totalPrice: currentItem.price,
        });
      }

      return acc;
    }, []);

    const total = restructuredCartData.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    setTotalPriceOfEveryItem(Number(total.toFixed(2)));
    setRestructuredCartItems(restructuredCartData);
  }, [cartItems]);

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...restructuredCartItems];
    updatedCartItems[index].quantity = Math.max(
      updatedCartItems[index].quantity - 1,
      0
    );
    updatedCartItems[index].totalPrice =
      updatedCartItems[index].quantity * updatedCartItems[index].price;
    setRestructuredCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...restructuredCartItems];
    updatedCartItems[index].quantity = updatedCartItems[index].quantity + 1;
    updatedCartItems[index].totalPrice =
      updatedCartItems[index].quantity * updatedCartItems[index].price;
    setRestructuredCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
  };

  const updateTotalPrice = (items) => {
    const total = items.reduce((total, item) => total + item.totalPrice, 0);
    setTotalPriceOfEveryItem(Number(total.toFixed(2)));
  };

  const handleCheckOut = () => {
    Swal.fire({
      title: 'Order Placed!',
      text: 'Thank you for shopping with us!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/';
    });
  }
  
  return (
    <div className="flex justify-center">
      <div className="main container md:max-w-[1200px] ">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 mt-20">
          <div className="col-span-2">
            <h1 className="mb-8 text-2xl font-semibold cursor-pointer">
              Your Cart
            </h1>

            {restructuredCartItems.length > 0 ? (
              <>
                <div className="grid grid-cols-4 gap-4 text-[#8B8B8B] text-[12px] mb-4 px-4">
                  <div></div>
                  <div>Name</div>
                  <div>Price</div>
                  <div>Quantity</div>
                </div>

                <div className="md:h-[400px] overflow-hidden overflow-y-auto">
                  {restructuredCartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 gap-4 items-center bg-white shadow-md p-4 rounded-md mt-2 mb-4"
                    >
                      <div>
                        <img
                          className="w-[60px] h-[80px]"
                          src={item.image}
                          alt="Product Image"
                        />
                      </div>

                      <div>
                        <p className="md:text-[12px] text-[8px]">{item.title}</p>
                      </div>

                      <div>
                        <p className="text-[12px]">${item.price}</p>
                      </div>

                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(index)}
                          className="text-[20px] text-white bg-black rounded-md"
                        >
                          <FaMinus className="p-1" />
                        </button>
                        <p className="mx-2 text-[12px]">{item.quantity}</p>
                        <button
                          onClick={() => increaseQuantity(index)}
                          className="text-[20px] text-white bg-black rounded-md"
                        >
                          <FaPlus className="p-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No items added to cart yet</p>
            )}
          </div>

          <div className="column2  md:mt-12 mt-2">
            <div className="max-w-xs bg-white shadow-md p-4 rounded-md h-[450px] flex flex-col justify-between mt-12">
              <div>
                <h2 className="text-xl font-semibold mb-0">Your Total</h2>
                <div className="h-[300px] overflow-hidden overflow-y-auto">
                  {restructuredCartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start mt-4"
                    >
                      <p className="text-sm font-semibold">
                        {item.title}{" "}
                        <span className="text-sm text-gray-500">
                          x{item.quantity}
                        </span>
                      </p>
                      <p className="text-sm font-semibold">
                        ${item.totalPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-semibold">
                    ${totalPriceOfEveryItem}
                  </p>
                </div>

                <button disabled={restructuredCartItems.length === 0} onClick={handleCheckOut} className="bg-black w-full disabled:opacity-50 text-white py-2 px-4 rounded-md">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
