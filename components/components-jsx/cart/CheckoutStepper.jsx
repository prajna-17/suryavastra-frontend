export default function CheckoutStepper() {
  return (
    <div className="bg-[#f4e6e2] px-6 py-5">
      <div className="relative flex items-start justify-between">
        {/* Connecting line */}
        <div className="absolute top-[10px] left-6 right-6 h-[1px] bg-[#c8a9a1]" />

        {/* Step 1 - Active */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-5 h-5 rounded-full  bg-[#d19584] flex items-center justify-center ">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6b3f36]" />
          </div>
          <span className="mt-4 text-sm font-semibold text-[#080808]">
            Cart
          </span>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-5 h-5 rounded-full  bg-[#d19584] flex items-center justify-center ">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6b3f36]" />
          </div>
          <span className="mt-4 text-sm font-semibold text-[#070707]">
            Order Details
          </span>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-5 h-5 rounded-full  bg-[#d19584] flex items-center justify-center ">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6b3f36]" />
          </div>{" "}
          <span className="mt-4 text-sm font-semibold text-[#080808]">
            Payment
          </span>
        </div>
      </div>
    </div>
  );
}
