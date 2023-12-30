import "./App.css";
import Pricing from "./components/Pricing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PaymentStatus from "./components/PaymentStatus";
import CheckoutProccesing from "./components/CheckoutProccesing";
import DynamicCart from "./components/DynamicCart";
import Cart1 from "./components/Cart1";
import PU_DynamicCart from "./components/PU_DynamicCart";
import PageNotFound from "./components/Notfound";
import Thankyou from "./components/Thankyou";
import WL_DynamicCart from "./components/worldline/WL_DynamicCart";
import WL_paymentStatus from "./components/worldline/WL_paymentStatus";
import Paytm_DynamicCart from "./components/paytm/Paytm_DynamicCart";
import Paytm_paymentStatus from "./components/paytm/Paytm_paymentStatus";
import PH_DynamicCart from "./components/phonepe/PH_DynamicCart";
import PH_paymentStatus from "./components/phonepe/PH_paymentStatus";
import IG_DynamicCart from "./components/ig_stripe/IG_DynamicCart";
import OR_payment from "./components/Qr/OR_payment";
import FloxyPay_DynamicCart from "./components/Floxypay/FloxyPay_DynamicCart";
import Airwallex_DynamicCart from "./components/airwallex/Airwallex_DynamicCart";
import IG_paymentStatus from "./components/ig_stripe/IG_paymentStatus";
import Binance_DynamicCart from "./components/binance/Binance_DynamicCart";
import FloxyPay_paymentStatus from "./components/Floxypay/FloxyPay_paymentStatus";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* {isLoading&&<Loading/>} */}
      <Router>
        <Routes>
          <Route  path="/" element={<Layout><Pricing /></Layout>}/>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/thank-you" element={<Thankyou />} />
          {/* <Route path='/payment-status/pu/:order/:txnid' element={<Payu_PaymentStatus/>}/> */}
          <Route path="/payment-status/wl/:order/:txnid"  element={<WL_paymentStatus />}  />
          <Route path="/floxypay/payment-success"  element={<FloxyPay_paymentStatus />}  />
          <Route path="/payment-status/ptm/:order/:txnid" element={<Paytm_paymentStatus />}/>
          <Route path="/payment-status/zp/:order" element={<PaymentStatus />} />
          <Route path="/payment-status/st/:order/:txnid" element={<IG_paymentStatus />} />
          <Route path="/payment-status/ph/:order/:txnid" element={<PH_paymentStatus />} />
          <Route path="/checkout/:id/:second_id"  element={<CheckoutProccesing />}/>
           <Route path="/checkout/:domain/:id/:second_id" element={<CheckoutProccesing />}/>
          <Route path="/checkout/zp/:id" element={<DynamicCart />} />
          <Route path="/checkout/qr/:id" element={<OR_payment />} />
          <Route path="/checkout/st/:id" element={<IG_DynamicCart />} />
          <Route path="/checkout/wl/:id" element={<WL_DynamicCart />} />
          <Route path="/checkout/ph/:id" element={<PH_DynamicCart />} />
          <Route path="/checkout/fp/:id" element={<FloxyPay_DynamicCart />} />
          <Route path="/checkout/aw/:id" element={<Airwallex_DynamicCart />} />
          <Route path="/checkout/bn/:id" element={<Binance_DynamicCart />} />
          <Route path='/checkout/pu/:id' element={<PU_DynamicCart/>}/>
          <Route path="/checkout/ptm/:id" element={<Paytm_DynamicCart />} />
          <Route path="/checkout/:id" element={<Layout><DynamicCart /></Layout>}/>
          <Route path="/cart" element={<Cart1 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
