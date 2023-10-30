"use client";
import React, { use } from "react";
import { useState } from "react";
import allfood from "@/assets/assets/assets/images/banner-02.1d3252d3.jpg";
import BaseLayout from "@/components/BaseLayout";
import Image from "next/image";
import { useSelector } from "react-redux";
import calculateSubtotal from "@/components/Helper";
import { Clearcart, RootState, storeDispatch } from "@/store/reduxstore";

interface Errors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  postalCode?: string;
}

function page() {

  //states
  const [isplaced, Setisplaced] = useState<boolean>(false);
  const [errors, seterrors] = useState<Errors>({});
  const [Details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    postalCode: "",
  });
  const Cartdata = useSelector(
    (state: RootState) => state.FoodData.checkoutdata
  );

//handeling events
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, email, phoneNumber, country, city, postalCode } = Details;
    const newErrors: Errors = {};

    if (!name) newErrors.name = "Name field must not be empty";
    if (!country) newErrors.country = "Country field must not be empty";
    if (!city) newErrors.city = "City field must not be empty";
    if (!postalCode)
      newErrors.postalCode = "Postal Code field must not be empty";
    if (
      !email ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    ) {
      newErrors.email = "Email field must not be empty or invalid";
    }
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number field must not be empty or invalid";
    }

    if (Object.keys(newErrors).length === 0) {
      setDetails({
        name: "",
        email: "",
        phoneNumber: "",
        country: "",
        city: "",
        postalCode: "",
      });
      storeDispatch(Clearcart());
      Setisplaced(true);
      setTimeout(() => {
        Setisplaced(false);
      }, 3000);
    }

    seterrors(newErrors);
  };

  return (
    <BaseLayout>
      {isplaced && (
        <div
          className={`toast toast-center toast-top rounded-md m-3 bg-red-600 text-white w-auto transition-opacity duration-300 ease-in-out ${
            isplaced ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>Hurray! The order has been placed.</span>
        </div>
      )}
      <div className="relative">
        <Image
          src={allfood}
          alt="allfoods"
          className="w-full h-44 object-cover z-0 opacity-60"
        />
        <p className="z-10 absolute inset-0 flex justify-center items-center text-white text-4xl font-bold">
          Checkout
        </p>
      </div>
      <div className="bg-slate-50">
        <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-2 mx-16 my-8 ">
          <div className="md:col-span-4 sm:col-span-2 order-2  flex-col sm:order-2  md:order-1  col-span-2">
            <p className="font-semibold text-xl">Shipping Address</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={Details.name}
                  className=" bg-white border-b-2 border-slate-200 p-2 w-full my-4"
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      name: e.target.value,
                    })
                  }
                  placeholder=" Enter your Name"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  className=" bg-white border-b-2 border-slate-200 p-2 w-full my-4"
                  value={Details.email}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter your Email"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  className=" bg-white border-b-2 border-slate-200 p-2 w-full my-4"
                  value={Details.phoneNumber}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      phoneNumber: e.target.value,
                    })
                  }
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  className=" bg-white border-b-2 border-slate-200 p-2 w-full my-4"
                  value={Details.country}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      country: e.target.value,
                    })
                  }
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="text-red-500">{errors.country}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className=" bg-white border-b-2 border-slate-200 p-2 w-full my-4"
                  name="city"
                  value={Details.city}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      city: e.target.value,
                    })
                  }
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  className="  bg-white border-b-2 border-slate-200 p-2  w-full my-4"
                  value={Details.postalCode}
                  onChange={(e) =>
                    setDetails({
                      ...Details,
                      postalCode: e.target.value,
                    })
                  }
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <p className="text-red-500">{errors.postalCode}</p>
                )}
              </div>
              <button
                className="border-2 bg-red-500 text-white rounded-md px-3 p-1 m-2"
                type="submit"
              >
                Payment
              </button>
            </form>
          </div>
          <div className="flex flex-col   order-1 col-span-2  sm:order-1  md:order-2 md:col-span-2 sm:col-span-2 bg-red-200 w-[78%] h-36 p-6 m-4">
            <div className="flex justify-between my-1">
              <p className="font-bold">Subtotal :</p>
              <p className="font-bold">${calculateSubtotal(Cartdata)}</p>
            </div>
            <div className="flex justify-between  my-1 mb-1">
              <p className="font-bold">Shipping :</p>
              <p className="font-bold">${Cartdata.length > 0 ? 30 : 0}</p>
            </div>
            <div className="flex justify-between border-t-2 border-gray-500 border-opacity-10 pt-2">
              <p className="font-bold text-xl">Total :</p>
              <p className="font-bold text-xl">
                ${Cartdata.length > 0 ? 30 + calculateSubtotal(Cartdata) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default page;
