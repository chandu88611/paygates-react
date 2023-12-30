import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Proccesing from './Proccesing';
import { BiSolidOffer } from 'react-icons/bi';
import { MdSecurity } from "react-icons/md";
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';

function PU_DynamicCart() {
  const [htmlContent, setHtmlContent] = useState('');
  const formRef = useRef(null);
  const [total,setTotal]=useState()
  const [formData,setFormData]=useState()
  const [products,setProducts]=useState()
const [data,setData]=useState()
const [error ,setError]=useState(false)
const [promo,setPromo]=useState('')
const [promoError,setPromoError]=useState(false)
const [page_status,setPage_status]=useState(JSON.parse(localStorage.getItem("page_status")))
const [loading,setLoading]=useState(false)
const [ipData,setIpData]=useState({})

const params=useParams()
const checkout=async()=>{
  setLoading(true)
  try {
    const res=await axios.post("https://parent.globalcrmsoftware.com/api/transaction-api",{
      returnUrl: "https://checkout.globalcrmsoftware.com/payment-status/",
      data:data,
      type:"child"
    })

    localStorage.setItem("page_status",JSON.stringify({
      page_id:params.id,
      payment_status:true
    }))
setFormData(res.data.data)
  } catch (error) {
    console.log(error)
  }
}

const getProducts=async()=>{
    try {
        const res=await axios.get("https://parent.globalcrmsoftware.com/api/get-product-list")
  setProducts(res?.data?.data)
    } catch (error) {
        
    }
}
const secondapi_call = async (id) => {
    console.log(params)
    try {
      const res = await axios.post(`https://buyer.ftxtradingsoftware.com/api/get-payment-link-details`,{
        payment_link_id:params?.id
      });
     if(res?.data?.status){
      setData(res.data.data)
      getProducts()
     }
    } catch (error) {
        setError(true)
        setText("Payment Failed try after 20 minutes")
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);


    const images = [
        '/assets/img/slider-img-1.jpg',
        '/assets/img/slider-img-2.jpg',
        '/assets/img/slider-img-3.jpg',
        '/assets/img/slider-img-4.jpg',
        '/assets/img/slider-img-5.jpg',
        '/assets/img/slider-img-6.jpg',
        '/assets/img/slider-img-7.jpg',
        '/assets/img/slider-img-8.jpg',
        '/assets/img/slider-img-9.jpg',
       
       
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
const url =JSON.parse(localStorage.getItem("child_url"))

      useEffect(()=>{
        setTotal(cartProducts?.data?.reduce((d,t)=>d+t.total,0))
        secondapi_call(url)
      
      },[cartProducts])
      useEffect(()=>{

        secondapi_call()
      
      },[])
      useEffect(()=>{
        if(formData){
          formRef.current.submit()
        }
      },[formData])


     

      useEffect(()=>{
    
      
        setData((prev)=>(
      {...prev,cart_items:data?.invoice?.items?.map((data1,i)=>(
        {product_id:products[i].id}
      ))}
    ))
      
    },[products])


      useEffect(()=>{
    

     console.log(page_status)
     if(page_status?.page_id==params?.id || page_status?.payment_status){
      setError(true)
     }
      
    },[page_status])
    useEffect(()=>{
      function successCallback(position) {
        console.log(position);
        const fetchData = async () => {
         
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            setIpData(data)
            localStorage.setItem("ipdata",JSON.stringify(data))
    
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
    
      
      const ipdata=JSON.parse(localStorage?.getItem("ipdata"))
      
      if(ipdata){
        setIpData(ipdata)
      }else{
       navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        }
        
    },[])

// ////////////////////////////////////////////////////////////////////////////////////////////////////////
// Razor pay checkout
// ////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialize = () => {
    let orderId = "Order_" + new Date().getTime();
  
    // Sandbox Credentials
    let mid = ""; // Merchant ID
    let mkey = ""; // Merchant Key
    var paytmParams = {};
  
    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: "WEBSTAGING",
      orderId: orderId,
      callbackUrl: "https://merchant.com/callback",
      txnAmount: {
        value: 100,
        currency: "INR",
      },
      userInfo: {
        custId: "1001",
      },
    };
  
    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    ).then(function (checksum) {
      console.log(checksum);
      paytmParams.head = {
        signature: checksum,
      };
  
      var post_data = JSON.stringify(paytmParams);
  
      var options = {
        /* for Staging */
        // hostname: "securegw-stage.paytm.in" /* for Production */,
  
        hostname: "securegw.paytm.in",
  
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };
  
      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        post_res.on("end", function () {
          console.log("Response: ", response);
          // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
          setPaymentData({
            ...paymentData,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
            amount: 100,
          });
        });
      });
  
      post_req.write(post_data);
      post_req.end();
    });
  };
  return (
    <div className='my-2'>
      
       { (data&&!error)?
      <div className=" shadow-sm mt-4">
      <div class="  w-full sm:w-[80vw] md:w-[90vw] lg:w-[85vw] 2xl:w-[70vw] mx-auto mt-2 md:px-1 !shadow">
      <div class="row">
                <div class="col-xl-7 lg:px-8">
                <div class="d-flex align-items-center justify-content-between">
              <img src="/logo-global.png" width="140px" className="py-2" />
              <p class="mb-0">
                <i class="fa-solid fa-location-dot text-theme !text-[16px] mx-2 animate-bounce an-duration"></i>
                <span class="text-muted h3textbold">
                  {ipData?.address?.city}
                </span>
              </p>
            </div>
            <div className='flex items-center !text-[22px] text-green-600 gap-2 py-1 my-2   border-green-600 rounded bg-green-50  px-2'>
              <MdSecurity size={36} className=''/> Secured Payment
            </div>
            <h3 className="text-xl my-2 mb-2 bg-gray-100  px-2 py-1 flex items-center">SHIPPING ADDRESS <AiOutlineHome size={24} className="ml-auto  mr-2 text-muted"/></h3>

           <p className='capitalize text-[19px] !font-mono pl-2'>{data?.invoice?.billing_street}
           <br/>
           {data?.invoice?.billing_street} <br />
           {data?.invoice?.billing_city},{data?.invoice?.billing_state}<br/>
           {data?.invoice?.billing_country} - {data?.invoice?.billing_zip}
           </p>
           <h3 className="!text-[18px] bg-gray-100  px-2 py-2 my-2 mt-4 uppercase  flex items-center">Your Software Cart <AiOutlineShoppingCart size={24} className="ml-auto text-muted  mr-2 "/></h3>

           {data?.invoice?.items?.length>0?data?.invoice?.items?.map((data1,i)=>(

<div class="mainss">
{   products?.length>0
&&    <img class="w-[70px] !h-[70px] md:w-[100px] md:!h-[100px]" src={products[i]?.img_1} alt="headphones set with pink color" />}

<div id="cart-text">							
{   products?.length>0&&<h2 className='!text-[14px] !md:text-[18px]'>{products[i]?.name}</h2>}
 <div> <span class="h1text !text-[12px] !md:text-[14px]"><span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }}  class=" !text-[12px] !md:text-[14px]"/> {data1?.total}</span> <span class="text-muted !text-[12px] !md:text-[14px]"> {data1?.tax_val+"%"} </span></div>

 <div><span class="h4text-color !text-[12px] !md:text-[14px]">Shipping: </span> <span class="h4text"> Free</span></div>
   
 
 <div class="hline"></div>

</div>
</div>
)):<div className="text-center text-blue-600 py-2 my-4 bg-blue-100">Your Cart is Empty</div>}

                  <section>
                    <div class="order-cont ">
                      <div class="h2progress">Your order has been received</div>
                      <div class="bitext">
                        <span class="text2">Order Date:</span> August 31 2023 |
                        <span class="text2">Purchase ID:</span> IS02030405
                      </div>
                    </div>
                    <ol class="progress-bar-ss">
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
                        <img
                          src="/assets/img/shipped.png"
                          alt="order-confirm"
                        />
                        <span className="-ml-6">On its way</span>
                      </li>
                  
                      <li>
                        <img
                          src="/assets/img/courier.png"
                          alt="order-confirm"
                        />
                        <span className="ml-6">
                          Estimated Delivery
                          <span class="sub-text">Sep-08 or Sep-09</span>
                        </span>
                      </li>
                    </ol>
                  </section>

                  <div class="col-xl-12 footer-col">
                  <div class="headertext">
                    Connect Our Experts
                    <br />
                    <span class="title-two">
                      Seamless Checkout Experience for Advanced Personalized
                      Software Solutions.
                    </span>
                  </div>

                  <div class="">
                    <div class="flex md:w-[80%]   bg-white px-4 gap-3 py-3 shadow mx-auto rounded my-2">
                      <img
                        src="/assets/img/contact-us.png"
                        alt="Profile Picture"
                        className=""
                      />
                      <span class="text !text-start">
                      <span >Email Address:</span>  
                        <span class="textp">info@globalpbxsoftware.com</span>
                      </span>
                    </div>
                    <div class="flex md:w-[80%]   bg-white px-4 gap-3 py-3 shadow mx-auto rounded my-2">
                      <img
                        src="/assets/img/message.png"
                        alt="Profile Picture"
                        className=""
                      />
                      <span class="text !text-start">
                        Contact Number:
                        <span class="textp">+91 9964797361</span>
                      </span>
                    </div>
                    <div class="flex md:w-[80%]   bg-white px-4 gap-3 py-3 shadow mx-auto rounded my-2">
                      <img
                        src="/assets/img/security.png"
                        alt="Profile Picture"
                        className=""
                      />
                      <span class="text !text-start">
                        Secure Payment:
                        <span class="textp">100% secure payment</span>
                      </span>
                    </div>
                  </div>
                </div>
                </div>

                <div class="col-xl-5 bg-gray-50">
                  <div class="detail-info">
                    <div id="right-sidebar">
                     
                      <div class="flex  items-center mt-3 mb-4 !w-[90%] mx-auto">
                      <BiSolidOffer size={70} className="mt-3 text-yellow-500 animate-spin an-duration"/>
                     
                        <div class="w-full pr-4">
                          <h4 class="username mt-1">Enter Your Promocode</h4>
                          <div className="flex items-center gap-4  -mt-2">
                            <input
                              type="text"
                              className="border ml-2 rounded py-2 pl-2 focus:outline-none w-full text-[15px]"
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
                                       <span class="item__quantity">
                                       Sub  Total 
                                       </span>
                                       <span class="item__price">
                                       <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} /> {data?.invoice?.subtotal}
                                       </span>
                                     </span>
                                   </li>
                                   <li class="cart__list-item">
                                     <span class="item__name">
                                       <span class="item__quantity">
                                      Requested Amount
                                       </span>
                                       <span class="item__price">
                                       <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} /> {data?.requested_amount}
                                       </span>
                                     </span>
                                   </li>
                                   <li class="cart__list-item">
                                     <span class="item__name">
                                       <span class="item__quantity">
                                         Offer discount
                                       </span>
                                       <span class="item__price off-price-col">
                                         - <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} />{data?.invoice?.discount_total}
                                       </span>
                                     </span>
                                   </li>
                                   <li class="cart__list-item">
                                     <span class="item__name">
                                       <span class="item__quantity">
                                         GST - 18%
                                       </span>
                                       <span class="item__price">
                                          <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} />{data?.invoice?.total_tax}
                                       </span>
                                     </span>
                                   </li>
                                   <li class="cart__list-item">
                                     <span class="item__name">
                                       <span class="item__quantity">
                                         Shipping charge
                                       </span>
                                       <span class="item__price">
                                         Free
                                       </span>
                                     </span>
                                   </li>
                                   <hr class="hr"/>
                                   <li class="cart__list-item">
                                     <span class="item__name">
                                       <span class="item__quantity cart__total">
                                         Total
                                       </span>
                                       <span class="item__price cart__total">
                                         <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} /> {data?.invoice?.total}
                                       </span>
                                     </span>
                                   </li>
                                   <li class="cart__list-item">
                                     <button class="w-full py-2 bg-slate-700 text-white font-semibold rounded hover:scale-105 transform transition-transform duration-500 ease-in-out" onClick={checkout}> <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} /> {data?.requested_amount} / - Pay Now</button>
                                   </li>
                                   <li class="cart__list-item">
                                     <p class="footer-p px-2 py-1">Shipping charges might vary based on delivery location</p>
                                   </li>
                                 </ul>      
                               </div>
                               <img src="/assets/card-logo.png" alt="" className="mx-auto h-14" />
                               {data?.invoice?.discount_total&&
                               <div>

                               
                               <div class="offer-container">			
                               <div class="offer-disc-container">
                                       <div class="disc-percent-img">
                                           <img src="/assets/img/offer-icon.png" alt="Profile Picture" />
                                       </div>
                                       <div class="offer-disc-description">
                                           <h3 class="off-disc-title">Offers & Discounts</h3>
                                       </div>
                                   </div>
                                  </div>
                                  
                                  <div class="ins-offer-container">			
                               <div class="ins-offer-disc-container">
                                       <div class="ins-offer-disc-description">
                                           <h3 class="ins-off-disc-title">One Card Instant Discount</h3>
                                           <p class="ins-off-disc-desc">Your getting <span dangerouslySetInnerHTML={{ __html:data?.currency?.symbol }} />{data?.invoice?.discount_total} discount on this purchase </p>
                                      
                                       </div>
                                   </div>
                                  </div></div>
                                  }
                
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
                    className='mx-auto'
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
                    className='mx-auto'
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
                    className='mx-auto'
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
                    className='mx-auto'
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

    </div>:<div className='text-blue-500 text-center pt-16 text-[21px] h-screen'>
Link Expired !
  </div>
  
  }
 {loading&&<Proccesing/>}
 
 </div>
  )
}

export default PU_DynamicCart