import React from 'react';
import FloxyPay_DynamicCart_auto from './FloxyPay_DynamicCart_auto';
import FloxyPay_DynamicCart_ftx from './FloxyPay_DynamicCart_ftx';

function FloxyPay_DynamicCart(){
  const url = JSON.parse(localStorage.getItem("child_url"));
  let dynamicComponent;
  if (url?.data === "https://buyer.ftxtradingsoftware.com"){
    dynamicComponent = <FloxyPay_DynamicCart_ftx/>;
  } else if (url?.data === "https://buyer.autotradesoftware.ae"){
    dynamicComponent = <FloxyPay_DynamicCart_auto/>;
  } else {
    dynamicComponent=<div className='text-center p-4 text-red-500 font-bold text-lg'>No child urls found</div>
  }
  return <div>{dynamicComponent}</div>;
}

export default FloxyPay_DynamicCart;
