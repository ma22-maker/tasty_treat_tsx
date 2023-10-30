"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import calculateSubtotal from "./Helper";
import {
  closeModal,
  removeCartItem,
  addQuantity,
  subractQuantity,
} from "@/store/reduxstore";
import { RootState, storeDispatch } from "@/store/reduxstore";

function Model() {

  
  //gettin data
  const isopen = useSelector((state: RootState) => state.FoodData.isOpen);
  const Cartdata = useSelector(
    (state: RootState) => state.FoodData.checkoutdata
  );

  //handling events
  const handelmodelClose = () => {
    storeDispatch(closeModal());
  };
  const handelRemoveCartItem = (ItemId: string) => {
    storeDispatch(removeCartItem(ItemId));
  };

  const handeladd = (ItemId: string) => {
    storeDispatch(addQuantity(ItemId));
  };
  const handelsubract = (ItemId: string) => {
    storeDispatch(subractQuantity(ItemId));
  };

  return (
    <div className={`modal ${isopen ? "modal-open" : ""}`}>
      <div className="fixed top-0 right-0 w-[27%]  max-[1024px]:w-[35%] max-[768px]:w-[45%] max-[425px]:w-full h-full bg-white opacity-3  transition-all duration-600 flex flex-col">
        <button className="py-3 px-3" onClick={handelmodelClose}>
          <RxCross2
            size={20}
            color="white"
            className=" w-7 h-7 p-1 rounded-full bg-indigo-950"
          />
        </button>
        <div className="px-3 overflow-y-auto z-10">
          {Cartdata.map((item, index) => (
            <div className="flex justify-between items-center my-7">
              <div key={item.id} className="flex  space-x-4 ">
                <Image
                  src={item.image01}
                  alt={item.title}
                  className="w-10 h-10 "
                />
                <div className="">
                  <p className="font-bold text-sm mb-1">{item.title}</p>
                  <div className="flex  justify-between  mb-3">
                    <p className="text-xs">{item.quantity}X</p>
                    <p className="text-sm text-red-600"> ${item.price}</p>
                  </div>
                  <div>
                    <div className="flex items-center px-2 boder-2 bg-red-300 rounded-md  justify-between w-26 h-9">
                      <button onClick={() => handeladd(item.id)}>
                        <IoMdAdd />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handelsubract(item.id)}>
                        <HiMinusSmall />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <button onClick={() => handelRemoveCartItem(item.id)}>
                  <RxCross2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" fixed bottom-0 right-0 w-[27%] max-[1024px]:w-[35%] max-[768px]:w-[45%] max-[425px]:w-full h-20 z-0 bg-red-600 flex flex-row justify-between items-center p-6">
        <p className="text-white font-bold text-sm">
          Subtotal : ${calculateSubtotal(Cartdata)}
        </p>
        <Link href={"/checkout"}>
          <button className="border-2 bg-white rounded-md px-3 p-1">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Model;
