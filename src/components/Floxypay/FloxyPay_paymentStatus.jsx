import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Proccesing2 from "../Proccessing2";

import FloxyPay_paymentFailure from "./FloxyPay_paymentFailure";
import Thankyou from "../Thankyou";

function FloxyPay_paymentStatus() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentData, setPaymentData] = useState(null);
  const params = useParams();
  const [update, setUpdate] = useState();
  const payment_localdata = JSON.parse(localStorage.getItem("payment_status"));

  const location = useLocation();
  const getQueryParam = (name) => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    return params.get(name);
  };
  const orderid = getQueryParam("orderid");
  const getOrderDetails = async () => {
    try {
      const res = await axios.post(
        "https://parent.globalcrmsoftware.com/api/floxypay-checkTxnId",
        {
          transactionId: orderid,
        }
      );
      if (res?.data?.data?.status === "SUCCESS") {
        setPaymentStatus(true);
        setPaymentData(res.data.data);

        setLoading(false);
      } else {
        setPaymentData(res.data);
        setPaymentStatus(false);
        setLoading(false);
      }
    } catch (error) {
      setPaymentStatus(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, [location]);
  useEffect(() => {
    if (
      payment_localdata?.data?.status &&
      payment_localdata?.data?.status == "true"
    ) {
      console.log(payment_localdata.success, payment_localdata);
      setPaymentData(payment_localdata?.data?.data);
      setPaymentStatus(true);
    } else {
      console.log(payment_localdata);

      setPaymentData(payment_localdata?.data);
      setPaymentStatus(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [update]);
  return (
    <div>
      {loading ? (
        <Proccesing2 />
      ) : paymentData && paymentStatus ? (
        <Thankyou data={paymentData} />
      ) : (
        <FloxyPay_paymentFailure />
      )}
    </div>
  );
}

export default FloxyPay_paymentStatus;
