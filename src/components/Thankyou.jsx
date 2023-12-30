function Thankyou() {
    return (
      <>
        <div>
          <div className=" h-screen bg-slate-800 !w-[100vw]">
            {/* BEGIN: Error Page */}
            <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
              <div className="-intro-x lg:mr-20">
                <img
                  alt="Rocketman Tailwind HTML Admin Template"
                  className="w-[450px] h-48 lg:h-auto scale_anim"
                  src={"/thankyou4.png"}
                />
              </div>
              <div className="mt-10 text-white lg:mt-0">
               
                <div className="mt-5 text-xl font-medium intro-x lg:text-5xl">
                Thank you for your <br/>payment! 
                </div>
                <div className="mt-3 text-lg intro-x">
                We really appreciate your support.
                </div>
        
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Thankyou;