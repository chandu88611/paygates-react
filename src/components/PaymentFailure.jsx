import React, { useEffect, useState } from 'react'
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
function PaymentFailure({data}) {
   const [order_visited,setOrder_visited]=useState()
   const params=useParams()
  useEffect(()=>{
   console.log(data)
},[data])

const navigate=useNavigate()
useEffect(() => {
  let storedData = localStorage.getItem("order_visited");

  if (storedData !== null) {
    try {
      storedData = JSON.parse(storedData);

      if (storedData.visited === 1 && storedData.order === params.order) {
        setOrder_visited(true);
        navigate("*")
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }
  if(!storedData||storedData.order != params.order){

    setTimeout(() => {
      window.location.reload();
    }, 6000);
  }
  
}, []);

useEffect(()=>{
localStorage.setItem("order_visited", JSON.stringify({ order: params.order, visited: 1 }))

},[order_visited])
  return (
    <>
    <div className="h-[88vh] !pb-10">
      
    <div className="mx-auto  max-w-6xl ">
                            <div className="profile__main shadow h-100">
                              
                               <div className="profile__main-top p-10">
                               <img src="/logo-global.png" alt="" className='h ' />
                                  <div className="text-center">
                                     <h4 className="text-3xl text-red-500 mt-4">Payment Failed</h4>

                                     <div className="py-2 px-3 bg-red-100 text-red-600 flex text-center w-fit mx-auto gap-2 items-center rounded my-2 text-[12px] md:text-[15px] ">
                                      <FiAlertTriangle size={30}/> {data?.message}
                                     </div>
                                     <img src="/alert.gif" alt="" className='h-40 mx-auto'/>
                                  </div>
                                  <div className="">
                                     <p className="text-center text-info mb-5 text-[14px]" style={{lineHeight: "1.25"}}><b></b><br/>Oops! Your payment couldn't be processed. Please check your payment details and try again or contact our support team for assistance.</p>
                                     {/* <div className="row mx-[5vw] mb-4">
                                        <div className="col-12 col-lg-6 border-bottom border py-2 ">
                                           <p className="detail-title mb-0 text-muted">Transaction ID : </p>
                                           <p className="detail-desc mb-0 font-semibold">{data?.orders[0]?.orderDetail?.txnId}</p>
                                        </div>
                                        <div className="col-12 col-lg-6 border-bottom border py-2 ">
                                           <p className="detail-title mb-0 text-muted">Order ID : </p>
                                           <p className="detail-desc mb-0 font-semibold">{data?.orders[0]?.orderDetail?.orderId}</p>
                                        </div>
                                    
                                    
                                      
                                      
                                     </div> */}
                                
                                  </div>
                               </div>
                            </div>
    </div>
   
        </div>
    <footer class=" py-4 shadow border-t-2 ">
       <div class="flex gap-2 w-fit  mx-auto text-[14px] flex-col md:flex-row">
        
             <div class="text-[14px]">
              { new Date().getFullYear()} © All Rights Reserved.
             </div> 
             <div >
                <div class="text-[14px]">
                   Designed and Developed by Global PBX Software
                </div> 
             </div>
       
       </div>
    </footer>
    </>
  )
}

export default PaymentFailure



