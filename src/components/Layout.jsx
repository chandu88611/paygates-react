import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchCartProducts } from "../stores/cartThunk";
function Layout({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartProducts = useSelector((state) => state.cart);

  useEffect(() => {
    // Dispatch the Thunk to fetch cart products
    // if(location.pathname=='/'||location.pathname=="/cart"){

    dispatch(fetchCartProducts("7"));
    // }
  }, [dispatch, location.pathname]);

  return (
    <div>
      <div className=" mx-8 py-2 flex justify-between items-center">
        <div>
          <Link to={"/"}>
            <img src="/logo-global.png" alt="" className="h-10" />
          </Link>
        </div>
        <div className="relative">
          <Link to={"/cart"}>
            <AiOutlineShoppingCart size={33} className="mt-2 text-muted" />
          </Link>
          <div className="p-2 h-6 text-xs w-6 flex items-center justify-center absolute top-0 -right-3 bg-blue-500 shadow-sm shadow-[#6e4242] rounded-full text-white">
            {cartProducts?.data?.length}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
