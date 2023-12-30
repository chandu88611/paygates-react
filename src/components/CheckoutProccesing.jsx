import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CheckoutProccesing() {
  const navigate = useNavigate();
  const params = useParams();

  const [text, setText] = useState("Please Wait");
  const [error, seterror] = useState();
  
  const firstapi_call = async () => {
    try {
      const res = await axios.post(
        `https://parent.globalcrmsoftware.com/api/decrypt-domain-id/${params?.second_id}`
      );
      if (res?.data?.status) {
        console.log(res);
        localStorage.setItem("child_url", JSON.stringify(res.data));
        secondapi_call(res.data.data);
      }
    } catch (error) {

      
    }
  };

  const secondapi_call = async (url) => {
    try {
      const res = await axios.post(
  `${url}/api/get-payment-link-details`,
        {
          payment_link_id: params?.id,
        }
      );
      if (res?.data?.status) {
        if (res?.data?.data?.paygate_name == "zaakpay") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/zp/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "payu") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/pu/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "worldline") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/wl/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "paytm") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/ptm/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "phonepe") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/ph/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "stripe") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/st/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "qr_code") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/qr/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "airwallex") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/aw/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "floxypay") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/fp/${params?.id}`;
        }
        if (res?.data?.data?.paygate_name == "binance(usdt)") {
          window.location.href = `https://checkout.globalcrmsoftware.com/checkout/bn/${params?.id}`;
        }
      }
    } catch (error) {
      seterror(true);
      setText("Payment Failed try after 20 minutes");
      console.log(error);
    }

  };

  useEffect(() => {
    firstapi_call();
  }, []);
  return (
    <div className="fixed w-full top-0 left-0 h-full bg-[#f5f5f5f5] z-[2334]">
      <div className="flex items-center gap-2  w-fit mx-auto mt-[50vh]">
        {!error && (
          <div class="loader">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
          </div>
        )}
        <h1 className="text-4xl text-blue-500 animate-"></h1>
      </div>
      {error ? (
        <div className="text-[17px] text-red-600 mx-auto px-2 py-1  w-fit flex items-center">
          {text}
        </div>
      ) : (
        <div className="text-[17px] text-green-600 mx-auto px-2 py-1  w-fit flex items-center">
          {text} <p className="loading text-2xl -mt-1"></p>
        </div>
      )}
      {!error && (
        <div className="text-[17px] text-gray-600 mx-auto px-2 py-1  w-fit flex items-center">
          Do not perform any action
        </div>
      )}
    </div>
  );
}

export default CheckoutProccesing;
