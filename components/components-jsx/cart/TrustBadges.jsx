import { roboto } from "@/app/fonts";

export default function TrustBadges() {
  return (
    <div
      className={` ${roboto.className} grid grid-cols-3 text-center gap-4 py-6`}
    >
      <div className="flex flex-col items-center text-xs text-gray-900">
        <img src="/img/quality.jpeg" alt="Quality" className="w-10 h-10" />
        <span className="mt-3 text-xs font-bold">
          Quality
          <br />
          Guarantee
        </span>
      </div>

      <div className="flex flex-col items-center text-xs text-gray-900">
        <img
          src="/img/delivery.jpeg"
          alt="Secure Delivery"
          className="w-10 h-10"
        />
        <span className="mt-3 text-xs font-bold">
          Secure
          <br />
          Delivery
        </span>
      </div>

      <div className="flex flex-col items-center text-xs text-gray-900">
        <img
          src="/img/payment.jpeg"
          alt="Secure Payment"
          className="w-10 h-10"
        />
        <span className="mt-3 text-xs font-bold">
          Easy & Secure
          <br />
          Payments
        </span>
      </div>
    </div>
  );
}
