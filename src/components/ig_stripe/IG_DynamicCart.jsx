
import React from 'react';
import IG_DynamicCart_auto from './IG_DynamicCart_auto';
import IG_DynamicCart_infinity from './IG_DynamicCart_infinity';


function IG_DynamicCart(){
  const url = JSON.parse(localStorage.getItem("child_url"));
  let dynamicComponent;
  if (url?.data === "https://buyer.ftxtradingsoftware.com"){
    dynamicComponent = <></>;
  } else if (url?.data === "https://buyer.autotradesoftware.ae"){
    dynamicComponent = <IG_DynamicCart_auto />;
  } else if (url?.data === "https://buyer.infinitysoftware.asia"){
    dynamicComponent = <IG_DynamicCart_infinity/>;
  } else {
    dynamicComponent=<div className='text-center p-4 text-red-500 font-bold text-lg'>No child urls found</div>
  }
  return <div>{dynamicComponent}</div>;
}

export default IG_DynamicCart;