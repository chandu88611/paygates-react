import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  AiFillContacts,
  AiFillCreditCard,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
function Paytm_paymentSuccess({ data }) {
  const params = useParams();
  const [order_visited, setOrder_visited] = useState();
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [payloadData, setPayloadData] = useState();
  console.log(payloadData);

  useEffect(() => {
    setPayloadData(data?.productDetails);
  }, [data]);
  const navigate = useNavigate();
  useEffect(() => {
    let storedData = localStorage.getItem("order_visited");
    if (storedData !== null) {
      try {
        storedData = JSON.parse(storedData);

        if (storedData.visited === 1 && storedData.order === params.order) {
          setOrder_visited(true);
          navigate("/thank-you");
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
    if (!storedData || storedData.order != params.order) {
      setTimeout(() => {
        window.location.reload();
      }, 7000);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "order_visited",
      JSON.stringify({ order: params.order, visited: 1 })
    );
  }, [order_visited]);

  return (
    <>
      {
        <div className=" md:h-[86vh]  !pb-10 ">
          <div className="mx-auto h-fit max-w-6xl relative ">
            <img src="/logo-global.png" alt="" className=" my-4  " />
            <div className="  h-100 md:grid  md:grid-cols-2 ">
              <div className=" px-3 border-b py-3 col-span-2 mt-2">
                <div className="text-center">
                  <h4 className="text-3xl text-green-500  ">
                    Payment Successful
                  </h4>
                  <img
                    src="/success1.gif"
                    alt=""
                    className=" w-28 mx-auto mb-8"
                  />
                </div>
              </div>
              <div className="col-span-2 border border-t-0 slide-in">
                <div className="flex justify-between px-3 pt-2  items-center !w-full col-span-2 ">
                  <p className="text-[25px]">Order Information</p>
                  <div className="flex gap-1">
                    <div class="text-[15px]">Order Date :</div>
                    <div class="text-[15px] text-muted ">
                      {" " + moment(data?.txnDate).format("MMM DD YYYY")}
                    </div>
                  </div>
                </div>
                <div className="grid  grid-cols-1 md:grid-cols-6 col-span-2  my-3 px-3 gap-1 ">
                  <div className="col-span-8 md:col-span-2">
                    <div className="border-b-2  py-2 px-3  font-semibold  flex items-center gap-1 text-[19px] ">
                      Order Details
                    </div>
                    <div className="flex flex-col w-full   gap-2 ">
                      <div class="grid grid-cols-2   pt-2  ">
                        <div class="text-[15px] flex items-center gap-1 ">
                          <AiFillCreditCard
                            size={20}
                            className="text-blue-600"
                          />
                          Transaction ID :
                        </div>
                        <div class="text-[15px]  text-blue-500 -ml-6 break-words">
                          {data?.txnid}
                        </div>
                      </div>
                      <div class="grid grid-cols-2 py-1  ">
                        <div class="text-[15px]">Order ID : </div>
                        <div class="text-[15px] text-blue-500 -ml-6 ">
                          {data?.orderNumber}
                        </div>
                      </div>

                      <div class="grid grid-cols-2 py-1 ">
                        <div class="text-[15px]">Total Paid : </div>
                        <div class="text-[15px] text-green-600 -ml-6">
                          ₹{data?.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-8 md:col-span-2">
                    <div className="border-b-2  py-2 px-3 font-semibold flex items-center gap-1 text-[19px] ">
                      <AiOutlineHome size={20} className="text-blue-600 mb-1" />
                      Shipping Address
                    </div>
                    <div className="mt-2 f">
                      <div className="row ml-0">
                        {data?.customer?.add_1 && (
                          <div className="col-12 col-lg-12  p-1">
                            <p className="mb-0  text-[16px]">
                              {data?.customer?.add_1}
                            </p>
                          </div>
                        )}
                        {data?.customer?.add_2 && (
                          <div className="col-12 col-lg-12  p-1 -ml-8">
                            <p className="mb-0  text-[15px]">
                              {data?.customer?.add_2}
                            </p>
                          </div>
                        )}
                        <div className="col-12 col-lg-6   p-1">
                          <p className="mb-0  text-[15px]">
                            {data?.customer?.city}
                          </p>
                        </div>
                        <div className="col-12 col-lg-6  p-1 -ml-8">
                          <p className="mb-0  text-[15px]">
                            {data?.customer?.state}
                          </p>
                        </div>
                        <div className="col-12 col-lg-6   p-1">
                          <p className="mb-0  text-[15px]">
                            {data?.customer?.country}
                          </p>
                        </div>
                        <div className="col-12 col-lg-6  p-1 -ml-8">
                          <p className="mb-0  text-[15px]">
                            {data?.customer?.zip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 md:col-span-2">
                    <div className="border-b-2  py-2 px-3 font-semibold flex items-center gap-1 text-[19px]">
                      <AiFillContacts
                        size={22}
                        className="text-blue-600 mb-[.5px]"
                      />
                      Contact info
                    </div>
                    <div className="  p-1">
                      <p className="mb-0  text-[15px] ">
                        {data?.customer?.first_name} {data?.customer?.last_name}
                      </p>
                    </div>
                    <div className="  p-1">
                      <p className="mb-0  text-[15px] ">
                        {data?.customer?.email}
                      </p>
                    </div>
                    <div className="  p-1">
                      <p className="mb-0  text-[15px] ">
                        {data?.customer?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center mt-6 md:mt-[100px] col-span-2 slide-left text-[17px] ">
                <div className="loader_2"></div>
              </div>
            </div>
          </div>
        </div>
      }
      <footer class=" py-4  border-t-2 ">
        <div class="flex gap-2 w-fit  mx-auto text-[14px] flex-col md:flex-row">
          <div class="text-[14px]">
            {new Date().getFullYear()} © All Rights Reserved.
          </div>
          <div>
            <div class="text-[14px]">
              Designed and Developed by Global PBX Software
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Paytm_paymentSuccess;
