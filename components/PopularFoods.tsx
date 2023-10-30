"use client";
import React from "react";
import { useState } from "react";
import bread from "@/assets/assets/assets/images/bread.png";
import pizza from "@/assets/assets/assets/images/pizza.png";
import products from "@/assets/assets/assets/fake-data/products";
import hamburger from "@/assets/assets/assets/images/hamburger.png";
import Image, { StaticImageData } from "next/image";
import { addtoCart_SUCCESS, storeDispatch } from "@/store/reduxstore";

interface Product {
  id: string;
  title: string;
  price: number;
  image01: StaticImageData;
  image02?: StaticImageData;
  image03?: StaticImageData;
  category?: string;
  desc?: string;
}

function PopularFoods() {


  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isplaced, Setisplaced] = useState<boolean>(false);
  const menu = [
    { name: "All" },
    { name: "Burger", src: hamburger },
    { name: "Pizza", src: pizza },
    { name: "Bread", src: bread },
  ];



  const handleCategoryChange = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    Setisplaced(true);
    const { image01, title, id, price } = product;
    storeDispatch(
      addtoCart_SUCCESS({ image01, title, id, price, quantity: 1 })
    );
    setTimeout(() => {
      Setisplaced(false);
    }, 3000);
  };
  
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      {isplaced && (
        <div
          className={`toast toast-center toast-top rounded-md m-3 bg-red-600 text-white w-auto transition-opacity duration-300 ease-in-out ${
            isplaced ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>Added to the cart!</span>
        </div>
      )}
      <div className=" bg-slate-50 shadow-lg my-1 mb-4">
        <div className="font-bold text-3xl text-center py-8">Popular Foods</div>
        <div className="flex flex-row justify-center items-center width-full bg-red-500 h-16 rounded-md mx-5">
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(item.name)}
              className=" md:mx-10 sm:mx-3 mx-3 hover:bg-white hover:text-red-500 hover:p-3 hover:rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {item.src ? (
                <div className="flex flex-row justify-between items-center">
                  <Image className="h-5 w-5 m-1" src={item.src} alt="Logo" />
                  <p>{item.name}</p>
                </div>
              ) : (
                item.name
              )}
            </button>
          ))}
        </div>
        <div className="mx-5 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border-[0.09rem] border-red-100">
                <div className="max-w-full h-[16rem]  rounded-lg overflow-hidden">
                  <div className=" flex flex-col items-center">
                    <Image
                      src={product.image01}
                      alt={product.title}
                      className="w-32 h-32 "
                    />
                    <div className="lg:px-6 md:px-3 px-2 py-4">
                      <div className="font-bold md:text-md  mb-2 text-centerr">
                        {product.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="text-xl text-red-500 font-semibold ml-3 pt-2">
                      ${product.price}
                    </span>
                    <button
                      className="rounded-md bg-red-500 border-2 w-32 h-10 mr-3 transition-opacity duration-300 ease-in-out hover:opacity-70"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularFoods;
