import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className=" w-full h-screen fixed top-0 z-[12334]  bg-teal-100 opacity-50 flex items-center justify-center">
      <div className="w-fit ">
        <CircularProgress/>
      </div>
    </div>
  );
}

export default Loading;