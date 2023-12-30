import React, { useEffect, useState } from 'react'
import Proccesing from './Proccesing'
import PaymentFailure from './PaymentFailure'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Proccesing2 from './Proccessing2'
import PaymentSuccess1 from './PaymentSuccess1'


function PaymentStatus() {
const [loading,setLoading]=useState(true)
const [paymentStatus,setPaymentStatus]=useState()
const [paymentData,setPaymentData]=useState(null)
const params=useParams()
const [update,setUpdate]=useState()
const payment_localdata=JSON.parse(localStorage.getItem("payment_status"))
const getOrderDetails=async()=>{
    try {
        const res=await axios.post("https://parent.globalcrmsoftware.com/api/response",{
            orderId:params?.order,
        })
        if(res?.data?.data?.frontendstatus){
            setPaymentStatus(true)
            setPaymentData(res.data.data)
            localStorage.setItem("payment_status",JSON.stringify({
                id:params?.order ,
                data:res.data,
                success:res?.data?.data?.status
            }))
            setLoading(false)
        }else{
            localStorage.setItem("payment_status",JSON.stringify({
                id:params?.order ,
                data:res.data,
                success:res?.data?.status
            }))
           
            setPaymentData(res.data)
            setPaymentStatus(false)
            setLoading(false)
        }
    } catch (error) {
        setPaymentStatus(false)
        setLoading(false)
    }
}
useEffect(() => {
//     if (payment_localdata?.id == params?.order) {
// setUpdate(!update)
//     } else {
      getOrderDetails()
    // }
  }, [params])
  useEffect(()=>{
    if (payment_localdata?.data?.status && payment_localdata?.data?.status=="true"){ 
        console.log(payment_localdata.success ,payment_localdata)
      setPaymentData(payment_localdata?.data?.data)
      setPaymentStatus(true)

    }else{
      console.log(payment_localdata)

      setPaymentData(payment_localdata?.data)
      setPaymentStatus(false)
    }
    setTimeout(()=>{

        setLoading(false)
    },1000)
  },[update])
  return (
    <div>
{loading?<Proccesing2/>:(paymentData&&paymentStatus?<PaymentSuccess1 data={paymentData}/>:<PaymentFailure data={paymentData}/>)}
    </div>
  )
}

export default PaymentStatus