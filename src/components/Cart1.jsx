import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../stores/cartThunk";
import axios from "axios";
import { toast } from "react-toastify";
import BillingDetails_Form from "./Addadress";
import Proccesing from "./Proccesing";
import { useLocation } from "react-router-dom";
import { BiSolidLock, BiSolidOffer } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";

function Cart1() {
  const [htmlContent, setHtmlContent] = useState("");
  const formRef = useRef(null);
  const [total, setTotal] = useState();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState({});
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Dispatch the Thunk to fetch cart products
    // if(location.pathname=='/'||location.pathname=="/cart"){

    dispatch(fetchCartProducts("7"));
    // }
  }, [location.pathname]);
  const checkout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://payment.globalpbxsoftware.com/api/transaction-api",
        {
          client_id: "7",
          returnUrl: "https://checkout.globalpbxsoftware.com/payment-status/",
          total: total,
          sub_total: total,
          email: "nganba.irom@gleamglobalservicesindia.com",
          currency: "INR",
          type: "parent",
        }
      );
      setFormData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const images = [
    "/assets/img/slider-img-1.jpg",
    "/assets/img/slider-img-2.jpg",
    "/assets/img/slider-img-3.jpg",
    "/assets/img/slider-img-4.jpg",
    "/assets/img/slider-img-5.jpg",
    "/assets/img/slider-img-6.jpg",
    "/assets/img/slider-img-7.jpg",
    "/assets/img/slider-img-8.jpg",
    "/assets/img/slider-img-9.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);
  useEffect(() => {
    setTotal(cartProducts?.data?.reduce((d, t) => d + t.total, 0));
  }, [cartProducts]);

  useEffect(() => {
    if (formData) {
      formRef.current.submit();
    }
  }, [formData]);
  useEffect(() => {
    function successCallback(position) {
      console.log(position);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          setIpData(data);
          localStorage.setItem("ipdata", JSON.stringify(data));

          //  setShowLoader(false)
        } catch (error) {
          console.error("Error fetching country:", error);
          //  setShowLoader(false)
        }
        //   setShowLoader(false)
      };

      fetchData();

      const extractCountry = (data) => {
        const { address } = data;
        if (address && address.country) {
          return address.country;
        }
        return "Unknown";
      };
    }
    function errorCallback(error) {
      console.log("error", error);
    }

    const ipdata = JSON.parse(localStorage?.getItem("ipdata"));

    if (ipdata) {
      setIpData(ipdata);
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }, []);
  return (
    <div className=" shadow-sm">
      <div class="  w-full sm:w-[80vw] md:w-[90vw] lg:w-[80vw] 2xl:w-[60vw] mx-auto mt-2 md:px-1 !shadow p-2">
        <div class="row">
          <div class="col-xl-7 lg:px-8">
            <div class="d-flex align-items-center justify-content-between">
              <img src="/logo-global.png" width="140px" className="py-2" />
              <p class="mb-0">
                <img src="/secure-icon.png" width="80px" className="py-2" />
              </p>
            </div>
            <div class="alert alert-success mb-3" role="alert">
                      <div class="d-flex gap-3">
                        <div class="flex-shrink-0">
                          <MdSecurity
                            size={43}
                            className="ti ti-bookmarks ti-sm alert-icon alert-icon-lg"
                          />
                        </div>
                        <div class="flex-grow-1">
                          This checkout page is secure and safe to use. We
                          adhere to the highest standards of data privacy and
                          security to ensure that your information is always
                          safe.
                        </div>
                      </div>
                    </div>

            <section className="ml-0 m-0">
              <div class="order-cont ">
                <div class="h2progress">Your order has been received</div>
                <div class="bitext">
                  <span class="text2">Order Date:</span> August 31 2023 |
                  <span class="text2">Purchase ID:</span> IS02030405
                </div>
              </div>
              <ol class="progress-bar-ss w-[80%] ">
                <li class="is-complete">
                  <img
                    src="/assets/img/order-delivery-o.png"
                    alt="order-confirm"
                  />
                  <span className="text-center">
                    Confirmed <span class="sub-text">August 31</span>
                  </span>
                </li>
                <li class="is-activ">
                  <img src="/assets/img/shipped.png" alt="order-confirm" />
                  <span className="-ml-6">On its way</span>
                </li>

                <li>
                  <img src="/assets/img/courier.png" alt="order-confirm" />
                  <span className="ml-6">
                    Estimated Delivery
                    <span class="sub-text">Sep-08 or Sep-09</span>
                  </span>
                </li>
              </ol>
            </section>

            <div class="!ml-0 footer-col">
              <div class="headertext text-left !ml-0">
                Connect Our Experts
                <br />
                <p class="title-two text-left">
                  Seamless Checkout Experience for Advanced Personalized
                  Software Solutions.
                </p>
              </div>

              <div class="ml-0">
                <div className="md:w-[80%]   bg-white px-4  py-3 shadow  rounded my-2">
                  <div class="flex gap-3">
                    <img
                      src="/assets/img/message.png"
                      alt="Profile Picture"
                      className="!w-[35px]"
                    />
                    <span class="text !text-start mt-[6px]">
                      <span>Email Address</span>
                    </span>
                  </div>
                  <span class="textp text-left ml-2">
                    For Billing:info@globalpbxsoftware.com
                  </span>
                  <span class="textp text-left ml-2">
                    For Support: support@domainname.com
                  </span>
                </div>

                <div className="md:w-[80%]   bg-white px-4  py-3 shadow  rounded my-2">
                  <div class="flex gap-3">
                    <img
                      src="/assets/img/contact-us.png"
                      alt="Profile Picture"
                      className="!w-[35px]"
                    />
                    <span class="text !text-start mt-[6px]">
                      <span>Contact Number</span>
                    </span>
                  </div>
                  <span class="textp text-left ml-2">
                    Regarding Payment: +91 936347XXXX
                  </span>
                  <span class="textp text-left ml-2">
                    Regarding Product: +91 965544XXXX
                  </span>
                </div>
                <div className="md:w-[80%]   bg-white px-4  py-3 shadow  rounded my-2">
                  <div class="flex gap-3">
                    <img
                      src="/assets/img/security.png"
                      alt="Profile Picture"
                      className="!w-[35px]"
                    />
                    <span class="text !text-start mt-[6px]">
                      <span> Secure Payment</span>
                    </span>
                  </div>
                  <img
                    src="/assets/card-logo.png"
                    alt=""
                    class=" ml-2 mt-2  !w-[240px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-5 bg-gray-50">
            <div class="detail-info">
              <div id="right-sidebar">
                <div class="">
                  <div className="flex items-center justify-end py-2">
                    <img src="/location-1.gif" alt="" className="h-10" />
                    <p className="font-semibold">{ipData?.address?.city}</p>
                  </div>
                  <hr />
                  <div class="subscribe">
                    {/* <h3 className="text-xl bg-gray-100  px-2 py-1 my-2 uppercase flex items-center">Your Software Cart <AiOutlineShoppingCart size={24} className="ml-auto  mr-2 text-muted"/></h3> */}
                    {/* <h2 class=" font-medium !text-[20px] !text-blue-500 bg-blue-100 px-2 py-2">Your Software Cart</h2> */}
                    {/* <div class="text-muted h3textp">
                            We have got your software choices, and our team is
                            ready to assist you further.
                          </div> */}
                    {cartProducts?.data?.length > 0 ? (
                      cartProducts?.data?.map((data, i) => (
                        <div class="flex my-2 gap-6 ml-3 ">
                          <img
                            className=" w-[80px] !h-[80px]"
                            src={data?.img_1}
                            alt="headphones set with pink color"
                          />

                          <div id="cart-text">
                            <h2 className="text-[13px] md:text-[15px]">
                              {data?.name}
                            </h2>
                            <div>
                              <span class="h3text !text-[12px] !md:text-[14px]">
                                ₹1199
                              </span>
                              <span class="h1text !text-[12px] !md:text-[14px]">
                                {" "}
                                ₹{data?.price}
                              </span>
                              <span class="h3text-color !text-[14px] !md:text-[14px]">
                                ₹600 Saved
                              </span>
                            </div>

                            <div className="-mt-[7px]">
                              <span class="h4text-color !text-[11px]">
                                Shipping :{" "}
                              </span>
                              <span class="h4text !text-[11px]"> Free</span>
                            </div>
                            <div className="-mt-[7px]">
                              <span class="h4text-color !text-[11px]">
                                Quantity :{" "}
                              </span>
                              <span class="h4text !text-[11px]">
                                {" "}
                                {data?.qty}
                              </span>
                            </div>
                            {/* <div >
                                    <select value={data?.qty}>
                                      <option value="" selected disabled>
                                        Qty 1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                    </select>
                                   
                                  </div> */}
                            <div class="hline"></div>
                            <div id="buttons" className="mt-2">
                              <div
                                class="h3text-color2"
                                onClick={async () => {
                                  try {
                                    const res = await axios.post(
                                      `https://payment.globalpbxsoftware.com/api/delete-from-cart/${data?.product_id}`,
                                      {
                                        client_id: "7",
                                      }
                                    );
                                    if (res.data.status) {
                                      toast.success(res.data?.message);
                                      dispatch(fetchCartProducts("7"));
                                    }
                                  } catch (error) {
                                    toast.error(
                                      "problem in removing product from cart"
                                    );
                                  }
                                }}
                              >
                                <a href="#">Remove</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-blue-600 py-2 my-4 bg-blue-100">
                        Your Cart is Empty
                      </div>
                    )}
                  </div>
                </div>
                <hr className="" />
                <div class="flex  items-center mt-3 mb-4 !w-[90%] ">
                  <div class="w-full pr-4">
                    <div className="flex items-center gap-4  ">
                      <input
                        type="text"
                        className="border ml-2 rounded py-2 pl-2 focus:outline-none w-full text-[15px]"
                        placeholder="Enter Promocode"
                        onChange={(e) => {
                          setPromoError("");
                          setPromo(e.target.value);
                        }}
                      />
                      <button
                        className="bg-blue-500 px-3 py-2 rounded text-white text-[15px]"
                        onClick={() => {
                          if (promo) {
                            setPromoError("Enter Valid Promocode");
                          } else {
                            setPromoError("Enter Promocode");
                          }
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <div className="bg-red-100 ml-2 mt-2 px-2 py-1 font-normal rounded text-[13px]">
                        {promoError}
                      </div>
                    )}
                  </div>
                </div>

                <div class="cart">
                  <ul class="cart__list">
                    <li class="cart__list-item">
                      <span class="item__name">
                        <span class="item__quantity">Total MRP</span>
                        <span class="item__price">
                          ₹
                          {cartProducts?.data?.reduce((d, t) => d + t.total, 0)}
                        </span>
                      </span>
                    </li>
                    <li class="cart__list-item">
                      <span class="item__name">
                        <span class="item__quantity">Offer discount</span>
                        <span class="item__price off-price-col">- ₹600</span>
                      </span>
                    </li>
                    <li class="cart__list-item">
                      <span class="item__name">
                        <span class="item__quantity">Tax - 12%</span>
                        <span class="item__price">₹71.88</span>
                      </span>
                    </li>
                    <li class="cart__list-item">
                      <span class="item__name">
                        <span class="item__quantity">Shipping charge</span>
                        <span class="item__price">Free</span>
                      </span>
                    </li>
                    <hr class="hr" />
                    <li class="cart__list-item">
                      <span class="item__name">
                        <span class="item__quantity cart__total !text-blue-500">
                          Total
                        </span>
                        <span class="item__price cart__total !text-blue-500">
                          ₹
                          {cartProducts?.data?.reduce((d, t) => d + t.total, 0)}
                        </span>
                      </span>
                    </li>
                    <li class="cart__list-item">
                      {/* <button class={`${cartProducts?.data?.length>0?"cBtn-2 cBtn-2  cBtn-2-default":" w-full py-2 bg-gray-100 cursor-not-allowed"}`} onClick={checkout} disabled={cartProducts?.data?.length<1}>Checkout Now</button> */}
                    </li>
                    {/* <li class="cart__list-item"> 
                            <p class="footer-p px-2 py-1">
                              Shipping charges might vary based on delivery
                              location
                            </p>
                          </li> */}
                  </ul>
                  <div className="mx-4"></div>
                  <button
                    class={`${
                      cartProducts?.data?.length > 0
                        ? " w-full font-semibold py-2 rounded bg-blue-500 border-0  !text-white !hover:text-white  hover:scale-105 transform transition-transform duration-500 ease-in-out "
                        : " w-full py-2 bg-gray-100 cursor-not-allowed "
                    }`}
                    onClick={checkout}
                    disabled={cartProducts?.data?.length < 1}
                  >
                    Checkout Now
                  </button>
                  <div className="flex items-center text-[15px] md:text-[18px] text-green-600 gap-1 py-1  my-2   border-green-600 rounded bg-green-100  px-2">
                    <BiSolidLock size={43} className="" /> Guaranteed safe &
                    secure checkout.
                  </div>
                </div>
                <div class="offer-container flex-col p-2 shadow-md my-2">
                  <div class="offer-disc-container">
                    <div class="disc-percent-img">
                      <img
                        src="/assets/img/offer-icon.png"
                        alt="Profile Picture"
                      />
                    </div>
                    <div class="offer-disc-description mr-auto">
                      <h3 class="off-disc-title ">Offers & Discounts</h3>
                    </div>
                  </div>
                  <p className="ml-2 font-semibold">
                    Not applicable for these products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-5" />
        <div class="row mt-3 pb-3 border-bottom ">
          <div class="col-xl-3 border-right">
            <div class="">
              <div class="h3text2">Contact Us</div>

              <p class="h3textp">
                Area code, Street name, Area name, City name, State name -
                Postal code.
              </p>
              <p class="h3textp">
                <i class="fa-solid fa-envelope text-theme"></i>{" "}
                info@domainname.com
              </p>
              <p class="h3textp">
                <i class="fa-solid fa-phone text-theme"></i> +91 965544XXXX
              </p>
            </div>
          </div>
          <div class="col-xl-6 video-consultation border-right">
            <span class="mb-0 h3textp">
              Documentation: Empowering You with Knowledge
            </span>
            <br />
            <div class="mb-0 text-muted fs-14 h3textp">
              Access comprehensive instructions and empowering documentation.
            </div>
            <div class="row">
              <div class="col-3 col-md-3 col-xl-3">
                <div class="pt-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2875/2875438.png"
                    width="35px"
                    alt=""
                    className="mx-auto"
                  />
                  <span class="mb-2 mt-2 h3textp">Google Meet</span>
                  <div class="mb-0 text-muted fs-14 h3textp">200+</div>
                </div>
              </div>
              <div class="col-3 col-md-3 col-xl-3">
                <div class="pt-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3670/3670246.png"
                    width="35px"
                    alt=""
                    className="mx-auto"
                  />
                  <span class="mb-2 mt-2 h3textp">Skype</span>
                  <div class="mb-0 text-muted fs-14 h3textp">180+</div>
                </div>
              </div>
              <div class="col-3 col-md-3 col-xl-3">
                <div class="pt-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4401/4401470.png"
                    width="35px"
                    alt=""
                    className="mx-auto"
                  />
                  <span class="mb-2 mt-2 h3textp">Zoom</span>
                  <div class="mb-0 text-muted fs-14 h3textp">120+</div>
                </div>
              </div>
              <div class="col-3 col-md-3 col-xl-3">
                <div class="pt-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3824/3824371.png"
                    width="35px"
                    alt=""
                    className="mx-auto"
                  />
                  <span class="mb-2 mt-2 h3textp">Others</span>
                  <div class="mb-0 text-muted fs-14 h3textp">300+</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3">
            <div class="">
              <div class="h3text2">Hot Links</div>
              <p class="h3textp ">
                Terms and Conditions
              </p>
              <p class="h3textp ">
                Privacy Policy
              </p>
              <p class="h3textp ">
                Refund Policy
              </p>
              <p class="h3textp ">
                Return and Cancellation Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && <Proccesing />}
      <form
        class="initiatePaymentForm opacity-0 !h-0 overflow-hidden"
        action="https://api.zaakpay.com/api/paymentTransact/V8"
        method="post"
        ref={formRef}
      >
        <input
          type="hidden"
          name="merchantIdentifier"
          value={formData?.merchantIdentifier}
        />
        <input type="hidden" name="orderId" value={formData?.orderId} />
        <input type="hidden" name="returnUrl" value={formData?.returnUrl} />
        <div class="form-group">
          <label for="currency">currency:</label>
          <input
            type="text"
            class="form-control"
            id="currency"
            placeholder="Enter currency"
            name="currency"
            value={formData?.currency}
          />
        </div>
        <div class="form-group">
          <label for="amount">amount:</label>
          <input
            type="text"
            class="form-control"
            id="amount"
            placeholder="Enter amount"
            name="amount"
            value={formData?.amount}
          />
        </div>
        <div class="form-group">
          <label for="buyerEmail">buyerEmail:</label>
          <input
            type="email"
            class="form-control"
            id="buyerEmail"
            placeholder="Enter email"
            name="buyerEmail"
            value={formData?.buyerEmail}
          />
        </div>
        <input
          type="hidden"
          name="buyerFirstName"
          value={formData?.buyerFirstName}
        />
        <input
          type="hidden"
          name="buyerLastName"
          value={formData?.buyerLastName}
        />
        <input
          type="hidden"
          name="buyerAddress"
          value={formData?.buyerAddress}
        />
        <input type="hidden" name="buyerCity" value={formData?.buyerCity} />
        <input type="hidden" name="buyerState" value={formData?.buyerState} />
        <input
          type="hidden"
          name="buyerCountry"
          value={formData?.buyerCountry}
        />
        <input
          type="hidden"
          name="buyerPincode"
          value={formData?.buyerPincode}
        />
        <input
          type="hidden"
          name="buyerPhoneNumber"
          value={formData?.buyerPhoneNumber}
        />
        <input
          type="hidden"
          name="productDescription"
          value={formData?.productDescription}
        />
        <input
          type="hidden"
          name="checksum"
          id="checksum"
          value={formData?.checksum}
        />
        <button id="makePayment" type="submit" class="btn btn-primary">
          Pay amount
        </button>
      </form>
    </div>
  );
}

export default Cart1;
