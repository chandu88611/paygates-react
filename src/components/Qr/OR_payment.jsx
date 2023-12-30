import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { BiSolidLock, BiSolidOffer } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Loading from "../Loading";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
};

function OR_payment() {
const navigate=useNavigate()
const [timer,setTimer]=useState(false)
const [modal,setModal]=useState(false)
const [values,setValues]=useState({
      orderNumber :"", 
      txnId :"", 
      req_amount :"",
      child_id :"",
      client_id :"",
      invoice_id :"",
      payment_link_id :"",
      error:""
})

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);

  const [manual, setManual] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://finance.ftxtradingsoftware.com/api/pixel-fire",
          {
            paymentLinkId: params?.id,
          }
        );
        if (res) {
          setLoading(false);
        }
        if (res?.data?.child_url) {
          window.location.href = res?.data?.child_url;
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

const submitTxnID=async()=>{

  if(!values ||!values?.txnId || values?.txnId?.trim() === ""){
     
    setValues({...values,error:"Please Enter Transaction ID"})
    return
  }else{
setLoading(true)
    try {
      const res=await axios.post("https://parent.globalcrmsoftware.com/api/qr-code-submit-txn",values)
      if(res?.data?.status){
  setLoading(false)
  setModal(true)
  setTimeout(()=>{
navigate("/thank-you")
  },2000)
      }
    } catch (error) {
      
    }
  }

}



  const [htmlContent, setHtmlContent] = useState("");
  const formRef = useRef(null);
  const [total, setTotal] = useState();
  const [formData, setFormData] = useState();
  const [products, setProducts] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [page_status, setPage_status] = useState(
    JSON.parse(localStorage.getItem("page_status"))
  );
  const [loading, setLoading] = useState(false);
  const [ipData, setIpData] = useState({});
  const params = useParams();
  const checkout = async () => {
    const entries = Object.entries(data);
    const filteredEntries = entries.filter(([key]) => key !== "manual_url");
    setLoading(true);
    const formData1 = new FormData();
    formData1.append(
      "returnUrl",
      "https://checkout.globalcrmsoftware.com/payment-status/"
    );
    formData1.append("data", data);
    formData1.append("type", "child");

    try {
      const res = await axios.post(
        "https://parent.globalcrmsoftware.com/api/qr-code-api",
        {
          data: Object.fromEntries(filteredEntries),
          type: "child",
        }
      );

      if (res.data.status) {
      
        setValues(res?.data?.data)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   const getQr=async()=>{
  // try {
  //   const res=await axios.post("https://parent.globalcrmsoftware.com/api/qr-code-api")
  //   console.log(res)
  // } catch (error) {

  // }

  //   }
  useEffect(() => {
    if (manual) {
      // console.log('ifvf')
      checkout();
    }
  }, [manual]);
  useEffect(()=>{
console.log(values)
  },[values])
  const getProducts = async () => {
  
    try {
      const res = await axios.get(
        "https://payment.globalpbxsoftware.com/api/get-product-list"
      );
      setProducts(res?.data?.data);
    } catch (error) {}
  };
  const url = JSON.parse(localStorage.getItem("child_url"));
  const secondapi_call = async (url) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${url?.data}/api/get-payment-link-details`,
        {
          payment_link_id: params?.id,
        }
      );
      if (res?.data?.status) {
        if(res?.data?.data?.transaction_id){
          setLoading(false)
          setError(true)
          return
        }
        setData(res?.data?.data);
        if (res?.data?.data?.payment_type == "manual") {
          getProducts();
          setTimeout(() => {
            let originalString = res?.data?.data?.manual_url;

            if (
              originalString &&
              (originalString.startsWith("url|") ||
                originalString.startsWith("svg|"))
            ) {
              // Remove the prefix
              let modifiedString = originalString.substring(
                originalString.indexOf("|") + 1
              );

              setManual(modifiedString);
            }
          }, 500);
        }
      }
    } catch (error) {
      setError(true);

      console.log(error);
    }
  };
  const paymentQrRef = useRef(null);

  useEffect(() => {
    // Check if the ref is not null
    if (paymentQrRef.current) {
      // Scroll to the element with id="payment_qr" on component mount
      paymentQrRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [manual]); 
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
      // Move to the next image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change images every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);
  useEffect(() => {
    console.log(url);
    setTotal(cartProducts?.data?.reduce((d, t) => d + t.total, 0));

    // first_api()
  }, [cartProducts]);
  useEffect(() => {
    secondapi_call(url);
  }, []);
  useEffect(() => {
    console.log(formData);
    if (formData) {
      formRef.current.submit();
    }
  }, [formData]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      cart_items: data?.invoice?.items?.map((data1, i) => ({
        product_id: products[i].id,
      })),
    }));
  }, [products]);

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
    <div className="my-2 ">
      {data && !error ? (
        <div className=" shadow-sm mt-4">
          <div class="  w-full sm:w-[80vw] md:w-[90vw] lg:w-[84vw] 2xl:w-[60vw] mx-auto mt-2 md:px-1 !shadow p-2">
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
                <div class="mt-4 mb-2">
                  <p className="font-semibold text-lg">Billing Address</p>
                  <p>
                    No-26-27,   Mahatma Gandhi Road, Level-9, Raheja Towers, Bengaluru, Karnataka - 560001
                  </p>
                </div>

               
                <section className="ml-0 m-0">
                  <div class="order-cont ">
                    <div class="h2progress">Your order has been received</div>
                    <div class="bitext">
                      <span class="text2">Order Date:</span>{" "}
                      {moment(data?.invoice?.datecreated).format(
                        "MMMM Do YYYY"
                      )}{" "}
                      |<span class="text2"> Purchase ID:</span>{" "}
                      {moment(data?.invoice?.datecreated)
                        .format("MMMM Do YYYY")
                        .slice(-4) +
                        "" +
                        data?.invoice?.clientid}
                    </div>
                  </div>
                  <ol class="progress-bar-ss w-[80%]">
                    <li class="is-complete">
                      <img
                        src="/assets/img/order-delivery-o.png"
                        alt="order-confirm"
                      />
                      <span className="text-center">
                        Confirmed{" "}
                        <span class="sub-text">
                          {moment().format("MMMM Do ")}
                        </span>
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
                        <span class="sub-text">
                          {moment().add(5, "days").format("MMMM Do ")}
                        </span>
                      </span>
                    </li>
                  </ol>
                </section>
                <div className="py-3">

{timer?<div>
  <div className="w-full font-bold my-2 !text-blue-500">Step 2 / 2</div>

          <label
            htmlFor="pay"
            className="font-semibold animate-bounce"
          >
           Enter transaction ID 
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter transaction ID"
            value={values?.txnId}
            onChange={(e)=>setValues((prev)=>({
              ...prev,
                txnId:e.target.value
            }))}
          />
          <button className="w-full py-2 bg-blue-500 text-white uppercase font-semibold my-2 rounded" onClick={submitTxnID}>
            Complete Transaction
          </button>
          {values?.error&&<p className="text-red-500">{values?.error}</p>}
        </div>:<div className="mx-auto flex justify-center flex-col items-center gap-2">
          <div className="w-full font-bold !text-blue-500">Step 1 / 2</div>
<p className="font-semibold ">Please wait </p>
          <CountdownCircleTimer
isPlaying
duration={60}
colors={['#1f993e', '#F7B801', '#A30000', '#A30000']}
colorsTime={[50, 30, 2, 0]}
size={90}
strokeWidth={10}


onComplete={() => {

return setTimer(true)// repeat animation in 1.5 seconds
}}
>

{({ remainingTime }) => <p    className="!font-semibold"> {remainingTime+"s"}</p>}


</CountdownCircleTimer>
        </div> 
}
</div>
        <li class="cart__list-item list-none">
        
          <img
            src={manual}
            alt=""
            id="payment_qr"
            ref={paymentQrRef}
            className="w-40 h-40 mx-auto"
          />
          <button className="w-full py-2 my-2 bg-blue-100 text-blue-500 uppercase font-semibold !cursor-default">
            Pay by scanning this QR Code
          </button>
        </li>
                <hr className="my-2" />
                <div class="!ml-0 footer-col">
                  <div class="headertext text-left !ml-0">
                    Connect Our Experts
                    <br />
                    <span class="title-two text-left">
                      Seamless Checkout Experience for Advanced Personalized
                      Software Solutions.
                    </span>
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
                        For Billing: info@globalcrmsoftware.com
                      </span>
                      <span class="textp text-left ml-2">
                        For Support: support@globalcrmsoftware.com
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
                        Regarding Payment: +91 9964797361
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
              <div class={`col-xl-5 ${manual ? "bg-blue-50" : "bg-gray-50"}`}>
                <div>
                  <div className="flex items-center justify-end py-2">
                    <img src="/location-1.gif" alt="" className="h-10" />
                    <p className="font-semibold">{ipData?.address?.city}</p>
                  </div>
                  <div>
                    <h3
                      class="py-1"
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginBottom: "2px",
                        marginLeft: "2%",
                      }}
                    >
                      Client's Personal Information
                    </h3>
                    <hr class="hr" />
                    <div class="cart border-0">
                      <ul class="cart__list">
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Name</span>
                            <span class="item__price">{data?.enq?.name}</span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Email ID</span>
                            <span class="item__price !break-words">{data?.enq?.email}</span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Phone Number</span>
                            <span class="item__price">{data?.enq?.mobile}</span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Location</span>
                            <span class="item__price">
                              {data?.enq?.city}, {data?.enq?.state}
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <hr class="hr mb-3" />
                    {data?.invoice?.items?.length > 0 ? (
                      <div>
                        {data?.invoice?.items?.map((data1, i) => (
                          <>
                            <div class="flex my-2 gap-6 ml-3">
                              {products?.length > 0 && (
                                <div className="relative">
                                  <img
                                    class="w-[50px] !h-[50px] md:w-[70px] md:!h-[70px]"
                                    src={products[i]?.img_1}
                                    alt="headphones set with pink color"
                                  />
                                  <div className="absolute -top-3 bg-green-500 text-white h-6 w-6 flex items-center justify-center rounded-full -right-2">
                                    1
                                  </div>
                                </div>
                              )}
                              <div id="cart-text">
                                {products?.length > 0 && (
                                  <h2 className="!text-[14px] !md:text-[18px]">
                                    {products[i]?.name}
                                  </h2>
                                )}
                                <div>
                                  <span class="h1text !text-[12px] !md:text-[14px]">
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: data?.currency?.symbol,
                                      }}
                                      class=" !text-[12px] !md:text-[14px]"
                                    />
                                    {data1?.total}
                                  </span>
                                 
                                </div>
                                <div>
                                  <span class="h4text-color !text-[12px] !md:text-[14px]">
                                    Shipping:
                                  </span>
                                  <span class="h4text"> Free</span>
                                </div>
                              </div>
                            </div>
                            <hr class="hr" />
                          </>
                        ))}

                        <div>
                          <p className="text-xl font-semibold py-2">Addons</p>
                          {data?.invoice?.items?.map((data1, i) => (
                            <>
                              <div class="flex mb-1 gap-6 ml-3">
                                <div id="cart-text">
                                  {products?.length > 0 && (
                                    <h2 className="!text-[14px] !md:text-[18px]">
                                      {data1?.description
                                        ?.replace(
                                          /Automatic Trading Software Setup/g,
                                          "Automatic AI Technologies Software Setup"
                                        )
                                        ?.replace(/Currency/g, "")}
                                    </h2>
                                  )}
                                  <div></div>
                                </div>
                              </div>
                              <hr class="hr" />
                            </>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-blue-600 py-2 my-4 bg-blue-100">
                        Your Cart is Empty
                      </div>
                    )}
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
                    <div class="">
                      <ul class="cart__list">
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Sub Total</span>
                            <span class="item__price">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.currency?.symbol,
                                }}
                              />
                              {data?.invoice?.subtotal}
                            </span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Requested Amount</span>
                            <span class="item__price">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.currency?.symbol,
                                }}
                              />
                              {data?.requested_amount}
                            </span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">Offer discount</span>
                            <span class="item__price off-price-col">
                              -
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.currency?.symbol,
                                }}
                              />
                              {data?.invoice?.discount_total}
                            </span>
                          </span>
                        </li>
                        <li class="cart__list-item">
                          <span class="item__name">
                            <span class="item__quantity">GST - 18%</span>
                            <span class="item__price">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.currency?.symbol,
                                }}
                              />
                              {data?.invoice?.total_tax}
                            </span>
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
                            <span class="item__quantity cart__total">
                              Total
                            </span>
                            <span class="item__price cart__total">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: data?.currency?.symbol,
                                }}
                              />
                              {data?.invoice?.total}
                            </span>
                          </span>
                        </li>
                        <hr className="mt-2 mb-4 text-muted" />
                     
                    
                        

                        <p className="flex items-center text-[15px] md:text-[18px]  font-sans font-semibold text-green-600 gap-1 py-1  my-2   border-green-600 rounded bg-green-100  px-2">
                          <BiSolidLock size={33} className="" /> Guaranteed safe
                          & secure checkout.
                        </p>
                        <li class="cart__list-item">
                          <p class="footer-p px-2 py-1">
                            Shipping charges might vary based on delivery
                            location
                          </p>
                        </li>
                      </ul>
                    </div>

                    {data?.invoice?.discount_total && (
                      <div>
                        <div class="offer-container flex-col p-2 shadow-md my-2">
                          <div class="offer-disc-container">
                            <div class="disc-percent-img">
                              <img
                                src="/assets/img/offer-icon.png"
                                alt="Profile Picture"
                              />
                            </div>
                            <div class="offer-disc-description mr-auto">
                              <h3 class="off-disc-title ">
                                Offers & Discounts
                              </h3>
                            </div>
                          </div>
                          <p className="ml-2 font-semibold">
                            Not applicable for these products.
                          </p>
                        </div>
                        {/* <div class="ins-offer-container">
                          <div class="ins-offer-disc-container">
                            <div class="ins-offer-disc-description">
                              <h3 class="ins-off-disc-title">
                                One Card Instant Discount
                              </h3>
                              <p class="ins-off-disc-desc">
                                Your getting
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: data?.currency?.symbol,
                                  }}
                                />
                                {data?.invoice?.discount_total} discount on this
                                purchase
                              </p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-5" />
            <div class="row mt-3 pb-3 border-bottom ">
              <div class="col-xl-4 border-right">
                <div class="">
                  <div class="h3text2">Support</div>

                  <p class="h3textp">
                    If you have any questions or inquiries, please don't
                    hesitate to reach out to us using the contact information
                    below.
                  </p>
                  <p class="h3textp">
                    <i class="fa-solid fa-envelope text-theme"></i>
                    info@globalcrmsoftware.com
                  </p>
                  <p class="h3textp">
                    <i class="fa-solid fa-phone text-theme"></i> +91 9964797361
                  </p>
                </div>
              </div>
              <div class="col-xl-5 video-consultation border-right">
                <span class="mb-0 h3textp">
                  Documentation: Empowering You with Knowledge
                </span>
                <br />
                <div class="mb-0 text-muted fs-14 h3textp">
                  Access comprehensive instructions and empowering
                  documentation.
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
          {loading && <Loading />}
        </div>
      ) : (
        <div className="text-blue-500 text-center pt-16 text-[21px] h-screen">
          Link Expired !
        </div>
      )}
     {!error&& <Modal
        keepMounted
        open={modal}
        onClose={()=>setModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <img src="/success1.gif" alt="" className=" w-28 mx-auto mb-8"/>
          <Typography id="keep-mounted-modal-title" className="text-green-500 text-center" variant="h6" component="h2">
           Thank You for your Payment
          </Typography>
      
        </Box>
      </Modal>}
      {loading && <Loading />}
    </div>
  );
}

export default OR_payment;


