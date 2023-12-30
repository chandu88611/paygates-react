import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCartProducts } from "../stores/cartThunk";

function Pricing() {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState("");
  const dispatch = useDispatch();
  const getAllusers = async () => {
    // dispatch(setLoader(true))
    try {
      const res = await axios.get(
        "https://payment.globalpbxsoftware.com/api/product-details"
      );

      if (res.status) {
        // dispatch(setLoader(false))
        setUsers(res.data.data);
        
      }
    } catch (error) {
      console.log(error);
      // dispatch(setLoader(false))
    }
  };
  useEffect(() => {
    getAllusers()
    
  }, []);

  const addToCart = async (data, i) => {
    setLoader("load" + i);
    try {
      const res = await axios.post(
        "https://payment.globalpbxsoftware.com/api/add-to-cart",
        {
          product_id: data?.id,
          client_id: "7",
          qty: "1",
          price: data?.product_price?.price?.filter(
            (data) => data.currency == "INR"
          )[0]?.price,
        }
      );
      if (res.status) {
        toast.success(res.data.message);
        setLoader(false);

        dispatch(fetchCartProducts("7"));
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <section class="bg-light text-center p-5 ">
        <div class="container-fluid">
          <div class="row text-muted text-center">
            <div class="col m-4">
              <h1 class="mb-4 text-uppercase title !text-black font-semibold">
                {" "}
                Pricing Table{" "}
              </h1>
            </div>
          </div>
          <div class="row align-items-center max-w-7xl mx-auto">
            {users?.map((data, i) => (
              <div class="col-lg-4 !m-0 ">
                <div class="card card-1 text-light py-4 my-4 mx-auto">
                  <div class="card-body">
                    <h5 class="text-uppercase font-weight-bold mb-4 !text-black text-3xl">
                      {" "}
                      {data?.name}{" "}
                    </h5>

                    <h1 class="text-uppercase price text-3xl !text-black">
                      ₹
                      {
                        data?.product_price?.price?.filter(
                          (data) => data.currency == "INR"
                        )[0]?.price
                      }
                    </h1>
                    <ul class="list-unstyled mb-3">
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit">
                        {" "}
                        Multi Level IVR Setup{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit">
                        {" "}
                        50 User Account{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit">
                        {" "}
                        50 Extension
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        16 Port{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        Intercom{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        Time Conditions{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        Call Forwarding{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        Call Recording{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        1TB Storage{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        SMS Alert{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit ">
                        {" "}
                        24/7 Support{" "}
                      </li>
                      <li class=" py-2 card-list-item  font-semibold !text-black text-[12px] w-full md:w-fit border-0">
                        {" "}
                        (Physical Device Installation in Site Location){" "}
                      </li>
                    </ul>
                    <div
                      class="bg-blue-500 px-3 w-fit mx-auto py-2 rounded  shadow-sm text-lg  flex items-center gap-2 text-white"
                      onClick={() => {
                        addToCart(data, i);
                      }}
                    >
                      {" "}
                      Add to cart{" "}
                      {loader == "load" + i && (
                        <CircularProgress size={20} className="text-white " />
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <form class="initiatePaymentForm" action="https://zaakstaging.zaakpay.com/api/paymentTransact/V8" method="post"> 
        <input type="hidden" name="merchantIdentifier" value="b19e8f103bce406cbd3476431b6b7973"/>
        <input type="hidden" name="orderId" value="ZPLive1697885383601"/>
        <input type="hidden" name="returnUrl" value="https://globalpbxsoftware.com/ZP/Response.php"/>
        <div class="form-group">
        <label for="currency">currency:</label>
                <input type="text" class="form-control" id="currency" placeholder="Enter currency" name="currency" value={"INR"}/>
            </div>
            <div class="form-group">
                <label for="amount">amount:</label>
                <input type="text" class="form-control" id="amount" placeholder="Enter amount" name="amount" />
            </div>
            <div class="form-group">
                <label for="buyerEmail">buyerEmail:</label>
                <input type="email" class="form-control" id="buyerEmail" placeholder="Enter email" name="buyerEmail"/>
            </div>
            <input type="hidden" name="buyerFirstName" value="" />
            <input type="hidden" name="buyerLastName" value="" />
            <input type="hidden" name="buyerAddress" value="" />
            <input type="hidden" name="buyerCity" value="" />
            <input type="hidden" name="buyerState" value="" />
            <input type="hidden" name="buyerCountry" value="" />
            <input type="hidden" name="buyerPincode" value="" />
            <input type="hidden" name="buyerPhoneNumber" value="" />
            <input type="hidden" name="productDescription" value="" />
            <input type="hidden" name="checksum" id="checksum" value="a97246bfe1f4639bb24429bed4a492ddaf3df22d03b11b9380b33ec6ee764d30"/>
            <button  id="makePayment" type="submit" class="btn btn-primary">Pay amount</button>
            <button type="button" id="initiatePayment" class="btn btn-primary" style={{display: 'none'}}>Initiate payment</button>
        </form> */}
    </div>
  );
}

export default Pricing;
