import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import Proccesing2 from '../Proccessing2'
import IG_paymentSuccess from './IG_paymentSuccess'
import IG_paymentFailure from './IG_paymentFailure'




function IG_paymentStatus() {
const [loading,setLoading]=useState(true)
const [paymentStatus,setPaymentStatus]=useState()
const [paymentData,setPaymentData]=useState(null)
const params=useParams()
const [update,setUpdate]=useState()
const payment_localdata=JSON.parse(localStorage.getItem("payment_status"))
const getOrderDetails=async()=>{
    try {
        const res=await axios.post("https://parent.globalcrmsoftware.com/api/stripe-response",{
            prodId:params?.order,
            paymentId:params?.txnid,
        })
        if(res?.data?.data?.frontendstatus){
            setPaymentStatus(true)
            setPaymentData(res.data.data)
           
            setLoading(false)
        }else{
          
           
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
{loading?<Proccesing2/>:(paymentData&&paymentStatus?<IG_paymentSuccess data={paymentData}/>:<IG_paymentFailure data={paymentData}/>)}
    </div>
  )
}

export default IG_paymentStatus