function PageNotFound() {

    return (
      <>
        <div>
     
          <div className=" h-screen bg-slate-800 !w-[100vw]">
            {/* BEGIN: Error Page */}
            <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
              <div className="-intro-x lg:mr-20">
                <img
                  alt="Rocketman Tailwind HTML Admin Template"
                  className="w-[450px] h-48 lg:h-auto"
                  src={"/error-illustration.svg"}
                />
              </div>
              <div className="mt-10 text-white lg:mt-0">
                <div className="font-medium intro-x text-8xl">404</div>
                <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                  Oops. This page has gone missing.
                </div>
                <div className="mt-3 text-lg intro-x">
                You have to close this window or contact merchant support.
                </div>
        
              </div>
            </div>
            {/* END: Error Page */}
          </div>
        </div>
      </>
    );
  }
  
  export default PageNotFound;