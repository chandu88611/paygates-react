import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";

function BillingDetails_Form({ data }) {
  const user = useSelector((state) => state.users.user);

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("country is required"),
    streetAddress: Yup.string().required("Street address is required"),
    apartment: Yup.string(),
    city: Yup.string().required(" City is required"),
    state: Yup.string().required("state is required"),
    postcode: Yup.string().required("PinCode is required"),
    orderNotes: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      city: data?.invoice?.billing_city || "",
      state: data?.invoice?.state || "",
      country: data?.invoice?.country || "",
      streetAddress: data?.invoice?.add_1 || "",
      apartment: data?.invoice?.add_2 || "",
      postcode: data?.invoice?.zip || "",
      orderNotes: data?.invoice?.orderNotes || "",
    },
  });

  const onSubmit = async () => {
    const { streetAddress, apartment, city, state, country, postcode } =
      getValues();

    const token = localStorage.getItem("tmToken");
    const requestData = {
      city,
      state,
      country,
      zip: postcode,
      add_1: streetAddress,
      add_2: apartment,
    };

    let url = "https://admin.tradingmaterials.com/api/lead/add-new/address";
    if (data && data.id) {
      url = "https://admin.tradingmaterials.com/api/lead/update/address";
      requestData.id = data.id;
    }

    try {
      const res = await axios.post(url, requestData, {
        headers: {
          "access-token": token,
        },
      });
      console.log(res);
      if (res.data.status) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFocus = (e) => {
    e.preventDefault();
    e.currentTarget.focus();
  };
  useEffect(() => {
    if (data) {
      setValue("city", data.city || "");
      setValue("state", data.state || "");
      setValue("country", data.country || "");
      setValue("streetAddress", data.add_1 || "");
      setValue("apartment", data.add_2 || "");
      setValue("postcode", data.zip || "");
      setValue("orderNotes", data.orderNotes || "");
    }
  }, [data]);

  return (
    <div>
      <h5 className=" my-2 mb-2 bg-gray-100  px-2 py-1 flex items-center">
        SHIPPING ADDRESS{" "}
        <AiOutlineHome size={24} className="ml-auto  mr-2 text-muted" />
      </h5>
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 tp-checkout-input">
          <input
            type="text"
            className="border  py-1 rounded pl-2 focus:outline-none my-2 col-span-6 md:col-span-3 !text-[15px]"
            placeholder="First name"
          />
          <input
            type="text"
            className="border  py-1 rounded pl-2 focus:outline-none my-2 col-span-6 md:col-span-3 !text-[15px]"
            placeholder="Last name"
          />
          <input
            className="border  py-1 rounded pl-2 focus:outline-none my-2 col-span-6 !text-[15px]"
            type="text"
            placeholder="House number and street name"
            {...register("streetAddress")}
            onFocus={handleFocus}
            name="streetAddress"
          />
          {errors.streetAddress && (
            <p className="text-red-500 col-span-2 -mt-4">
              {errors.streetAddress.message}
            </p>
          )}

          <div className="flex flex-col tp-checkout-input col-span-6">
            <input
              className="border  py-1 rounded pl-2 focus:outline-none my-2 !text-[15px]"
              type="text"
              placeholder="Apartment, suite, unit, etc. (optional)"
              {...register("apartment")}
              onFocus={handleFocus}
              name="apartment"
            />
          </div>
          <hr className="my-2 col-span-6  bg-gray-50" />

          <div className="flex flex-col tp-checkout-input col-span-2">
            <input
              className="border  py-1 rounded pl-2 focus:outline-none my-2 !text-[15px]"
              type="text"
              placeholder="city"
              {...register("city")}
              onFocus={handleFocus}
              name="city"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div className="col-span-6 md:col-span-2">
            <input
              className="border  py-1 rounded pl-2 focus:outline-none my-2 w-full !text-[15px]"
              type="text"
              placeholder="state"
              {...register("state")}
              onFocus={handleFocus}
              name="state"
            />
            {errors.city && (
              <p className="text-red-500">{errors.state.message}</p>
            )}
          </div>

          <div className="col-span-6 md:col-span-2">
            <input
              className="border  py-1 rounded pl-2 focus:outline-none my-2 w-full !text-[15px]"
              type="text"
              placeholder="Country"
              {...register("country")}
              onFocus={handleFocus}
              name="country"
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div className="col-span-6 md:col-span-2">
            <input
              className="border  py-1 rounded pl-2 focus:outline-none my-2 w-full !text-[15px]"
              type="text"
              placeholder="Zip code"
              {...register("postcode")}
              onFocus={handleFocus}
              name="postcode"
            />
            {errors.postcode && (
              <p className="text-red-500 ">{errors.postcode.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-6 md:col-span-2">
        {data && data.id ? (
          <button
            type="submit"
            className="mb-5 bg-blue-500 px-4 py-2 text-white  !text-[15px]"
            onClick={handleSubmit(onSubmit)}
          >
            Update Billing Details
          </button>
        ) : (
          <button
            type="submit"
            className="mb-5 bg-blue-500 px-4 py-2 rounded text-white mt-2 !text-[15px]"
            onClick={handleSubmit(onSubmit)}
          >
            Add New Address
          </button>
        )}
      </div>
    </div>
  );
}

export default BillingDetails_Form;
