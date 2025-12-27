import { roboto } from "@/app/fonts";

export default function TrustBadges() {
  return (
    <div
      className={` ${roboto.className} grid grid-cols-3 text-center gap-4 py-6`}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">🏅</span>
        <p className="text-xs font-medium">
          Quality <br />
          Guarantee
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">📦</span>
        <p className="text-xs font-medium">
          Secure <br /> Delivery
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">💳</span>
        <p className="text-xs font-medium">Easy & Secure Payments</p>
      </div>
    </div>
  );
}
