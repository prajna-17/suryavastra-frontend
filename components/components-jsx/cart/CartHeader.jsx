import { ArrowLeft } from "lucide-react";

export default function CartHeader() {
  return (
    <div
      className="flex items-center gap-3 mt-10"
      style={{ color: "var(--color-brown)" }}
    >
      <ArrowLeft size={20} />
      <h2 className="text-lg font-medium">Cart (2 Item)</h2>
    </div>
  );
}
