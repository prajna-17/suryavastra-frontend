import { roboto } from "@/app/fonts";

export default function PaymentSummary() {
  return (
    <div className={`space-y-3 ${roboto.className} mt-10`}>
      <h3 className="font-medium text-sm flex items-center gap-2">
        💳 Payment Details (<span className="text-gray-400">2 Items</span>)
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>₹ 5,555</span>
        </div>

        <div className="flex justify-between mt-5 ">
          <span>Discount</span>
          <span className="text-green-600">- ₹ 2,555</span>
        </div>

        <div className="flex justify-between mt-5">
          <span>Delivery Charge</span>
          <span className="">FREE</span>
        </div>
        <hr className="border-t border-[#591b16] my-3" />

        <div className="flex justify-between font-semibold text-base">
          <span>Grand Total</span>
          <span>₹ 3,000</span>
        </div>
      </div>

      <div
        className="bg-[#f3dfdb] text-xs text-center py-2 rounded font-medium  mt-5"
        style={{ color: "var(--color-dark-brown)" }}
      >
        🎉 Yay! Your total discount is Rs. 2,555
      </div>
    </div>
  );
}
