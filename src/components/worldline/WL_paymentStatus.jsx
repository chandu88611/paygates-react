import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import Proccesing2 from '../Proccessing2'
import WL_paymentSuccess from './WL_paymentSuccess'
import WL_paymentFailure from './WL_paymentFailure'



function WL_paymentStatus() {
const [loading,setLoading]=useState(true)
const [paymentStatus,setPaymentStatus]=useState()
const [paymentData,setPaymentData]=useState(null)
const params=useParams()
const [update,setUpdate]=useState()
const payment_localdata=JSON.parse(localStorage.getItem("payment_status"))
const getOrderDetails=async()=>{
    try {
        const res=await axios.post("https://parent.globalcrmsoftware.com/api/worldline-response",{
            orderId:params?.order,
            txnId:params.txnid
        })
        if(res?.data?.data?.frontendstatus){
            setPaymentStatus(true)
            setPaymentData(res.data.data)
            // localStorage.setItem("payment_status",JSON.stringify({
            //     id:params?.order ,
            //     data:res.data,
            //     success:res?.data?.data?.status
            // }))
            setLoading(false)
        }else{
            // localStorage.setItem("payment_status",JSON.stringify({
            //     id:params?.order ,
            //     data:res.data,
            //     success:res?.data?.status
            // }))
           
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

      getOrderDetails()
    
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
{loading?<Proccesing2/>:(paymentData&&paymentStatus?<WL_paymentSuccess data={paymentData}/>:<WL_paymentFailure data={paymentData}/>)}
    </div>
  )
}

export default WL_paymentStatus