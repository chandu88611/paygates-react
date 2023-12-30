import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../stores/cartThunk";
import axios from "axios";
import { toast } from "react-toastify";
import BillingDetails_Form from "./Addadress";
import Proccesing from "./Proccesing";

function Cart2() {
  const [htmlContent, setHtmlContent] = useState("");
  const formRef = useRef(null);
  const [total, setTotal] = useState();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState({});
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState(false);

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
    <div>
      <div class="container bg-muted">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="d-flex align-items-center justify-content-between">
              <img src="/logo-global.png" width="140px" className="py-2" />
              <p class="mb-0">
                <i class="fa-solid fa-location-dot text-theme"></i>{" "}
                <span class="text-muted h3textbold">
                  {ipData?.address?.city}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <hr />
        <div class="row mt-3">
          <div class="col-lg-12 mx-auto">
            <div class="checkout-card mx-auto">
              <div class="row">
                <div class="col-xl-6">
                  <div className="mb-4">
                    <p className="pb-3 -mr-4 text-left ">Deliver to</p>
                    <div className="flex items-center gap-3 w-full">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Pincode"
                        className="border  rounded py-2 pl-2 w-full focus:outline-none"
                      />
                      <button class="cBtn cBtn-1 w-32  py-2">Check</button>
                    </div>

                    <div className="bg-red-100  mt-2 px-2 py-1 font-normal rounded text-[13px]">
                      Enter pincode in box above for delivery estimates and
                      charges
                    </div>
                  </div>
                  <BillingDetails_Form />

                  <button
                    class={`${
                      cartProducts?.data?.length > 0
                        ? "cBtn-2 cBtn-2  cBtn-2-default"
                        : " w-full py-2 bg-gray-100 cursor-not-allowed"
                    }`}
                    onClick={checkout}
                    disabled={cartProducts?.data?.length < 1}
                  >
                    Checkout Now
                  </button>
                </div>

                <div class="col-xl-6 bg-gray-50">
                  <div class="detail-info">
                    <div id="right-sidebar">
                      <div class="card !border-0 bg-gray-50">
                        <div class="subscribe ">
                          {/* <h4 class=" h1title">Your Software Cart</h4>
                          <div class="text-muted h3textp">
                            We have got your software choices, and our team is
                            ready to assist you further.
                          </div> */}
                          {cartProducts?.data?.length > 0 ? (
                            cartProducts?.data?.map((data, i) => (
                              <div class="flex gap-4">
                                <img
                                  className="w-[60px] !h-[60px] md:w-[100px] md:!h-[100px]"
                                  src={data?.img_1}
                                  alt="headphones set with pink color"
                                />

                                <div id="cart-text">
                                  <h2 className="text-[14px] md:text-[16px]">
                                    {data?.name}
                                  </h2>
                                  <div>
                                    <span class=" text-[11px] font-semibold mr-4 line-through text-muted md:text-[15px]">
                                      ₹1199
                                    </span>{" "}
                                    <span class=" text-[11px] font-semibold mr-4 md:text-[15px]">
                                      {" "}
                                      ₹{data?.price}
                                    </span>{" "}
                                    <span class=" text-[11px] font-semibold mr-4 md:text-[15px] text-green-600">
                                      {" "}
                                      ₹600 Saved
                                    </span>
                                  </div>
                                  <div>
                                    <span class="h4text-color text-[10px] md:text-[12px]">
                                      Sold By:{" "}
                                    </span>{" "}
                                    <span class="h4text text-[10px] md:text-[12px]">
                                      {" "}
                                      Infinity Software
                                    </span>
                                  </div>
                                  <div>
                                    <span class="h4text-color text-[10px] md:text-[12px]">
                                      Shipping:{" "}
                                    </span>{" "}
                                    <span class="h4text text-[10px] md:text-[12px]">
                                      {" "}
                                      Free
                                    </span>
                                  </div>
                                  <div id="wrap">
                                    <select value={data?.qty}>
                                      <option value="" selected disabled>
                                        Qty 1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                    </select>
                                    <span class="icon_arrow"></span>
                                  </div>
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
                        <div class="flex  items-center my-4 !w-full">
                          <div class="profile-img">
                            <img
                              src="/assets/img/gift-box.webp"
                              alt="Profile Picture"
                            />
                          </div>
                          <div class="w-full pr-4">
                            <h4 class="username mt-1">Enter Your Promocode</h4>
                            <div className="flex items-center gap-2 -mt-2">
                              <input
                                type="text"
                                className="border ml-2 rounded py-1 pl-2 focus:outline-none w-full text-[15px]"
                                onChange={(e) => {
                                  setPromoError("");
                                  setPromo(e.target.value);
                                }}
                              />
                              <button
                                className="bg-teal-500 px-3 py-1 rounded text-white text-[15px]"
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
                      </div>

                      <div class="cart border-0">
                        <ul class="cart__list">
                          <li class="cart__list-item">
                            <span class="item__name">
                              <span class="item__quantity">Total MRP</span>
                              <span class="item__price">
                                ₹{" "}
                                {cartProducts?.data?.reduce(
                                  (d, t) => d + t.total,
                                  0
                                )}
                              </span>
                            </span>
                          </li>
                          <li class="cart__list-item">
                            <span class="item__name">
                              <span class="item__quantity">Offer discount</span>
                              <span class="item__price off-price-col">
                                - ₹600
                              </span>
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
                              <span class="item__quantity">
                                Shipping charge
                              </span>
                              <span class="item__price">Free</span>
                            </span>
                          </li>
                          <hr class="hr" />
                          <li class="cart__list-item">
                            <span class="item__name">
                              <span class="item__quantity cart__total">
                                Total
                              </span>
                              <span class="item__price cart__total">
                                ₹{" "}
                                {cartProducts?.data?.reduce(
                                  (d, t) => d + t.total,
                                  0
                                )}
                              </span>
                            </span>
                          </li>
                          <li class="cart__list-item">
                            {/* <button class={`${cartProducts?.data?.length>0?"cBtn-2 cBtn-2  cBtn-2-default":" w-full py-2 bg-gray-100 cursor-not-allowed"}`} onClick={checkout} disabled={cartProducts?.data?.length<1}>Checkout Now</button> */}
                          </li>
                          <li class="cart__list-item">
                            <p class="footer-p px-2 py-1">
                              Shipping charges might vary based on delivery
                              location
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xl-12">
                  <section>
                    <div class="order-cont">
                      <div class="h2progress">Your order has been received</div>
                      <div class="bitext">
                        <span class="text2">Order Date:</span> August 31 2023 |{" "}
                        <span class="text2">Purchase ID:</span> IS02030405{" "}
                      </div>
                    </div>
                    <ol class="progress-bar-ss">
                      <li class="is-complete">
                        <img
                          src="/assets/img/order-delivery-o.png"
                          alt="order-confirm"
                        />
                        <span>
                          Confirmed <span class="sub-text">August 31</span>
                        </span>
                      </li>
                      <li class="is-activ">
                        <img
                          src="/assets/img/shipped.png"
                          alt="order-confirm"
                        />
                        <span>On its way</span>
                      </li>
                      <li className="is-activ">
                        <img
                          src="/assets/img/push-cart.png"
                          alt="order-confirm"
                        />
                        <span>Out for delivery</span>
                      </li>
                      <li>
                        <img
                          src="/assets/img/courier.png"
                          alt="order-confirm"
                        />
                        <span>
                          Estimated Delivery{" "}
                          <span class="sub-text">Sep-08 or Sep-09</span>
                        </span>
                      </li>
                    </ol>
                  </section>
                </div>
              </div>

              <div class="row">
                <div class="col-xl-12 footer-col">
                  <div class="headertext">
                    Connect Our Experts
                    <br />
                    <span class="title-two">
                      Seamless Checkout Experience for Advanced Personalized
                      Software Solutions.
                    </span>
                  </div>

                  <div class="row">
                    <div class="col-xl-4">
                      <img
                        src="/assets/img/contact-us.png"
                        alt="Profile Picture"
                        className="mx-auto"
                      />
                      <span class="text">
                        Email Address:{" "}
                        <span class="textp">info@globalpbxsoftware.com</span>{" "}
                      </span>
                    </div>
                    <div class="col-xl-4">
                      <img
                        src="/assets/img/message.png"
                        alt="Profile Picture"
                        className="mx-auto"
                      />
                      <span class="text">
                        Contact Number:{" "}
                        <span class="textp">+91 9964797361</span>{" "}
                      </span>
                    </div>
                    <div class="col-xl-4">
                      <img
                        src="/assets/img/security.png"
                        alt="Profile Picture"
                        className="mx-auto"
                      />
                      <span class="text">
                        Secure Payment:{" "}
                        <span class="textp">100% secure payment</span>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-5" />
        <div class="row mt-3 pb-3 border-bottom">
          <div class="col-lg-12">
            <div class="h3text2">How Our Software Works</div>
          </div>
          <div class="col-xl-3 border-right">
            <div class="">
              <div class="mb-2 lbl-orange h3textbold">Step 1</div>
              <span class="mb-2 h3textp">
                Register & Payment: Access Your Success
              </span>
              <div class="mb-0 text-muted fs-14 h3textp">
                Unlock your pathway to success by registering and making the
                required payment.
              </div>
            </div>
          </div>
          <div class="col-xl-6 video-consultation border-right">
            <div class="mb-2 lbl-orange h3textbold">Step 2</div>
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
                  />
                  <span class="mb-2 mt-2 h3textp">Others</span>
                  <div class="mb-0 text-muted fs-14 h3textp">300+</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="">
              <div class="mb-2 lbl-orange h3textbold">Step 3</div>
              <span class="mb-2 h3textp">Installation: Unleash the Power</span>
              <div class="mb-0 text-muted fs-14 h3textp">
                Follow the provided instructions to install and unleash the
                advanced capabilities.
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Proccesing />}
      <form
        class="initiatePaymentForm opacity-0 h-0"
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

export default Cart2;
